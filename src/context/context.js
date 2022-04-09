import React, { useContext, useState } from 'react';

const RenderContextFlag = React.createContext();
const RenderContextFlagCall = React.createContext();

export function useReRenderFlag() {
  return useContext(RenderContextFlag);
}

export function useReRenderFlagCall() {
  return useContext(RenderContextFlagCall);
}


export function ReRenderProvider({ children }) {
  const [render, setRender] = useState(true);

  function renderComponent() {
    setRender((prev) => !prev);
  }

  return (
    <RenderContextFlag.Provider value={render}>
      <RenderContextFlagCall.Provider value={renderComponent}>
        {children}
      </RenderContextFlagCall.Provider>
    </RenderContextFlag.Provider>
  );
}
