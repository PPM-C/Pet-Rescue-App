import { createContext, useContext, useEffect, useState } from 'react';

const Ctx = createContext();

export function FavoritesProvider({ children }) {
  const [ids, setIds] = useState(()=> {
    try { return JSON.parse(localStorage.getItem('favorites')||'[]') } catch { return [] }
  });

  useEffect(()=> {
    localStorage.setItem('favorites', JSON.stringify(ids));
  }, [ids]);

  const toggle = (id) => setIds(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);
  const isFav = (id) => ids.includes(id);

  return <Ctx.Provider value={{ ids, toggle, isFav }}>{children}</Ctx.Provider>;
}

export const useFavorites = () => useContext(Ctx);
