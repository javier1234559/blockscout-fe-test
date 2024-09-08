import { Box, Flex, Grid, Heading } from "@chakra-ui/react";
import BigNumber from "bignumber.js";
import React from "react";

import config from "configs/app";
import useApiQuery from "lib/api/useApiQuery";
import { WEI } from "lib/consts";
import { HOMEPAGE_STATS } from "stubs/stats";
import GasInfoTooltip from "ui/shared/gas/GasInfoTooltip";
import GasPrice from "ui/shared/gas/GasPrice";
import IconSvg from "ui/shared/IconSvg";
import StatsWidget from "ui/shared/stats/StatsWidget";
import { formatCurrencyWithSuffix } from "service/utils/formater";
import AppIcon from "components/common/app-icon";
import { useTranslation } from "next-i18next";
const hasAvgBlockTime = config.UI.homepage.showAvgBlockTime;
const rollupFeature = config.features.rollup;

const Stats = () => {
  const { t } = useTranslation();

  const [hasGasTracker, setHasGasTracker] = React.useState(
    config.features.gasTracker.isEnabled
  );
  const { data, isPlaceholderData, isError, dataUpdatedAt } = useApiQuery(
    "stats",
    {
      queryOptions: {
        refetchOnMount: false,
        placeholderData: HOMEPAGE_STATS,
      },
    }
  );

  React.useEffect(() => {
    if (!isPlaceholderData && !data?.gas_prices?.average) {
      setHasGasTracker(false);
    }
    // should run only after initial fetch
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaceholderData]);

  const zkEvmLatestBatchQuery = useApiQuery("homepage_zkevm_latest_batch", {
    queryOptions: {
      placeholderData: 12345,
      enabled: rollupFeature.isEnabled && rollupFeature.type === "zkEvm",
    },
  });

  const zkSyncLatestBatchQuery = useApiQuery("homepage_zksync_latest_batch", {
    queryOptions: {
      placeholderData: 12345,
      enabled: rollupFeature.isEnabled && rollupFeature.type === "zkSync",
    },
  });

  // if (
  //   isError ||
  //   zkEvmLatestBatchQuery.isError ||
  //   zkSyncLatestBatchQuery.isError
  // ) {
  //   return null;
  // }

  const isLoading =
    isPlaceholderData ||
    (rollupFeature.isEnabled &&
      rollupFeature.type === "zkEvm" &&
      zkEvmLatestBatchQuery.isPlaceholderData) ||
    (rollupFeature.isEnabled &&
      rollupFeature.type === "zkSync" &&
      zkSyncLatestBatchQuery.isPlaceholderData);

  let content;

  const lastItemStyle = { gridColumn: "span 2" };

  let itemsCount = 5;
  !hasGasTracker && itemsCount--;
  !hasAvgBlockTime && itemsCount--;

  if (data) {
    !data.gas_prices && itemsCount--;
    data.rootstock_locked_btc && itemsCount++;
    rollupFeature.isEnabled && data.last_output_root_size && itemsCount++;
    const isOdd = Boolean(itemsCount % 2);
    const gasInfoTooltip =
      hasGasTracker && data.gas_prices && data.gas_prices.average ? (
        <GasInfoTooltip data={data} dataUpdatedAt={dataUpdatedAt}>
          <IconSvg
            isLoading={isLoading}
            name="info"
            boxSize={5}
            flexShrink={0}
            cursor="pointer"
            color="icon_info"
            _hover={{ color: "link_hovered" }}
          />
        </GasInfoTooltip>
      ) : null;

    content = (
      <>
        {/* {rollupFeature.isEnabled && rollupFeature.type === "zkEvm" && (
          <StatsWidget
            icon="txn_batches_slim"
            label="Latest batch"
            value={(zkEvmLatestBatchQuery.data || 0).toLocaleString()}
            href={{ pathname: "/batches" }}
            isLoading={isLoading}
          />
        )}
        {rollupFeature.isEnabled && rollupFeature.type === "zkSync" && (
          <StatsWidget
            icon="txn_batches_slim"
            label="Latest batch"
            value={(zkSyncLatestBatchQuery.data || 0).toLocaleString()}
            href={{ pathname: "/batches" }}
            isLoading={isLoading}
          />
        )} */}

        <StatsWidget
          iconSrc="/svg/icons/container.svg#id"
          label={t("STOC Price")}
          value={`${formatCurrencyWithSuffix(data.coin_price)}`}
          href={{ pathname: "/txs" }}
          isLoading={isLoading}
        />

        {!(
          rollupFeature.isEnabled &&
          (rollupFeature.type === "zkEvm" || rollupFeature.type === "zkSync")
        ) && (
          <StatsWidget
            iconSrc="/svg/icons/coin-and-clock.svg#id"
            label={t("STOC Total Blocks")}
            value={Number(data.total_blocks).toLocaleString()}
            href={{ pathname: "/blocks" }}
            isLoading={isLoading}
          />
        )}
        {hasGasTracker && data.gas_prices && (
          <StatsWidget
            icon="gas"
            label={t("Gas Tracker")}
            value={
              data.gas_prices.average ? (
                <GasPrice data={data.gas_prices.average} />
              ) : (
                "N/A"
              )
            }
            hint={gasInfoTooltip}
            isLoading={isLoading}
            _last={isOdd ? lastItemStyle : undefined}
          />
        )}
        <StatsWidget
          label={t("Stoc Market Cap")}
          iconSrc="/svg/icons/coin-stack.svg#id"
          value={data.market_cap}
          href={{ pathname: "/" }}
          isLoading={isLoading}
        />
        <StatsWidget
          iconSrc="/svg/icons/left-and-right.svg#id"
          label={t("Total Transactions")}
          value={Number(data.total_transactions).toLocaleString()}
          href={{ pathname: "/txs" }}
          isLoading={isLoading}
        />
        {rollupFeature.isEnabled && data.last_output_root_size && (
          <StatsWidget
            icon="txn_batches_slim"
            label="Latest L1 state batch"
            value={data.last_output_root_size}
            href={{ pathname: "/batches" }}
            isLoading={isLoading}
          />
        )}
        {/* <StatsWidget
          icon="wallet"
          label="Wallet addresses"
          value={Number(data.total_addresses).toLocaleString()}
          isLoading={isLoading}
          _last={isOdd ? lastItemStyle : undefined}
        /> */}

        {data.rootstock_locked_btc && (
          <StatsWidget
            icon="coins/bitcoin"
            label="BTC Locked in 2WP"
            value={`${BigNumber(data.rootstock_locked_btc).div(WEI).dp(0).toFormat()} RBTC`}
            isLoading={isLoading}
            _last={isOdd ? lastItemStyle : undefined}
          />
        )}
        {hasAvgBlockTime && (
          <StatsWidget
            icon="clock"
            label={t("Average Block Time")}
            value={`${(data.average_block_time / 1000).toFixed(1)}s`}
            isLoading={isLoading}
          />
        )}
      </>
    );
  }
  return (
    <Box>
      <Flex align="center" gap={1} py={4}>
        <AppIcon
          src="/svg/icons/contracts.svg#id"
          width={20}
          height={20}
          viewBox="0 0 20 20"
          className="h-5 w-5 flex-shrink-0 opacity-60"
        />
        <Heading as="h2" size="xs" fontSize="1rem">
          {t("Overview")}
        </Heading>
      </Flex>
      <Grid
        gridTemplateColumns={{ base: "1fr 1fr", lg: "1fr 1fr 1fr" }}
        gap={{ base: 1, lg: 2 }}
        borderRadius="sm"
        border="stroke-line"
        borderColor="stroke.line"
        py="1.5rem"
      >
        {content}
      </Grid>
    </Box>
  );
};

export default Stats;
