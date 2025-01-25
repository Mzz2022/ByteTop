import type { NavigateOptions } from "react-router-dom";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline text-center bg-blend-color">
        欢迎来到ByteTop
      </h1>
    </>
  );
}

export default App;
