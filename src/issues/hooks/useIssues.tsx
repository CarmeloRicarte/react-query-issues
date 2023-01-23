import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { sleep } from "../../helpers/sleep";
import { IIssue, State } from "../interfaces";

interface IProps {
  labels: string[];
  state?: State;
}

const getIssues = async (
  labels: string[],
  state?: State
): Promise<IIssue[]> => {
  await sleep(2);
  const params = new URLSearchParams();

  if (state) {
    params.append("state", state);
  }

  if (labels.length > 0) {
    const labelsParam = labels.join(",");
    params.append("labels", labelsParam);
  }

  params.append("page", "1");
  params.append("per_page", "5");
  const { data } = await githubApi.get<IIssue[]>("/issues", { params });
  return data;
};

export const useIssues = ({ labels, state }: IProps) => {
  const issuesQuery = useQuery(["issues", { state, labels }], () =>
    getIssues(labels, state)
  );
  return { issuesQuery };
};
