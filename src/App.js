import "./App.css";
import { useState } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Context from "./components/Context";
import { connect } from "react-redux";
import Sidebar from "./components/Sidebar";
import PersonalizedMidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
function App() {
  const [keyVal, setKeyVal] = useState(-1);
  const [flow, setFlow] = useState([]);
  return (
    <DndProvider backend={HTML5Backend}>
      <Context.Provider value={[keyVal, setKeyVal]}>
        <div className="bg-blue-100 pt-6 font-sans">
          <div className="h-screen overflow-hidden flex flex-row  antialiased ">
            <div className="flex h-screen w-3/5 overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
              <Sidebar />

              <PersonalizedMidArea flow={flow} setFlow={setFlow} />
            </div>
            <div className="w-2/5 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
              <PreviewArea flow={flow} />
            </div>
          </div>
        </div>
      </Context.Provider>
    </DndProvider>
  );
}

export default App;
