export function prepareAreaInputs(results: any[]) {
  return results.flatMap((r) =>
    r.areas.map((a: any) => ({
      area: a.area,
      severity: a.avg_severity,
      image_quality: a.image_mark,
      confidence: r.confidence ?? 0.85,
      primary_peril: a.primary_peril,
      notes: a.notes || '',
      image_url: a.image_url,
    }))
  );
}
