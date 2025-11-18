const StatsCard = ({ title, value, subtitle }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col items-center justify-center text-center">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );
};

export default StatsCard;
