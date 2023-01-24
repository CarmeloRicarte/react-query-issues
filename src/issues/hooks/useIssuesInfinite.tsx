import { useInfiniteQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { sleep } from "../../helpers";
import { IIssue, State } from "../interfaces";

interface IProps {
  labels: string[];
  state?: State;
  page?: number;
}

interface QueryProps {
  queryKey: (string | IProps)[];
  pageParam?: number;
}

const getIssues = async ({
  queryKey,
  pageParam = 1,
}: QueryProps): Promise<IIssue[]> => {
  const [, , args] = queryKey;
  const { state, labels } = args as IProps;

  await sleep(2);
  const params = new URLSearchParams();

  if (state) {
    params.append("state", state);
  }

  if (labels.length > 0) {
    const labelsParam = labels.join(",");
    params.append("labels", labelsParam);
  }

  params.append("page", pageParam?.toString());
  params.append("per_page", "5");
  const { data } = await githubApi.get<IIssue[]>("/issues", { params });
  return data;
};

export const useIssuesInfinite = ({ state, labels }: IProps) => {
  const issuesQuery = useInfiniteQuery(
    ["issues", "infinite", { state, labels }],
    (data) => getIssues(data),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length === 0) return; // no more pages

        return pages.length + 1;
      },
    }
  );
  return {
    issuesQuery,
  };
};
