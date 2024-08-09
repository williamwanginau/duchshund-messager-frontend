import React from "react";
import Sidebar from "./Sidebar";
import MainPanel from "./MainPanel";

import {
  ChatContainer,
  SidebarContainer,
  MainPanelContainer,
} from "./ChatStyles";

const Chat = () => {
  return (
    <ChatContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <MainPanelContainer>
        <MainPanel />
      </MainPanelContainer>
    </ChatContainer>
  );
};

export default Chat;
