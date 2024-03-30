import React, { useEffect, useState, useContext } from "react";
import { useDrop } from "react-dnd";
import BlockinMidArea from "./BlockinMidArea";
import { Reorder } from "framer-motion";
import ControlBlocks from "./ControlBlocks";
import Context from "./Context";

export default function PersonalizedMidArea(props) {
  const [selectedKey, setSelectedKey] = useContext(Context);
  const [boardItems, setBoardItems] = useState([]);
  const [itemCount, setItemCount] = useState({ count: 1 });

  // Update the flow whenever the board items are changed
  useEffect(() => {
    let updatedFlow = [];
    for (let i = 0; i < boardItems.length; i++) {
      updatedFlow.push({
        onTap: boardItems[i].onTap,
        action: boardItems[i].action,
        messageAction: boardItems[i].messageAction,
        array: boardItems[i].array,
        repeat: boardItems[i].repeat,
      });
    }
    props.setFlow(updatedFlow);
    console.log("floww  " + JSON.stringify(props.flow));
  }, [boardItems]);

  const [{ isOver, isOverCurrent }, drop] = useDrop(() => ({
    accept: ["insert", "insertinto"],
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      addBlockToBoard(item.props);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  }));

  // Function to add a new block to the board
  const addBlockToBoard = (itemProps) => {
    const newItem = {
      func: itemProps.func,
      class: itemProps.class,
      operation: itemProps.operation,
      exactOperation: itemProps.exactOperation,
      placeholder: itemProps.placeholder,
      messageAction: itemProps.messageAction,
      action: itemProps.item.action,
      onTap: itemProps.item.onTap,
      type: itemProps.type,
      array: itemProps.item.array,
      repeat: itemProps.item.repeat,
    };
    let newCount;
    setItemCount((prevCount) => {
      newCount = prevCount.count + 1;
      return { count: prevCount.count + 1 };
    });
    setBoardItems((prevItems) => [...prevItems, { ...newItem, key: newCount }]);
  };

  return (
    <div
      ref={drop}
      draggable={false}
      className="w-full h-full flex flex-col items-center border-r border-gray-200 text-600 text-2xl font-bold p-5"
    >
      {"MID AREA"}

      <Reorder.Group
        axis={"y"}
        values={boardItems}
        id="midarea"
        className="flex-row py-4 -space-y-2"
        onReorder={setBoardItems}
      >
        {boardItems.map((item) => (
          <Reorder.Item drag key={item.key} value={item}>
            {item.type === "insertinto" && (
              <ControlBlocks
                id={item.key}
                draggable={true}
                class={`items-start py-5 ${item.class}`}
                operation={item.operation}
                setInlist={setBoardItems}
              />
            )}
            {item.type === "insert" && (
              <BlockinMidArea
                id={item.key}
                draggable={true}
                class={`items-center ${item.class}`}
                operation={item.operation}
                placeholder={item.placeholder}
                exactOperation={item.exactOperation}
                action={item.action}
                messageAction={item.messageAction}
                setInlist={setBoardItems}
              />
            )}
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}