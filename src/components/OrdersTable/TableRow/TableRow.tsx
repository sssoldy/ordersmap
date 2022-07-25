import {EntityId} from '@reduxjs/toolkit'
import {useAppSelector, useAppDispatch} from '../../../app/hooks'
import {selectOrderById, orderSelected} from '../../../app/slices/ordersSlice'
import {formatDate} from '../../../utils/misc'
import EditButton from '../EditButton'
import TableCompanyAddressCell from '../TableCell/TableCompanyAddressCell'
import TableDataCell from '../TableCell/TableDataCell'

interface OrderDataRowProps {
  orderId: EntityId
}

const OrderDataRow = ({orderId}: OrderDataRowProps) => {
  const order = useAppSelector(state => selectOrderById(state, orderId))

  const dispatch = useAppDispatch()

  if (!order) return null

  const handleClick = () => {
    dispatch(orderSelected(order))
  }

  return (
    <tr
      key={order.id}
      className={`cursor-pointer ${
        order.selected ? 'bg-gray-200' : 'hover:bg-gray-50'
      }`}
      onClick={handleClick}
    >
      <TableDataCell className="text-right">
        <EditButton order={order} />
      </TableDataCell>
      <TableDataCell className="relative max-w-[8rem]">
        <div className="font-medium text-gray-900">{order.title}</div>
        <div className="text-gray-500">{formatDate(order.creationDate)}</div>
        {order.selected && (
          <span
            className="absolute left-0 flex-shrink-0 inline-block w-2 h-2 -translate-y-1/2 rounded-full top-1/2"
            style={{backgroundColor: order.color}}
          />
        )}
      </TableDataCell>

      <TableCompanyAddressCell
        companyId={order.fromCompanyId}
        className="text-gray-500 max-w-[12rem]"
      />
      <TableCompanyAddressCell
        companyId={order.toCompanyId}
        className="text-gray-500 max-w-[12rem]"
      />
    </tr>
  )
}

export default OrderDataRow
