import styled from "styled-components";

export const TextAreaWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 8px;
  padding: 10px 20px;
  box-shadow:
    0 19px 38px rgba(0, 0, 0, 0.3),
    0 15px 12px rgba(0, 0, 0, 0.22);

  & div:first-child {
    width: 100%;
    height: 42px;
    display: flex;
    gap: 20px;
    align-items: center;

    img {
      width: 20px;
      height: 20px;
    }
  }

  & div:nth-child(3) {
    width: 100%;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    button {
      background: #0b57d0;
      color: #ffffff;
    }
  }

  textarea {
    width: 100%;
    min-height: 100px;
    max-height: 100%;
    resize: none;
    background: #fff;
    padding: 10px;
    border-radius: 10px;
    border-style: none;

    :focus {
      outline: none;
    }
  }
`;

export const EmailWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
  background: #000000;
  min-height: 93vh;

  .email-title {
    color: white;
  }
`;

export const InnerContainer = styled.div`
  width: 100%;
  hright: 100%;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  margin-top: 10px;
  min-height: 250px;
  div,
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6.span,
  label {
    color: #000000 !important;
  }

  .email-subject {
    color: #fff;
  }

  .email-thread {
    width: 100%;
    padding-top: 25px;
    display: flex;
  }
  .avatarWrapper {
    width: 5%;
  }

  .NameWrapper {
    width: 95%;
    color: #fff;

    p {
      font-style: normal;
      font-weight: 600;
      font-size: 22px;
      line-height: 28px;
      letter-spacing: 0.05em;
      color: #fff;
    }

    .full-emails {
      color: #cecece;
      font-size: 12px;
    }

    .senderName {
      font-size: 14px;
      font-weight: 500;
      line-height: 28px;
      color: #999999;
    }
  }
  .content-Wrapper {
    margin-top: 20px;

    label {
      font-size: 13px;
    }
  }

  .reply-forward-box {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }

  .attachments {
    width: 100%;

    height: 200px;
    background: #ffffff;
    box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 20px;
    margin: 20px 0;

    header {
      font-family: "Roboto", sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 28px;
      color: #000000;
      padding: 0 0 20px 0;
    }

    .attachmentFile {
      width: 100px;
      height: 100px;
      background: #ffffff;
      box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
`;

export const EmailButtons = styled.button`
  width: 100px;
  text-align: center;
  padding: 13px 20px;
  cursor: pointer;
  background: #2e8bc0;
  box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);
  border-radius: 10px;
  color: #ffffff;
  border-style: none;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`;

export const MessageWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 40px;
  display: flex;
  gap: 10px;

  .textAreaWrapper {
    width: 100%;
    position: relative;
    textarea {
      width: 100%;
      height: 100px;
      resize: none;
      background: #fff;
      padding: 20px;
      padding-top: 30px;
      border-radius: 10px;
      position: absolute;

      box-shadow:
        0 19px 38px rgba(0, 0, 0, 0.3),
        0 15px 12px rgba(0, 0, 0, 0.22);
      :focus {
        outline: none;
      }
    }
    span {
      position: absolute;
      z-index: 99;
      top: 10px;
      left: 20px;
    }
    .deleteIcon {
      position: absolute;
      bottom: -35px;
      right: 20px;
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }
`;
