import dayjs from "lib/date/dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

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
