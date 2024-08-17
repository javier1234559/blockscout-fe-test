import * as yup from 'yup'

import { LocaleKeys } from '@/types/locales'
import { generateMinLengthText, generateRequireText } from '@/utils/generate-schema-text'

export interface ISignInForm {
  username: string
  password: string
  confirmPassword: string
  name?: string
}

export const DEFAULT_SIGN_IN_FORM: ISignInForm = {
  username: '',
  password: '',
  confirmPassword: '',
  name: '',
}

export const formSchema: (dictionary: LocaleKeys) => yup.Lazy<ISignInForm> = (dictionary) =>
  yup.lazy(() =>
    yup.object({
      username: yup.string().required(generateRequireText(dictionary, dictionary.Username)),
      password: yup
        .string()
        .required('Password is required')
        .min(8, generateMinLengthText(dictionary, dictionary.Password, 8)),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
  )
