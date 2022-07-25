import {useMemo} from 'react'
import {useAppSelector} from '../app/hooks'
import {selectFilterLimit, selectFilterOffset} from '../app/slices/filterSlice'
import {selectTotalOrders} from '../app/slices/ordersSlice'

export const DOTS = '...'

const range = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({length}, (_, idx) => idx + start)
}

export const usePagination = () => {
  const totalCount = useAppSelector(selectTotalOrders)
  const offset = useAppSelector(selectFilterOffset)
  const limit = useAppSelector(selectFilterLimit)
  const fromPage = offset
  const toPage = offset + limit
  const currentPage = offset / limit + 1
  const siblingCount = 1

  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / limit)

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }

    /*
    	Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
    */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount,
    )

    /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    /*
    	Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, totalPageCount]
    }

    /*
    	Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount,
      )
      return [firstPageIndex, DOTS, ...rightRange]
    }

    /*
    	Case 4: Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }

    return []
  }, [currentPage, limit, siblingCount, totalCount])

  // If there are less than 2 times in pagination range

  const lastPage = paginationRange[paginationRange.length - 1]
  const canShow = [totalCount > limit, paginationRange.length > 2].every(
    Boolean,
  )

  const pagination = {
    paginationRange,
    currentPage,
    fromPage,
    toPage,
    lastPage,
    totalCount,
  }

  return canShow && pagination
}
