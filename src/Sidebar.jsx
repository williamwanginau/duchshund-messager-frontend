import React, { useContext, useState } from "react";
import { UserContext } from "./context/UserContext";
import { AppContext } from "./context/AppContext";
import { useNavigate } from "react-router-dom";
import "./SidebarStyles.js";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  IconWrapper,
  SidebarItems,
  PrimaryIcons,
  SecondaryIcons,
  SidebarContainer,
} from "./SidebarStyles";

const Sidebar = () => {
  const [activeButton, setActiveButton] = useState(null);
  const { setSelectedMode } = useContext(AppContext);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    setSelectedMode(buttonName);
  };

  const { user, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    navigate("/");
  };

  return (
    <SidebarContainer>
      <SidebarItems>
        <PrimaryIcons>
          <IconWrapper
            fontSize="large"
            as={PersonIcon}
            $active={activeButton === "person"}
            onClick={() => handleButtonClick("friends")}
          />
          <IconWrapper
            fontSize="large"
            as={ChatIcon}
            $active={activeButton === "chat"}
            onClick={() => handleButtonClick("chats")}
          />
          <IconWrapper
            fontSize="large"
            as={PersonAddIcon}
            $active={activeButton === "personAdd"}
            onClick={() => handleButtonClick("addFriend")}
          />
        </PrimaryIcons>
        <SecondaryIcons>
          <IconWrapper
            fontSize="large"
            as={LogoutIcon}
            onClick={() => handleLogout()}
          />
        </SecondaryIcons>
      </SidebarItems>
    </SidebarContainer>
  );
};

export default Sidebar;
