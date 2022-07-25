import {useAppSelector} from '../../../app/hooks'
import {selectCompanyById} from '../../../app/slices/companiesSlice'
import {CompanyId} from '../../../types/company'

interface TableCompanyAddressCellProps {
  companyId: CompanyId
  className?: string
}

const TableCompanyAddressCell = ({
  companyId,
  className,
}: TableCompanyAddressCellProps) => {
  const company = useAppSelector(state => selectCompanyById(state, companyId))

  if (!company) return null

  const {name, street, city, zip} = company
  const address = `${street}, ${city}, ${zip}`

  return (
    <td className={`px-4 py-4 text-sm border-b border-gray-200 ${className}`}>
      <div className="font-medium text-gray-900">{name}</div>
      <div className="text-gray-500">{address}</div>
    </td>
  )
}

export default TableCompanyAddressCell
