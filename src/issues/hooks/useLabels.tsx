import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { sleep } from "../../helpers/sleep";
import { ILabel } from "../interfaces/ILabel";

const getLabels = async (): Promise<ILabel[]> => {
  await sleep(2);
  const { data } = await githubApi.get("/labels");
  return data;
};

export const useLabels = () => {
  const labelsQuery = useQuery(["labels"], getLabels);
  return labelsQuery;
};
