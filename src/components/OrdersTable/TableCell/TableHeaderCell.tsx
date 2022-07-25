import React from 'react'

interface TableHeaderCellProps {
  children?: React.ReactNode
}

const TableHeaderCell = ({children}: TableHeaderCellProps) => {
  return (
    <th className="sticky top-0 z-10 px-4 py-4 text-sm font-semibold text-left text-gray-900 bg-opacity-75 border-b border-gray-300 bg-gray-50 backdrop-blur backdrop-filter">
      {children}
    </th>
  )
}

export default TableHeaderCell
