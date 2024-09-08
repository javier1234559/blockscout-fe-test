import { Box, Flex, Grid, Skeleton, useTab } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

import type { Block } from "types/api/block";

import config from "configs/app";
import getBlockTotalReward from "lib/block/getBlockTotalReward";
import getNetworkValidatorTitle from "lib/networks/getNetworkValidatorTitle";
import AddressEntity from "ui/shared/entities/address/AddressEntity";
import BlockEntity from "ui/shared/entities/block/BlockEntity";
import TimeAgoWithTooltip from "ui/shared/TimeAgoWithTooltip";
import { useTranslation } from "react-i18next";

type Props = {
  block: Block;
  isLoading?: boolean;
};

const LatestBlocksItem = ({ block, isLoading }: Props) => {
  const { t } = useTranslation();
  const totalReward = getBlockTotalReward(block);
  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ display: "none" }}
      transitionDuration="normal"
      transitionTimingFunction="linear"
      borderRadius="sm"
      border="1px solid"
      borderColor="divider"
      p={3}
    >
      <Flex gap={4} justifyContent="start" fontSize="sm" alignItems="center">
        <Box>
          <BlockEntity
            isLoading={isLoading}
            number={block.height}
            tailLength={2}
            fontSize="xl"
            lineHeight={7}
            fontWeight={500}
            mr="auto"
          />
          <TimeAgoWithTooltip
            timestamp={block.timestamp}
            enableIncrement={!isLoading}
            isLoading={isLoading}
            color="text_secondary"
            fontWeight={400}
            display="inline-block"
            fontSize="sm"
            flexShrink={0}
            ml={8}
          />
        </Box>

        <Box justifySelf="start">
          {!config.features.rollup.isEnabled &&
            !config.UI.views.block.hiddenFields?.miner && (
              <Flex gap={2} alignItems="center" mb={1}>
                <Skeleton isLoaded={!isLoading} textTransform="capitalize">
                  {getNetworkValidatorTitle()}
                </Skeleton>
                <AddressEntity
                  address={block.miner}
                  isLoading={isLoading}
                  noIcon
                  noCopy
                  truncation="constant"
                />
              </Flex>
            )}

          <Flex gap={2} alignItems="center" mb={1}>
            <Skeleton isLoaded={!isLoading}>{t("Transaction")}</Skeleton>
            <Skeleton isLoaded={!isLoading} color="text_secondary">
              <span>{block.tx_count}</span>
            </Skeleton>
          </Flex>
        </Box>

        {!config.features.rollup.isEnabled &&
          !config.UI.views.block.hiddenFields?.total_reward && (
            <>
              <Skeleton
                ml="auto"
                w="fit-content"
                p={1}
                borderRadius="sm"
                bg="#1B202D"
                isLoaded={!isLoading}
                color="text_secondary"
              >
                <span>{totalReward.dp(5).toFixed()} STOC</span>
              </Skeleton>
            </>
          )}
      </Flex>
    </Box>
  );
};

export default LatestBlocksItem;
