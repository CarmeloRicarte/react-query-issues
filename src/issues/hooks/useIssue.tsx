import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { IIssue } from "../interfaces";
import { sleep } from "../../helpers/sleep";

export const getIssueInfo = async (issueNumber: number): Promise<IIssue> => {
  sleep(2);
  const { data } = await githubApi.get<IIssue>(`/issues/${issueNumber}`);
  return data;
};

export const getIssueComments = async (
  issueNumber: number
): Promise<IIssue[]> => {
  sleep(2);
  const { data } = await githubApi.get<IIssue[]>(
    `/issues/${issueNumber}/comments`
  );
  return data;
};

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery(["issue", issueNumber], () =>
    getIssueInfo(issueNumber)
  );

  /**
   * get comments of the issue. It will be enable when will have an issue
   */
  const issueCommentsQuery = useQuery(
    ["issue", issueNumber, "comments"],
    () => getIssueComments(issueQuery.data!.number),
    {
      enabled: !!issueQuery.data,
    }
  );
  return { issueQuery, issueCommentsQuery };
};
