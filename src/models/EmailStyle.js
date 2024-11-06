import { Viewbtn } from "Pages/Stylepage";
import styled from "styled-components";

/* Add Auth page style components */
export const Formdata = styled.div`
  margin: 30px 10px;
  border: 1px solid #484748;
  border-radius: 5px;
  color: white;
  background: #212121;
`;

export const Formdatainner = styled.div`
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
  label {
    padding: 10px 0px;
    font-size: 14px;
  }
  .form-data {
    padding: 20px 0px;
  }
  .form-details {
    padding: 20px 0px;
  }
  .add-box {
    padding: 20px 0px;
  }
  .add-btn {
    font-size: 15px;
    font-weight: 500;
    background: #01c853;
    border: solid 1px #01c853;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  .validation-box {
    padding: 10px 5px;
  }
  .error-text {
    color: red;
    font-size: 12px;
  }
`;
export const LoaderWrapper = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

/* Email Layout page styled components */
export const Emailbox = styled.div`
  padding: 15px;

  background: #212121;
  .Top_bar {
    display: flex;
    justify-content: space-between;
    color: white;
  }
  .search-bar {
    display: flex;
    gap: 10px;
    align-items: center;
    input {
      background: #212121;
      border: 1px solid #484748;
      padding: 3px;
      color: #fff;
      &:focus {
        outline: none;
      }
    }

    input:focus {
      border: 1px solid #878787;
    }
  }
  .compose-btn {
    padding: 4px 5px;
    background: red;
    color: white;
    border: 1px solid red;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
  }
`;
export const Tabledata = styled.div`
  padding: 30px 10px;
  .ant-table-title {
    background: #212121 !important;
    color: white !important;

    padding: 0px;

    border-radius: 0px 0px 0 0 !important;
  }
  .ant-table-wrapper .ant-table {
    font-size: 12px !important;
  }
  & .recent-users-table {
    border: 1px solid #484748;

    &.table {
      font-size: 12px !important;
    }
    &.ant-table-wrapper {
      background: #212121 !important;
      font-size: 12px !important;
    }

    & .ant-table-thead > tr > th {
      color: white;
      background: #212121 !important;
      border-bottom: 2px solid #484748;
      border-top: none;
      &:before {
        width: 0px !important;
        height: 0em !important;
        background-color: #f0f0f0;
      }
    }
    .ant-table-thead > tr>>td {
      background: #212121;
    }

    & .ant-table-row {
      td {
        border-bottom: 0.5px solid #484748;

        border-inline-end: transparent !important;
        &:last-child {
          border-inline-end: #1px solid rgba(255, 255, 255, 0.1) !important;
        }
      }
      &:hover {
        td {
          background-color: #2e2e2e !important;
        }
      }
    }
  }

  .ant-table-cell {
    background: #212121;
    color: grey;
    font-weight: 500;
  }
  .ant-table-column-sorter {
    color: white;
    &:hover {
      color: white;
    }
  }
  .ant-table-tbody > tr > td {
    background: #212121;
  }
  .ant-table-footer {
    background: #212121;
    border-radius: 0 0 0px 0px;
  }
  .ant-pagination .ant-pagination-item a {
    color: grey;
  }
  .ant-pagination-prev button {
    color: grey;
  }
  .ant-pagination-next button {
    color: grey;
  }
  @media (max-width: 786px) {
    padding: 20px 0px;
  }
`;
export const Pageinfobox = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 5px;
`;
export const Mailsent = styled.div`
  height: 100%;
  background: #212121;
  .Email-input {
    display: flex;
    gap: 8px;
    padding: 10px 8px;
    align-items: center;
    input {
      width: 100%;
      padding: 5px;
      background: #212121;
      border: 1px solid #484748;
      color: white;

      &:focus {
        outline: none;
      }
    }
    p {
      font-size: 18px;
      font-weight: 600;
    }
  }
  .Email-textarea {
    width: 100%;
    height: 60vh;
    padding: 10px;
    .textarea {
      width: 100%;
      height: 100%;
      padding: 5px;
      font-size: 14px;
      background: #212121;
      border: 1px solid #484748;
      color: white;
      resize: none;

      &:focus {
        outline: none;
      }
    }
  }
  .Email-sent-btn {
    padding: 5px;
  }
  .Email-sent {
    width: 100%;
    padding: 8px;
    background: #2879ff;
    border: 1px solid #2879ff;
    color: white;
    border-radius: 5px;
    font-size: 16px;
    text-align: center;
  }
`;
export const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 10px;
  .compose-btn {
    padding: 4px 5px;
    background: green;
    color: white;
    border: 1px solid green;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
  }
  align-items: center;
  p {
    min-width: 85px;
  }
`;
export const Buttonview = styled(Viewbtn)`
  background: #2879ff;
  cursor: pointer;
  min-width: 92px;
`;
export const Loginsection = styled.div`
  .login_section {
    padding: 10px;
  }
  input {
    width: 100%;
    padding: 5px;
    background: #212121;
    border: 1px solid #484748;
    color: white;

    &:focus {
      outline: none;
    }
  }
  .login-btn {
    padding: 10px;
    display: flex;
    justify-content: center;
    .loginbtn {
      background: #2879ff;
      color: white;
      border: 1px solid #2879ff;
      padding: 5px 10px;
      letter-spacing: 1px;
      cursor: pointer;
    }
  }
`;
