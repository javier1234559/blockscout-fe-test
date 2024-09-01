import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";

import config from "configs/app";
import useIsMobile from "lib/hooks/useIsMobile";
import dynamic from "next/dynamic";

const ChainIndicators = dynamic(
  () => import("ui/home/indicators/ChainIndicators"),
  {
    ssr: false,
  }
);
import LatestBlocks from "ui/home/LatestBlocks";
import LatestZkEvmL2Batches from "ui/home/LatestZkEvmL2Batches";
import Stats from "ui/home/Stats";
import Transactions from "ui/home/Transactions";
import AdBanner from "ui/shared/ad/AdBanner";
import ProfileMenuDesktop from "ui/snippets/profileMenu/ProfileMenuDesktop";
import SearchBar from "ui/snippets/searchBar/SearchBar";
import WalletMenuDesktop from "ui/snippets/walletMenu/WalletMenuDesktop";
import { useTranslation } from "next-i18next";
const rollupFeature = config.features.rollup;
import Container from "ui/shared/layout/components/Container";

const Home = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <>
      <Flex
        w="100%"
        background={config.UI.homepage.plate.background}
        columnGap={8}
        alignItems="center"
        data-label="hero plate"
      >
        <Container flexGrow={1}>
          <Heading
            as="h1"
            fontSize={{ base: "2rem", lg: "4rem" }}
            lineHeight={{ base: "24px", lg: "5.320625rem" }}
            fontWeight={600}
            textAlign="center"
            color={config.UI.homepage.plate.textColor}
            mb={8}
          >
            {t("Explore STO Blockchain")}
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
          <Box
            mx="auto"
            mb="3.5rem"
            maxW={"680px"}
            border="1px solid #fff"
            borderRadius="sm"
            overflow="hidden"
          >
            <SearchBar isHomepage />
          </Box>
        </Container>
      </Flex>
      <Container flexGrow={1}>
        <Flex
          flexDir={{ base: "column", lg: "row" }}
          columnGap={2}
          rowGap={1}
          mt={3}
          px={{ base: 4, lg: 0 }}
          _empty={{ mt: 0 }}
        >
          <Stats />
          <ChainIndicators />
        </Flex>
        {isMobile && (
          <AdBanner mt={6} mx="auto" display="flex" justifyContent="center" />
        )}
        <Flex
          mt={8}
          direction={{ base: "column", lg: "row" }}
          columnGap={4}
          // rowGap={4}
          px={{ base: 4, lg: 0 }}
        >
          {rollupFeature.isEnabled && rollupFeature.type === "zkEvm" ? (
            <LatestZkEvmL2Batches />
          ) : (
            <LatestBlocks />
          )}
          <Box flexGrow={1}>
            <Transactions />
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default Home;
