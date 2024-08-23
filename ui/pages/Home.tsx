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
          <Heading
            as="h1"
            fontSize={{ base: '2rem', lg: '3rem' }}
            lineHeight={{ base: '24px', lg: '36px' }}
            fontWeight={600}
            textAlign="center"
            color={config.UI.homepage.plate.textColor}
            mb={8}
          >
            {dictionary['Explore STO Blockchain']}
          </Heading>
          {/* <Flex mb={{ base: 2, lg: 3 }} justifyContent="center" alignItems="center">
            {config.UI.navigation.layout === 'vertical' && (
              <Box display={{ base: 'none', lg: 'flex' }}>
                {config.features.account.isEnabled && <ProfileMenuDesktop isHomePage />}
                {config.features.blockchainInteraction.isEnabled && (
                  <WalletMenuDesktop isHomePage />
                )}
              </Box>
            )}
          </Flex> */}
          <Box mx="auto" maxW={'680px'}>
            <SearchBar isHomepage dictionary={dictionary} />
          </Box>
        </Box>
      </Flex>
      <Flex
        flexDir={{ base: 'column', lg: 'row' }}
        columnGap={2}
        rowGap={1}
        mt={3}
        _empty={{ mt: 0 }}
      >
        <Stats dictionary={dictionary} />
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
