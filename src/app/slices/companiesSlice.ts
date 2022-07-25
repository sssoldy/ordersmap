import {createEntityAdapter, createSlice} from '@reduxjs/toolkit'
import {ICompany} from '../../types/company'
import {companies} from '../../utils/misc'
import {RootState} from '../store'

const companiesAdapter = createEntityAdapter<ICompany>({
  selectId: state => state.id,
})

const state = companiesAdapter.getInitialState()

const initialState = companiesAdapter.addMany(state, companies)

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
})

export default companiesSlice.reducer

export const {selectById: selectCompanyById, selectAll: selectAllCompanies} =
  companiesAdapter.getSelectors((state: RootState) => state.companies)
