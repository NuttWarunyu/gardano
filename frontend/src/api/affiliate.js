// src/api/affiliate.js
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export async function getAffiliates() {
  const response = await axios.get(`${API_URL}/affiliates`);
  return response.data;
}

export async function trackClick(affiliateId) {
  await axios.post(`${API_URL}/track_click/${affiliateId}`);
}
