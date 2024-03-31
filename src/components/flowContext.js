import React, { createContext, useContext, useState } from "react";

const FlowContext = createContext();

export const useFlow = () => useContext(FlowContext);

export const FlowProvider = ({ children }) => {
  const [flow, setFlow] = useState([]);

  return (
    <FlowContext.Provider value={{ flow, setFlow }}>
      {children}
    </FlowContext.Provider>
  );
};
