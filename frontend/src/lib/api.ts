import { AnalyzeResponse } from "./types";

const API_BASE_url = "http://localhost:8000/api/v1";

export async function analyzeDrugRisk(
  patientId: string,
  gene: string,
  diplotype: string,
  drug: string,
  useAI = true,
): Promise<AnalyzeResponse> {
  const endpoint = useAI ? "/analyze-with-explanation" : "/analyze";

  const response = await fetch(`${API_BASE_url}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      patient_id: patientId,
      gene,
      diplotype,
      drug,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Failed to analyze drug risk");
  }

  return response.json();
}
