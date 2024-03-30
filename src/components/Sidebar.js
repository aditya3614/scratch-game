import React from "react";
import BlockItem from "./BlockItem";
import { Tag } from "antd";
export default function Sidebar() {
  const eventsList = [
    {
      func: "clickFlag",
      class:
        "flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer",
      operation: "When 🏁 Flag is Clicked",
      onTap: "flag",
    },
    {
      func: "clickSprite",
      class:
        "flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer",
      operation: "When this 🫵 sprite clicked",
      onTap: "sprite",
    },
  ];
  const lookList = [
    {
      func: "sayHello",
      class:
        "flex flex-row flex-wrap bg-green-500 text-white px-2 py-1 my-2 text-sm cursor-pointer",
      operation: "say",
      placeholder: "Hello!",
      messageAction: { message: "hello" },
    },
    {
      func: "sayHelloWithTimer",
      class:
        "flex flex-row flex-wrap bg-green-500 text-white px-2 py-1 my-2 text-sm cursor-pointer",
      operation: "say",
      operation2: "for",
      placeholder: "Hello!",
      messageAction: { message: "hello", time: 2 },
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
    },
    {
      func: "move backward",
      class: `${motionStyle}`,
      operation: "Move  ",
      placeholder: 100,
      exactOperation: "steps backward",
      action: { x: -100, y: 0, rotate: 0 },
    },
    {
      func: "move up",
      class: `${motionStyle}`,
      operation: "Move ",
      placeholder: 100,
      exactOperation: "steps upside",
      action: { x: 0, y: -200, rotate: 0 },
    },
    {
      func: "move downward",
      class: `${motionStyle}`,
      operation: "Move  ",
      placeholder: 100,
      exactOperation: "steps downside",
      action: { x: 0, y: 200, rotate: 0 },
    },
    {
      func: "rotate",
      class: `${motionStyle}`,
      operation: "Turn ",
      placeholder: "90",
      exactOperation: "degree",
      action: { x: 0, y: 0, rotate: -90 },
    },
  ];
  const controlList = [
    {
      func: "for",
      class:
        "flex  flex-row flex-wrap bg-red-500 text-white px-7 py-3 my-2 text-sm cursor-pointer",
      operation: "For Loop reps 🔁 ",
      array: [],
      repeat: 5,
    },
  ];

  return (
    <div
      className="w-50 h-full  items-center flex flex-col  p-6 overflow-y-scroll border-r border-gray-200 text-600 text-2xl font-bold "
      draggable={false}
    >
      <div className="mb-4">{"Sidebar"}</div>

      {/* <div className="font-bold ">{"Events"}</div>
      {eventsList.map((item) => {
        return (
          <BlockItem
            func={item.func}
            item={item}
            class={item.class}
            operation={item.operation}
            type={"insert"}
          />
        );
      })} */}
      <div className="font-bold">
        {" "}
        <Tag
          color="#87d068"
          className="w-36 text-xl flex items-center justify-center"
        >
          Looks
        </Tag>{" "}
      </div>
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

      <div className="font-bold">
        {" "}
        <Tag
          color="#87d068"
          className="w-36 text-xl flex items-center justify-center"
        >
          Motion
        </Tag>{" "}
      </div>
      {motionList.map((item) => {
        return (
          <BlockItem
            inputType="number"
            item={item}
            func={item.func}
            class={item.class}
            operation={item.operation}
            placeholder={item.placeholder}
            exactOperation={item.exactOperation}
            type={"insert"}
          />
        );
      })}
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
  );
}
