import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Context from "./Context";
import { InputNumber, message } from "antd";
import { useFlow } from "./flowContext";

function BlockinMidArea(props) {
  const [keyVal, setKeyVal] = useContext(Context);
  const [changedValue, setChangedValue] = useState(null);
  const [timeValue, setTimeValue] = useState(2);
  const [increment, setIncrement] = useState(1);
  const [broadcast, setBroadcast] = useState("Hello!");
  const {
    singleAction,
    setSingleAction,
    singleMessageAction,
    setSingleMessageAction,
  } = useFlow();

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
    // console.log("event valueeee " + value);
    setChangedValue(value);
  }

  function handleChangeForTime(event) {
    let value;

    value = Number(event.target.value.replace(/\D/g, ""));

    setTimeValue(value);
  }

  const handleBlockValueChange = (value) => {
    console.log("valueeee " + value);
    if (!value && props.inputType === "number") {
      console.log("isme aaya");
      const modifiedAction = { ...props.action };
      Object.keys(modifiedAction).forEach((key) => {
        if (modifiedAction[key] !== 0) {
          modifiedAction[key] += 0.1;
        }
      });
      setSingleAction(modifiedAction);
      console.log("isme aaya prosps action " + props.action);
      return;
    }

    if (!value && props.inputType === "text") {
      console.log("isme aaya 2");
      setSingleMessageAction(props.messageAction);
      return;
    }

    let newAction;
    //motions
    if (props.func === "move forward") {
      console.log("isme aaya 2");
      console.log("this condtion aise'");
      newAction = { x: value, y: 0, rotate: 0 };
    }
    if (props.func === "move backward") {
      newAction = { x: -value, y: 0, rotate: 0 };
    }
    if (props.func === "move up") {
      newAction = { x: 0, y: -value, rotate: 0 };
    }
    if (props.func === "move downward") {
      newAction = { x: 0, y: value, rotate: 0 };
    }
    if (props.func === "rotate") {
      newAction = { x: 0, y: 0, rotate: value };
    }
    //looks
    if (props.func === "sayHello") {
      newAction = { message: value, type: "say" };
    }
    if (props.func === "sayHelloWithTimer") {
      newAction = {
        message: value,
        time: timeValue,
        type: "say",
      };
    }
    if (props.func === "thinkHmm") {
      newAction = { message: value, type: "think" };
    }
    if (props.func === "thinkHmmWithTimer") {
      newAction = {
        message: value,
        time: timeValue,
        type: "think",
      };
    }
    if (props.inputType === "number") {
      setSingleAction(newAction);
    }
    if (props.inputType === "text") {
      setSingleMessageAction(newAction);
    }
  };

  return (
    <motion.div
      id="block"
      className={`${props.class} h-11 items-center rounded-lg border-2 mt-8`}
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
