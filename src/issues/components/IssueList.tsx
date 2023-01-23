import { FC } from "react";
import { IIssue, State } from "../interfaces";
import { IssueItem } from "./IssueItem";

interface IssueListProps {
  issues: IIssue[];
  state?: State;
  onStateChanged: (state?: State) => void;
}

export const IssueList: FC<IssueListProps> = ({
  issues,
  state,
  onStateChanged,
}) => {
  return (
    <div className="card border-white">
      <div className="card-header bg-dark">
        <ul className="nav nav-pills card-header-pills">
          <li className="nav-item">
            <a
              className={`nav-link ${!state ? "active" : ""}`}
              onClick={() => onStateChanged()}
            >
              All
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${state === State.Open ? "active" : ""}`}
              onClick={() => onStateChanged(State.Open)}
            >
              {State.Open}
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${state === State.Closed ? "active" : ""}`}
              onClick={() => onStateChanged(State.Closed)}
            >
              {State.Closed}
            </a>
          </li>
        </ul>
      </div>
      <div className="card-body text-dark">
        {issues.map((issue) => (
          <IssueItem key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
};
