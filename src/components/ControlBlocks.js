import React, { useState, useEffect, useContext } from "react";
import BlockinMidArea from "./BlockinMidArea";
import { useDrop } from "react-dnd";
import { Reorder } from "framer-motion";
import Context from "./Context";
import { useFlow } from "./flowContext";
function ControlBlock(props) {
  const [innerBlock, setInnerBlock] = useState([]);
  const [performActions, setPerformActions] = useState(false);
  const [keyVal, setKeyVal] = useContext(Context);
  const { flow, setFlow } = useFlow();
  //useEffect to perform actions when performActions state changes
  useEffect(() => {
    if (performActions) {
      const actions = innerBlock.map((item) => ({
        action: item.action,
        repeat: item.repeat,
      }));
      console.log("action value " + JSON.stringify(actions));
      setFlow((prevFlow) => [...prevFlow, ...actions]);
      props.setInlist((prevFlow) => [...prevFlow, actions]);
    }
  }, [performActions, innerBlock]);

  // Drop function to add dropped block to the innerBlock array
  const [{ isOver }, dropE] = useDrop(() => ({
    accept: ["insert", "replace", "replaceinto"],

    drop: (item) => addImageToBoard(item.props),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (ite) => {
    console.log("droped itme " + JSON.stringify(ite));
    const temp = {
      func: ite.func,
      class: ite.class,
      operation: ite.operation,
      action: ite.item.action,
      onTap: ite.onTap,
      type: ite.type,
      array: ite.item.array,
    };
    console.log("temp " + JSON.stringify(temp));
    setInnerBlock((prevInnerBlock) => {
      const newInnerBlock = [...prevInnerBlock, { ...temp }];
      console.log("inner block" + JSON.stringify(newInnerBlock));
      return newInnerBlock;
    });
  };

  function handleChange(event) {
    const value = Number(event.target.value.replace(/\D/g, ""));
    // console.log(value)

    props.setBoardItem((prv) => {
      const index = prv.findIndex((object) => {
        return object.key === props.id;
      });
      prv[index].repeat = value;
      // console.log(prv[index], props.id, index)
      // console.log(prv[index].action)
      return [...prv];
    });
  }
  // Stop actions function
  const stopActions = () => {
    setPerformActions(false);
  };
  return (
    <div
      ref={dropE}
      className={`${props.class}  min-h-20 rounded-lg border-2 shadow-lg flex flex-col`}
      onClick={() => {
        {
          setKeyVal(props.id);
        }
        // console.log(keyVal)
      }}
    >
      <div className="flex flex-row items-center ">
        <div className=" text-lg ">{props.operation}</div>
        <input
          onChange={handleChange}
          placeholder="5"
          type="text"
          className="text-blue-900   ml-20  w-12 h-5  border-rounded rounded-xl"
        ></input>
      </div>

      <Reorder.Group axis="y" values={innerBlock} onReorder={setInnerBlock}>
        {innerBlock.map((item) => (
          <Reorder.Item
            key={item.key}
            value={item}
            drag
            className=" flex-row  content-center"
          >
            {" "}
            <button onClick={() => setPerformActions(true)}>
              Start Actions
            </button>
            <BlockinMidArea
              id={item.key}
              class={` items-end ml-10 ${item.class}`}
              operation={item.operation}
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
