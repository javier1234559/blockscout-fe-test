import dayjs from "lib/date/dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import BigNumber from "bignumber.js";

dayjs.extend(relativeTime);

export const FormatDate = {
  timeAgo(timestamp: string | number | Date): string {
    return dayjs(timestamp).fromNow();
  },
};

export const FormatNumber = {
  numberWithCommas(value: number) {
    return value.toLocaleString("en-US");
  },
};

export const formatCurrencyWithSuffix = (
  value: string | number | null
): string => {
  if (value === null || value === undefined || value === "") {
    return "$0";
  }

  const num = new BigNumber(value);

  if (num.isNaN()) {
    return "NaN";
  }

  const absNum = num.abs();

  if (absNum.isGreaterThanOrEqualTo(1e9)) {
    return `$${num.dividedBy(1e9).toFixed(2)}B`;
  } else if (absNum.isGreaterThanOrEqualTo(1e6)) {
    return `$${num.dividedBy(1e6).toFixed(2)}M`;
  } else if (absNum.isGreaterThanOrEqualTo(1e3)) {
    return `$${num.dividedBy(1e3).toFixed(2)}K`;
  } else {
    return `$${num.toFixed(2)}`;
  }
};
