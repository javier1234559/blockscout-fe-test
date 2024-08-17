import React from 'react'

import type { NextPageWithLayout } from 'nextjs/types'

import PageNextJs from 'nextjs/PageNextJs'
import { GetServerSideProps } from 'next'
import Home from 'ui/pages/Home'
import LayoutHome from 'ui/shared/layout/LayoutHome'
import { useRouter } from 'next/router'
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

const languageLabels: Record<LocaleEnum, string> = {
  [LocaleEnum.EN]: 'English',
  [LocaleEnum.VI]: 'Tiếng Việt',
}

const LanguageSwitcher: React.FC = () => {
  const router = useRouter()
  const { locale, pathname, asPath, query } = router

  const changeLanguage = (newLocale: LocaleEnum) => {
    router.push({ pathname, query }, asPath, { locale: newLocale })
  }

  return (
    <div className="mt-4">
      {Object.values(LocaleEnum).map((lang) => (
        <button
          key={lang}
          onClick={() => changeLanguage(lang)}
          className={`mr-2 px-4 py-2 rounded ${
            locale === lang ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          {languageLabels[lang]}
        </button>
      ))}
    </div>
  )
}

const Page: NextPageWithLayout<PageProps> = ({ dictionary }) => {
  const router = useRouter()
  const { locale } = router

  return (
    <PageNextJs pathname="/">
      {/* <Home/> */}
      <section>
        <section className="bg-gradient-to-r from-[#a72168] to-[#36087d] pb-[3.5rem] pt-4">
          <div className="container">
            <h1 className="text-center text-5xl font-semibold text-white lg:text-[4rem]">
              {dictionary['Explore STO Blockchain']}
            </h1>
            <p>Current locale: {locale}</p>
            <p>Current locale: {dictionary.hello}</p>
            <div className="flex justify-center">
            <LanguageSwitcher />
          </div>
            <div className="relative mx-auto mt-[2.25rem] flex max-w-[680px]">
              <input
                className="min-h-[43px] flex-1 rounded border border-solid border-[#D8D8D8] bg-transparent px-4 text-sm text-white placeholder:text-[#A0A6B4] focus:outline-none"
                placeholder="Search by Address/ Token symbol/ Name / Transaction hash / Block number"
              />
              <button>Search</button>
            </div>
          </div>
        </section>
        <div className="container flex flex-col gap-5 py-4">
          {/* <div className="grid xl:grid-cols-3 xl:gap-5">
          <Overview dictionary={dictionary} className="xl:col-span-2" />
          <TransactionHistory dictionary={dictionary} />
        </div>

        <div className="flex flex-col gap-5 xl:flex-row">
          <div className="flex-1">
            <LatestBlocks dictionary={dictionary} />
          </div>
          <div className="flex-1">
            <LatestTransactions dictionary={dictionary} />
          </div>
        </div> */}
        </div>
      </section>
    </PageNextJs>
  )
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <LayoutHome>{page}</LayoutHome>
}

export default Page

// export { base as getServerSideProps } from 'nextjs/getServerSideProps'
