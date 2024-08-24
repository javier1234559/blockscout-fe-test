'use client'

import { memo, useEffect, useState } from 'react'
import isEqual from 'react-fast-compare'
import { usePathname } from 'next/navigation'

import MobileHeader from './mobile'
import PCHeader from './pc'
import { useMediaQuery } from '@chakra-ui/react'
import { MEDIA_MAX_WIDTH_KEYS } from 'service/utils/media-queries'
import { LocaleEnum } from 'service/types/locales'
import { cn } from 'service/utils/cn'
import { DefaultViewProps } from 'service/types/common'

function Header({ dictionary }: DefaultViewProps) {
  const pathname = usePathname()

  // Hooks
  const isBelowXl = useMediaQuery(MEDIA_MAX_WIDTH_KEYS.XL)

  // States
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const isInHomePage = [`/${LocaleEnum.EN}`, `/${LocaleEnum.VI}`].includes(pathname)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="h-[4.125rem] bg-gradient-to-r from-[#a72168] to-[#36087d]" />

  return (
    <header
      className={cn('sticky top-0 z-sticky origin-top duration-500', {
        // don't show bg gradient in other pages
        'bg-gradient-to-r from-[#a72168] to-[#36087d] py-2': !isScrolled && isInHomePage,
        'bg-primary py-1': !isInHomePage || isScrolled,
      })}
    >
      <div className="container">
        {!isBelowXl ? (
          <MobileHeader dictionary={dictionary} />
        ) : (
          <PCHeader dictionary={dictionary} />
        )}
      </div>
    </header>
  )
}

export default memo(Header, isEqual)
