// import { Flex, Skeleton, Text, useColorModeValue } from "@chakra-ui/react";
// import React from "react";

// import config from "configs/app";
// import useApiQuery from "lib/api/useApiQuery";
// import { HOMEPAGE_STATS } from "stubs/stats";
// import Hint from "ui/shared/Hint";
// import IconSvg from "ui/shared/IconSvg";

// import ChainIndicatorChartContainer from "./ChainIndicatorChartContainer";
// import ChainIndicatorItem from "./ChainIndicatorItem";
// import useFetchChartData from "./useFetchChartData";
// import INDICATORS from "./utils/indicators";

// const indicators = INDICATORS.filter(({ id }) =>
//   config.UI.homepage.charts.includes(id)
// ).sort((a, b) => {
//   if (
//     config.UI.homepage.charts.indexOf(a.id) >
//     config.UI.homepage.charts.indexOf(b.id)
//   ) {
//     return 1;
//   }

//   if (
//     config.UI.homepage.charts.indexOf(a.id) <
//     config.UI.homepage.charts.indexOf(b.id)
//   ) {
//     return -1;
//   }

//   return 0;
// });

// const ChainIndicators = () => {
//   const [selectedIndicator, selectIndicator] = React.useState(
//     indicators[0]?.id
//   );
//   const indicator = indicators.find(({ id }) => id === selectedIndicator);

//   const queryResult = useFetchChartData(indicator);
//   const statsQueryResult = useApiQuery("stats", {
//     queryOptions: {
//       refetchOnMount: false,
//       placeholderData: HOMEPAGE_STATS,
//     },
//   });

//   const bgColor = useColorModeValue("gray.50", "whiteAlpha.100");

//   if (indicators.length === 0) {
//     return null;
//   }

//   const valueTitle = (() => {
//     if (statsQueryResult.isPlaceholderData) {
//       return <Skeleton h="36px" w="215px" />;
//     }

//     if (!statsQueryResult.data) {
//       return <Text fontSize="xs">There is no data</Text>;
//     }

//     return (
//       <Text fontWeight={700} fontSize="30px" lineHeight="36px">
//         {indicator?.value(statsQueryResult.data)}
//       </Text>
//     );
//   })();

//   const valueDiff = (() => {
//     if (!statsQueryResult.data || !indicator?.valueDiff) {
//       return null;
//     }

//     const diff = indicator.valueDiff(statsQueryResult.data);
//     if (diff === undefined || diff === null) {
//       return null;
//     }

//     const diffColor = diff >= 0 ? "green.500" : "red.500";

//     return (
//       <Skeleton
//         isLoaded={!statsQueryResult.isPlaceholderData}
//         display="flex"
//         alignItems="center"
//         ml={2}
//       >
//         <IconSvg
//           color={diffColor}
//           name="arrows/up-head"
//           boxSize={5}
//           mr={1}
//           transform={diff < 0 ? "rotate(180deg)" : "rotate(0)"}
//         />
//         <Text color={diffColor} fontWeight={600}>
//           {diff}%
//         </Text>
//       </Skeleton>
//     );
//   })();

//   return (
//     <Flex
//       px={{ base: 3, lg: 4 }}
//       py={3}
//       borderRadius="base"
//       bgColor={bgColor}
//       columnGap={{ base: 3, lg: 4 }}
//       rowGap={0}
//       flexBasis="50%"
//       flexGrow={1}
//       alignItems="stretch"
//     >
//       <Flex flexGrow={1} flexDir="column">
//         <Flex alignItems="center">
//           <Text fontWeight={500}>{indicator?.title}</Text>
//           {indicator?.hint && <Hint label={indicator.hint} ml={1} />}
//         </Flex>
//         <Flex mb={{ base: 0, lg: 2 }} mt={1} alignItems="end">
//           {valueTitle}
//           {valueDiff}
//         </Flex>
//         <ChainIndicatorChartContainer {...queryResult} />
//       </Flex>
//       {indicators.length > 1 && (
//         <Flex
//           flexShrink={0}
//           flexDir="column"
//           as="ul"
//           borderRadius="lg"
//           rowGap="6px"
//           m={{ base: "auto 0", lg: 0 }}
//         >
//           {indicators.map((indicator) => (
//             <ChainIndicatorItem
//               key={indicator.id}
//               {...indicator}
//               isSelected={selectedIndicator === indicator.id}
//               onClick={selectIndicator}
//               stats={statsQueryResult}
//             />
//           ))}
//         </Flex>
//       )}
//     </Flex>
//   );
// };

// export default ChainIndicators;
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
import formatDate from "service/utils/date";
import { useTranslation } from "next-i18next";
import { Box, Flex, Heading } from "@chakra-ui/react";
import INDICATORS from "ui/home/indicators/utils/indicators";
import useFetchChartData from "ui/home/indicators/useFetchChartData";
import useApiQuery from "lib/api/useApiQuery";
import React from "react";
import { HOMEPAGE_STATS } from "stubs/stats";
import ChainIndicatorChartContainer from "ui/home/indicators/ChainIndicatorChartContainer";
import { BarChart } from "lucide-react";

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

  const { data } = useFetchChartData(indicator);

  // Early return if data is not available or doesn't have the expected structure
  if (!data || !data[0]?.items || data[0].items.length === 0) {
    return <Box>Loading...</Box>;
  }

  const chartData = data[0].items;

  console.log(JSON.stringify(data, null, 2));

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
        </ChartContainer>
      </Box>
    </Box>
  );
}

export default TransactionHistory;
