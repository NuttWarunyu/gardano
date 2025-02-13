import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import PlantInfo from "./components/PlantInfo";
import "./App.css";

export default function App() {
  const [result, setResult] = useState(null);

  // ✅ LOG ดูค่าที่รับมาจาก API
  useEffect(() => {
    console.log("📌 ข้อมูลจาก API:", result);
  }, [result]); // ✅ Log ทุกครั้งที่ result เปลี่ยนค่า

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage setResult={setResult} />} />
        <Route
          path="/result"
          element={
            result ? <PlantInfo data={result} /> : <p>กำลังโหลดข้อมูล...</p>
          }
        />
      </Routes>
    </Router>
  );
}
