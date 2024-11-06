import { Link } from "react-router-dom";
import styled from "styled-components";

/* Dashboard global page styled component */
export const Main = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
export const Wrappermain = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  .outlet {
    overflow-x: auto;
    width: 100%;
    margin: 60px 0px 0 50px;
    height: 100%;
    @media (max-width: 786px) {
      margin: 60px 0px 0 0px;
      overflow: auto;
    }
  }
`;

/* Dashboard Info global page styled components */
export const Dashboardcard = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 10px;
  gap: 10px;

  @media (max-width: 1200px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    padding: 0px;
  }
`;
export const Card = styled.div`
  display: flex;
  padding: 8px 5px;
  cursor: pointer;
`;
export const Cardinfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: center;
  justify-content: center;
  font-weight: 500;
  color: white;
  font-size: 14px;
  width: 50%;
  @media (max-width: 680px) {
    font-size: 12px;
  }
`;
export const Cardlogo = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  padding: 20px;
  img {
    width: 50px;
    height: 50px;
  }
`;
export const Tabledata = styled.div`
  padding: 10px;
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
      color: white !important;
      background: #212121 !important;
      border-bottom: 2px solid #484748;
      &:before {
        width: 0px !important;
        height: 0em !important;
        background-color: #f0f0f0;
      }
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
    color: white;
  }
`;
export const Button = styled.button`
  background: #2879ff;
  color: white;
  border-radius: 20px;
  font-weight: 500;
  border: none;
  padding: 5px 10px;
  font-size: 12px;
  cursor: pointer;
`;
export const Tableheader = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
`;
export const SLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
