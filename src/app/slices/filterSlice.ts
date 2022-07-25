import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {FilterState} from '../../types/filter'
import {RootState} from '../store'

const initialState: FilterState = {
  offset: 0,
  limit: 10,
  page: 1,
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    pageChanged: (state, action: PayloadAction<number>) => {
      const limit = state.limit
      const page = action.payload
      const offset = (page - 1) * limit

      state.offset = offset
      state.page = page
    },
  },
})

export const {pageChanged} = filterSlice.actions

export const selectFilterLimit = (state: RootState) => state.filter.limit

export const selectFilterOffset = (state: RootState) => state.filter.offset

export default filterSlice.reducer
