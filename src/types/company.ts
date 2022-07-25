export type CompanyId = string

export interface ICompany {
  id: CompanyId
  name: string
  coords: string[]
  street: string
  city: string
  zip: string
}
