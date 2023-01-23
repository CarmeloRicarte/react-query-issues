import { FC } from "react";
import { Outlet } from "react-router-dom";

export const GitApp: FC = () => {
  return (
    <div className="container mt-3">
      <h1>
        React Git Issues{" "}
        <small>Seguimiento de problemas en el repositorio de React</small>{" "}
      </h1>
      <Outlet />
    </div>
  );
};
