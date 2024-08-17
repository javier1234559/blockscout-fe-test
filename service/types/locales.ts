import JsonDictionary from 'service/dictionaries/en.json'

export enum LocaleEnum {
  EN = 'en',
  VI = 'vi',
}

export type LocaleKeys = Record<keyof typeof JsonDictionary, string>
