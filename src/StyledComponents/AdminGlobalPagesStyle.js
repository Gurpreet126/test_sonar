import { Buttonstyle } from "Pages/Stylepage";
import styled from "styled-components";

/* Add Admin global page styled components */
export const AddAdminFormdata = styled.div`
  margin: 30px 10px;
  border: 1px solid #484748;
  border-radius: 5px;
  color: white;
  background: #212121;
`;
export const AddAdminFromdatainner = styled.div`
  padding: 30px 10px;
  input {
    background: #212121;
    padding: 10px;
    border: 1px solid #484748;
    margin: 5px 0px;
    width: 100%;
    color: white;
    &:focus {
      outline: none;
    }
  }

  input:focus {
    border: 1px solid #878787;
  }
  .form-data {
    padding: 20px 0px;
  }
  .personal-info {
    padding: 10px;
    display: flex;
    border-bottom: 1px solid #484748;
    .anticon {
      padding: 0px 5px;
    }
  }
  .form-details {
    padding: 20px 0px;
  }
  .form-input {
    display: flex;
    padding: 10px 0px;
    width: 100%;

    div {
      width: 50%;
      padding-right: 20px;
    }
    @media (min-width: 320px) and (max-width: 800px) {
      display: flex;
      flex-direction: column;
      div {
        width: 100%;
        padding-right: 0px;
      }
    }
  }
  .admin-switch {
    display: flex;
    p {
      padding: 0px 10px;
    }
    .ant-switch {
      border: 1px solid #484748;
    }
    .ant-switch-checked {
      background: green;
    }
  }
  .add-photos {
    padding: 10px 0px;
    input {
      margin: 20px 0px;
      width: 50%;
      @media (max-width: 600px) {
        width: 100%;
      }
    }
  }
  .Addbtn {
    background: #01c853;
    border: solid 1px #01c853;
    padding: 10px 20px;
    color: white;
    cursor: pointer;
  }

  .rolesWrapper {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 20px;
    white-space: nowrap;
    margin: 15px 0;
    width: 100%;
    flex-wrap: wrap;

    input {
      background: #212121;
      width: 15px;
      border: 1px solid #484748;
      color: white;
      &:focus {
        outline: none;
      }
    }
  }
`;

/* Add Notification global page styled components */
export const Notificationform = styled.div`
  padding: 30px;
  font-size: 16px;
  border: 1px solid #484748;
  background: #212121;
  color: white;

  .time-picker {
    margin: 10px 0px;
    background: #212121;
    border: 1px solid #484748;
    color: white;
    &:focus {
      outline: none;
    }
  }
  .form-group {
    padding: 10px 0px;

    input {
      width: 100%;
      padding: 10px;
      margin: 10px 0px;
      background: #212121;
      border: 1px solid #484748;
      color: white;
      &:focus {
        outline: none;
      }
    }
    textarea {
      width: 100%;
      background: #212121;
      border: 1px solid #484748;
      color: white;
    }
  }
  .submit-btn {
    background: #01c853;
    border: solid 1px #01c853;
    padding: 10px 20px;
    color: white;
    cursor: pointer;
  }

  @media (max-width: 786px) {
    padding: 5px;
  }
`;
export const Notificationbox = styled.div`
  padding: 40px;
  @media (max-width: 786px) {
    padding: 5px;
  }
`;

/* Admin global page style components */
export const AdminLoaderWrapper = styled.div`
  width: 100%;
  height: 50vh;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const AdminSearchbox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 0;

  input {
    border: 1px solid #484748;
    min-width: 175px;
    height: 40px;
    padding: 5px;
    font-size: 14px;
    width: 30%;
    background: #212121;
    color: white;
    &:focus {
      outline: none;
    }
  }
  button {
    width: 107px;
    background: #2879ff;
    border: solid 1px #2879ff;
    padding: 10px 20px;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  @media (max-width: 500px) {
    padding: 10px 0;
    flex-direction: column;
    input {
      width: 100%;
    }
    button {
      margin: 20px 0px;
    }
  }
`;
export const Status = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 12px;
  .ant-switch {
    background: green;
  }
`;
export const Offlinebtn = styled(Buttonstyle)`
  background: gray;
  font-size: 13px;
  padding: 3px 12px;
`;
export const Onlinebtn = styled(Buttonstyle)`
  background: green;
  font-size: 13px;
  padding: 3px 12px;
`;
export const Deletebtn = styled(Buttonstyle)`
  background: red;
  padding: 6px 20px;
`;
export const Editbtn = styled(Buttonstyle)`
  background: #2879ff;
  padding: 6px 20px;
`;
export const AdminModalbox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  .anticon {
    font-size: 60px;
    color: #d33;
  }
  .ant-btn-primary {
    color: #fff;
    background-color: #d33;
  }
  h1 {
    color: white;
    padding: 10px 0px;
    color: #d33;
  }
  p {
    color: white;
    font-size: 18px;
  }
`;

/* Edit Admin global page styled components */
export const EditAdminFormdata = styled.div`
  margin: 30px 10px 0px 10px;
  border: 1px solid #484748;
  border-radius: 5px;
  color: white;
  background: #212121;
`;
export const EditAdminFromdatainner = styled.div`
  padding: 30px 10px;
  input {
    background: #212121;
    padding: 10px;
    border: 1px solid #484748;
    margin: 5px 0px;
    width: 100%;
    color: white;
    &:focus {
      outline: none;
    }
  }

  input:focus {
    border: 1px solid #878787;
  }
  .form-data {
    padding: 20px 0px;
  }
  .personal-info {
    padding: 10px;
    display: flex;
    border-bottom: 1px solid #484748;
    .anticon {
      padding: 0px 5px;
    }
  }
  .form-details {
    padding: 20px 0px;
  }

  .form-input {
    display: flex;
    padding: 10px 0px;
    width: 100%;

    div {
      width: 50%;
      padding-right: 20px;
    }
    @media (min-width: 320px) and (max-width: 800px) {
      display: flex;
      flex-direction: column;
      div {
        width: 100%;
        padding-right: 0px;
      }
    }
  }
  .admin-switch {
    display: flex;
    p {
      padding: 0px 10px;
    }
    .ant-switch {
      border: 1px solid #484748;
    }
    .ant-switch-checked {
      background: green;
    }
  }
  .add-photos {
    padding: 10px 0px;
    input {
      margin: 20px 0px;
      width: 50%;
      @media (max-width: 600px) {
        width: 100%;
      }
    }
    .profile-img {
      padding: 10px 0px 0px 0px;
    }
  }
  .Addbtn {
    background: #01c853;
    border: solid 1px #01c853;
    padding: 10px 20px;
    color: white;
    cursor: pointer;
  }
  .rolesWrapper {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 20px;
    white-space: nowrap;
    margin: 15px 0;
    width: 100%;
    flex-wrap: wrap;

    input {
      background: #212121;
      width: 15px;
      border: 1px solid #484748;
      color: white;
      &:focus {
        outline: none;
      }
    }
  }
`;
