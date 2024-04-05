import React from "react";
import { useState } from "react";
import { useDrag } from "react-dnd";
import { useFlow } from "./flowContext";
import { message } from "antd";
function BlockItem(props) {
  const [changedValue, setChangedValue] = useState(null);
  const [timeValue, setTimeValue] = useState(2);
  const [incr, setIncr] = useState(0.1);
  const [broadcast, setBroadcast] = useState("Hello!");
  const {
    singleAction,
    setSingleAction,
    singleMessageAction,
    setSingleMessageAction,
  } = useFlow();

  function handleBroadcast(event) {
    let value = event.target.value;
    setBroadcast(value);
  }
  function broadcastMessage(value) {
    message.info(value);
  }

  const handleBlockValueChange = (value) => {
    if (!value && props.inputType === "number") {
      const modifiedAction = { ...props.action };
      Object.keys(modifiedAction).forEach((key) => {
        if (modifiedAction[key] !== 0) {
          modifiedAction[key] += 0.1;
        }
      });
      setSingleAction(modifiedAction);

      return;
    }

    if (!value && props.inputType === "text") {
      setSingleMessageAction(props.messageAction);
      return;
    }

    let newAction;
    //motions
    if (props.func === "move forward") {
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

  const [{ isBeingDragged }, makeItDraggable] = useDrag(() => ({
    type: props.type,
    item: { props: props },
    collect: (monitor) => ({
      isBeingDragged: !!monitor.isDragging(),
    }),
  }));

  function handleChangeForTime(event) {
    let value;

    value = Number(event.target.value.replace(/\D/g, ""));

    setTimeValue(value);
  }

  function handleChange(event) {
    let value;

    if (props.messageAction) {
      value = event.target.value;
    } else {
      value = Number(event.target.value.replace(/\D/g, ""));
    }
    setChangedValue(value);
  }

  let makeItMovable = props.type ? makeItDraggable : null;

  return (
    <div
      ref={makeItMovable}
      className={`${props.class} h-16 w-full flex  shadow-lg rounded-lg border-2 -space-y-2 items-center `}
    >
      <div className="mr-2">{props.operation}</div>

      <span>
        {props.action && (
          <input
            onChange={handleChange}
            className="shadow-lg text-blue-900 mr-6 w-16 h-5 rounded pl-5"
            type="number"
            placeholder={props.placeholder}
          />
        )}
        {props.broadcastAction && (
          <input
            onChange={handleBroadcast}
            placeholder={props.placeholder}
            className="shadow-lg text-blue-900  h-5 rounded mr-2 pl-5"
            type="text"
          ></input>
        )}
        {props.messageAction && (
          <input
            onChange={handleChange}
            className="shadow-lg text-blue-900  w-16 h-5 rounded text-center"
            type="text"
            placeholder={props.placeholder}
          />
        )}
        {props.messageAction && props.messageAction.time && (
          <>
            for
            <input
              onChange={handleChangeForTime}
              className="shadow-lg text-blue-900  w-16 h-5 rounded  pl-5"
              type="number"
              placeholder={props.messageAction.time}
            />{" "}
            seconds
          </>
        )}
      </span>
      <div className="mr-2 items-center">{props.exactOperation}</div>
      {props.broadcastAction ? (
        <button
          className="bg-green-400 text-black flex justify-center item-center px-2 rounded"
          onClick={() => {
            broadcastMessage(broadcast);
          }}
        >
          broadcast ▶️
        </button>
      ) : props.operation === "turn forever" ? (
        <></>
      ) : (
        <button
          className="bg-green-400 text-black flex justify-center item-center px-2 rounded ml-2"
          onClick={() => {
            handleBlockValueChange(changedValue);
          }}
        >
          run ▶️
        </button>
      )}
    </div>
  );
}

export default BlockItem;
