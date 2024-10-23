import { useEffect, useState } from "react";
import type { TimeChartData } from "ui/shared/chart/types";

interface ApiResponse {
  chart_data: Array<{
    date: string; // Original date format
    tx_count: number; // Transaction count
  }>;
}

interface TimeChartDataResponse {
  data: TimeChartData | undefined;
  isPending: boolean;
  isError: boolean;
}

export default function useFetchChartDataCustom(
  indicator: any
): TimeChartDataResponse {
  const [data, setData] = useState<TimeChartData | undefined>(undefined);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    // Reset states when indicator changes
    setIsPending(true);
    setIsError(false);
    setData(undefined);

    // Don't fetch if no indicator
    // if (!indicator) {
    //   setIsPending(false);
    //   return;
    // }

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://eth.blockscout.com/api/v2/stats/charts/transactions"
        );

        console.log("response ", response);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const rawData = (await response.json()) as ApiResponse;

        // Transform the data to the desired format
        const transformedData: TimeChartData = [
          {
            items: rawData.chart_data.map((item) => ({
              date: new Date(item.date),
              value: item.tx_count,
            })),
            name: "Tx/day",
          },
        ];

        setData(transformedData);
        setIsError(false);
      } catch (error) {
        console.error("Error fetching chart data:", error);
        setIsError(true);
        setData(undefined);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [indicator]); // Re-fetch when indicator changes

  return { data, isPending, isError };
}
