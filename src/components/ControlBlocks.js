import React, { useState, useEffect, useContext, useRef } from "react";
import BlockinMidArea from "./BlockinMidArea";
import { useDrop } from "react-dnd";
import { Reorder } from "framer-motion";
import Context from "./Context";
import { message } from "antd";
import { useFlow } from "./flowContext";

function ControlBlock(props) {
  const [innerBlock, setInnerBlock] = useState([]);
  const [performActions, setPerformActions] = useState(false);
  const [droppedBlocks, setDroppedBlocks] = useState(0);
  const [keyVal, setKeyVal] = useContext(Context);
  const [allowBlocks, setAllowBlocks] = useState(false);

  const { flow, setFlow, foreverAction, setForeverAction } = useFlow();

  const [{ isOver }, dropE] = useDrop(() => ({
    accept: ["insert", "replace", "replaceinto"],
    drop: (item) => addImageToBoard(item.props),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (item) => {
    if (innerBlock.length >= 2) {
      message.info("Only two blocks are allowed to be dropped");
      setAllowBlocks(false);

      return;
    }

    const temp = {
      func: item.func,
      class: item.class,
      operation: item.operation,
      action: item.item.action,
      onTap: item.onTap,
      type: item.type,
      array: item.item.array,
    };

    setInnerBlock((prevInnerBlock) => [...prevInnerBlock, { ...temp }]);
    setDroppedBlocks(droppedBlocks + 1);
  };

  useEffect(() => {
    if (performActions) {
      const actions = innerBlock.map((item) => ({
        action: item.action,
        repeat: item.repeat,
      }));

      const foreverAction = {
        foreverAction: actions,
      };

      setFlow((prevFlow) => [...prevFlow, foreverAction]);
      props.setInlist((prevFlow) => [...prevFlow, actions]);
    }
  }, [performActions, innerBlock]);

  function handleChange(event) {
    const value = Number(event.target.value.replace(/\D/g, ""));
    props.setBoardItem((prv) => {
      const index = prv.findIndex((object) => object.key === props.id);
      prv[index].repeat = value;
      return [...prv];
    });
  }

  const stopActions = () => {
    setPerformActions(false);
  };

  const startAction = () => {
    setForeverAction(props.action);
    setPerformActions(true);
  };

  const handleDrop = () => {
    if (droppedBlocks >= 2) {
      message.info("Only two blocks are allowed to be dropped");
      return;
    }

    setDroppedBlocks(droppedBlocks + 1);
  };

  const handleRemove = () => {
    setDroppedBlocks(droppedBlocks - 1);
  };

  return (
    <div
      ref={dropE}
      className={`${props.class}  min-h-24 rounded-lg border-2 shadow-lg flex flex-col`}
      onClick={() => {
        setKeyVal(props.id);
      }}
    >
      <div className="flex flex-row items-center ">
        <div className="text-lg">{props.operation}</div>
      </div>

      <Reorder.Group axis="y" values={innerBlock} onReorder={setInnerBlock}>
        {innerBlock.map((item) => (
          <Reorder.Item
            key={item.key}
            value={item}
            drag
            className="flex-row content-center"
            onDrop={handleDrop}
            onRemove={handleRemove}
          >
            <button onClick={startAction}>Start Actions</button>
            <BlockinMidArea
              id={item.key}
              class={`items-end ml-10 ${item.class}`}
              operation={item.operation}
              exactOperation={item.ex}
              setFlow={props.setFlow}
              type={"replaceinto"}
              action={item.action}
              setInlist={setInnerBlock}
            />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}

export default ControlBlock;
