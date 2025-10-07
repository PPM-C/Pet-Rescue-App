export default function AdminAddAdopter(){
  return (
    <div className="container">
      <div className="header"><span className="title">Add Adopter</span></div>
      <form className="card" style={{marginTop:16, display:'grid', gap:12}}>
        <input placeholder="Full name" />
        <input placeholder="Email" />
        <input placeholder="Phone" />
        <button className="btn">Create</button>
      </form>
    </div>
  )
}
