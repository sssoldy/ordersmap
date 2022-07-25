import {useAppSelector} from '../../app/hooks'
import {selectFilteredOrdersIds} from '../../app/slices/ordersSlice'
import TableRow from './TableRow/TableRow'

const TableBody = () => {
  const ordersIds = useAppSelector(selectFilteredOrdersIds)

  return (
    <tbody className="bg-white">
      {ordersIds.map(id => (
        <TableRow key={id} orderId={id} />
      ))}
    </tbody>
  )
}

export default TableBody
