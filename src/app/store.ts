import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit'
import ordersReducer from './slices/ordersSlice'
import companiesReducer from './slices/companiesSlice'
import filterReducer from './slices/filterSlice'

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    companies: companiesReducer,
    filter: filterReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
