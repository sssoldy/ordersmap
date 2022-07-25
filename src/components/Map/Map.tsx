import {MapContainer, TileLayer} from 'react-leaflet'
import RouteList from './RouteList'

const Map = () => {
  return (
    <MapContainer
      attributionControl={false}
      className="w-full h-full"
      center={[55.7528442, 37.6203458]}
      zoom={11}
      scrollWheelZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <RouteList />
    </MapContainer>
  )
}

export default Map
