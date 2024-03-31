import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Context from "./Context";
import { InputNumber, message } from "antd";

function BlockinMidArea(props) {
  const [keyVal, setKeyVal] = useContext(Context);
  const [isValueChanged, setIsValueChanged] = useState(false);
  const [changedValue, setChangedValue] = useState(null);
  const [timeValue, setTimeValue] = useState(2);
  const [increment, setIncrement] = useState(1);
  const [broadcast, setBroadcast] = useState("Hello!");

  // Function to handle changes and updates to the board

  function handleBroadcast(event) {
    let value = event.target.value;
    setBroadcast(value);
  }
  function broadcastMessage(value) {
    message.info(value);
  }
  function handleChange(event) {
    let value;

    if (props.messageAction) {
      value = event.target.value;
    } else {
      value = Number(event.target.value.replace(/\D/g, ""));
    }
    console.log("event valueeee " + value);
    setChangedValue(value);
  }

  function handleChangeForTime(event) {
    let value;

    value = Number(event.target.value.replace(/\D/g, ""));

    setTimeValue(value);
  }

  function handleBlockValueChange(value) {
    console.log("valueee " + value);
    if (!value && props.operation === "say") value = "Hello!";
    if (!value && props.operation === "think") value = "Hmmm...";
    if (!value && props.inputType === "number") value = 100 + increment;
    setIncrement((prev) => prev + 1);
    console.log("incr " + increment);
    props.setInlist((prev) => {
      const index = prev.findIndex((block) => block.key === props.id);
      if (index !== -1) {
        const updatedBlock = { ...prev[index] };
        if (updatedBlock.func === "sayHelloWithTimer") {
          updatedBlock.messageAction = {
            message: value,
            time: timeValue,
            type: "say",
          };
        }
        if (updatedBlock.func === "thinkHmm") {
          updatedBlock.messageAction = { message: value, type: "think" };
        }
        if (updatedBlock.func === "thinkHmmWithTimer") {
          updatedBlock.messageAction = {
            message: value,
            time: timeValue,
            type: "think",
          };
        }
        if (updatedBlock.func === "sayHello") {
          updatedBlock.messageAction = { message: value, type: "say" };
        } else {
          if (updatedBlock.func === "move forward") {
            updatedBlock.action = { x: value, y: 0, rotate: 0 };
          } else if (updatedBlock.func === "move backward") {
            updatedBlock.action = { x: -value, y: 0, rotate: 0 };
          } else if (updatedBlock.func === "move up") {
            updatedBlock.action = { x: 0, y: -value, rotate: 0 };
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
        {props.broadcastAction && (
          <input
            onChange={handleBroadcast}
            placeholder={props.placeholder}
            className="shadow-lg text-blue-900  w-16 h-5 rounded mr-2 pl-5"
            type="text"
          ></input>
        )}
        {props.messageAction && (
          <input
            onChange={handleChange}
            className="shadow-lg text-blue-900  w-16 h-5 rounded mr-2 text-center"
            type="text"
            placeholder={props.placeholder}
          />
        )}
        {props.messageAction && props.messageAction.time && (
          <>
            for
            <input
              onChange={handleChangeForTime}
              className="shadow-lg text-blue-900  w-16 h-5 rounded mx-2 pl-5"
              type="number"
              placeholder={props.messageAction.time}
            />{" "}
            seconds
          </>
        )}
      </span>
      <div className="mr-4 items-center">{props.exactOperation}</div>
      {props.broadcastAction ? (
        <button
          className="bg-green-400 text-black flex justify-center item-center px-2 rounded"
          onClick={() => {
            broadcastMessage(broadcast);
          }}
        >
          broadcast ▶️
        </button>
      ) : (
        <button
          className="bg-green-400 text-black flex justify-center item-center px-2 rounded"
          onClick={() => {
            handleBlockValueChange(changedValue);
          }}
        >
          run ▶️
        </button>
      )}
    </motion.div>
  );
}

export default BlockinMidArea;
