import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        margin: 0;
        box-sizing: border-box;
    }
    body {
        background: ${({ theme }) => theme.bg2};
        color: ${({ theme }) => theme.text};
        font-family: 'Roboto', sans-serif;
        letter-spacing: .6px;
    }
`;

export const LoaderWrapper = styled.div`
  width: 100%;
  height: 600px;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MessageWrapper = styled.div`
  width: 100%;
  position: relative;
  .LikeMessageButton {
    width: 25px;
    height: 25px;
    background: transparent;
    position: absolute;
    top: -9px;
    right: ${({ messageOwner }) => messageOwner === "incoming" && "-24px"};
    left: ${({ messageOwner }) => messageOwner === "outgoing" && "-24px"};
    cursor: pointer;
  }
`;
export const NoConversationSelected = styled.div`
  width: 90%;
  height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    width: 267px;
    height: 267px;
    background: #eff3f4;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
      font-family: "Roboto", sans-serif;
      font-size: 18px;
      font-weight: 900;
      color: #666666;
      padding: 20px 0;
      text-align: center;
    }

    img {
      width: 100px;
    }
  }
`;

export const NoMessageYet = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    font-family: "Roboto", sans-serif;
    font-size: 22px;
    font-weight: 800;
    color: #269ae2;
    padding: 20px 0;
  }

  img {
    width: 60px;
  }
`;

export const SelectedInbox = styled.div`
  width: calc(100% - 310px);
  ${"" /* height: 75vh; */}
  height:100%;
  background: #ffffff;
  @media (max-width: 701px) {
    width: 100%;
  }
  .private-msg-btns {
    display: flex;
    justify-content: right;
    padding: 20px 0px;
    gap: 10px;

    .accept-btn {
      width: 70px;

      button {
        background: green;
        border: 1px solid green;
        color: white;
        width: 100%;
        padding: 7px;
        cursor: pointer;
      }
    }
    .deny-btn {
      width: 70px;

      button {
        background: #eb550d;
        border: 1px solid #eb550d;
        color: white;
        width: 100%;
        padding: 7px;
        cursor: pointer;
      }
    }
  }
`;
export const AllConversations = styled.div`
  width: 310px;
  ${"" /* height: 75vh; */}
  height:100%;
  background: #ffffff;
  @media (max-width: 701px) {
    width: 100%;
  }
`;
export const ChatSectionLayout = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  height: calc(100vh - 223px);
  @media (max-width: 701px) {
    width: 100%;
    height: calc(100% - 223px);
  }
`;
  