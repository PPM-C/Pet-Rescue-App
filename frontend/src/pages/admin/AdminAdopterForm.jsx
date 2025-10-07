import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api } from '../../api'

const empty = { firstName:'', lastName:'', docId:'', email:'', phone:'', birthDate:'' }

export default function AdminAdopterForm(){
  const { id } = useParams()
  const nav = useNavigate()
  const [f, setF] = useState(empty)
  const [error, setError] = useState('')

  useEffect(()=>{
    (async()=>{
      if(!id) return
      try{
        const a = await api.getAdopter(id)
        setF(a)
      }catch(e){ setError(e.message) }
    })()
  },[id])

  const onChange = e => setF(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const onSubmit = async(e)=>{
    e.preventDefault()
    try{
      if(id) await api.updateAdopter(id, f)
      else await api.createAdopter(f)
      nav('/admin/adopters')
    }catch(e){ setError(e.message) }
  }

  return (
    <div>
      <div className="row" style={{marginBottom:12}}>
        <Link className="btn btn-ghost" to="/admin">🏠 Admin</Link>
        <Link className="btn btn-ghost" to="/admin/adopters">🧑‍🤝‍🧑 Adopters</Link>
      </div>

      <form className="form" onSubmit={onSubmit}>
        <div className="row" style={{justifyContent:'space-between'}}>
          <h2>{id ? 'Edit Adopter' : 'Add Adopter'}</h2>
          <button className="btn btn-primary">{id ? 'Save' : 'Create'}</button>
        </div>

        {error && <p className="muted">Error: {error}</p>}

        <div className="row">
          <div className="field" style={{flex:1}}>
            <label>First Name</label>
            <input className="control" name="firstName" value={f.firstName} onChange={onChange}/>
          </div>
          <div className="field" style={{flex:1}}>
            <label>Last Name</label>
            <input className="control" name="lastName" value={f.lastName} onChange={onChange}/>
          </div>
        </div>

        <div className="row">
          <div className="field" style={{flex:1}}>
            <label>Document</label>
            <input className="control" name="docId" value={f.docId} onChange={onChange}/>
          </div>
          <div className="field" style={{flex:1}}>
            <label>Birth Date</label>
            <input type="date" className="control" name="birthDate" value={f.birthDate || ''} onChange={onChange}/>
          </div>
        </div>

        <div className="row">
          <div className="field" style={{flex:1}}>
            <label>Email</label>
            <input type="email" className="control" name="email" value={f.email} onChange={onChange}/>
          </div>
          <div className="field" style={{flex:1}}>
            <label>Phone</label>
            <input className="control" name="phone" value={f.phone} onChange={onChange}/>
          </div>
        </div>

        <div className="dropzone">Upload Photo • Browse Files</div>
      </form>
    </div>
  )
}
