import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { useLabels } from "../hooks/useLabels";
import { ILabel } from "../interfaces/ILabel";

export const LabelPicker = () => {
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
            className="badge rounded-pill m-1 label-picker"
            style={{
              border: `1px solid #${label.color}`,
              color: `#${label.color}`,
            }}
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
