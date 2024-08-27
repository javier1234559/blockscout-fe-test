import { memo } from 'react'
import isEqual from 'react-fast-compare'
import Image from 'next/image'
import RouteNames from 'service/constants/routes'
import AppLink from 'components/common/app-link'
import { cn } from 'service/utils/cn'


interface Props {
  className?: string
}

function Logo({ className = '' }: Props) {
  return (
    <AppLink href={RouteNames.Home} className={cn('flex items-center gap-2', className)}>
      <Image
        src="/images/logo.png"
        alt="STO Chain"
        width={50}
        height={50}
        priority
        className="aspect-[50/50] h-auto max-h-[3.125rem] w-full max-w-[3.125rem] object-contain"
      />
      <h2 className="font-heading text-xl font-normal leading-tight text-white">STO Chain</h2>
    </AppLink>
  )
}

export default memo(Logo, isEqual)
