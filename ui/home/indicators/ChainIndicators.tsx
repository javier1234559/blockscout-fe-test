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
// import useFetchChartData from "ui/home/indicators/useFetchChartData";
import React, { useEffect } from "react";
import ContentLoader from "ui/shared/ContentLoader";
import DataFetchAlert from "ui/shared/DataFetchAlert";
import useFetchChartDataCustom from "ui/home/indicators/useFetchChartDataCustom";

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

function TransactionHistory() {
  const { t } = useTranslation();
  const [selectedIndicator, selectIndicator] = React.useState(
    indicators[0]?.id
  );
  const indicator = indicators.find(({ id }) => id === selectedIndicator);
  console.log("indicator ", indicator);
  const { data, isPending, isError } = useFetchChartDataCustom(indicator);
  console.log(JSON.stringify(data, null, 2));

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://eth.blockscout.com/api/v2/stats/charts/transactions"
  //       );
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       console.log("response ", response);
  //       console.log("data ", data);
  //     } catch (error) {
  //       console.error("Fetch error: ", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const content = (() => {
    if (isPending) {
      return <ContentLoader mt="auto" fontSize="xs" />;
    }

    if (isError) {
      return <DataFetchAlert fontSize="xs" p={3} />;
    }

    if (!data || data[0].items.length === 0) {
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
