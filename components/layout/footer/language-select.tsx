'use client'

import { memo } from 'react'
import isEqual from 'react-fast-compare'
import { usePathname, useRouter } from 'next/navigation'

import AppIcon from '@/components/common/app-icon'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'

import { LocaleEnum } from '@/types/locales'

function FooterLanguageSelect() {
  const pathname = usePathname()
  const navigate = useRouter()

  const handleChangeLanguage = (locale: LocaleEnum) => {
    const urlArray = pathname.split('/')
    urlArray[1] = locale

    navigate.push(urlArray.join('/'))
  }

  return (
    <Select onValueChange={handleChangeLanguage}>
      <SelectTrigger isHideChevron className="!h-auto !border-none !bg-black-footer p-0">
        <AppIcon
          src="/svg/icons/earth.svg#id"
          width="21"
          height="22"
          viewBox="0 0 21 22"
          className="h-5 w-5 text-gray-icon"
        />
      </SelectTrigger>
      <SelectContent side="top" align="end" className="w-fit min-w-0 dark:bg-black-footer">
        <SelectItem className="!pl-2" value={LocaleEnum.EN}>
          EN
        </SelectItem>
        <SelectItem className="!pl-2" value={LocaleEnum.VI}>
          VI
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

export default memo(FooterLanguageSelect, isEqual)
