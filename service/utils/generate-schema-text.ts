import { LocaleKeys } from '@/types/locales'

export function generateRequireText(dictionary: LocaleKeys, label: string) {
  return dictionary['%label% is required'].replace('%label%', label)
}

export function generateMinLengthText(dictionary: LocaleKeys, label: string, minLength: number) {
  return dictionary['%label% must be at least %length% characters long']
    .replace('%label%', label)
    .replace('%length%', minLength.toString())
}
