interface PaginationInfoProps {
  fromPage: number
  toPage: number
  totalCount: number
}

const PaginationInfo = ({
  fromPage,
  toPage,
  totalCount,
}: PaginationInfoProps) => {
  return (
    <div className="py-2 pr-4">
      <p className="text-sm text-gray-700">
        Заявки <span className="font-medium">{fromPage}</span> {' - '}
        <span className="font-medium">{toPage}</span> из{' '}
        <span className="font-medium">{totalCount}</span>
      </p>
    </div>
  )
}

export default PaginationInfo
