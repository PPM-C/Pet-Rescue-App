<div className="grid">
  {items.map(p => (
    <div key={p.id} className="card card-row">
      <img className="thumb" src={p.photoUrl || 'https://placehold.co/200x200?text=Pet'} alt={p.name} loading="lazy"/>
      <div style={{flex:1}}>
        <h3 className="title"><Link to={`/pets/${p.id}`}>{p.name}</Link></h3>
        <div>{p.species} • {p.sex} • {p.size} • {p.status}</div>
        <div className="muted">Temperamento: {p.temperament} • Energía: {p.energyLevel || '—'}</div>
      </div>
      <div><Link to={`/pets/${p.id}/edit`} className="btn btn-ghost">Editar</Link></div>
    </div>
  ))}
</div>
