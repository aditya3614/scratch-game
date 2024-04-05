import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useFlow } from "./flowContext";

export default function PreviewArea(props) {
  const [ducks, setDucks] = useState([
    { name: "Duck 1", x: 0, y: 0, rotation: 0 },
  ]);
  const [selectedDuckIndex, setSelectedDuckIndex] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [lastActionIndex, setLastActionIndex] = useState(-1);
  const [animationPaused, setAnimationPaused] = useState(false);
  const animation = useAnimation();
  const [isRunning, setIsRunning] = useState(false);
  const controls = useAnimation();
  const [selectedDuck, setSelectedDuck] = useState("duck1");
  const [prevFlow, setPrevFlow] = useState([]);
  const [hideText, setHideText] = useState(false);
  const [latestMessage, setLatestMessage] = useState("");
  const [latestMessageType, setLatestMessageType] = useState("");
  const {
    flow,
    setFlow,
    singleAction,
    setSingleAction,
    singleMessageAction,
    foreverAction,
    setForeverAction,
  } = useFlow();

  //forever control

  useEffect(() => {
    if (foreverAction) {
      startAnimation();
    } else {
      // stopAnimation();
    }
  }, [foreverAction]);

  const startAnimation = async () => {
    setIsRunning(true);

    await animation.start({
      rotate: 360, // Example animation, you can modify as needed
      transition: { duration: 0.8, repeat: Infinity }, // Repeat animation infinitely
    });
  };

  const restartRotation = async () => {
    await animation.stop(); // Stop the current animation
    await animation.start({
      rotate: 0, // Start rotation from 0 degrees
      transition: { duration: 0 }, // No transition for instant restart
    });
    setIsRunning(true); // Set isRunning to true
    await animation.start({
      rotate: 360, // Start rotation again
      transition: { duration: 0.8, repeat: Infinity },
    });
  };

  const stopForeverAction = async () => {
    setIsRunning(false);
    await animation.stop(); // Stop animation
  };
  //code to perform motion and looks
  useEffect(() => {
    performActions();
    console.log("single actionnn " + JSON.stringify(singleAction));
    setPrevFlow(flow);
  }, [singleAction]);

  useEffect(() => {
    console.log("single MESSAGE ACTION " + JSON.stringify(singleMessageAction));
    getMessageAction();
  }, [singleMessageAction]);

  const getMessageAction = () => {
    const latestMessageAction = singleMessageAction;

    if (!latestMessageAction) {
      setLatestMessage("");
      return;
    }
    setHideText(false);
    setLatestMessage(latestMessageAction.message);
    setLatestMessageType(latestMessageAction.type);

    if (latestMessageAction.time) {
      setHideText(false);
      setTimeout(() => {
        setHideText(true);
      }, latestMessageAction.time * 1000);
    }
  };

  const performActions = async () => {
    await performSingleAction(singleAction);
  };

  const performSingleAction = async (action) => {
    const duck = ducks[selectedDuckIndex];
    if (action) {
      const newPosition = await performMovementAction(
        action,
        duck.x,
        duck.y,
        duck.rotation
      );
      const newDucks = [...ducks];
      newDucks[selectedDuckIndex] = {
        ...duck,
        x: newPosition.x,
        y: newPosition.y,
        rotation: newPosition.rotate,
      };
      setDucks(newDucks);
      // setPosition(newPosition);
      // setRotation(newPosition.rotate);
    }
  };

  const performMovementAction = async (action, x, y, rotate) => {
    if (action) {
      const { x: xOffset, y: yOffset, rotate: rotateOffset } = action;
      const newX = x + xOffset;
      const newY = y + yOffset;
      const newRotation = rotate + rotateOffset;
      await animateImage(newX, newY, newRotation);
      return { x: newX, y: newY, rotate: newRotation };
    }
    return { x, y, rotate };
  };

  const animateImage = async (x, y, rotate) => {
    await animation.start({
      x: x,
      y: y,
      rotate: rotate,
      transition: { duration: 0.5 },
    });
  };

  //replay functionality

  const replayActions = async () => {
    setPosition({ x: 0, y: 0 });
    setRotation(0);
    console.log("single action here " + JSON.stringify(singleAction));
    await performReverseSingleAction(singleAction);
  };

  const performReverseSingleAction = async (action) => {
    if (action) {
      const newPosition = await performReverseMovementAction(
        action,
        position.x,
        position.y,
        rotation
      );
      setPosition(newPosition);
      setRotation(newPosition.rotate);
    }
  };

  const performReverseMovementAction = async (action, x, y, rotate) => {
    if (action) {
      const { x: xOffset, y: yOffset, rotate: rotateOffset } = action;
      const newX = x - xOffset;
      const newY = y - yOffset;
      const newRotation = rotate - rotateOffset;
      await animateImage(newX, newY, newRotation);
      return { x: newX, y: newY, rotate: newRotation };
    }
    return { x, y, rotate };
  };

  const handleDragEnd = (event, info, index) => {
    const newDucks = [...ducks];
    newDucks[index] = {
      ...ducks[index],
      x: ducks[index].x + info.offset.x,
      y: ducks[index].y + info.offset.y,
    };
    setDucks(newDucks);
    if (index === selectedDuckIndex) {
      setPosition({
        x: position.x + info.offset.x,
        y: position.y + info.offset.y,
      });
    }
  };
  const handleDivDrag = (event, info) => {
    setPosition({
      x: position.x + info.offset.x,
      y: position.y + info.offset.y,
    });
  };

  const handleCreateDuck = () => {
    const newDucks = [
      ...ducks,
      { name: `Duck ${ducks.length + 1}`, x: 0, y: 0, rotation: 0 },
    ];
    setDucks(newDucks);
  };

  return (
    <div className="w-full" id="parent-id">
      <div className="font-bold text-2xl text-center mt-4 border-b-2 border-current ">
        Preview Area
      </div>
      <div className="flex justify-around">
        <button
          className="border ml-4 rounded m-4 bg-teal-300 font-bold p-2"
          onClick={replayActions}
        >
          Replay
        </button>
        {foreverAction && ( // Conditionally render the stop button if foreverAction is active
          <div>
            <button
              className="border ml-4 rounded m-4 bg-red-400 font-bold p-2"
              onClick={restartRotation}
            >
              restart
            </button>
            <button
              className="border ml-4 rounded m-4 bg-red-400 font-bold p-2"
              onClick={stopForeverAction}
            >
              Stop
            </button>
          </div>
        )}

        <button
          className="border ml-4 rounded m-4 bg-amber-400 font-bold p-2 "
          onClick={handleCreateDuck}
        >
          Create Duck <span className="text-xl  font-bold">⊕</span>
        </button>
        <select
          className="border ml-4 rounded bg-violet-300 font-bold p-2 h-1/2 mt-6 "
          value={selectedDuckIndex}
          onChange={(e) => setSelectedDuckIndex(parseInt(e.target.value))}
        >
          {ducks.map((duck, index) => (
            <option key={index} value={index}>
              {duck.name}
            </option>
          ))}
        </select>
      </div>

      <div className="h-full flex items-center justify-center relative">
        {ducks.map((duck, index) => (
          <motion.img
            key={index}
            layout
            className="w-1/6 relative"
            animate={index === selectedDuckIndex ? animation : {}}
            dragMomentum={false}
            drag
            id={`duck-${index}`}
            onDragEnd={(event, info) => handleDragEnd(event, info, index)}
            style={{
              x: duck.x,
              y: duck.y,
              rotate: duck.rotation,
            }}
            src={`https://www.shutterstock.com/image-vector/duck-icon-600nw-71466952.jpg`}
          />
        ))}
        {latestMessage && !hideText && (
          <motion.div
            layout
            animate={animation}
            className="ml-36"
            onDragEnd={handleDivDrag}
            style={{
              position: "absolute",
              x: position.x,
              y: position.y,
              rotate: rotation,
            }}
          >
            <div className="thinkbox mb-5 ">
              {latestMessageType === "say" ? (
                <div className="flex flex-col w-full max-w-[320px] leading-1.5 px-2 transform rotate-[-25deg] border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                  <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                    {latestMessage}
                  </p>
                </div>
              ) : (
                <div className="flex mb-20 ml-20">
                  <div className="rotate-[-90deg]">
                    <div className="w-4 h-4 mb-4 border-b-2 border-r-2 border-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-8 h-8 mb-4 border-b-2 border-2 border-gray-400 rounded-full animate-bounce"></div>
                  </div>

                  <div className="w-20 h-20 mb-4 border-b-2 mr-4 border-2 text-center flex items-center border-gray-600 rounded-full animate-bounce">
                    {latestMessage}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
