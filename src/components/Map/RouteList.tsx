import {useAppSelector} from '../../app/hooks'
import {selectSelectedOrders} from '../../app/slices/ordersSlice'
import RouteItem from './RouteItem'

const RouteList = () => {
  const selectedOrders = useAppSelector(selectSelectedOrders)

  return (
    <>
      {selectedOrders.map(({id, fromCompanyId, toCompanyId, color}) => (
        <RouteItem
          key={id}
          fromCompanyId={fromCompanyId}
          toCompanyId={toCompanyId}
          color={color}
        />
      ))}
    </>
  )
}

export default RouteList
