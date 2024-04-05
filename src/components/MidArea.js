import React, { useEffect, useState, useContext } from "react";
import { useDrop } from "react-dnd";
import BlockinMidArea from "./BlockinMidArea";
import { Reorder } from "framer-motion";
import ControlBlocks from "./ControlBlocks";
import Context from "./Context";
import { useFlow } from "./flowContext";

export default function PersonalizedMidArea(props) {
  const [selectedKey, setSelectedKey] = useContext(Context);
  const [boardItems, setBoardItems] = useState([]);
  const [itemCount, setItemCount] = useState({ count: 1 });
  const { flow, setFlow, setSingleMessageAction, setSingleAction } = useFlow();

  // Update the flow whenever the board items are changed

  useEffect(() => {
    let updatedFlow = [];
    // console.log("board itemmmm" + JSON.stringify(boardItems));
    for (let i = 0; i < boardItems.length; i++) {
      updatedFlow.push({
        action: boardItems[i].action,
        messageAction: boardItems[i].messageAction,
      });
    }
    console.log(
      "last board item " + JSON.stringify(boardItems[boardItems.length - 1])
    );
    const lastBoardItem = boardItems[boardItems.length - 1];
    if (lastBoardItem && lastBoardItem.messageAction) {
      setSingleMessageAction(lastBoardItem.messageAction);
    }
    if (lastBoardItem && lastBoardItem.action) {
      const modifiedAction = modifyAction(lastBoardItem.action);
      setSingleAction(modifiedAction);
    }

    setFlow(updatedFlow);
  }, [boardItems.length]);

  const modifyAction = (action) => {
    const modifiedAction = { ...action };
    Object.keys(modifiedAction).forEach((key) => {
      if (modifiedAction[key] !== 0) {
        modifiedAction[key] += 0.1;
      }
    });

    return modifiedAction;
  };

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
      broadcastAction: itemProps.broadcastAction,
      inputType: itemProps.inputType,
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
      className="w-full h-full flex flex-col items-center rounded border-gray-200 text-600 text-2xl font-bold "
    >
      <div className="font-bold w-full text-2xl text-center mt-4 border-b-2 border-current">
        Mid Area
      </div>

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
                action={item.action}
                setInlist={setBoardItems}
              />
            )}
            {item.type === "insert" && (
              <BlockinMidArea
                id={item.key}
                func={item.func}
                draggable={true}
                class={`items-center ${item.class}`}
                operation={item.operation}
                inputType={item.inputType}
                placeholder={item.placeholder}
                exactOperation={item.exactOperation}
                action={item.action}
                messageAction={item.messageAction}
                broadcastAction={item.broadcastAction}
                setInlist={setBoardItems}
              />
            )}
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}
