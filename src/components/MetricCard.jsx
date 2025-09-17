// src/components/MetricCard.jsx
const MetricCard = ({ title, value, loading, color, icon }) => (
  <div className={`${color} text-white p-6 rounded-lg shadow-lg`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-white/80 text-sm font-medium">{title}</p>
        {loading ? (
          <div className="animate-pulse bg-white/20 h-8 w-16 rounded mt-2"></div>
        ) : (
          <p className="text-3xl font-bold mt-1">{value}</p>
        )}
      </div>
      <div className="text-3xl opacity-80">{icon}</div>
    </div>
  </div>
)

export default MetricCard