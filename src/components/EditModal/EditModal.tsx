import {useState} from 'react'
import {Dialog} from '@headlessui/react'
import {orderUpdated} from '../../app/slices/ordersSlice'
import {useAppDispatch} from '../../app/hooks'
import {IOrder} from '../../types/order'
import {formatDate} from '../../utils/misc'
import CompanySelector from '../CompanySelector/CompanySelector'

interface EditModalProps {
  isOpen: boolean
  order: IOrder
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const EditModal = ({isOpen, order, setIsOpen}: EditModalProps) => {
  const [fromCompanyId, setFromCompanyId] = useState(order.fromCompanyId)
  const [toCompanyId, setToCompanyId] = useState(order.toCompanyId)

  const dispatch = useAppDispatch()

  const onClose = () => {
    setIsOpen(false)
  }

  const onApply = () => {
    dispatch(
      orderUpdated({
        ...order,
        fromCompanyId,
        toCompanyId,
      }),
    )
    onClose()
  }

  return (
    <Dialog className="relative z-[1010]" open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="w-full mx-auto sm:max-w-md">
          <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
            <Dialog.Title as="div">
              <h2 className="text-lg font-medium leading-6 text-gray-900">
                {order.title}
              </h2>
              <p className="text-gray-500">{formatDate(order.creationDate)}</p>
            </Dialog.Title>
            <div className="w-full my-4 border-t border-gray-300"></div>
            <form className="space-y-6">
              <CompanySelector
                label="Погрузка"
                companyId={fromCompanyId}
                setCompanyId={setFromCompanyId}
              />

              <CompanySelector
                label="Разгрузка"
                companyId={toCompanyId}
                setCompanyId={setToCompanyId}
              />

              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={onApply}
                >
                  Применить
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={onClose}
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default EditModal
