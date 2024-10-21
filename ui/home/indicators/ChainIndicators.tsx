import config from "configs/app";
import dayjs from "lib/date/dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import AppIcon from "components/common/app-icon";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "components/ui/chart";
import { useTranslation } from "next-i18next";
import { Box, chakra, Flex, Heading } from "@chakra-ui/react";
import INDICATORS from "ui/home/indicators/utils/indicators";
import useFetchChartData from "ui/home/indicators/useFetchChartData";
import React from "react";
import ContentLoader from "ui/shared/ContentLoader";
import DataFetchAlert from "ui/shared/DataFetchAlert";
import { ChartsResources, TChainIndicator } from "ui/home/indicators/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { TimeChartData } from "ui/shared/chart/types";

const indicators = INDICATORS.filter(({ id }) =>
  config.UI.homepage.charts.includes(id)
).sort((a, b) => {
  if (
    config.UI.homepage.charts.indexOf(a.id) >
    config.UI.homepage.charts.indexOf(b.id)
  ) {
    return 1;
  }

  if (
    config.UI.homepage.charts.indexOf(a.id) <
    config.UI.homepage.charts.indexOf(b.id)
  ) {
    return -1;
  }

  return 0;
});

const formatLargeNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

const chartConfig = {
  value: {
    // icon: () => (
    //   <AppIcon
    //     src="/svg/icons/contracts-bold.svg#id"
    //     className="h-5 w-5 flex-shrink-0 text-white"
    //   />
    // ),
    label: "STO",
    color: "#FF2CA8",
  },
} satisfies ChartConfig;

dayjs.extend(LocalizedFormat);

// // Custom fetch function to handle CORS
// const fetchWithCORS = async (url: string) => {
//   const response = await fetch(url, {
//     method: "GET",
//     credentials: "include", // This includes cookies in the request, which might be necessary for CORS
//     headers: {
//       "Content-Type": "application/json",
//       // Add any other headers required for your API
//     },
//   });

//   console.log(response);

//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }

//   return response.json();
// };

// function useFetchChartCustom<R extends ChartsResources>(
//   indicator: TChainIndicator<R> | undefined
// ): UseQueryResult<TimeChartData> {
//   return useQuery<TimeChartData, Error>({
//     queryKey: ["chartData", indicator?.api.resourceName, indicator],
//     queryFn: async () => {
//       if (!indicator) {
//         throw new Error("Indicator is undefined");
//       }
//       const data = await fetchWithCORS(
//         "https://eth.blockscout.com/api/v2/stats/charts/transactions"
//       );

//       return indicator.api.dataFn(data);
//     },
//     enabled: Boolean(indicator),
//   });
// }

function TransactionHistory() {
  const { t } = useTranslation();
  const [selectedIndicator, selectIndicator] = React.useState(
    indicators[0]?.id
  );
  const indicator = indicators.find(({ id }) => id === selectedIndicator);

  const { data, isPending, isError } = useFetchChartData(indicator);

  // console.log(JSON.stringify(data, null, 2));

  const content = (() => {
    if (isPending) {
      return <ContentLoader mt="auto" fontSize="xs" />;
    }

    if (isError) {
      return <DataFetchAlert fontSize="xs" p={3} />;
    }

    if (data[0].items.length === 0) {
      return <chakra.span fontSize="xs">no data</chakra.span>;
    }

    const chartData = data[0].items;

    // Calculate the maximum value in the data
    const maxValue = Math.max(...chartData.map((item) => item.value));
    const minValue = Math.min(...chartData.map((item) => item.value));

    // Function to calculate the Y-axis domain
    const calculateYAxisDomain = () => {
      const yMax = maxValue * 1.1; // Add 10% padding to the top
      const xMin = minValue * 0.9; // Add 10% padding to the bottom
      return [xMin, yMax];
    };

    return (
      <AreaChart
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        accessibilityLayer
        data={chartData}
      >
        <CartesianGrid horizontal vertical={false} stroke="white" />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={20}
          tickFormatter={(value) =>
            new Date(value).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
          }
        />
        <YAxis
          dataKey="value"
          type="number"
          domain={calculateYAxisDomain()}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => formatLargeNumber(value)}
        />

        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel indicator="dot" />}
        />
        <Area
          type="natural"
          dataKey="value"
          stroke={chartConfig.value.color}
          fill="rgba(255, 44, 168, 0.5)"
          fillOpacity={0.4}
        />
      </AreaChart>
    );
  })();

  return (
    <Box flex={1}>
      <Flex align="center" gap={1} py={4}>
        <AppIcon
          src="/svg/icons/contracts-bold.svg#id"
          className="h-5 w-5 flex-shrink-0 text-white"
        />
        <Heading as="h6" size="xs">
          {t("Transaction History")}
        </Heading>
      </Flex>

      <Box
        bg="background-bg-2"
        rounded="sm"
        border="stroke-line"
        borderColor="stroke.line"
      >
        <Box background={config.UI.homepage.plate.background} p={2}>
          {t("Transaction History in 30 Days")}
        </Box>

        <ChartContainer
          config={chartConfig}
          style={{ width: "100%", height: "176px" }}
        >
          {content}
        </ChartContainer>
      </Box>
    </Box>
  );
}

export default TransactionHistory;
