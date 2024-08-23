import { Box, Flex, Heading } from '@chakra-ui/react'
import React from 'react'

import config from 'configs/app'
import useIsMobile from 'lib/hooks/useIsMobile'
import ChainIndicators from 'ui/home/indicators/ChainIndicators'
import LatestBlocks from 'ui/home/LatestBlocks'
import LatestZkEvmL2Batches from 'ui/home/LatestZkEvmL2Batches'
import Stats from 'ui/home/Stats'
import Transactions from 'ui/home/Transactions'
import AdBanner from 'ui/shared/ad/AdBanner'
import ProfileMenuDesktop from 'ui/snippets/profileMenu/ProfileMenuDesktop'
import SearchBar from 'ui/snippets/searchBar/SearchBar'
import WalletMenuDesktop from 'ui/snippets/walletMenu/WalletMenuDesktop'
import { DefaultViewProps } from 'service/types/common'
import { useRouter } from 'next/router'
import { LocaleEnum } from 'service/types/locales'
import { Button } from 'components/ui/button'

const rollupFeature = config.features.rollup

const LanguageSwitcher: React.FC = () => {
  const router = useRouter()
  const { locale, pathname, asPath, query } = router

  const languageLabels: Record<LocaleEnum, string> = {
    [LocaleEnum.EN]: 'English',
    [LocaleEnum.VI]: 'Tiếng Việt',
  }

  const changeLanguage = (newLocale: LocaleEnum) => {
    router.push({ pathname, query }, asPath, { locale: newLocale })
  }

  return (
    <div className="mt-4">
      {Object.values(LocaleEnum).map((lang) => (
        <button
          key={lang}
          onClick={() => changeLanguage(lang)}
          className={`mr-2 rounded px-4 py-2 ${
            locale === lang ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          {languageLabels[lang]}
        </button>
      ))}
    </div>
  )
}


const Home = ({ dictionary }: DefaultViewProps) => {
  const isMobile = useIsMobile()

  return (
    <Box as="main">
      <section>
        <div className="bg-gradient-to-r from-[#a72168] to-[#36087d] pb-[3.5rem] pt-4">
          <div className="container">
            <p>Current locale: {dictionary.hello}</p>
            <div className="flex justify-center">
              <LanguageSwitcher />
            </div>
            <Heading as="h1">{dictionary['Explore STO Blockchain']}</Heading>
            <div className="relative mx-auto mt-[2.25rem] flex max-w-[680px]">
              <input
                className="min-h-[43px] flex-1 rounded border border-solid border-[#D8D8D8] bg-transparent px-4 text-sm text-white placeholder:text-[#A0A6B4] focus:outline-none"
                placeholder="Search by Address/ Token symbol/ Name / Transaction hash / Block number"
              />
              <Button
                  variant="primary"
                  className="absolute right-[1px] top-[1px] h-[41px] rounded"
                >
                  {dictionary.Search}
                </Button>
            </div>
          </div>
        </div>
      </section>
      <Flex
        w="100%"
        background={config.UI.homepage.plate.background}
        borderRadius="md"
        p={{ base: 4, lg: 8 }}
        columnGap={8}
        alignItems="center"
        data-label="hero plate"
      >
        <Box flexGrow={1}>
          <Flex
            mb={{ base: 2, lg: 3 }}
            justifyContent="space-between"
            alignItems="center"
            columnGap={2}
          >
            <Heading
              as="h1"
              fontSize={{ base: '18px', lg: '30px' }}
              lineHeight={{ base: '24px', lg: '36px' }}
              fontWeight={{ base: 500, lg: 700 }}
              color={config.UI.homepage.plate.textColor}
            >
              {config.meta.seo.enhancedDataEnabled
                ? `${config.chain.name} blockchain explorer`
                : `${config.chain.name} explorer`}
            </Heading>
            {config.UI.navigation.layout === 'vertical' && (
              <Box display={{ base: 'none', lg: 'flex' }}>
                {config.features.account.isEnabled && <ProfileMenuDesktop isHomePage />}
                {config.features.blockchainInteraction.isEnabled && (
                  <WalletMenuDesktop isHomePage />
                )}
              </Box>
            )}
          </Flex>
          <SearchBar isHomepage />
        </Box>
        {!isMobile && (
          <AdBanner
            platform="mobile"
            w="fit-content"
            flexShrink={0}
            borderRadius="md"
            overflow="hidden"
          />
        )}
      </Flex>
      <Flex
        flexDir={{ base: 'column', lg: 'row' }}
        columnGap={2}
        rowGap={1}
        mt={3}
        _empty={{ mt: 0 }}
      >
        <Stats />
        <ChainIndicators />
      </Flex>
      {isMobile && <AdBanner mt={6} mx="auto" display="flex" justifyContent="center" />}
      <Flex mt={8} direction={{ base: 'column', lg: 'row' }} columnGap={12} rowGap={6}>
        {rollupFeature.isEnabled && rollupFeature.type === 'zkEvm' ? (
          <LatestZkEvmL2Batches />
        ) : (
          <LatestBlocks />
        )}
        <Box flexGrow={1}>
          <Transactions />
        </Box>
      </Flex>
    </Box>
  )
}

export default Home
