import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { IIssue } from "../interfaces";
import { sleep } from "../../helpers/sleep";

const getIssueInfo = async (issueNumber: number): Promise<IIssue> => {
  sleep(2);
  const { data } = await githubApi.get<IIssue>(`/issues/${issueNumber}`);
  return data;
};

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery(["issue", issueNumber], () =>
    getIssueInfo(issueNumber)
  );
  return { issueQuery };
};
