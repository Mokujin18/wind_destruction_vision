interface AreaInput {
  area: string;
  severity: number;
  image_quality: number;
  confidence: number;
  primary_peril?: string;
  notes?: string;
  image_url?: string;
}

interface AggregatedArea {
  area: string;
  damage_confirmed: boolean;
  primary_peril: string;
  count: number;
  avg_severity: number;
  image_mark: number;
  images: { image_url: string }[];
  notes: string;
}

interface AggregatedResult {
  overall_damage_severity: number;
  average_confidence: number;
  areas: AggregatedArea[];
  data_gaps: string[];
}

export function aggregateResults(inputs: AreaInput[]): AggregatedResult {
  const areaMap = new Map<string, AreaInput[]>();
  let totalConfidence = 0;

  for (const input of inputs) {
    totalConfidence += input.confidence;
    if (!areaMap.has(input.area)) {
      areaMap.set(input.area, []);
    }
    areaMap.get(input.area)!.push(input);
  }

  const areas: AggregatedArea[] = [];

  for (const [areaName, items] of areaMap.entries()) {
    const count = items.length;
    const confirmed = items.filter((i) => i.severity >= 2).length >= 2;
    const avgSeverity = items.reduce((sum, i) => sum + i.severity, 0) / count;

    const topImages = [...items].sort(
      (a, b) => b.image_quality - a.image_quality,
    );

    const top = topImages[0];

    areas.push({
      area: areaName,
      damage_confirmed: confirmed,
      primary_peril: top.primary_peril || 'unknown',
      count,
      avg_severity: parseFloat(avgSeverity.toFixed(2)),
      image_mark: top.image_quality,
      images: topImages.map((i) => ({
        image_url: i.image_url || 'https://example.com/fallback.jpg',
      })),
      notes: top.notes || '',
    });
  }

  const overall = areas.length
    ? areas.reduce((sum, a) => sum + a.avg_severity * a.image_mark, 0) /
      areas.length
    : 0;

  const averageConfidence = inputs.length ? totalConfidence / inputs.length : 0;

  const expectedZones = ['roof', 'attic', 'garage', 'foundation', 'interior'];
  const presentZones = new Set(areas.map((a) => a.area));
  const dataGaps = expectedZones.filter((zone) => !presentZones.has(zone));

  return {
    overall_damage_severity: parseFloat(overall.toFixed(2)),
    average_confidence: parseFloat(averageConfidence.toFixed(2)),
    areas,
    data_gaps: dataGaps,
  };
}
