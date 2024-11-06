import styled from "styled-components";

export const Mainwrapper = styled.div`
  width: 100%;
  background: black;
  overflow-x: auto;
  height: calc(100vh - 60px);
  ${"" /* min-height: 100vh; */}

  .filters {
    padding: 0px 0px 0px 15px;
    label {
      color: #fff;
      display: block;
      margin-bottom: 10px;
      font-size: 15px;
    }
    .input {
      height: 40px;
      border-radius: 8px;
      border: none;
      font-size: 15px;
      padding: 0px 10px;
      margin-bottom: 10px;
      color: #000;
    }
    button {
      font-size: 18px;
      background: red;
      border: none;
      border-radius: 8px;
      color: #fff;
      height: 40px;
      padding: 0px 15px;
      margin-left: 10px;
      cursor: pointer;
    }
  }
`;

export const DashboardLink = styled.a`
  text-decoration: none;
  color: grey;
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
export const Mainheading = styled.div`
display:flex;
justify-content:space-between;
padding:15px 15px;
font-family: "Roboto", sans-serif;
color:white;
.chat-filter-btn{
 padding-top:10px;
 .flex-btn-div{
  display:flex;
  align-items:center;
  gap:10px;
 }
 .women-private-div{
  display:flex;
  align-items:center;
  gap:10px;
  justify-content:space-around;
  padding-top:10px;
 }
  .read-btns{
    color:white;
    background-color:green;
    border:none;
    padding:4px 8px;
    border-radius:5px;
    font-size:16px;

  }
}

.page-info{
    display:flex;
    font-size:12px;
    p{
        color:grey;
    }
    .current-page{
        color:white;
    }
    .right-icon{
        padding:0px 10px;
    }
}
@media (min-width: 320px) and (max-width: 800px){
    .page-info{
        display:none;
        .
    }
}


.MessagerHeader {
    font-size:22px;
    font-weight:700;
}


.notificationBell {
    span{
        font-size:20px;
    }
    label{
        font-size:16px;
    }
}

`;
export const Buttonstyle = styled.button`
  border-radius: 20px;
  padding: 10px 25px;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
`;
export const Buttonnotification = styled.button`
  color: white;
  font-size: 15px;
  padding: 15px 25px;
  border: none;
  cursor: pointer;
`;
export const Submitbtn = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  color: white;
  background: #e91e63;
  border: #e91e63;
  cursor: pointer;
`;
export const Viewbtn = styled.button`
  color: white;
  border-radius: 20px;
  font-weight: 500;
  border: none;
  font-size: 11px;
  padding: 5px 10px;
`;
export const Userdetailsbtn = styled.button`
  color: white;
  border-radius: 5px;
  font-weight: 500;
  border: none;
  font-size: 16px;
  padding: 10px 20px;
  cursor: pointer;
`;

export const Validationbox = styled.div`
  padding: 10px 5px;
  .error-text {
    color: red;
    font-size: 12px;
  }
`;
export const LoaderWrappersmall = styled.div`
  display: flex;
  justify-content: center;
  align-itmes: center;
  height: 30px;
`;

export const DateWrapper = styled.div`
  min-width: 72px;
`;
