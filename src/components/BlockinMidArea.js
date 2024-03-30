import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Context from "./Context";
import { InputNumber } from "antd";

function BlockinMidArea(props) {
  const [keyVal, setKeyVal] = useContext(Context);
  const [isValueChanged, setIsValueChanged] = useState(false);
  const [changedValue, setChangedValue] = useState(null);

  useEffect(() => {
    console.log("message action" + JSON.stringify(props.messageAction));
  }, []);
  // Function to handle changes and updates to the board
  function handleChange(event) {
    let value;
    if (props.messageAction) {
      value = event.target.value;
    } else {
      value = Number(event.target.value.replace(/\D/g, ""));
    }
    setChangedValue(value);
  }

  function handleBlockValueChange(value) {
    console.log("valueee " + value);
    props.setInlist((prev) => {
      const index = prev.findIndex((block) => block.key === props.id);
      if (index !== -1) {
        const updatedBlock = { ...prev[index] };
        if (updatedBlock.func === "sayHello") {
          updatedBlock.messageAction = { message: value };
        } else {
          if (updatedBlock.func === "move forward") {
            updatedBlock.action = { x: value, y: 0, rotate: 0 };
          } else if (updatedBlock.func === "move backward") {
            updatedBlock.action = { x: -value, y: 0, rotate: 0 };
          } else if (updatedBlock.func === "move up") {
            updatedBlock.action = { x: value, y: -value, rotate: 0 };
          } else if (updatedBlock.func === "move downward") {
            updatedBlock.action = { x: 0, y: value, rotate: 0 };
          } else if (updatedBlock.func === "rotate") {
            updatedBlock.action = { x: 0, y: 0, rotate: value };
          }
        }
        const updatedFlow = [...prev];
        updatedFlow[index] = updatedBlock;
        return updatedFlow;
      }
      return prev;
    });
  }

  return (
    <motion.div
      id="block"
      className={`${props.class} h-11 items-center rounded-lg border-2 `}
      onClick={(event) => {
        setKeyVal(props.id);

        event.stopPropagation();
      }}
      type={"replace"}
    >
      <div className="mr-2 items-center">{props.operation}</div>
      <span>
        {props.action && (
          <input
            onChange={handleChange}
            className="shadow-lg text-blue-900  w-16 h-5 rounded mr-2 pl-5"
            type="number"
            placeholder={props.placeholder}
          />
        )}
        {props.messageAction && (
          <input
            onChange={handleChange}
            className="shadow-lg text-blue-900  w-16 h-5 rounded mr-2 pl-5"
            type="text"
            placeholder={props.placeholder}
          />
        )}
      </span>
      <div className="mr-4 items-center">{props.exactOperation}</div>
      <button
        className="bg-green-400 text-black flex justify-center item-center px-2 rounded"
        onClick={() => {
          handleBlockValueChange(changedValue);
        }}
      >
        run ▶️
      </button>
    </motion.div>
  );
}

export default BlockinMidArea;
