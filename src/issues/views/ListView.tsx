import { useState } from "react";
import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useIssues } from "../hooks";
import { State } from "../interfaces";

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();
  const { issuesQuery } = useIssues();
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
            issues={issuesQuery.data || []}
            state={state}
            onStateChanged={(newState: State | undefined) => setState(newState)}
          />
        )}
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
