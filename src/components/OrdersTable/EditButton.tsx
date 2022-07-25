import {PencilIcon} from '@heroicons/react/solid'
import {useState} from 'react'
import {IOrder} from '../../types/order'
import EditModal from '../EditModal/EditModal'

interface EditButtonProps {
  order: IOrder
}

const EditButton = ({order}: EditButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setIsOpen(true)
  }

  return (
    <button
      type="button"
      className="items-center p-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm nline-flex hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      aria-label="Редактировать"
      onClick={handleClick}
    >
      <PencilIcon className="w-4 h-4" aria-hidden="true" />
      {isOpen && (
        <EditModal isOpen={isOpen} setIsOpen={setIsOpen} order={order} />
      )}
    </button>
  )
}

export default EditButton
