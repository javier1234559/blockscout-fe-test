import * as yup from 'yup'

import { LocaleKeys } from '@/types/locales'

export interface ISearchForm {
  query: string
}

export const DEFAULT_SEARCH_FORM_VALUE: ISearchForm = {
  query: '',
}

export const formSchema: (dictionary: LocaleKeys) => yup.Lazy<ISearchForm> = () =>
  yup.lazy(() =>
    yup.object({
      query: yup
        .string()
        .required('This field is required')
        .min(1, 'Minimum 1 characters')
        .max(50, 'Maximum 50 characters'),
    }),
  )
