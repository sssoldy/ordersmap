import React from 'react'

interface PageButtonProps {
  pageNumber: number
  currentPage: number
  onPageChanged: (page: number) => void
}

const PageButton = ({
  pageNumber,
  currentPage,
  onPageChanged,
}: PageButtonProps) => {
  return (
    <button
      className={`relative inline-flex items-center px-4  py-2 text-sm font-medium border ${
        pageNumber === currentPage
          ? 'z-10 bg-indigo-50 border-gray-400 text-gray-700'
          : 'text-gray-500 bg-white  border-gray-300 hover:bg-gray-100'
      }`}
      aria-label={`Страница ${pageNumber}`}
      onClick={() => onPageChanged(pageNumber)}
    >
      {pageNumber}
    </button>
  )
}

export default PageButton
