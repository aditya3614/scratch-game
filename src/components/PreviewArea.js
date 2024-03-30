import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export default function PreviewArea(props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [lastActionIndex, setLastActionIndex] = useState(-1);
  const animation = useAnimation();
  const [prevFlow, setPrevFlow] = useState([]);

  const isEqual = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  };

  useEffect(() => {
    performActions();
    console.log("flow brooo  " + JSON.stringify(props.flow));
    setPrevFlow(props.flow);
  }, [props.flow]);

  const performActions = async () => {
    const newLastActionIndex = props.flow.length - 1;

    if (newLastActionIndex > lastActionIndex) {
      for (let i = lastActionIndex + 1; i <= newLastActionIndex; i++) {
        const action = props.flow[i];
        await performSingleAction(action);
        setLastActionIndex(i);
      }
    } else if (!isEqual(props.flow, prevFlow)) {
      console.log("new flowww  " + JSON.stringify(props.flow));
      console.log("old flowww " + JSON.stringify(prevFlow));
      const changedBlockIndex = props.flow.findIndex(
        (action, index) =>
          index <= lastActionIndex && !isEqual(action, prevFlow[index])
      );

      if (changedBlockIndex !== -1) {
        const action = props.flow[changedBlockIndex];
        console.log(
          "action is performing att" +
            JSON.stringify(props.flow[changedBlockIndex])
        );
        await performSingleAction(action);
        setLastActionIndex(changedBlockIndex);
      }
    }
  };

  const performSingleAction = async (action) => {
    console.log("single  actions called ");
    if (action && action.action) {
      console.log("andr aaya");
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
    console.log("movement perform called");
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
    console.log("image gets animated");
    await animation.start({
      x: x,
      y: y,
      rotate: rotate,
      transition: { duration: 0.5 },
    });
  };

  const getMessageAction = () => {
    // Find the latest message action in the flow
    const latestMessageAction = props.flow
      .slice()
      .reverse() // Reverse the flow to get the latest message action first
      .find((item) => item.messageAction);

    // If a message action is found, return its message value
    if (latestMessageAction) {
      return latestMessageAction.messageAction.message;
    }

    // If no message action is found, return an empty string
    return "";
  };

  return (
    <div className="preview-area flex items-center justify-center relative ">
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
      {getMessageAction() && (
        <motion.div
          layout
          className="thinkbox "
          animate={animation} // Use the same animation controls as the image
          style={{
            x: position.x, // Match the image's x position
            y: position.y, // Match the image's y position
            rotate: rotation, // Match the image's rotation
          }}
        >
          <div className="thinkbox mb-5 ">
            <div class="flex flex-col w-full max-w-[320px] leading-1.5 px-2 transform rotate-[-25deg] border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
              <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                {getMessageAction()}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
