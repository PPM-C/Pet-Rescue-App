import { useEffect, useState } from 'react'
import { api } from '../api'

export default function HealthIndicator(){
  const [up, setUp] = useState(false)

  useEffect(()=>{
    let alive = true
    ;(async()=>{
      try {
        const data = await api.health()
        if (!alive) return
        setUp((data && (data.status === 'UP' || data.db === 'UP')))
      } catch { setUp(false) }
    })()
    return ()=>{ alive = false }
  }, [])

  return (
    <div className="health" title="DB status">
      <span className={`dot ${up ? 'up':'down'}`} />
      <span>{up ? 'DB: UP':'DB: DOWN'}</span>
    </div>
  )
}
