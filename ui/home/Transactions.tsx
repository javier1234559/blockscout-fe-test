import { Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";

import config from "configs/app";
import useHasAccount from "lib/hooks/useHasAccount";
import LatestDeposits from "ui/home/LatestDeposits";
import LatestTxs from "ui/home/LatestTxs";
import LatestWatchlistTxs from "ui/home/LatestWatchlistTxs";
import TabsWithScroll from "ui/shared/Tabs/TabsWithScroll";
import AppLink from "components/common/app-link";
import AppIcon from "components/common/app-icon";
import { useTranslation } from "next-i18next";
const rollupFeature = config.features.rollup;

const TAB_LIST_PROPS = {
  mb: { base: 3, lg: 3 },
};

const TransactionsHome = () => {
  const { t } = useTranslation();
  const hasAccount = useHasAccount();
  if (
    (rollupFeature.isEnabled && rollupFeature.type === "optimistic") ||
    hasAccount
  ) {
    const tabs = [
      { id: "txn", title: "Latest txn", component: <LatestTxs /> },
      rollupFeature.isEnabled &&
        rollupFeature.type === "optimistic" && {
          id: "deposits",
          title: "Deposits (L1→L2 txn)",
          component: <LatestDeposits />,
        },
      hasAccount && {
        id: "watchlist",
        title: "Watch list",
        component: <LatestWatchlistTxs />,
      },
    ].filter(Boolean);
    return (
      <>
        <Heading as="h4" size="sm" mb={3}>
          Transactions
        </Heading>
        <TabsWithScroll
          tabs={tabs}
          lazyBehavior="keepMounted"
          tabListProps={TAB_LIST_PROPS}
        />
      </>
    );
  }

  return (
    <>
      <Flex gap={2}>
        <AppIcon
          src="/svg/icons/transfer.svg#id"
          width={20}
          height={20}
          className="h-5 w-5 text-white"
        />
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
          <AppLink href="/txs">{t("Latest Transactions")}</AppLink>
        </Button>
      </Flex>
      <LatestTxs />
    </>
  );
};

export default TransactionsHome;
