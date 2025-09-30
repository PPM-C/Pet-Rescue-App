import Tile from '../../components/Tile.jsx'
import { MdPets, MdFavorite, MdAssignment, MdEvent } from 'react-icons/md'

export default function UserHome() {
  return (
    <div className="tiles">
      <Tile to="/user/pets" icon={<MdPets/>} label="Pets"/>
      <Tile to="/user/favorites" icon={<MdFavorite/>} label="Lovely Pets"/>
      <Tile to="/user/adoption-form" icon={<MdAssignment/>} label="Adoption Form"/>
      <Tile to="/user/visit-request" icon={<MdEvent/>} label="Visit Request"/>
    </div>
  )
}
