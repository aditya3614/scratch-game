import React, { createContext, useContext, useState } from "react";

const FlowContext = createContext();

export const useFlow = () => useContext(FlowContext);

export const FlowProvider = ({ children }) => {
  const [flow, setFlow] = useState([]);
  const [singleAction, setSingleAction] = useState();
  const [foreverAction, setForeverAction] = useState();
  const [singleMessageAction, setSingleMessageAction] = useState();

  return (
    <FlowContext.Provider
      value={{
        flow,
        setFlow,
        singleAction,
        setSingleAction,
        singleMessageAction,
        setSingleMessageAction,
        foreverAction,
        setForeverAction,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};
