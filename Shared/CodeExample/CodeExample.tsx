import React from "react";
import Prism from "prismjs";
import { codearea } from "./CodeExample.module.scss";
interface IOwnProps {
  code;
  plugins;
  language;
}
class CodeExample extends React.Component<IOwnProps> {
  ref = React.createRef<HTMLDivElement>();
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  componentDidMount() {
    this.highlight();
  }
  componentDidUpdate() {
    this.highlight();
  }
  highlight = () => {
    if (this.ref && this.ref.current) {
      Prism.highlightElement(this.ref.current);
    }
  };
  render() {
    const { code, plugins, language } = this.props;
    return (
      <pre
        className={
          !plugins ? `${codearea}` : `${codearea} ${plugins.join(" ")}`
        }
      >
        <code ref={this.ref} className={`match-braces language-${language}`}>
          {code ? code.trim() : code}
        </code>
      </pre>
    );
  }
}
export default CodeExample;
