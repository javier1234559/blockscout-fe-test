'use client'

import { memo, useMemo } from 'react'
import isEqual from 'react-fast-compare'
import ReactPaginate from 'react-paginate'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from 'qs'

interface Props {
  pageCount: number
}

function AppPagination({ pageCount }: Props) {
  const navigate = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentPage = useMemo(() => {
    const page = searchParams.get('page') || 1

    return page
  }, [searchParams])

  const Styles = {
    Active:
      '[&_a]:border [&_a]:rounded [&_a]:border-solid [&_a]:border-pink [&_a]:!bg-transparent [&_a]:!text-pink',
    PageLink:
      '[&_a]:min-h-8 [&_a]:min-w-8 cursor-pointer border-1 rounded border-stroke-line flex items-center justify-center min-w-8 min-h-8 text-sm hover:!bg-transparent hover:!text-pink hover:!border hover:!border-pink hover:!border-solid text-gray-icon border border-solid border-gray-outline',
    Break:
      'text-gray-400 border rounded border-stroke-line min-w-8 min-h-8 flex items-center justify-center',
    Container: 'flex items-center justify-end gap-1 py-3',
    Previous: `[&_a]:flex [&_a]:min-h-8 [&_a]:min-w-8 cursor-pointer [&_a]:items-center [&_a]:justify-center rounded-md border border-stroke-line ${+currentPage > 1 ? 'text-primary' : ''}`,
    Next: `[&_a]:flex [&_a]:min-h-8 [&_a]:min-w-8 cursor-pointer [&_a]:items-center [&_a]:justify-center rounded-md border border-stroke-line ${+currentPage === pageCount ? '' : 'text-primary'}`,
  }

  const handlePageChange = (selectedItem: { selected: number }) => {
    if (selectedItem.selected + 1 === currentPage) return

    const [route, queries] = pathname.split('?')

    const newQueries = {
      ...qs.parse(queries),
      page: selectedItem.selected + 1,
    }

    const finalLink = `${route}?${qs.stringify(newQueries)}`

    navigate.push(finalLink)
  }

  if (currentPage) {
    return (
      <ReactPaginate
        initialPage={+currentPage - 1}
        containerClassName={Styles.Container}
        pageLinkClassName={Styles.PageLink}
        activeClassName={Styles.Active}
        onPageChange={handlePageChange}
        pageCount={pageCount}
        breakLabel="..."
        breakClassName={Styles.Break}
        previousClassName={Styles.Previous}
        previousLabel={<ChevronLeft aria-label="previous" className="h-4 w-4" />}
        nextClassName={Styles.Next}
        nextLabel={<ChevronRight aria-label="next" className="h-4 w-4" />}
        disabledClassName="opacity-50"
      />
    )
  }

  return null
}

export default memo(AppPagination, isEqual)
