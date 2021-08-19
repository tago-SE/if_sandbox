import React, {
  Component,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { Transition } from "react-transition-group";
import * as styles from "./VerticalTransitionStep.module.scss";

const useOnScreen = (ref: any) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const observer = new IntersectionObserver(
    ([entry]) => {
      // Should not toggle when element leaves viewport after enter
      !entry.isIntersecting || setIntersecting(entry.isIntersecting);

      // setIntersecting(entry.isIntersecting);
    },
    { rootMargin: "0px 0px -20% 0px" }
  );

  useEffect(() => {
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  });
  return isIntersecting;
};

const duration = 1000;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
  unmounted: { opacity: 0 },
};

interface IStep {
  header: any;
  content: any;
  id?: number;
}

const Step = ({ id, header, content }: IStep) => {
  const ref = useRef(null);
  const isVisible = useOnScreen(ref);
  return (
    <div ref={ref} id={styles.stepWrap}>
      <Transition in={isVisible} timeout={500}>
        {(state) => (
          <div className={styles.step}>
            <div
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
              className={styles.stepContent}
            >
              <div className={styles.stepContentNumberBox}>{id}</div>
              <div
                className={`${styles.stepContentBox} if color background lightBeige`}
              >
                <h3 className="if text">{header}</h3>
                {content}
              </div>
            </div>
          </div>
        )}
      </Transition>
    </div>
  );
};

export default class VerticalTransitionStepList extends Component {
  public render(): ReactNode {
    // Code moved from stepblock because of refactoring, replace with props array to use.
    const list = [
      {
        id: 1,
        header: "Header 1",
        content: "Content 1",
      },
      {
        id: 2,
        header: "Header 2",
        content: "Content 2",
      },
      {
        id: 3,
        header: "Header 3",
        content: "Content 3",
      },
      {
        id: 4,
        header: "Header 4",
        content: "Content 4",
      },
      {
        id: 5,
        header: "Header 5",
        content: "Content 5",
      },
    ];

    const style = {
      backgroundSize: "5rem",
      height: "5rem",
      width: "5rem",
      margin: "0 auto",
    };

    // const x = styles.

    return (
      <div className="if block">
        <div className="if container">
          <div>
            <div className={styles.wrapper}>
              <div
                className="if icon product glasses"
                style={{ ...style, marginBottom: "50px" }}
              ></div>
              <div className={styles.stepContainer}>
                {list.map((item) => {
                  return (
                    <Step
                      key={item.id}
                      id={item.id}
                      header={item.header}
                      content={item.content}
                    />
                  );
                })}
              </div>
              <div
                className="if icon ui cockade"
                style={{ ...style, marginTop: "50px" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
