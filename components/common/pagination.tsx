'use client'

import { memo, useState } from 'react'
import isEqual from 'react-fast-compare'
import ReactPaginate from 'react-paginate'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  pageCount: number
  value?: number
  onChange?: (page: number) => void
}

function Pagination(props: Props) {
  const { value, pageCount, onChange } = props
  const [currentPage, setCurrentPage] = useState(value || 0)

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected)
    onChange?.(selectedItem.selected)
  }

  return (
    <ReactPaginate
      initialPage={currentPage}
      containerClassName="flex items-center justify-end gap-2 py-3"
      pageClassName="cursor-pointer rounded text-gray-400 flex items-center justify-center min-w-8 min-h-8 text-sm leading-relaxed"
      activeClassName="border-2 !border-primary bg-transparent opacity-100 !text-primary"
      onPageChange={handlePageChange}
      pageCount={pageCount}
      breakLabel="..."
      breakClassName="text-gray-400"
      previousLabel={
        <div className="mr-2 flex cursor-pointer items-center gap-1 !bg-transparent text-base font-normal leading-relaxed hover:!bg-pink-opacity hover:text-primary">
          <ChevronLeft className="h-5 w-5" aria-label="previous" />
        </div>
      }
      nextLabel={
        <div className="ml-2 flex cursor-pointer items-center gap-1 text-base font-normal leading-relaxed text-primary">
          <ChevronRight className="h-5 w-5" aria-label="next" />
        </div>
      }
      disabledClassName="opacity-50"
    />
  )
}

export default memo(Pagination, isEqual)
