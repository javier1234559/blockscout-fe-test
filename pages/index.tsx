import React from 'react'

import type { NextPageWithLayout } from 'nextjs/types'

import PageNextJs from 'nextjs/PageNextJs'
import { GetServerSideProps } from 'next'
import Home from 'ui/pages/Home'
import LayoutHome from 'ui/shared/layout/LayoutHome'
import { getDictionary } from 'service/dictionaries/get-dictionary'
import { LocaleEnum, LocaleKeys } from 'service/types/locales'
import { base } from 'nextjs/getServerSideProps'

interface PageProps {
  dictionary: LocaleKeys
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const baseProps = await base(context)

  if ('redirect' in baseProps || 'notFound' in baseProps) {
    return baseProps
  }

  const locale = (context.locale || 'en') as LocaleEnum
  const dictionary = await getDictionary(locale)

  return {
    props: {
      ...baseProps.props, 
      dictionary,
    },
  }
}

const Page: NextPageWithLayout<PageProps> = ({ dictionary }) => {
  return (
    <PageNextJs pathname="/">
      <Home dictionary={dictionary}/>
    </PageNextJs>
  )
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <LayoutHome>{ page }</LayoutHome>;
};

export default Page

// export { base as getServerSideProps } from 'nextjs/getServerSideProps'
