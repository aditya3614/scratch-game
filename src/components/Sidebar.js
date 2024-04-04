import React from "react";
import BlockItem from "./BlockItem";

export default function Sidebar() {
  const eventsList = [
    {
      func: "broadcast",
      class:
        "flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer",
      operation: "broadcast",
      placeholder: "Hello!",
      broadcastAction: { message: "hello", type: "say" },
      inputType: "text",
    },
  ];
  const looksStyle =
    " flex flex-row flex-wrap bg-violet-500 text-white px-2 py-1 my-2 text-sm cursor-pointer";
  const lookList = [
    {
      func: "sayHello",
      class: looksStyle,
      operation: "say",
      placeholder: "Hello!",
      messageAction: { message: "hello", type: "say" },
      inputType: "text",
    },
    {
      func: "sayHelloWithTimer",
      class: looksStyle,
      operation: "say",
      operation2: "for",
      placeholder: "Hello!",
      messageAction: { message: "hello", time: 2, type: "say" },
      inputType: "text",
    },
    {
      func: "thinkHmm",
      class: looksStyle,
      operation: "think",
      placeholder: "Hmmm...",
      messageAction: { message: "Hmmm...", type: "think" },
      inputType: "text",
    },
    {
      func: "thinkHmmWithTimer",
      class: looksStyle,
      operation: "think",
      operation2: "for",
      placeholder: "Hmmm...",
      messageAction: { message: "Hmmm...", time: 2, type: "think" },
      inputType: "text",
    },
  ];
  const motionStyle =
    "flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer";
  const motionList = [
    {
      func: "move forward",
      class: `${motionStyle}`,
      operation: "Move ",
      placeholder: 100,
      exactOperation: "steps forward",
      action: { x: 100, y: 0, rotate: 0 },
      inputType: "number",
    },
    {
      func: "move backward",
      class: `${motionStyle}`,
      operation: "Move  ",
      placeholder: 100,
      exactOperation: "steps backward",
      action: { x: -100, y: 0, rotate: 0 },
      inputType: "number",
    },
    {
      func: "move up",
      class: `${motionStyle}`,
      operation: "Move ",
      placeholder: 100,
      exactOperation: "steps upside",
      action: { x: 0, y: -100, rotate: 0 },
      inputType: "number",
    },
    {
      func: "move downward",
      class: `${motionStyle}`,
      operation: "Move  ",
      placeholder: 100,
      exactOperation: "steps downside",
      action: { x: 0, y: 100, rotate: 0 },
      inputType: "number",
    },
    {
      func: "rotate",
      class: `${motionStyle}`,
      operation: "Turn ",
      placeholder: "90",
      exactOperation: "degree",
      action: { x: 0, y: 0, rotate: 90 },
      inputType: "number",
    },
  ];
  const controlList = [
    {
      func: "forever",
      class:
        "flex w-full flex-row flex-wrap bg-red-500 text-white px-7 py-3 my-2 text-sm cursor-pointer",
      operation: "forever",
      array: [],
      repeat: 5,
    },
  ];

  return (
    <div
      className="w-50 h-full  items-center flex flex-col  px-6 overflow-y-scroll border-r border-gray-200 text-600 text-xl font-bold "
      draggable={false}
    >
      <div className="font-bold mb-4 text-2xl text-center mt-4 border-b-2 w-full border-current">
        Sidebar
      </div>

      <div className="mb-4 pb-2 border-b-2">
        <div className="font-bold"> Looks</div>
        {lookList.map((item) => {
          return (
            <BlockItem
              inputType={"text"}
              item={item}
              func={item.func}
              class={item.class}
              operation={item.operation}
              operation2={item.operation2}
              placeholder={item.placeholder}
              messageAction={item.messageAction}
              exactOperation={item.exactOperation}
              type={"insert"}
            />
          );
        })}
      </div>
      <div className="mb-4 pb-2 border-b-2">
        <div className="font-bold">Motion</div>
        {motionList.map((item) => {
          return (
            <BlockItem
              inputType="number"
              item={item}
              func={item.func}
              action={item.action}
              class={item.class}
              operation={item.operation}
              placeholder={item.placeholder}
              exactOperation={item.exactOperation}
              type={"insert"}
            />
          );
        })}
      </div>
      <div className="mb-4 pb-2 border-b-2 w-full ">
        <div className="font-bold"> {"Control"} </div>
        {controlList.map((item) => {
          return (
            <BlockItem
              item={item}
              func={item.func}
              class={item.class}
              operation={item.operation}
              type={"insertinto"}
            />
          );
        })}
      </div>
      <div className="mb-4 pb-2 border-b-2 ">
        <div className="font-bold ">{"Events"}</div>
        {eventsList.map((item) => {
          return (
            <BlockItem
              inputType={"text"}
              item={item}
              func={item.func}
              class={item.class}
              operation={item.operation}
              operation2={item.operation2}
              placeholder={item.placeholder}
              messageAction={item.messageAction}
              broadcastAction={item.broadcastAction}
              exactOperation={item.exactOperation}
              type={"insert"}
            />
          );
        })}
      </div>
    </div>
  );
}
