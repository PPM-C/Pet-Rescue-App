import Tile from '../../components/Tile.jsx'
import { useEffect, useState } from 'react'
import { api } from '../../api'
import { MdPets, MdAddCircle, MdSearch, MdPeople, MdEvent, MdAssignment } from 'react-icons/md'

export default function AdminHome() {
  const [pending, setPending] = useState(0);

  useEffect(()=> {
    (async()=>{
      try {
        const page = await api.listAdoptionRequests();
        const list = page.content || [];
        setPending(list.filter(r => r.status === 'Pending').length);
      } catch { setPending(0); }
    })();
  }, []);

  return (
    <div className="tiles">
      <Tile to="/admin/adoption-requests" icon={<MdAssignment/>} label="Adoption Requests" badge={pending || null}/>
      <Tile to="/admin/search" icon={<MdSearch/>} label="Search"/>
      <Tile to="/admin/pets" icon={<MdPets/>} label="Pets"/>
      <Tile to="/admin/pets/new" icon={<MdAddCircle/>} label="Add Pet"/>
      <Tile to="/admin/adopters" icon={<MdPeople/>} label="Adopters"/>
      <Tile to="/admin/adopters/new" icon={<MdAddCircle/>} label="Add Adopter"/>
      <Tile to="/admin/visits" icon={<MdEvent/>} label="Visits"/>
    </div>
  )
}
