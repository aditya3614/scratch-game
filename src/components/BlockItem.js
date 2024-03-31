import React from "react";
import { useDrag } from "react-dnd";

function BlockItem(props) {
  const [{ isBeingDragged }, makeItDraggable] = useDrag(() => ({
    type: props.type,
    item: { props: props },
    collect: (monitor) => ({
      isBeingDragged: !!monitor.isDragging(),
    }),
  }));

  let makeItMovable = props.type ? makeItDraggable : null;

  return (
    <div
      ref={makeItMovable}
      className={`${props.class} h-14 w-full shadow-lg rounded-lg border-2 -space-y-2 items-center `}
    >
      {props.operation}
      {props.inputType === "number" ? (
        <input
          placeholder={props.placeholder}
          type="number"
          className="w-1/4 rounded pl-2 mx-1"
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
    </div>
  );
}

export default BlockItem;
