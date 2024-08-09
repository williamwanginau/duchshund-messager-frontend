import styled from "styled-components";

export const SidebarContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 1.5rem 1em;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1f1f1f;
`;

export const SidebarItems = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

export const PrimaryIcons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

export const SecondaryIcons = styled.div``;

export const IconWrapper = styled.div`
  color: ${(props) => (props.$active ? "#d5d5d5" : "#777777")};
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => (props.$active ? "#d5d5d5" : "#939393")};
    cursor: pointer;
  }
`;
