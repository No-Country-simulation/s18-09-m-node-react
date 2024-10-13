import { QueryProps } from "@/types";

const createQuerys = (query: QueryProps) => {
  let querys = "";
  for (const key in query) {
    if (querys.length) querys += "&";
    querys += `${key}=${query[key]}`;
  }
  return querys;
};

export default createQuerys;
