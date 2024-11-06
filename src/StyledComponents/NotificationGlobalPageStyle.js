import { Buttonnotification, Buttonstyle } from "Pages/Stylepage";
import styled from "styled-components";

/* Edit Notification global page styled components */
export const EditNotificationform = styled.div`
  padding: 30px;
  font-size: 16px;
  border: 1px solid #484748;
  background: #212121;
  color: white;
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
  p {
    color: red;
    font-size: 14px;
    padding: 10px 0px;
  }
  @media (max-width: 786px) {
    padding: 5px;
  }
`;
export const EditNotificationbox = styled.div`
  padding: 40px;
  @media (max-width: 786px) {
    padding: 5px;
  }
`;

/* Notifications global page styled components */
export const NotificationsLoaderWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NotificationsDateField = styled.div`
  min-width: 70px;
`;

export const NotificationsTimeField = styled.div`
  min-width: 57px;
`;

export const NotificationsEditbtn = styled(Buttonstyle)`
  padding: 5px 15px !important;
  background: #2879ff;
  cursor: pointer;
`;
export const NotificationsDeletebtn = styled(Buttonstyle)`
  padding: 5px 15px !important;
  background: red;
  cursor: pointer;
`;
export const Notificationbtn = styled(Buttonnotification)`
  background: #2879ff;
  cursor: pointer;
`;
export const NotificationsTableheader = styled.div`
  padding: 20px 10px;
  display: flex;
  justify-content: end;
`;
export const NotificationsModalbox = styled.div`
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
