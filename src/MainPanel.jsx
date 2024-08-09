import React, { useContext } from "react";
import { AppContext } from "./context/AppContext";
import { MainPanelContainer } from "./MainPanelStyle";

const MainPanel = () => {
  const { selectedMode } = useContext(AppContext);
  return <MainPanelContainer>{selectedMode}</MainPanelContainer>;
};

export default MainPanel;
