import React, {memo, useState} from 'react'
import {Combobox} from '@headlessui/react'
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid'
import {useAppSelector} from '../../app/hooks'
import {
  selectAllCompanies,
  selectCompanyById,
} from '../../app/slices/companiesSlice'
import {CompanyId, ICompany} from '../../types/company'
import {classNames} from '../../utils/misc'

interface CompanySelectorProps {
  label: string
  companyId: CompanyId
  setCompanyId: React.Dispatch<React.SetStateAction<CompanyId>>
}

const CompanySelector = ({
  label,
  companyId,
  setCompanyId,
}: CompanySelectorProps) => {
  const companies = useAppSelector(selectAllCompanies)
  const company = useAppSelector(state => selectCompanyById(state, companyId))

  const [query, setQuery] = useState('')

  const handleChange = (company: ICompany) => {
    setCompanyId(company.id)
  }

  const filteredCompanies =
    query === ''
      ? companies
      : companies.filter(company => {
          return company.name.toLowerCase().includes(query.toLowerCase())
        })

  if (!company) return null

  return (
    <Combobox as="div" value={company} onChange={handleChange}>
      <Combobox.Label className="block text-sm font-medium text-gray-700">
        {label}
      </Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full py-2 pl-3 pr-10 font-medium text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={event => setQuery(event.target.value)}
          displayValue={(company: ICompany) => company.name}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-2 rounded-r-md focus:outline-none">
          <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredCompanies.length > 0 && (
          <Combobox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredCompanies.map(company => {
              const {id, name, street, city, zip} = company
              const address = `${street}, ${city}, ${zip}`
              return (
                <Combobox.Option
                  key={id}
                  value={company}
                  className={({active, selected}) =>
                    classNames(
                      'relative cursor-pointer select-none py-2 pl-3 pr-9',
                      active ? 'bg-gray-100' : '',
                      selected ? 'bg-gray-200' : '',
                    )
                  }
                >
                  {({selected}) => (
                    <>
                      <div className="truncate">
                        <span className="block font-medium text-gray-900">
                          {name}
                        </span>
                        <span className="block text-gray-500">{address}</span>
                      </div>

                      {selected && (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-700">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              )
            })}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  )
}

export default memo(CompanySelector)
