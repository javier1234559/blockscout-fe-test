import { useEffect, useState } from 'react'
import isEqual from 'react-fast-compare'
import AppIcon from 'components/common/app-icon'
import { LocaleEnum } from 'service/types/locales'
import { Select, SelectContent, SelectItem, SelectTrigger } from 'components/ui/select'
import { useRouter } from 'next/router'

function FooterLanguageSelect() {
  const router = useRouter()
  const [currentLocale, setCurrentLocale] = useState<LocaleEnum>(LocaleEnum.EN)

  useEffect(() => {
    if (router.locale) {
      setCurrentLocale(router.locale as LocaleEnum)
    }
  }, [router.locale])

  const handleChangeLanguage = (newLocale: LocaleEnum) => {
    router.push(
      {
        pathname: router.pathname,
        query: router.query,
      },
      undefined,
      { locale: newLocale, scroll: false },
    )
  }

  return (
    <Select value={currentLocale} onValueChange={handleChangeLanguage}>
      <SelectTrigger isHideChevron className="!bg-black-footer !h-auto !border-none p-0">
        <AppIcon
          src="/svg/icons/earth.svg#id"
          width="21"
          height="22"
          viewBox="0 0 21 22"
          className="text-gray-icon h-5 w-5"
        />
      </SelectTrigger>
      <SelectContent side="top" align="end" className="dark:bg-black-footer w-fit min-w-0">
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

export default FooterLanguageSelect;