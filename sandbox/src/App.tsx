import React from "react";
import { Icon } from "./components/If-Design-System/Icon";
import {
  Button,
  PrimaryButton,
  SecondaryButton,
  TertiaryButton,
  InfoButton
} from "./components/If-Design-System/Button";

function App() {
  const [state, setState] = React.useState({ loading: false });
  return (
    <main className="if main">
      <div className="if block">
        <div className="if container" style={{ display: "flex", flexWrap: "wrap" }}>
          <Button loading={true}>Hello Button</Button>
          <PrimaryButton
            variant="tertiary"
            className="my-unique-class"
            loading={state.loading}
            disabled={true}
            onClick={() => setState({ loading: state.loading ? false : true })}
          >
            Primary
          </PrimaryButton>
          <SecondaryButton loading={state.loading} onClick={() => setState({ loading: state.loading ? false : true })}>
            Secondary
          </SecondaryButton>
          <TertiaryButton loading={state.loading} onClick={() => setState({ loading: state.loading ? false : true })}>
            Tertiary
          </TertiaryButton>
          <InfoButton loading={state.loading} onClick={() => setState({ loading: state.loading ? false : true })}>
            Info
          </InfoButton>
          <InfoButton loading={state.loading} onClick={() => setState({ loading: state.loading ? false : true })}>
            <Icon size="small" color="white"></Icon>
            Info
          </InfoButton>
          <PrimaryButton
            loading={state.loading}
            onClick={() => setState({ loading: state.loading ? false : true })}
            size="large"
            style={{ overflow: "wrap" }}
          >
            Primary
            <Icon className="ui date" color="white" style={{ width: "48px", height: "24px", marginLeft: "1.5rem" }} />
          </PrimaryButton>
        </div>
      </div>
    </main>
  );
}

export default App;
