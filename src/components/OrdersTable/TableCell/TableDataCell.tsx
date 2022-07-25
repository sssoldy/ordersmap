import React from 'react'

interface TableDataCellProps {
  className?: string
  children?: React.ReactNode
}

const TableDataCell = ({className, children}: TableDataCellProps) => {
  return (
    <td className={`px-4 py-4 text-sm border-b border-gray-200 ${className}`}>
      {children}
    </td>
  )
}

export default TableDataCell
