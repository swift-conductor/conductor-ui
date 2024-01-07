import handleError from "../../utils/handleError";
import AppContext from "./AppContext";

export default function DefaultAppContextProvider({ ...props }) {
  return (
    <AppContext.Provider
      value={{
        ready: true,
        stack: "default",
        defaultStack: "default",
        customTypeRenderers: {},
        customExecutionSummaryRows: [],
        customTaskSummaryRows: [],
        fetchWithContext: function (path, fetchParams) {
          const newParams = { ...fetchParams };

          const wf_server = process.env.WF_SERVER || "http://localhost:8080";  
          const newPath = `${wf_server}/api/${path}`;
          const cleanPath = newPath.replace(/([^:]\/)\/+/g, "$1"); // Cleanup duplicated slashes

          return fetch(cleanPath, newParams).then(handleError);
        },
      }}
      {...props}
    />
  );
}
