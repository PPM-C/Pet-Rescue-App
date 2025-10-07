export default function AdoptionRequestCard({ item, petName, adopterName, onApprove, onReject }) {
  return (
    <div className="card card-row">
      <img className="thumb" src={item.photoUrl || 'https://placehold.co/160x120?text=Pet'} alt="pet" />
      <div style={{flex:1}}>
        <div className="title" style={{marginBottom:4}}>{adopterName || `Adopter #${item.adopterId}`}</div>
        <div className="muted">Interested in: <b>{petName || `Pet #${item.petId}`}</b> • {item.status}</div>
      </div>
      <div className="row">
        <button className="btn btn-soft" onClick={()=>onApprove?.(item.id)}>Approve</button>
        <button className="btn btn-danger-soft" onClick={()=>onReject?.(item.id)}>Reject</button>
      </div>
    </div>
  )
}
