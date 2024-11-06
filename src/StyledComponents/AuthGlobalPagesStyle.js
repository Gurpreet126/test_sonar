import styled from "styled-components";
import { Login_background } from "Utils/Image";

/* Change Password global page styled components */
export const ChangePasswordbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ChangePasswordinfo = styled.div`
  width: 70%;
  padding: 20px;
  display: flex;
  flex-direction: column;

  margin: 20px 0px;
  background: #212121;
  border: 1px solid #484748;
  border-radius: 10px;
  @media (max-width: 500px) {
    padding: 8px;
    width: 100%;
    height: 250px;
    gap: 20px;
  }

  div {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    @media (max-width: 786px) {
      padding: 10px;
    }
  }

  .submit-btn {
    padding: 20px;
    display: flex;
    justify-content: center;
    button {
      border-radius: 20px;
    }
    @media (max-width: 786px) {
      padding: 10px;
    }
  }

  label {
    display: flex;
    align-items: center;
    color: white;
  }

  input {
    width: 70%;
    height: 40px;
    background: #212121;
    border: 1px solid #484748;
    color: white;
    &:focus {
      outline: none;
    }
  }
`;

export const Submitbtn = styled.button`
  padding: 10px 20px;
  width: 110px;
  font-size: 18px;
  color: white;
  background: #e91e63;
  border: #e91e63;
  cursor: pointer;
`;

/* Copy Mail Password global page style components */
export const CopyMailPasswordWrapper = styled.div`
  .content {
    .congratulation {
      color: #fff;
      text-align: center;
      margin: 25px 0px 0px 0px;
    }
    .mail-password-div {
      width: 70%;
      margin: auto;
      .copied-text-1 {
        color: #fff;
        margin-top: 20px;
      }
      .copied-text {
        color: #fff;
      }
    }
    .btn-div {
      display: felx;
      justify-content: end;
      align-items: center;
      button {
        margin-top: 10px;
        padding: 6px 25px;
        border: 1px solid #fff;
        border-radius: 17px;
        font-size: 17px;
        cursor: pointer;
      }
    }
  }
`;

/* Forget Password global page styled components */
export const Logindetails = styled.div`
  .login-wrapper {
    padding: 20px 30px;
    text-align: center;
  }
  .email-section {
    display: flex;
    flex-wrap: wrap;
    margin: 15px 0px;
    justify-content: center;
  }

  .email-label {
    text-align: end;
  }
  .form-input {
    font-family: sans-serif;
    padding: 1px 10px;
    margin: 0px 20px;
    border-radius: 2px;
    border: 1px solid #484748;
    &:focus {
      outline: none;
    }
  }
  .login {
    display: flex;
    align-items: end;
    gap: 30px;
  }

  .login-section {
    width: 150px;
    display: flex;
    justify-content: end;

    align-items: center;
  }
  .login-btn {
    background-color: #fdfeff;
    border-color: #fdfeff;
    margin-left: 85px;
    padding: 3px 15px;
    margin-top: 10px;
    border: 1px solid #979797;
    color: #000;
  }
  .error-box {
    color: red;
  }
`;

/* Login global page styled components */
export const Loginheading = styled.div`
  h1 {
    color: white;
    font-size: 30px;
    margin-top: 26px;
    font-family: Arial, Helvetica, sans-serif;
  }
`;
export const LoginPagedetails = styled.div`
  .login-wrapper {
    padding: 20px 30px;
  }
  .email-section {
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0px;
    p {
      text-decoration: none;
      color: blue;
      cursor: pointer;
      display: block;
      margin-block-start: 0em;
      margin-block-end: 0em;
    }
    @media (max-width: 500px) {
      p {
        margin-top: 20px;
      }
    }
  }
  .email-label {
    width: 65px;
    text-align: end;
  }
  .form-input {
    font-family: sans-serif;
    padding: 1px 10px;
    margin: 0px 20px;
    border-radius: 2px;
    border: 1px solid #484748;
    &:focus {
      outline: none;
    }
  }
  .login {
    display: flex;
    align-items: end;
    gap: 30px;
  }

  .login-section {
    width: 150px;
    display: flex;
    justify-content: end;

    align-items: center;
  }
  .login-btn {
    background-color: #fdfeff;
    border-color: #fdfeff;
    margin-left: 85px;
    padding: 3px 15px;
    margin-top: 10px;
    border: 1px solid #979797;
    color: #000;
  }
  .error-box {
    padding: 1px 10px;
    margin: 0px 20px;
    color: red;
    font-size: 14px;
  }
`;

/* Common styled components */
export const Loginwrapper = styled.div`
  background-image: url(${Login_background});
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Loginform = styled.div`
  box-shadow: 0px -1px 10px #000000;
  margin-top: 40px;
  max-width: 488px;
  border-radius: 7px;
  background-color: #ffffff;
  opacity: 0.7;

  width: 100%;
  outline: 1px solid #036cdb !important;
  .form-heading {
    background-color: #719bda;
    height: 39px;
    display: flex;
    align-items: center;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
  }
  .form-heading > h6 {
    margin-block-start: 0em;
    margin-block-end: 0em;
    color: white;
    font-size: 18px;
    font-family: Arial, Helvetica, sans-serif;
    padding: 0 20px;
  }
`;
export const AuthLoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
