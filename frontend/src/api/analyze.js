export const analyzeImage = async (file) => {
  const API_BASE_URL = "https://gardano-production.up.railway.app"; // หรือ URL ใหม่ที่ได้จาก Railway

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/api/analyze/`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};
