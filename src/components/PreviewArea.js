import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useFlow } from "./flowContext";

export default function PreviewArea(props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [lastActionIndex, setLastActionIndex] = useState(-1);
  const [animationPaused, setAnimationPaused] = useState(false);
  const animation = useAnimation();
  const [prevFlow, setPrevFlow] = useState([]);
  const [hideText, setHideText] = useState(false);
  const [latestMessage, setLatestMessage] = useState("");
  const [latestMessageType, setLatestMessageType] = useState("");
  const { flow, setFlow } = useFlow();
  const isEqual = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  };

  useEffect(() => {
    performActions();

    setPrevFlow(flow);
    checkForeverAction(); // Check for forever action after flow updates
  }, [flow]);

  const performActions = async () => {
    const newLastActionIndex = flow.length - 1;

    if (newLastActionIndex > lastActionIndex) {
      for (let i = lastActionIndex + 1; i <= newLastActionIndex; i++) {
        const action = flow[i];
        await performSingleAction(action);
        setLastActionIndex(i);
      }
    } else if (!isEqual(flow, prevFlow)) {
      const changedBlockIndex = flow.findIndex(
        (action, index) =>
          index <= lastActionIndex && !isEqual(action, prevFlow[index])
      );

      if (changedBlockIndex !== -1) {
        const action = flow[changedBlockIndex];
        await performSingleAction(action);
        setLastActionIndex(changedBlockIndex);
      }
    }
  };

  const performSingleAction = async (action) => {
    if (action && action.action) {
      const newPosition = await performMovementAction(
        action.action,
        position.x,
        position.y,
        rotation
      );
      setPosition(newPosition);
      setRotation(newPosition.rotate);
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

  useEffect(() => {
    const getMessageAction = () => {
      const latestMessageAction = flow
        .slice()
        .reverse()
        .find((item) => item.messageAction);

      if (!latestMessageAction) {
        setLatestMessage("");
        return;
      }
      setHideText(false);
      setLatestMessage(latestMessageAction.messageAction.message);
      setLatestMessageType(latestMessageAction.messageAction.type);

      if (latestMessageAction.messageAction.time) {
        setHideText(false);
        setTimeout(() => {
          setHideText(true);
        }, latestMessageAction.messageAction.time * 1000);
      }
    };

    getMessageAction();
  }, [flow]);

  const replayActions = async () => {
    setPosition({ x: 0, y: 0 });
    setRotation(0);

    for (let i = flow.length - 1; i >= 0; i--) {
      const action = flow[i];
      await performReverseSingleAction(action);
    }
  };

  const performReverseSingleAction = async (action) => {
    if (action && action.action) {
      const newPosition = await performReverseMovementAction(
        action.action,
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

  const checkForeverAction = () => {
    const foreverAction = flow.find((item) => item.foreverAction);
    if (foreverAction) {
      const actions = foreverAction.foreverAction;
      runForever(actions, 3);
    }
  };

  const runForever = async (actions, iterations) => {
    for (let i = 0; i < iterations; i++) {
      for (const action of actions) {
        if (!animationPaused) {
          await performSingleAction(action);
          await new Promise((resolve) => setTimeout(resolve, 100)); // Add a delay between actions
        } else {
          await new Promise((resolve) => setTimeout(resolve, 100)); // Pause animation
        }
      }
    }
  };

  return (
    <div className="w-full">
      <div className="font-bold text-2xl text-center mt-4 border-b-2 border-current ">
        Preview Area
      </div>
      <div className="flex justify-center">
        <button className="border " onClick={replayActions}>
          replay
        </button>
      </div>

      <div className="h-full  flex items-center justify-center relative ">
        <motion.img
          layout
          className="w-1/6 "
          animate={animation}
          style={{
            x: position.x,
            y: position.y,
            rotate: rotation,
          }}
          src="https://www.shutterstock.com/image-vector/rubber-duck-icon-600nw-71466952.jpg"
        />
        {latestMessage && !hideText && (
          <motion.div
            layout
            animate={animation}
            style={{
              x: position.x,
              y: position.y,
              rotate: rotation,
            }}
          >
            {props.func}
            <div className="thinkbox mb-5 ">
              {latestMessageType === "say" ? (
                <div class="flex flex-col w-full max-w-[320px] leading-1.5 px-2 transform rotate-[-25deg] border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                  <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                    {latestMessage}
                  </p>
                </div>
              ) : (
                <div className="flex mb-20 ">
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
