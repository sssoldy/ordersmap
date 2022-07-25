import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/solid'

interface DirectionButtonProps {
  direction: 'Previous' | 'Next'
  onDirectionChanged: VoidFunction
  disabled: Boolean
}

const DirectionButton = ({
  direction,
  onDirectionChanged,
  disabled,
}: DirectionButtonProps) => {
  const isPrevious = direction === 'Previous'
  const classes = isPrevious ? 'rounded-l-md' : 'rounded-r-md'
  return (
    <button
      className={`relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none ${classes}`}
      aria-label={`${isPrevious ? 'Предыдущая' : 'Cледующая'} страница`}
      onClick={onDirectionChanged}
      disabled={Boolean(disabled)}
    >
      {isPrevious ? (
        <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
      ) : (
        <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
      )}
    </button>
  )
}

export default DirectionButton
