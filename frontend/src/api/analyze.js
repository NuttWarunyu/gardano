export const analyzeImage = async (file) => {
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/api/analyze/`, {
    method: "POST",
    body: formData,
    headers: {
      // ✅ ปิด Content-Type ให้ `fetch` จัดการอัตโนมัติ
      // "Content-Type": "multipart/form-data", // ❌ **ห้ามกำหนดตรงนี้!!**
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};
