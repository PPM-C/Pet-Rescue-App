import { useEffect, useState } from 'react'
import { getHealth } from '../api/api'  

export default function StatusBadge() {
  const [ok, setOk] = useState(false)

  useEffect(() => {
    getHealth()
      .then(h => setOk(h.app === 'UP' && h.db === 'UP'))
      .catch(() => setOk(false))
  }, [])

  return (
    <span style={{
      padding:'4px 8px',
      borderRadius:6,
      background: ok ? '#d1fae5' : '#fee2e2',
      color: ok ? '#065f46' : '#991b1b',
      fontWeight: 600
    }}>
      {ok ? 'UP' : 'DOWN'}
    </span>
  )
}
