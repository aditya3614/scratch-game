import React from "react";
import { useState } from "react";
import { useDrag } from "react-dnd";
import { useFlow } from "./flowContext";

function BlockItem(props) {
  const [changedValue, setChangedValue] = useState(null);
  const [timeValue, setTimeValue] = useState(2);
  const [incr, setIncr] = useState(0.1);
  const {
    singleAction,
    setSingleAction,
    singleMessageAction,
    setSingleMessageAction,
  } = useFlow();

  const handleBlockValueChange = (value) => {
    if (!value && props.inputType === "number") {
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
      setSingleMessageAction(props.messageAction);
      return;
    }

    let newAction;
    //motions
    if (props.func === "move forward") {
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
    setSingleAction(newAction);
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
    // console.log("event valueeee " + value);
    setChangedValue(value);
  }

  let makeItMovable = props.type ? makeItDraggable : null;

  return (
    <div
      ref={makeItMovable}
      className={`${props.class} h-16 w-full shadow-lg rounded-lg border-2 -space-y-2 items-center `}
    >
      {props.operation}
      {props.inputType === "number" ? (
        <input
          onChange={handleChange}
          placeholder={props.placeholder}
          type="number"
          className="w-1/4 rounded pl-2 mx-1 text-black"
        />
      ) : props.func == "sayHelloWithTimer" ||
        props.func == "thinkHmmWithTimer" ? (
        <>
          <div className="flex">
            <div className="bg-white rounded text-gray-400 px-2 mx-2 text-center">
              {props.func == "sayHelloWithTimer" ? "Hello" : "Hmmm..."}
            </div>
            for
            <div className="bg-white rounded text-gray-400 px-2 mx-1">2</div>
          </div>
          {"seconds"}
        </>
      ) : props.func == "forever" ? (
        <div></div>
      ) : (
        <input
          placeholder={props.placeholder}
          type="text"
          className="w-1/2 rounded ml-4 text-center"
        />
      )}
      {props.exactOperation}
      <button
        className="bg-green-400 text-black flex justify-center item-center px-4 rounded ml-2"
        onClick={() => {
          handleBlockValueChange(changedValue);
        }}
      >
        run ▶️
      </button>
    </div>
  );
}

export default BlockItem;
