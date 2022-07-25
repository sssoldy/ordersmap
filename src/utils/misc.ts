import {faker} from '@faker-js/faker'
import {ICompany} from '../types/company'
import {IOrder} from '../types/order'

faker.setLocale('ru')

export const companies: ICompany[] = Array.from({length: 100}, () => ({
  id: faker.unique(faker.random.alphaNumeric, [12]),
  name: faker.company.companyName(),
  coords: faker.address.nearbyGPSCoordinate([55.7593143, 37.6164458], 10, true),
  street: faker.address.streetAddress(),
  city: 'Москва',
  zip: faker.address.zipCode(),
}))

export const orders: IOrder[] = Array.from({length: 100}, () => ({
  id: faker.unique(faker.random.alphaNumeric, [10]),
  title: faker.finance.bic(),
  creationDate: faker.date.recent(Math.random() * 5).toISOString(),
  selected: false,
  color: faker.color.rgb(),
  fromCompanyId: companies[Math.floor(Math.random() * companies.length)].id,
  toCompanyId: companies[Math.floor(Math.random() * companies.length)].id,
}))

export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

export const classNames = (...classes: (string | boolean)[]) =>
  classes.filter(Boolean).join(' ')
