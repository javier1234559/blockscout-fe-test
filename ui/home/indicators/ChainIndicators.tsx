import { Flex, Skeleton, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

import config from "configs/app";
import useApiQuery from "lib/api/useApiQuery";
import { HOMEPAGE_STATS } from "stubs/stats";
import Hint from "ui/shared/Hint";
import IconSvg from "ui/shared/IconSvg";

import ChainIndicatorChartContainer from "./ChainIndicatorChartContainer";
import ChainIndicatorItem from "./ChainIndicatorItem";
import useFetchChartData from "./useFetchChartData";
import INDICATORS from "./utils/indicators";

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

// const ChainIndicators = () => {
//   const [ selectedIndicator, selectIndicator ] = React.useState(indicators[0]?.id);
//   const indicator = indicators.find(({ id }) => id === selectedIndicator);

//   const queryResult = useFetchChartData(indicator);
//   const statsQueryResult = useApiQuery('stats', {
//     queryOptions: {
//       refetchOnMount: false,
//       placeholderData: HOMEPAGE_STATS,
//     },
//   });

//   const bgColor = useColorModeValue('gray.50', 'whiteAlpha.100');

//   if (indicators.length === 0) {
//     return null;
//   }

//   const valueTitle = (() => {
//     if (statsQueryResult.isPlaceholderData) {
//       return <Skeleton h="36px" w="215px"/>;
//     }

//     if (!statsQueryResult.data) {
//       return <Text fontSize="xs">There is no data</Text>;
//     }

//     return (
//       <Text fontWeight={ 700 } fontSize="30px" lineHeight="36px">
//         { indicator?.value(statsQueryResult.data) }
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

//     const diffColor = diff >= 0 ? 'green.500' : 'red.500';

//     return (
//       <Skeleton isLoaded={ !statsQueryResult.isPlaceholderData } display="flex" alignItems="center" color={ diffColor } ml={ 2 }>
//         <IconSvg name="arrows/up-head" boxSize={ 5 } mr={ 1 } transform={ diff < 0 ? 'rotate(180deg)' : 'rotate(0)' }/>
//         <Text color={ diffColor } fontWeight={ 600 }>{ diff }%</Text>
//       </Skeleton>
//     );
//   })();

//   return (
//     <Flex
//       px={{ base: 3, lg: 4 }}
//       py={ 3 }
//       borderRadius="base"
//       bgColor={ bgColor }
//       columnGap={{ base: 3, lg: 4 }}
//       rowGap={ 0 }
//       flexBasis="50%"
//       flexGrow={ 1 }
//       alignItems="stretch"
//     >
//       <Flex flexGrow={ 1 } flexDir="column">
//         <Flex alignItems="center">
//           <Text fontWeight={ 500 }>{ indicator?.title }</Text>
//           { indicator?.hint && <Hint label={ indicator.hint } ml={ 1 }/> }
//         </Flex>
//         <Flex mb={{ base: 0, lg: 2 }} mt={ 1 } alignItems="end">
//           { valueTitle }
//           { valueDiff }
//         </Flex>
//         <ChainIndicatorChartContainer { ...queryResult }/>
//       </Flex>
//       { indicators.length > 1 && (
//         <Flex
//           flexShrink={ 0 }
//           flexDir="column"
//           as="ul"
//           borderRadius="lg"
//           rowGap="6px"
//           m={{ base: 'auto 0', lg: 0 }}
//         >
//           { indicators.map((indicator) => (
//             <ChainIndicatorItem
//               key={ indicator.id }
//               { ...indicator }
//               isSelected={ selectedIndicator === indicator.id }
//               onClick={ selectIndicator }
//               stats={ statsQueryResult }
//             />
//           )) }
//         </Flex>
//       ) }
//     </Flex>
//   );
// };

// export default ChainIndicators;

import dayjs from "lib/date/dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import AppIcon from "components/common/app-icon";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "components/ui/chart";
import formatDate from "service/utils/date";
import { cn } from "service/utils/cn";
import { useTranslation } from "next-i18next";

interface Props {
  className?: string;
}

const chartData = [
  {
    date: formatDate(new Date(), "DEFAULT_WITH_SLASH_WITH_TIME"),
    sto: 0.3425,
  },
  { date: formatDate(new Date(), "DEFAULT_WITH_SLASH_WITH_TIME"), sto: 0.34 },
  { date: formatDate(new Date(), "DEFAULT_WITH_SLASH_WITH_TIME"), sto: 0.343 },
  { date: formatDate(new Date(), "DEFAULT_WITH_SLASH_WITH_TIME"), sto: 0.3345 },
  { date: formatDate(new Date(), "DEFAULT_WITH_SLASH_WITH_TIME"), sto: 0.328 },
  { date: formatDate(new Date(), "DEFAULT_WITH_SLASH_WITH_TIME"), sto: 0.334 },
];

const chartConfig = {
  sto: {
    label: "STO",
    color: "#FF2CA8",
  },
} satisfies ChartConfig;

dayjs.extend(LocalizedFormat);

function TransactionHistory(props: Props) {
  const { t } = useTranslation();
  const { className } = props;

  return (
    <div className={cn("bg-transparent", className)}>
      <div className="flex items-center gap-1 py-4">
        <AppIcon
          src="/svg/icons/contracts-bold.svg#id"
          width={20}
          height={20}
          className="h-5 w-5 flex-shrink-0 text-white"
        />
        <h6>
          {t("Transaction History")}&#10240;-&#10240;
          {formatDate(new Date(), "DATE_WITH_MONTH_FIRST_WITH_TIME")}
        </h6>
      </div>

      <div className="bg-background-bg-2 overflow-hidden rounded-md border border-stroke-line">
        <div className="bg-gradient-to-r from-primary to-blue-dark p-2">
          {t("Transaction History in 30 Days")}
        </div>

        <div className="px-5 py-2">
          <ChartContainer
            config={chartConfig}
            className="w-full xl:max-h-[7.5rem] [&_line]:!stroke-white"
          >
            <AreaChart accessibilityLayer data={chartData}>
              <CartesianGrid horizontal vertical={false} stroke="white" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={20}
              />
              <YAxis
                type="number"
                domain={[0.324, 0.345]}
                tickCount={9}
                tickLine={false}
                axisLine={false}
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" hideLabel />}
              />
              <Area
                type="linear"
                dataKey="sto"
                stroke={chartConfig.sto.color}
                fill="rgba(255, 44, 168, 0.5)"
                fillOpacity={0.4}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
}

export default TransactionHistory;
