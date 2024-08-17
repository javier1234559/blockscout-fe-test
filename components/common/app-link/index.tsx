/* eslint-disable react/jsx-props-no-spreading */

'use client'

import React from 'react'
import isEqual from 'react-fast-compare'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { LocaleEnum } from '@/types/locales'
import { cn } from '@/utils/cn'

interface Props {
  href: string
  className?: string
  forceLanguage?: LocaleEnum
  onClick?: () => void
}

function AppLink(props: React.PropsWithChildren<Props>) {
  const { href, children, className = '', forceLanguage, onClick, ...others } = props

  const uuid = React.useId()
  const pathname = usePathname()

  const locale = pathname.split('/')[1]

  const finalLink = `/${forceLanguage || locale}${href}`

  return (
    <Link
      {...others}
      href={finalLink}
      key={uuid}
      onClick={onClick}
      className={cn('duration-300', className)}
    >
      {children}
    </Link>
  )
}

export default React.memo(AppLink, isEqual)
