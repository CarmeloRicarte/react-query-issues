import { useState } from "react";
import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useIssuesInfinite } from "../hooks";
import { State } from "../interfaces";

export const ListViewInfiniteScroll = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();
  const { issuesQuery } = useIssuesInfinite({
    state,
    labels: selectedLabels,
  });
  /**
   * If the labelName is already in the selectedLabels array, remove it. Otherwise, add it
   * @param {string} labelName - string - The name of the label that was clicked
   */
  const onLabelChanged = (labelName: string) => {
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]);
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {issuesQuery.isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList
            issues={issuesQuery.data?.pages.flat() || []}
            state={state}
            onStateChanged={(newState: State | undefined) => setState(newState)}
          />
        )}

        <button
          onClick={() => issuesQuery.fetchNextPage()}
          disabled={!issuesQuery.hasNextPage || issuesQuery.isFetching}
          className="btn btn-outline-primary mt-3"
        >
          Load more...
        </button>
      </div>

      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange={(labelName: string) => onLabelChanged(labelName)}
        />
      </div>
    </div>
  );
};
