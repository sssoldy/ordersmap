import L from 'leaflet'
import {createControlComponent} from '@react-leaflet/core'
import 'leaflet-routing-machine'

interface RoutingMachineProps {
  fromCoords: string[]
  toCoords: string[]
  color: string
}

const RoutingMachinee = ({
  fromCoords,
  toCoords,
  color,
}: RoutingMachineProps) => {
  const [fromLat, fromLong] = fromCoords.map(parseFloat)
  const [toLat, toLong] = toCoords.map(parseFloat)

  const routineMachineLayer = () =>
    // @ts-ignore
    L.Routing.control({
      waypoints: [L.latLng(fromLat, fromLong), L.latLng(toLat, toLong)],
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: false,

      containerClassName: 'hidden',

      lineOptions: {
        styles: [
          {color: 'black', opacity: 0.15, weight: 9},
          {color: 'white', opacity: 0.8, weight: 6},
          {color: `${color}`, opacity: 1, weight: 2},
        ],
      },

      createMarker: (i: number, waypoint: any, n: number) => {
        const marker = L.marker(waypoint.latLng, {
          icon: L.divIcon({
            html: `
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7"
                style="color: ${color}"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clip-rule="evenodd"
                />
              </svg>
            `,
            className: 'bg-transparent border-0',
          }),
        })
        return marker
      },
    })

  return createControlComponent(routineMachineLayer)
}

export default RoutingMachinee
