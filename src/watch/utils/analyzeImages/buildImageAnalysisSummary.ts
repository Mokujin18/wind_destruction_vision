import { aggregateResults } from './aggregateResults';

export function buildImageAnalysisSummary(
  imagePaths: string[],
  validResults: any[],
  aggregated: ReturnType<typeof aggregateResults>,
) {
  const discardedLowQuality = imagePaths.length - validResults.length;
  const clusters = Math.max(1, Math.floor(validResults.length / 3));

  return {
    claim_id: 'CLM-2025-00123',
    source_images: {
      total: imagePaths.length,
      analyzed: validResults.length,
      discarded_low_quality: discardedLowQuality,
      clusters,
    },
    overall_damage_severity: aggregated.overall_damage_severity,
    confidence: aggregated.average_confidence,
    areas: aggregated.areas.map((a) => ({
      area: a.area,
      damage_confirmed: a.damage_confirmed,
      primary_peril: a.primary_peril,
      count: a.count,
      avg_severity: a.avg_severity,
      representative_images: a.images.map((i) => i.image_url),
      notes: a.notes,
    })),
    data_gaps: aggregated.data_gaps,
    generated_at: new Date().toISOString(),
  };
}
