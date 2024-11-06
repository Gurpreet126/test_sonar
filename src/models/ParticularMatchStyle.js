import { Viewbtn } from "Pages/Stylepage";
import styled from "styled-components";

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

export const LoaderWrapper = styled.div`
  width: 100%;
  height: 270px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Tabledata = styled.div`
  padding: 30px 10px;
  min-height: 330px;
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
  .ant-table-container table > thead > tr:first-child > *:first-child {
    border-start-start-radius: 0px;
  }
  .ant-table-container table > thead > tr:first-child > *:last-child {
    border-start-end-radius: 0px;
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

export const TableMessageButton = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px 15px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 8px;
  color: #000000;
  background: #bebf08;
  cursor: pointer;
`;

export const TableRealFakeUser = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px 15px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 8px;
  color: #ffffff;
`;

export const Buttonactive = styled(Viewbtn)`
  background: #01c853;
`;
