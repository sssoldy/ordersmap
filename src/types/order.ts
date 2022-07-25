import {CompanyId} from './company'

export interface IOrder {
  id: string
  title: string
  creationDate: string
  selected: boolean
  color: string
  fromCompanyId: CompanyId
  toCompanyId: CompanyId
}
