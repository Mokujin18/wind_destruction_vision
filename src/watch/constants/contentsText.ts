export const contentsText = `        ○ Detect whether the photo shows wind damage (binary).
        ○ If yes, classify location (roof, siding, garage, etc.) and assign a severity
        score 0–4.
        ○ If the photo is blurry, dark, or unrelated, discard it
        "claim_id": "CLM-2025-00123",
        
            '''{
  "source_image": {
    "discarded_low_quality": "✅ Determined via image clarity checks (boolean)"
  },
  "areas": [
    {
      "area": "✅ AI can classify (roof, siding, etc.)",
      "damage_confirmed": "✅ BOOLEAN based on visual damage indicators",
      "primary_peril": "✅ wind (lowercase)",
      "count": "✅ Number of damaged instances detected, INTEGER",
      "avg_severity": "✅ Severity score estimated from image features",
      "image_mark": "✅ Mark of image (float)"
    }
  ],
  "overall_damage_severity": "✅ AI can calculate weighted average across areas",
  "confidence": "✅ AI assigns confidence to predictions",
  "generated_at": "✅ Timestamp when analysis completed (date now)"
}
''' - RETURN THIS AFTER COMPLETION OF ANALYZING, Please return the response as plain text JSON without any visual formatting or escape characters (such as \\\\, \\n, or added line breaks). The output should be suitable for backend ingestion in raw form, !!!SNAKE_CASE!!!`;
