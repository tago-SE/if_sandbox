import React, { useEffect, useState } from "react";
import { fadeInAnimation, fadeOutAnimation, leftToRight, rightToLeft } from "./TransitionWrapper.module.scss";

export enum TransitionMethods {
  fadeIn = 0,
  leftToRight = 1,
  rightToLeft = 2
}

interface ITransitionWrapper {
  timeout?: number;
  method?: TransitionMethods;
  children: any;
}

const TransitionWrapper = ({ timeout, method, children }: ITransitionWrapper) => {
  const [visible, toggleVisible] = useState(true);
  const [animation, setAnimation] = useState({ enter: null, exit: null });

  useEffect(() => {
    if (!animation.enter && !animation.exit) {
      switch (method) {
        case TransitionMethods.fadeIn:
          setAnimation({ enter: fadeInAnimation, exit: fadeOutAnimation });
          break;
        case TransitionMethods.leftToRight:
          setAnimation({ enter: leftToRight, exit: rightToLeft });
          break;
        case TransitionMethods.rightToLeft:
          setAnimation({ enter: rightToLeft, exit: leftToRight });
          break;

        default:
          setAnimation({ enter: fadeInAnimation, exit: fadeOutAnimation });
          break;
      }
    }
  }, []);

  useEffect(() => {
    if (timeout) {
      let timer = setTimeout(() => toggleVisible(false), timeout);
      return () => {
        clearTimeout(timer);
      };
    }
  }, []);

  return <div className={visible ? animation.enter : animation.exit}>{children}</div>;
};

export default TransitionWrapper;
