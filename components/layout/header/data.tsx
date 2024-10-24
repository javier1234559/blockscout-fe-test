import { TFunction } from "i18next";

export const getMenuItems = (t: TFunction<"translation", undefined>) => [
  { title: t("Home"), link: "/" },
  {
    title: "Blockchain",
    link: undefined,
    subItems: [
      { title: "Blocks", link: "/blocks" },
      { title: "Uncles", link: "/blocks?tab=uncles" },
      { title: "Reorgs", link: "/blocks?tab=reorgs" },
      { title: "Transactions", link: "/txs" },
      { title: "Transactions Pending", link: "/txs?tab=pending" },
      { title: "Verified Contract", link: "/verified-contracts" },
    ],
  },
  {
    title: "Token",
    link: undefined,
    subItems: [
      { title: "All", link: "/token" },
      { title: "Pools", link: "/pools-address" },
    ],
  },
  {
    title: "APIs",
    link: undefined,
    subItems: [
      { title: "API 1", link: "#!" },
      { title: "API 2", link: "#!" },
      { title: "API 3", link: "#!" },
    ],
  },
];
