import styled from "styled-components";

/* Chat layout page styled components */
export const MessageStatus = styled.div({
  display: "flex",
  justifyContent: "end",
  width: "100%",
});

export const MessageInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const ProfileLink = styled.a`
  text-decoration: none;
  color: black;
`;

export const ConversationHeaderRightSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SenderName = styled.div`
  padding: 0 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const ReceiverName = styled.div`
  width: 40%;
  padding: 0 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/* Fake Messager page styled components */
export const SettingOption = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  position: relative;
  flex-direction: column;
  width: 30px;

  .three-dot {
    height: 18px;
    font-size: 31px;
    display: flex;
    justify-content: end;
    align-items: self-end;
    cursor: pointer;
  }
  .unreadCount {
    display: flex;
    align-items: end;
    justify-content: center;
    background: red;
    color: #fff;
    border-radius: 50%;
    font-size: 14px;
    font-weight: 500;
    margin: 0 5px;
    min-width: 25px;
    height: 23px;
    border-radius: 2px;
    padding: 2px;
  }

  .hiddenHeaderDiv {
    background: #fff;
    position: absolute;
    top: 0px;
    width: 100px;
    z-index: 999999;
    right: 0px;
    padding: 10px 5px;
    border-radius: 7px;
    box-shadow: rgba(61, 107, 192, 0.5) 0px 2px 8px;
    transition: all 0.5s ease-out 0s;

    .hiddenHead1 {
      margin: 0px;
      font-size: 14px;
      padding: 10px;
      display: flex;
      align-items: center;
      cursor: pointer;
      gap: 15px;
      font-family: ${({ theme }) => theme?.fontFamily};

      .hiddenLogo {
        font-size: 17px;
      }
    }
    .hiddenHead2 {
      margin: 0px;
      font-size: 14px;
      padding: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 15px;
      font-family: ${({ theme }) => theme?.fontFamily};

      .hiddenLogo2 {
        font-size: 17px;
        color: #ff0000d6;
      }
    }
    .hrTag {
      width: 90%;
      margin: auto;
    }
  }
`;

export const AvatarUsernameWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fd1f68;
  font-size: 18px;
  font-weight: 700;
  position: relative;

  .lastMessage {
    color: #979797;
    font-size: 14px;
    font-weight: 400;
  }
  .message {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .messageTime {
    display: flex;
    justify-content: flex-end;
    color: #349134;
    font-weight: bold;
  }
`;

export const ConversationWrapper = styled.div`
  display: flex;
  margin-right: 20px;
  min-height: 80px;
`;

/* Wave creator page styled components */
export const WaveCreatorrWrapper = styled.div`
  .audio-content {
    width: 300px;
    display: flex;
    align-items: center;
    gap: 8px;
    .audioDiv {
      width: 250px;
      height: 50px;
    }
    .playPause {
      text-align: center;
      margin-top: 0px;

      img {
        cursor: pointer;
        width: 22px;
        height: 22px;
        border: 1px solid #000;
        border-radius: 50%;
        padding: 5px;
      }
    }
  }
`;
