import {memo} from 'react'
import {useAppSelector} from '../../app/hooks'
import {selectCompanyById} from '../../app/slices/companiesSlice'
import {CompanyId} from '../../types/company'
import RoutingMachinee from './RoutingMachine'

interface RouteItemProps {
  fromCompanyId: CompanyId
  toCompanyId: CompanyId
  color: string
}

const RouteItem = ({fromCompanyId, toCompanyId, color}: RouteItemProps) => {
  const fromCompany = useAppSelector(state =>
    selectCompanyById(state, fromCompanyId),
  )
  const toCompany = useAppSelector(state =>
    selectCompanyById(state, toCompanyId),
  )

  if (!fromCompany || !toCompany) return null

  const {coords: fromCoords} = fromCompany
  const {coords: toCoords} = toCompany

  const Route = RoutingMachinee({fromCoords, toCoords, color})

  return <Route />
}

export default memo(RouteItem)
