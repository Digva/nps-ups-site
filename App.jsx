import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function App() {
  const [salary, setSalary] = useState(50000);
  const [years, setYears] = useState(30);
  const [rateNPS, setRateNPS] = useState(10);
  const [rateUPS, setRateUPS] = useState(8);
  const [darkMode, setDarkMode] = useState(false);

  const calculateNPSCorpus = () => {
    let total = 0;
    for (let i = 0; i < years; i++) {
      total = (total + salary * 0.10 * 2) * (1 + rateNPS / 100);
    }
    return total;
  };

  const calculateUPSCorpus = () => salary * years * 0.5;

  const getNPSBenefits = () => {
    const corpus = calculateNPSCorpus();
    return {
      lumpsum: corpus * 0.6,
      monthlyPension: (corpus * 0.4 * rateNPS) / 1200,
    };
  };

  const getUPSBenefits = () => ({
    lumpsum: 0,
    monthlyPension: salary * 0.5,
  });

  const nps = getNPSBenefits();
  const ups = getUPSBenefits();

  const chartData = [
    { name: "NPS Lumpsum", value: Math.round(nps.lumpsum) },
    { name: "NPS Annual Pension", value: Math.round(nps.monthlyPension * 12) },
    { name: "UPS Annual Pension", value: Math.round(ups.monthlyPension * 12) },
  ];

  return (
    <div className={darkMode ? "dark" : ""} style={{ padding: 20, fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>NPS vs UPS Calculator</h1>
        <label>
          Dark Mode <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </label>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 20 }}>
        <div>
          <label>Monthly Basic Salary</label>
          <input type="number" value={salary} onChange={e => setSalary(Number(e.target.value))} />
        </div>
        <div>
          <label>Years of Service</label>
          <input type="number" value={years} onChange={e => setYears(Number(e.target.value))} />
        </div>
        <div>
          <label>Expected NPS Return %</label>
          <input type="number" value={rateNPS} onChange={e => setRateNPS(Number(e.target.value))} />
        </div>
        <div>
          <label>Estimated UPS Pension %</label>
          <input type="number" value={rateUPS} onChange={e => setRateUPS(Number(e.target.value))} />
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <h2>Results</h2>
        <p>NPS Corpus: ₹{Math.round(calculateNPSCorpus()).toLocaleString()}</p>
        <p>NPS Lumpsum: ₹{Math.round(nps.lumpsum).toLocaleString()}</p>
        <p>NPS Monthly Pension: ₹{Math.round(nps.monthlyPension).toLocaleString()}</p>
        <p>UPS Monthly Pension: ₹{Math.round(ups.monthlyPension).toLocaleString()}</p>
      </div>

      <div style={{ height: 300, marginTop: 20 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
