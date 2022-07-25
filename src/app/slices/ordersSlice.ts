import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import {IOrder} from '../../types/order'
import {orders} from '../../utils/misc'
import {RootState} from '../store'
import {selectFilterLimit, selectFilterOffset} from './filterSlice'

const ordersAdapter = createEntityAdapter<IOrder>({
  selectId: state => state.id,
  sortComparer: (a, b) => b.creationDate.localeCompare(a.creationDate),
})

const state = ordersAdapter.getInitialState()
const initialState = ordersAdapter.addMany(state, orders)

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    orderSelected: (state, action: PayloadAction<IOrder>) => {
      const {id, selected} = action.payload
      ordersAdapter.updateOne(state, {id, changes: {selected: !selected}})
    },
    orderUpdated: (state, action: PayloadAction<IOrder>) => {
      ordersAdapter.upsertOne(state, action.payload)
    },
  },
})

export default ordersSlice.reducer

export const {orderSelected, orderUpdated} = ordersSlice.actions

export const {
  selectIds: selectOrdersIds,
  selectById: selectOrderById,
  selectAll: selectAllOrders,
  selectTotal: selectTotalOrders,
} = ordersAdapter.getSelectors((state: RootState) => state.orders)

export const selectFilteredOrdersIds = createSelector(
  selectOrdersIds,
  selectFilterOffset,
  selectFilterLimit,
  (ordersIds, offset, limit) => ordersIds.slice(offset, limit + offset),
)

export const selectSelectedOrders = createSelector(selectAllOrders, orders =>
  orders.filter(o => Boolean(o.selected)),
)
