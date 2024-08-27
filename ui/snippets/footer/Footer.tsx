import type { GridProps } from '@chakra-ui/react'
import { Box, Grid, Flex, Text, Link, VStack, Skeleton, useColorModeValue } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

import type { CustomLinksGroup } from 'types/footerLinks'

import config from 'configs/app'
import type { ResourceError } from 'lib/api/resources'
import useApiQuery from 'lib/api/useApiQuery'
import useFetch from 'lib/hooks/useFetch'
import useIssueUrl from 'lib/hooks/useIssueUrl'
import { copy } from 'lib/html-entities'
import IconSvg from 'ui/shared/IconSvg'
import NetworkAddToWallet from 'ui/shared/NetworkAddToWallet'
import FooterLinkItem from './FooterLinkItem'
import IntTxsIndexingStatus from './IntTxsIndexingStatus'
import getApiVersionUrl from './utils/getApiVersionUrl'
import LanguageSelect from 'components/layout/footer/language-select'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import RouteNames from 'service/constants/routes'
import AppLink from 'components/common/app-link'
import AppIcon from 'components/common/app-icon'

const MAX_LINKS_COLUMNS = 4

const FRONT_VERSION_URL = `https://github.com/blockscout/frontend/tree/${config.UI.footer.frontendVersion}`
const FRONT_COMMIT_URL = `https://github.com/blockscout/frontend/commit/${config.UI.footer.frontendCommit}`

const Footer = () => {
  const { t } = useTranslation()

  const SOCIAL_LINKS = [
    {
      link: 'https://twitter.com',
      icon: '/svg/icons/twitter.svg#id',
    },
    {
      link: 'https://github.com',
      icon: '/svg/icons/github.svg#id',
    },
    {
      link: 'https://element.com',
      icon: '/svg/icons/element.svg#id',
    },
    {
      link: 'https://medium.com',
      icon: '/svg/icons/medium.svg#id',
    },
    {
      link: 'mailto:someone@example.com',
      icon: '/svg/icons/mail.svg#id',
    },
  ]

  const FOOTER_LINKS = [
    { href: '/', label: t('Version History') },
    { href: '/', label: t('Privacy Policy') },
    { href: '/', label: t('Open Source Notices') },
    { href: '/', label: t('Service Status') },
    { href: '/', label: t('Feedback') },
    { href: '/', label: t('Career') },
  ]
  
  // const { data: backendVersionData } = useApiQuery('config_backend_version', {
  //   queryOptions: {
  //     staleTime: Infinity,
  //   },
  // })
  // const apiVersionUrl = getApiVersionUrl(backendVersionData?.backend_version)
  // const issueUrl = useIssueUrl(backendVersionData?.backend_version)
  // const logoColor = useColorModeValue('blue.600', 'white')

  // const BLOCKSCOUT_LINKS = [
  //   {
  //     icon: 'edit' as const,
  //     iconSize: '16px',
  //     text: 'Submit an issue',
  //     url: issueUrl,
  //   },
  //   {
  //     icon: 'social/canny' as const,
  //     iconSize: '20px',
  //     text: 'Feature request',
  //     url: 'https://blockscout.canny.io/feature-requests',
  //   },
  //   {
  //     icon: 'social/git' as const,
  //     iconSize: '18px',
  //     text: 'Contribute',
  //     url: 'https://github.com/blockscout/blockscout',
  //   },
  //   {
  //     icon: 'social/twitter' as const,
  //     iconSize: '18px',
  //     text: 'X (ex-Twitter)',
  //     url: 'https://www.twitter.com/blockscoutcom',
  //   },
  //   {
  //     icon: 'social/discord' as const,
  //     iconSize: '24px',
  //     text: 'Discord',
  //     url: 'https://discord.gg/blockscout',
  //   },
  //   {
  //     icon: 'brands/blockscout' as const,
  //     iconSize: '18px',
  //     text: 'All chains',
  //     url: 'https://www.blockscout.com/chains-and-projects',
  //   },
  //   {
  //     icon: 'donate' as const,
  //     iconSize: '20px',
  //     text: 'Donate',
  //     url: 'https://github.com/sponsors/blockscout',
  //   },
  // ]

  // const frontendLink = (() => {
  //   if (config.UI.footer.frontendVersion) {
  //     return (
  //       <Link href={FRONT_VERSION_URL} target="_blank">
  //         {config.UI.footer.frontendVersion}
  //       </Link>
  //     )
  //   }

  //   if (config.UI.footer.frontendCommit) {
  //     return (
  //       <Link href={FRONT_COMMIT_URL} target="_blank">
  //         {config.UI.footer.frontendCommit}
  //       </Link>
  //     )
  //   }

  //   return null
  // })()

  // const fetch = useFetch()

  // const { isPlaceholderData, data: linksData } = useQuery<
  //   unknown,
  //   ResourceError<unknown>,
  //   Array<CustomLinksGroup>
  // >({
  //   queryKey: ['footer-links'],
  //   queryFn: async () =>
  //     fetch(config.UI.footer.links || '', undefined, { resource: 'footer-links' }),
  //   enabled: Boolean(config.UI.footer.links),
  //   staleTime: Infinity,
  //   placeholderData: [],
  // })

  // const colNum = isPlaceholderData
  //   ? 1
  //   : Math.min(linksData?.length || Infinity, MAX_LINKS_COLUMNS) + 1

  // const renderNetworkInfo = React.useCallback((gridArea?: GridProps['gridArea']) => {
  //   return (
  //     <Flex
  //       gridArea={gridArea}
  //       flexWrap="wrap"
  //       columnGap={8}
  //       rowGap={6}
  //       mb={{ base: 5, lg: 10 }}
  //       _empty={{ display: 'none' }}
  //     >
  //       {!config.UI.indexingAlert.intTxs.isHidden && <IntTxsIndexingStatus />}
  //       <NetworkAddToWallet />
  //     </Flex>
  //   )
  // }, [])

  // const renderProjectInfo = React.useCallback(
  //   (gridArea?: GridProps['gridArea']) => {
  //     return (
  //       <Box gridArea={gridArea}>
  //         <Flex columnGap={2} fontSize="xs" lineHeight={5} alignItems="center" color="text">
  //           <span>Made with</span>
  //           <Link
  //             href="https://www.blockscout.com"
  //             isExternal
  //             display="inline-flex"
  //             color={logoColor}
  //             _hover={{ color: logoColor }}
  //           >
  //             <IconSvg name="networks/logo-placeholder" width="80px" height={4} />
  //           </Link>
  //         </Flex>
  //         <Text mt={3} fontSize="xs">
  //           Blockscout is a tool for inspecting and analyzing EVM based blockchains. Blockchain
  //           explorer for Ethereum Networks.
  //         </Text>
  //         <Box mt={6} alignItems="start" fontSize="xs" lineHeight={5}>
  //           {apiVersionUrl && (
  //             <Text>
  //               Backend:{' '}
  //               <Link href={apiVersionUrl} target="_blank">
  //                 {backendVersionData?.backend_version}
  //               </Link>
  //             </Text>
  //           )}
  //           {frontendLink && <Text>Frontend: {frontendLink}</Text>}
  //           <Text>
  //             Copyright {copy} Blockscout Limited 2023-{new Date().getFullYear()}
  //           </Text>
  //         </Box>
  //       </Box>
  //     )
  //   },
  //   [apiVersionUrl, backendVersionData?.backend_version, frontendLink, logoColor],
  // )

  // const containerProps: GridProps = {
  //   as: 'footer',
  //   px: { base: 4, lg: config.UI.navigation.layout === 'horizontal' ? 6 : 12 },
  //   py: { base: 4, lg: 8 },
  //   borderTop: '1px solid',
  //   borderColor: 'divider',
  //   gridTemplateColumns: { base: '1fr', lg: 'minmax(auto, 470px) 1fr' },
  //   columnGap: { lg: '32px', xl: '100px' },
  // }

  // if (config.UI.footer.links) {
  //   return (
  //     <Grid {...containerProps}>
  //       <div>
  //         {renderNetworkInfo()}
  //         {renderProjectInfo()}
  //       </div>

  //       <Grid
  //         gap={{ base: 6, lg: colNum === MAX_LINKS_COLUMNS + 1 ? 2 : 8, xl: 12 }}
  //         gridTemplateColumns={{
  //           base: 'repeat(auto-fill, 160px)',
  //           lg: `repeat(${colNum}, 135px)`,
  //           xl: `repeat(${colNum}, 160px)`,
  //         }}
  //         justifyContent={{ lg: 'flex-end' }}
  //         mt={{ base: 8, lg: 0 }}
  //       >
  //         {[{ title: 'Blockscout', links: BLOCKSCOUT_LINKS }, ...(linksData || [])]
  //           .slice(0, colNum)
  //           .map((linkGroup) => (
  //             <Box key={linkGroup.title}>
  //               <Skeleton
  //                 fontWeight={500}
  //                 mb={3}
  //                 display="inline-block"
  //                 isLoaded={!isPlaceholderData}
  //               >
  //                 {linkGroup.title}
  //               </Skeleton>
  //               <VStack spacing={1} alignItems="start">
  //                 {linkGroup.links.map((link) => (
  //                   <FooterLinkItem {...link} key={link.text} isLoading={isPlaceholderData} />
  //                 ))}
  //               </VStack>
  //             </Box>
  //           ))}
  //       </Grid>
  //     </Grid>
  //   )
  // }

  return (
    <>
      {/* <Grid
        {...containerProps}
        gridTemplateAreas={{
          lg: `
            "network links-top"
            "info links-bottom"
          `,
        }}
      >
        {renderNetworkInfo({ lg: 'network' })}
        {renderProjectInfo({ lg: 'info' })}
        <Grid
          gridArea={{ lg: 'links-bottom' }}
          gap={1}
          gridTemplateColumns={{
            base: 'repeat(auto-fill, 160px)',
            lg: 'repeat(3, 160px)',
            xl: 'repeat(4, 160px)',
          }}
          gridTemplateRows={{
            base: 'auto',
            lg: 'repeat(3, auto)',
            xl: 'repeat(2, auto)',
          }}
          gridAutoFlow={{ base: 'row', lg: 'column' }}
          alignContent="start"
          justifyContent={{ lg: 'flex-end' }}
          mt={{ base: 8, lg: 0 }}
        >
          {BLOCKSCOUT_LINKS.map((link) => (
            <FooterLinkItem {...link} key={link.text} />
          ))}
        </Grid>
      </Grid> */}

      <footer className="bg-black-footer w-full p-5 text-xs leading-snug">
        <div className="container">
          <div className="flex items-center justify-center gap-[20px] md:justify-start">
            <AppLink href={RouteNames.Home}>
              <Image src="/svg/icons/logo.svg" alt="STO Chain logo" width={163} height={100} />
            </AppLink>
            {SOCIAL_LINKS.map((link) => (
              <a
                href={link.link}
                aria-label="Social Icon"
                key={link.icon}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AppIcon
                  src={link.icon}
                  width="21"
                  height="22"
                  viewBox="0 0 21 22"
                  className="text-gray-icon h-5 w-5"
                />
              </a>
            ))}
          </div>

          <div className="text-gray-icon mb-2 mt-10 flex flex-col items-center justify-start md:flex-row md:justify-between">
            <h4 className="text-center md:text-left">
              {t('Copyright © 2024 STO Chain. All Rights Reserved.')}
            </h4>
            <ul className="mb-1.25 mt-2 flex list-none flex-wrap items-center justify-center gap-4 md:mt-0">
              {FOOTER_LINKS.map((link, index) => (
                <li key={index}>
                  <AppLink href={link.href} aria-label={link.label}>
                    {link.label}
                  </AppLink>
                </li>
              ))}
              <li>
                <LanguageSelect />
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}

export default React.memo(Footer)
