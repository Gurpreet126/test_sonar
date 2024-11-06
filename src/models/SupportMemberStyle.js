import { Viewbtn } from "Pages/Stylepage";
import styled from "styled-components";

export const TableHeading = styled.h1`
  color: #fff;
  font-size: 28px;
  font-weight: 500;
  padding: 10px 15px;
`;
export const Buttonview = styled(Viewbtn)`
  background: red;
  cursor: pointer;
  padding: 4px 8px;
  font-size: 12px;
`;
export const Deletemodal = styled.div`
  display: flex;
  font-size: 16px;

  color: white;
  align-items: center;
  gap: 15px;
  .anticon {
    color: yellow;
    size: 22px;
  }
`;
export const Emailbox = styled.div`
  padding: 15px;
  display: flex;
  justify-content: end;

  .compose-btn {
    padding: 10px 8px;
    background: red;
    color: white;
    border: 1px solid red;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
  }
`;

export const CreateAtField = styled.div`
  min-width: 75px;
`;
