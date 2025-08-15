import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from 'recharts'

function OrderCharts({ data, labelKey = 'month', title = 'Order Progress' }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={labelKey} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="orders" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default OrderCharts
