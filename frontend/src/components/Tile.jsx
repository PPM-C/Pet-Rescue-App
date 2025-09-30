import { Link } from 'react-router-dom'

export default function Tile({ to, icon, label, badge }) {
  return (
    <Link to={to} className="tile">
      {badge ? <span className="badge-bubble">{badge}</span> : null}
      <div className="tile-icon">{icon}</div>
      <div className="tile-label">{label}</div>
    </Link>
  )
}
