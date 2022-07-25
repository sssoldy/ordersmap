import {MenuAlt4Icon} from '@heroicons/react/solid'
import {useDrag} from '@use-gesture/react'
import {useRef} from 'react'
import {useSpring, a} from 'react-spring'
import Map from './components/Map/Map'
import OrdersTable from './components/OrdersTable/OrdersTable'
import Pagination from './components/Pagination/Pagination'

const App = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [{x, width}, set] = useSpring(() => ({x: 0, width: '50%'}))

  const bind = useDrag(
    ({down, offset: [x]}) => {
      const containerWidth = containerRef.current!.offsetWidth
      const width = x / (containerWidth / 100) + 50 + '%'
      set.start({x, width, immediate: down})
    },
    {
      bounds: () => {
        const containerWidth = containerRef.current!.offsetWidth
        const safeDistance = containerWidth / 2
        return {
          left: -safeDistance,
          right: safeDistance - 16, // 16 - separator width
        }
      },
    },
  )

  return (
    <div className="h-screen">
      <div ref={containerRef} className="flex h-full">
        <a.div className="overflow-auto" style={{width}}>
          <OrdersTable />
          <Pagination />
        </a.div>

        <a.div className="bg-slate-300 grow">
          <Map />
        </a.div>

        <a.div
          className="border-x-2 bg-gray-100 z-[410] absolute inset-y-0 flex items-center w-4 cursor-[ew-resize] left-1/2 touch-none"
          {...bind()}
          style={{x}}
        >
          <MenuAlt4Icon className="w-4 h-4 text-gray-600 rotate-90 pointer-events-none" />
        </a.div>
      </div>
    </div>
  )
}

export default App
