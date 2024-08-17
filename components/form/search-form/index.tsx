/* eslint-disable react/jsx-props-no-spreading */

'use client'

import { memo } from 'react'
import isEqual from 'react-fast-compare'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { LocaleKeys } from '@/types/locales'

import { DEFAULT_SEARCH_FORM_VALUE, formSchema } from './schema'

interface Props {
  dictionary: LocaleKeys
  placeholder: string
}

function SearchForm({ dictionary, placeholder }: Props) {
  const finalSchema = formSchema(dictionary)

  const form = useForm<yup.InferType<typeof finalSchema>>({
    resolver: yupResolver(finalSchema),
    defaultValues: DEFAULT_SEARCH_FORM_VALUE,
  })

  const onSubmit = (values: yup.InferType<typeof finalSchema>) => {
    console.log(values) // eslint-disable-line
    console.log('%c => value ', 'background: #0095FF; color: #fff') // eslint-disable-line
    console.log(new Date()) // eslint-disable-line
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-12 w-full items-center border-gray-outline"
      >
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem className="h-full flex-1 space-y-0 border-none">
              <FormControl>
                <Input
                  placeholder={placeholder}
                  {...field}
                  className="!h-full !rounded-none !rounded-bl-[1px] !rounded-tl-[1px] !border-solid !border-gray-outline !bg-transparent !text-gray-placeholder !placeholder-gray-placeholder focus:!border-blue-light focus:!outline-none focus:!ring-1 focus:!ring-blue-light"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="secondary"
          className="gradient-bg h-full rounded-none rounded-br-[1px] rounded-tr-[1px] px-8 py-4"
        >
          {dictionary.Search}
        </Button>
      </form>
    </Form>
  )
}

export default memo(SearchForm, isEqual)
