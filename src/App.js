import "./App.css";
import { useState } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Context from "./components/Context";
import Sidebar from "./components/Sidebar";
import PersonalizedMidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import { FlowProvider } from "./components/flowContext";

function App() {
  const [keyVal, setKeyVal] = useState(-1);
  const [flow, setFlow] = useState([]);
  return (
    <DndProvider backend={HTML5Backend}>
      <FlowProvider>
        <Context.Provider value={[keyVal, setKeyVal]}>
          <div className="bg-amber-200 pt-6 font-sans">
            <div className="h-screen overflow-hidden flex flex-row  antialiased ">
              <div className="h-screen  overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
                <Sidebar />
              </div>
              <div className=" h-screen w-2/5 overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-xl ml-2 mr-2">
                <PersonalizedMidArea />
              </div>

              <div className="h-screen w-3/5 overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
                <PreviewArea />
              </div>
            </div>
          </div>
        </Context.Provider>
      </FlowProvider>
    </DndProvider>
  );
}

export default App;
