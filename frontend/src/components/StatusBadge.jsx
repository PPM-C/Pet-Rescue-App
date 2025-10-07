// src/components/StatusBadge.jsx
import { useEffect, useState } from 'react';
import { getHealth } from '../api';

export default function StatusBadge() {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    getHealth()
      .then((d) => {
        const ok = d.app === 'UP' && d.db === 'UP';
        setStatus(ok ? 'up' : 'down');
      })
      .catch(() => setStatus('down'));
  }, []);

  return (
    <span style={{ padding: 6, borderRadius: 6, background: status === 'up' ? '#d1fae5' : '#fee2e2' }}>
      {status === 'loading' ? 'Comprobando…' : status === 'up' ? 'Backend UP' : 'Backend DOWN'}
    </span>
  );
}
