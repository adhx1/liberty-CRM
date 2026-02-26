import "./StatCard.css";

const StatCard = ({ title, value, percent, color }) => {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <h4>{title}</h4>
      </div>

      <h2>{value}</h2>

      <div className="progress">
        <div
          className="progress-bar"
          style={{
            width: `${percent}%`,
            backgroundColor: color,
          }}
        ></div>
      </div>

      <span className="percent">{percent}%</span>
    </div>
  );
};

export default StatCard;