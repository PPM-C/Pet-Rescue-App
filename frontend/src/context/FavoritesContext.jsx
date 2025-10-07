import { createContext, useContext, useEffect, useState } from 'react'

const Ctx = createContext({ ids: [], toggle: ()=>{} })

export function FavoritesProvider({ children }) {
  const [ids, setIds] = useState(()=> {
    try { return JSON.parse(localStorage.getItem('favIds')||'[]') } catch { return [] }
  })
  useEffect(()=> localStorage.setItem('favIds', JSON.stringify(ids)), [ids])

  const toggle = (id) => setIds(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id])

  return <Ctx.Provider value={{ ids, toggle }}>{children}</Ctx.Provider>
}

export const useFavorites = () => useContext(Ctx)
