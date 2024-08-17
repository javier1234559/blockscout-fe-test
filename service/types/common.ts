import { LocaleEnum, LocaleKeys } from './locales'

export interface DefaultViewProps {
  dictionary: LocaleKeys
}

export interface DefaultPageProps {
  params: { lang: LocaleEnum }
}
