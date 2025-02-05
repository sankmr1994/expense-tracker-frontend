import dayjs from "dayjs";

export const formatDate = (value, format) => {
  const formattedDate = dayjs(value).format(format);
  return formattedDate;
};
