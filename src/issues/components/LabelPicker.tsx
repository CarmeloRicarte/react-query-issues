import { FC } from "react";
import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { useLabels } from "../hooks/useLabels";
import { ILabel } from "../interfaces/ILabel";

interface IProps {
  selectedLabels: string[];
  onChange: (labelName: string) => void;
}

export const LabelPicker: FC<IProps> = ({ selectedLabels, onChange }) => {
  const labelsQuery = useLabels();

  if (labelsQuery.isLoading) {
    return <LoadingIcon />;
  }

  if (labelsQuery.isError) {
    return <h1>Error fetching data</h1>;
  }

  return labelsQuery.data ? (
    <>
      {labelsQuery.data.map((label: ILabel) => (
        <div key={label.id}>
          <span
            className={`badge rounded-pill m-1 label-picker ${
              selectedLabels.includes(label.name) ? "label-active" : ""
            }`}
            style={{
              border: `1px solid #${label.color}`,
              color: `#${label.color}`,
            }}
            onClick={() => onChange(label.name)}
          >
            {label.name}
          </span>
        </div>
      ))}
    </>
  ) : (
    <>No data</>
  );
};
