export default function VisitCard({ visit, petName, onEdit, onDelete }) {
  const dt = new Date(visit.scheduledAt)
  const day = String(dt.getDate()).padStart(2, '0')
  const month = dt.toLocaleString('en', { month:'short' })

  return (
    <div className="visit-card">
      <div className="calendar-pill">
        <div className="day">{day}</div>
        <div className="month">{month}</div>
      </div>
      <div style={{flex:1}}>
        <div className="title" style={{marginBottom:4}}>Visit with {petName || `Pet #${visit.adoptionRequestId}`}</div>
        <div className="muted">{visit.status}</div>
        <div className="row" style={{marginTop:8}}>
          <button className="btn btn-soft" onClick={()=>onEdit?.(visit.id)}>Edit</button>
          <button className="btn btn-danger-soft" onClick={()=>onDelete?.(visit.id)}>Delete</button>
        </div>
      </div>
    </div>
  )
}
