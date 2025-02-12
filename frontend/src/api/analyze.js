export const analyzeImage = async (file) => {
  const API_BASE_URL = "https://gardano.onrender.com"; // ✅ ใช้ Render API

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
