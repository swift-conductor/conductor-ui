import { useContext, useState } from "react";
import { DefEditorContext } from "../WorkflowDefinition";
import { Button, Paper } from "../../../components";
import HttpTaskConfigurator from "./taskconfigurator/HttpTaskConfigurator";
import InlineTaskConfigurator from "./taskconfigurator/InlineTaskConfigurator";
import TaskConfigurator from "./taskconfigurator/TaskConfigurator";
import TerminateTaskConfigurator from "./taskconfigurator/TerminateTaskConfigurator";
import WaitTaskConfigurator from "./taskconfigurator/WaitTaskConfigurator";

// TODO: Placeholder for integration

export default function TaskConfigPanel({
  setSeverity,
}: {
  setSeverity: (EditorTabSeverity) => void;
}) {
  const context = useContext(DefEditorContext)!;
  const { dag, selectedTask, setStaging } = context!;

  const taskConfig = selectedTask && dag.getTaskConfigByCoord(selectedTask);
  let originalRef = null;
  if (taskConfig)
    originalRef = JSON.parse(JSON.stringify(taskConfig)).taskReferenceName;

  if (!selectedTask) {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "#fafafd",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>Select a task by clicking on it in the Workflow Builder.</div>
      </div>
    );
  }

  const handleTaskConfiguratorUpdate = (updatedState) => {
    const newDag = dag.clone();
    if (originalRef) {
      newDag.updateTask(originalRef, updatedState);
    }
    setStaging("TaskConfigPane", newDag.toWorkflowDef(), newDag);
  };

  console.log("taskConfig", taskConfig);

  return (
    <div style={{ height: "100%", overflowY: "scroll" }}>
      {taskConfig !== null && taskConfig.type === "HTTP" ? (
        <HttpTaskConfigurator
          onUpdate={handleTaskConfiguratorUpdate}
          initialConfig={taskConfig}
        />
      ) : taskConfig !== null && taskConfig.type === "INLINE" ? (
        <InlineTaskConfigurator
          onUpdate={handleTaskConfiguratorUpdate}
          initialConfig={taskConfig}
        />
      ) : taskConfig !== null && taskConfig.type === "SIMPLE" ? (
        <TaskConfigurator
          onUpdate={handleTaskConfiguratorUpdate}
          initialConfig={taskConfig}
        />
      ) : taskConfig !== null && taskConfig.type === "TERMINATE" ? (
        <TerminateTaskConfigurator
          onUpdate={handleTaskConfiguratorUpdate}
          initialConfig={taskConfig}
        />
      ) : taskConfig !== null && taskConfig.type === "WAIT" ? (
        <WaitTaskConfigurator
          onUpdate={handleTaskConfiguratorUpdate}
          initialConfig={taskConfig}
        />
      ) : (
        <div>
          Task Type not currently supported by Task Configurator. Please use the
          JSON panel instead.
        </div>
      )}
    </div>
  );
}
