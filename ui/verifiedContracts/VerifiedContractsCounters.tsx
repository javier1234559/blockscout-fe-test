import { Box, Flex, Grid, VStack, Heading, Text } from "@chakra-ui/react";
import React from "react";

import config from "configs/app";
import useApiQuery from "lib/api/useApiQuery";
import { VERIFIED_CONTRACTS_COUNTERS } from "stubs/contract";
import StatsWidget from "ui/shared/stats/StatsWidget";
import AppIcon from "components/common/app-icon";
import { useTranslation } from "next-i18next";
import AppLink from "components/common/app-link";

interface StatsWidgetContractProps {
  iconSrc: string;
  title: string;
  value: number | string;
  diff?: string;
  diffFormatted?: string;
  isLoading?: boolean;
  href?: string;
}

const StatsWidgetContract: React.FC<StatsWidgetContractProps> = ({
  iconSrc,
  title,
  value,
  diff,
  diffFormatted,
  isLoading,
  href,
}) => {
  const { t } = useTranslation();
  const content = (
    <Box>
      <Flex alignItems="center" gap={2} py={4}>
        <AppIcon
          src={iconSrc}
          width={20}
          height={20}
          viewBox="0 0 20 20"
          className="h-5 w-5 text-white"
        />
        <Text as="h6">{title}</Text>
      </Flex>

      <Grid
        templateColumns="repeat(2, 1fr)"
        bg="#141822"
        rounded="sm"
        border="1px"
        borderColor="gray.600"
        px={6}
        py={9}
      >
        <Flex gap={3} alignItems="center">
          <AppIcon
            src="/svg/icons/container.svg#id"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            className="h-6 w-6 opacity-60"
          />
          <VStack spacing={0} alignItems="start">
            <Text fontSize="xl" fontWeight="bold">
              {isLoading ? "..." : value}
            </Text>
            <Text fontSize="sm" opacity={0.6}>
              {t("Total")}
            </Text>
          </VStack>
        </Flex>

        <Flex gap={3} alignItems="center">
          <AppIcon
            src="/svg/icons/coin-and-clock.svg#id"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            className="h-6 w-6 opacity-60"
          />
          <VStack spacing={0}>
            <Text fontSize="xl" fontWeight="bold" color="primary.DEFAULT">
              {isLoading
                ? "..."
                : `+${diffFormatted}` ||
                  (diff !== undefined ? `+${diff}` : "0")}
            </Text>
            <Text fontSize="sm" opacity={0.6}>
              {t("Last 24h")}
            </Text>
          </VStack>
        </Flex>
      </Grid>
    </Box>
  );

  if (href) {
    return <AppLink href={href}>{content}</AppLink>;
  }

  return content;
};

const VerifiedContractsCounters = () => {
  const { t } = useTranslation();

  const countersQuery = useApiQuery("verified_contracts_counters", {
    queryOptions: {
      placeholderData: VERIFIED_CONTRACTS_COUNTERS,
    },
  });

  if (!countersQuery.data) {
    return null;
  }

  return (
    <Grid
      templateColumns={{ md: "repeat(2, 1fr)" }}
      gap={5}
      mx={{
        base: 4,
        lg: 0,
      }}
    >
      <StatsWidgetContract
        iconSrc="/svg/icons/contracts.svg#id"
        title={t("Contracts")}
        value={Number(countersQuery.data.smart_contracts).toLocaleString()}
        diff={countersQuery.data.new_smart_contracts_24h}
        diffFormatted={Number(
          countersQuery.data.new_smart_contracts_24h
        ).toLocaleString()}
        isLoading={false}
        href="/stats?chartId=contractsGrowth"
      />
      <StatsWidgetContract
        iconSrc="/svg/icons/contracts.svg#id"
        title={t("Verified Contracts")}
        value={Number(
          countersQuery.data.verified_smart_contracts
        ).toLocaleString()}
        diff={countersQuery.data.new_verified_smart_contracts_24h}
        diffFormatted={Number(
          countersQuery.data.new_verified_smart_contracts_24h
        ).toLocaleString()}
        isLoading={false}
        href="/stats?chartId=verifiedContractsGrowth"
      />
    </Grid>
    // <Box
    //   p="4"
    //   bgColor="#141822"
    //   columnGap={3}
    //   rowGap={3}
    //   mb={6}
    //   display="grid"
    //   gridTemplateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
    // >
    //   <StatsWidget
    //     label="Total contracts"
    //     value={Number(countersQuery.data.smart_contracts).toLocaleString()}
    // diff={countersQuery.data.new_smart_contracts_24h}
    // diffFormatted={Number(
    //   countersQuery.data.new_smart_contracts_24h
    // ).toLocaleString()}
    //     isLoading={countersQuery.isPlaceholderData}
    //     href={
    //       config.features.stats.isEnabled
    //         ? { pathname: "/stats", query: { chartId: "contractsGrowth" } }
    //         : undefined
    //     }
    //   />
    //   <StatsWidget
    //     label="Verified contracts"
    //     value={Number(
    //       countersQuery.data.verified_smart_contracts
    //     ).toLocaleString()}
    // diff={countersQuery.data.new_verified_smart_contracts_24h}
    // diffFormatted={Number(
    //   countersQuery.data.new_verified_smart_contracts_24h
    // ).toLocaleString()}
    //     isLoading={countersQuery.isPlaceholderData}
    //     href={
    //       config.features.stats.isEnabled
    //         ? {
    //             pathname: "/stats",
    //             query: { chartId: "verifiedContractsGrowth" },
    //           }
    //         : undefined
    //     }
    //   />
    // </Box>
  );
};

export default VerifiedContractsCounters;
