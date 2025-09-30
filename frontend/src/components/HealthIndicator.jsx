import { useState } from 'react'
import { api } from '../api'

export default function HealthIndicator() {
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const check = async () => {
    try {
      setLoading(true)
      const res = await api.health()
      setStatus(res.db === 'UP' ? 'Conexión abierta' : 'Sin conexión con la DB')
    } catch {
      setStatus('Sin conexión con la DB')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{display:'flex', gap:8, alignItems:'center'}}>
      <button className="btn" onClick={check} disabled={loading}>
  {loading ? 'Comprobando...' : 'Probar conexión'}
</button>

      {status && <span>{status}</span>}
    </div>
  )
}
