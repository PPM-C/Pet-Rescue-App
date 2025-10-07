import { useState } from 'react'
import { getHealth } from '../services/health'

export default function HealthCheckButton(){
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const check = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getHealth()
      setStatus((data?.status || 'DOWN').toUpperCase())
    } catch (e) {
      setStatus('DOWN')
      setError('Sin conexión con el backend')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{display:'flex', gap:8, alignItems:'center'}}>
      <button className="btn" onClick={check} disabled={loading}>
        {loading ? 'Comprobando…' : 'Probar conexión'}
      </button>
      {status && (
        <span style={{fontWeight:700, color: status==='UP' ? '#49B933':'#b93333'}}>
          {status}
        </span>
      )}
      {error && <span style={{color:'#b93333'}}>{error}</span>}
    </div>
  )
}
