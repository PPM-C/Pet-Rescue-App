export default function UserPets(){
  return (
    <div className="container">
      <div className="header"><span className="title">Available Pets</span></div>
      <div className="list" style={{marginTop:16}}>
        <div className="item">
          <strong>Buddy</strong> — playful dog
          <div style={{display:'flex', gap:8, marginTop:8}}>
            <button className="btn">Adoption Request</button>
            <button className="btn secondary">Schedule Visit</button>
          </div>
        </div>
        <div className="item">
          <strong>Whiskers</strong> — gentle cat
          <div style={{display:'flex', gap:8, marginTop:8}}>
            <button className="btn">Adoption Request</button>
            <button className="btn secondary">Schedule Visit</button>
          </div>
        </div>
      </div>
    </div>
  )
}
