import { Link } from "react-router-dom";
import styled from "styled-components";

import { btnReset, v } from "../Styles/Variable";

export const SSidebar = styled.div`
  width: ${({ isOpen }) => (!isOpen ? "50px" : "250px")};

  background: #313131;
  margin-top: 70px;
  position: fixed;
  min-height: 100vh;
  height: 100%;
  z-index: 99;

  transition:
    width 0.5s,
    height 0.5s,
    transform 0.5s;

  &:hover {
    width: ${({ isOpen }) => !isOpen && "250px"};
    position: ${({ isOpen }) => !isOpen && "fixed"};
    z-index: ${({ isOpen }) => !isOpen && 2};
    min-height: 100vh;
    height: 100%;
    transition: 0.3s;
  }
  @media (max-width: 786px) {
    display: ${({ isOpen }) => (!isOpen ? "none" : "initial")};
  }
`;
export const SidebarLabel = styled.span`
  margin-left: 16px;
  transition:
    width 1s,
    height 1s,
    transform 1s;
`;

export const SSidebarButton = styled.button`
  ${btnReset};
  position: absolute;
  top: ${v.xxlSpacing};
  right: ${({ isOpen }) => (isOpen ? "-16px" : "-40px")};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme }) => theme.bg};
  box-shadow:
    0 0 4px ${({ theme }) => theme.bg3},
    0 0 7px ${({ theme }) => theme.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transform: ${({ isOpen }) => (!isOpen ? "rotate(180deg)" : "initial")};
`;
export const SSidebarButton2 = styled.div`
  position: absolute;
  top: 15px;
  right: -40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 40px;
  height: 40px;
  img {
    width: 100%;
    height: 100%;
  }
`;
export const Logo = styled.div``;
export const SLogo = styled.div`
  width: 52px;
  display: flex;
  justify-content: center;
  img {
    width: 18px;
    height: 18px;
  }
  cursor: pointer;
`;

export const SSearch = styled.div`
  background: ${({ theme }) => theme.bgAlpha};
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: ${v.borderRadius};
  input {
    padding: 0 ${v.smSpacing};
    font-family: inherit;
    letter-spacing: inherit;
    font-size: 16px;
    width: 100%;
    outline: none;
    border: none;
    color: inherit;
    background: transparent;
  }
  display: flex;
`;

export const SSearchIcon = styled.button`
  ${btnReset};
  padding: calc(${v.mdSpacing} - 2px) ${v.mdSpacing};
  display: flex;
  cursor: pointer;
  svg {
    font-size: 20px;
  }
`;

export const SDivider = styled.div`
  height: 1px;
  width: 100%;
  background: ${({ theme }) => theme.bg3};
  margin: ${v.lgSpacing} 0;
`;

export const SLinkContainer = styled.div`
  background: ${({ isActive, color }) => (!isActive ? "transparent" : color)};

  margin: 8px 0;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .userSide {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    font-size: 16px;
    padding: calc(${v.smSpacing} - 2px) 0;
    height: 30px;
    cursor: pointer;
  }
`;

export const SLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  font-size: 16px;
  padding: calc(${v.smSpacing} - 2px) 0;
  height: 30px;
`;

export const SLinkIcon = styled.div`
  padding: ${v.smSpacing} ${v.mdSpacing};
  display: flex;
  img {
    font-size: 20px;
  }
`;
export const Dropdownbtn = styled.div`
  margin: 10px;
  transition:
    width 1s,
    height 1s,
    transform 1s;
`;

export const SLinkLabel = styled.div`
  flex: 1;
  width: 166px;
  color: white;
  font-size: 14px;
  transition:
    width 1s,
    height 1s,
    transform 1s;
`;
export const SLinkdropdownlabel = styled.span`
  display: block;
  flex: 1;
  margin-left: 60px;
  color: white;
  font-size: 14px;
  transition:
    width 1s,
    height 1s,
    transform 1s;
`;

export const SLinkNotification = styled.div`
  font-size: 14px;
  padding: calc(${v.smSpacing} / 2) ${v.smSpacing};
  border-radius: calc(${v.borderRadius} / 2);
  background: ${({ theme }) => theme.primary};
  color: white;
  margin-right: ${v.mdSpacing};
`;

export const STheme = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  padding: 0px 12px;
`;
export const SThemeLabel = styled.span`
  display: block;
  flex: 1;
`;
export const SThemeToggler = styled.button`
  ${btnReset};
  margin: 0 auto;
  cursor: pointer;
  width: 36px;
  height: 20px;
  border-radius: 10px;
  background: ${({ theme, isActive }) =>
    !isActive ? theme.bg3 : theme.primary};
  position: relative;
`;

export const SToggleThumb = styled.div`
  height: 18px;
  width: 18px;
  position: absolute;
  top: 1px;
  bottom: 1px;
  transition: 0.2s ease right;
  right: calc(100% - 18px - 1px);
  border-radius: 50%;
  background: ${({ theme }) => theme.bg};
`;
