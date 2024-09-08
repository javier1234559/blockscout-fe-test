import {
  Box,
  Heading,
  Flex,
  Text,
  VStack,
  Skeleton,
  Button,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import React from "react";

import type { SocketMessage } from "lib/socket/types";
import type { Block } from "types/api/block";

import { route } from "nextjs-routes";

import config from "configs/app";
import useApiQuery, { getResourceKey } from "lib/api/useApiQuery";
import useIsMobile from "lib/hooks/useIsMobile";
import { nbsp } from "lib/html-entities";
import useSocketChannel from "lib/socket/useSocketChannel";
import useSocketMessage from "lib/socket/useSocketMessage";
import { BLOCK } from "stubs/block";
import { HOMEPAGE_STATS } from "stubs/stats";
import LinkInternal from "ui/shared/links/LinkInternal";
import { BoxIcon } from "lucide-react";
import LatestBlocksItem from "./LatestBlocksItem";
import AppLink from "components/common/app-link";
import { useTranslation } from "next-i18next";

const LatestBlocks = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  // const blocksMaxCount = isMobile ? 2 : 3;
  let blocksMaxCount: number;
  if (
    config.features.rollup.isEnabled ||
    config.UI.views.block.hiddenFields?.total_reward
  ) {
    blocksMaxCount = isMobile ? 4 : 5;
  } else {
    blocksMaxCount = isMobile ? 4 : 5;
  }
  const { data, isPlaceholderData, isError } = useApiQuery("homepage_blocks", {
    queryOptions: {
      placeholderData: Array(blocksMaxCount).fill(BLOCK),
    },
  });

  const queryClient = useQueryClient();
  const statsQueryResult = useApiQuery("stats", {
    queryOptions: {
      refetchOnMount: false,
      placeholderData: HOMEPAGE_STATS,
    },
  });

  const handleNewBlockMessage: SocketMessage.NewBlock["handler"] =
    React.useCallback(
      (payload) => {
        queryClient.setQueryData(
          getResourceKey("homepage_blocks"),
          (prevData: Array<Block> | undefined) => {
            const newData = prevData ? [...prevData] : [];

            if (
              newData.some((block) => block.height === payload.block.height)
            ) {
              return newData;
            }

            return [payload.block, ...newData]
              .sort((b1, b2) => b2.height - b1.height)
              .slice(0, blocksMaxCount);
          }
        );
      },
      [queryClient, blocksMaxCount]
    );

  const channel = useSocketChannel({
    topic: "blocks:new_block",
    isDisabled: isPlaceholderData || isError,
  });
  useSocketMessage({
    channel,
    event: "new_block",
    handler: handleNewBlockMessage,
  });

  let content;

  if (isError) {
    content = <Text>No data. Please reload page.</Text>;
  }

  if (data) {
    const dataToShow = data.slice(0, blocksMaxCount);
    // console.log(JSON.stringify(dataToShow, null, 2));
    content = (
      <>
        <VStack spacing={2} mb={3} overflow="hidden" alignItems="stretch">
          <AnimatePresence initial={false}>
            {dataToShow.map((block, index) => (
              <LatestBlocksItem
                key={block.height + (isPlaceholderData ? String(index) : "")}
                block={block}
                isLoading={isPlaceholderData}
              />
            ))}
          </AnimatePresence>
        </VStack>
        {/* <Flex justifyContent="center">
          <LinkInternal fontSize="sm" href={route({ pathname: "/blocks" })}>
            View all blocks
          </LinkInternal>
        </Flex> */}
      </>
    );
  }

  return (
    <Box width={{ base: "100%" }} flexGrow={1}>
      <Flex gap={2}>
        <BoxIcon className="h-5 w-5" />
        <Heading as="h4" size="sm" fontSize="1rem">
          Latest blocks
        </Heading>
        <Button
          h="8"
          rounded="sm"
          border="1px"
          borderColor="pink.500"
          bg="transparent"
          ml="auto"
          py="1.5"
          px={2}
          fontSize="sm"
          fontWeight="semibold"
          textTransform="capitalize"
          lineHeight="tight"
          color="#FF2CA8"
          _hover={{ opacity: 0.9 }}
          _active={{ bg: "transparent" }}
        >
          <AppLink href="/blocks">{t("View all")}</AppLink>
        </Button>
      </Flex>
      {statsQueryResult.data?.network_utilization_percentage !== undefined && (
        <Skeleton
          isLoaded={!statsQueryResult.isPlaceholderData}
          mt={1}
          display="inline-block"
        >
          <Text as="span" fontSize="sm">
            Network utilization:{nbsp}
          </Text>
          <Text
            as="span"
            fontSize="sm"
            color="primary.DEFAULT"
            fontWeight={700}
          >
            {statsQueryResult.data?.network_utilization_percentage.toFixed(2)}%
          </Text>
        </Skeleton>
      )}
      <Box mt={3}>{content}</Box>
    </Box>
  );
};

export default LatestBlocks;
