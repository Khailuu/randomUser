import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { manageUser } from "../services/user.services";
import { AxiosResponse } from "axios";
import { RandomUser } from "../types";

export const useGetRandomUser = (page: number) => {
  const q = useQuery<
    AxiosResponse<HttpResponse<RandomUser>>,
    Error,
    AxiosResponse<HttpResponse<RandomUser>>
  >({
    queryKey: ["GetUser", page],
    queryFn: () => manageUser.getUser(page),
    keepPreviousData: true,
  } as UseQueryOptions<AxiosResponse<HttpResponse<RandomUser>>, Error>);

  return {
    ...q,
    data: q?.data?.data?.results,
  };
};
