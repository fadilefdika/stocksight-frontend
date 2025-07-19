'use client';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import CandlestickData from '@/types/stock';

interface LineChartProps {
  historicalData: CandlestickData[];
  predictionData: CandlestickData[];
}

export default function ClosePriceLineChart({ historicalData, predictionData }: LineChartProps) {
  // Format ulang data: satu array, dua kolom: closeHistorical dan closePrediction
  const connectedData = [
    ...historicalData.map((d) => ({
      date: d.date.split('T')[0], // Buang waktu agar konsisten
      closeHistorical: d.close,
      closePrediction: null,
    })),
    ...predictionData.map((d) => ({
      date: d.date,
      closeHistorical: null,
      closePrediction: d.close,
    })),
  ];

  return (
    <div className="w-full h-[400px] bg-zinc-900 rounded-xl p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={connectedData}>
          <XAxis dataKey="date" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#888' }} labelStyle={{ color: '#fff' }} />
          <Legend />
          <Line type="monotone" dataKey="closeHistorical" stroke="#26a69a" name="Historical" dot={false} isAnimationActive={false} strokeWidth={2} connectNulls />
          <Line type="monotone" dataKey="closePrediction" stroke="#7E38BF" name="Prediction" dot={{ r: 2 }} isAnimationActive={false} strokeWidth={2} connectNulls strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
