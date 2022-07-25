import {useAppDispatch} from '../../app/hooks'
import {pageChanged} from '../../app/slices/filterSlice'
import {DOTS, usePagination} from '../../hooks/usePagination'
import DirectionButton from './Buttons/DirectionButton'
import DotsButton from './Buttons/DotsButton'
import PageButton from './Buttons/PageButton'
import PaginationInfo from './PaginationInfo'

const Pagination = () => {
  const dispatch = useAppDispatch()
  const pagination = usePagination()

  if (!pagination) return null

  const {paginationRange, currentPage, totalCount, fromPage, toPage, lastPage} =
    pagination

  const onPageChanged = (page: number) => {
    dispatch(pageChanged(page))
  }

  const onPrevious = () => {
    dispatch(pageChanged(currentPage - 1))
  }

  const onNext = () => {
    dispatch(pageChanged(currentPage + 1))
  }

  return (
    <div className="flex items-center justify-between px-4 bg-white border-t border-gray-200">
      <div className="py-4 sm:hidden">
        <DirectionButton
          direction="Previous"
          onDirectionChanged={onPrevious}
          disabled={currentPage === 1}
        />
        <DirectionButton
          direction="Next"
          onDirectionChanged={onNext}
          disabled={currentPage === lastPage}
        />
      </div>
      <div className="hidden py-2 sm:flex-1 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
        <PaginationInfo
          fromPage={fromPage}
          toPage={toPage}
          totalCount={totalCount}
        />
        <div className="py-2">
          <nav className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm">
            <DirectionButton
              direction="Previous"
              onDirectionChanged={onPrevious}
              disabled={currentPage === 1}
            />

            {paginationRange.map((pageNumber, idx) => {
              if (pageNumber === DOTS) {
                return <DotsButton key={idx} />
              }

              return (
                <PageButton
                  key={idx}
                  pageNumber={pageNumber as number}
                  currentPage={currentPage}
                  onPageChanged={onPageChanged}
                />
              )
            })}

            <DirectionButton
              direction="Next"
              onDirectionChanged={onNext}
              disabled={currentPage === lastPage}
            />
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination
