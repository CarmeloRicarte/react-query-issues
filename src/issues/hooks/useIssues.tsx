import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { githubApi } from "../../api/githubApi";
import { sleep } from "../../helpers";
import { IIssue, State } from "../interfaces";

interface IProps {
  labels: string[];
  state?: State;
  page?: number;
}

const getIssues = async ({
  labels,
  state,
  page = 1,
}: IProps): Promise<IIssue[]> => {
  await sleep(2);
  const params = new URLSearchParams();

  if (state) {
    params.append("state", state);
  }

  if (labels.length > 0) {
    const labelsParam = labels.join(",");
    params.append("labels", labelsParam);
  }

  params.append("page", page?.toString());
  params.append("per_page", "5");
  const { data } = await githubApi.get<IIssue[]>("/issues", { params });
  return data;
};

export const useIssues = ({ labels, state }: IProps) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [labels, state]);

  const issuesQuery = useQuery(["issues", { state, labels, page }], () =>
    getIssues({ labels, state, page })
  );

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) return;
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return {
    issuesQuery,
    page: issuesQuery.isFetching ? "Loading" : page,
    nextPage,
    prevPage,
  };
};
