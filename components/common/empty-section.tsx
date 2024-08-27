import { memo } from 'react'
import isEqual from 'react-fast-compare'
import Image from 'next/image'

interface Props {
  text: string
}

function EmptySection({ text }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Image
        src="/svg/icons/empty-md.svg"
        width={98}
        height={60}
        className="h-[3.75rem] w-[6.125rem]"
        alt="empty"
      />

      <div className="text-sm font-normal leading-tight text-gray-400">{text}</div>
    </div>
  )
}

export default memo(EmptySection, isEqual)
