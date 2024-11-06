import styled from "styled-components";

export const Userinfo = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 0px 10px;

  @media (max-width: 1000px) {
    flex-wrap: wrap;
    gap: 30px;
  }
`;
export const Cardview = styled.div`
  height: 480px;
  width: 300px;
  margin-right: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  @media (max-width: 1000px) {
    width: 100%;
  }

  .background-img {
    display: flex;
    justify-content: center;
    height: 50%;
    background: darkgrey;
  }

  .profile-pic {
    ${"" /* position: absolute; */}
    margin-top: 140px;
    background: grey;
    border: 5px solid white;
    width: 145px;
    height: 145px;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .username h3 {
    padding: 15px 0px;
    color: #ff2a00 !important;
  }
  .username h6 {
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 20px !important;
  }

  .profile-info {
    padding-top: 60px;
    color: white;
    background: black;
    height: 50%;
    text-align: center;

    .social-info {
      border-top: 1px solid darkgrey;
      display: flex;
      justify-content: space-evenly;
      padding: 20px 0px;
      .number-count {
        font-size: 18px;
        padding: 10px 0px;
      }
      .name-info {
        font-size: 14px;
        color: #878787;
      }
    }
  }
`;
export const Followerwrap = styled.div`
  ul {
    list-style: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .user-data > h4 {
    color: white;
    font-weight: 500;
  }
  .follow-list {
    padding: 15px 0px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .video-div{
    position:relative;
    width:100%;
  }
  .video-div:hover{
    .delete-icon {
      display:block!important;
    }
  }
  .video-section{
    height: 280px;
    width: auto;
    padding: 20px 10px 10px 10px;
    border: 1px solid white;
    border-radius: 10px;
    overflow: hidden;
    position:relative;
  }
  .delete-icon{
    display:none;
    position: absolute;
    top: 12px;
    right: 12px;
    color: #fff;
    z-index: 999;
    cursor: pointer;   
    }
  .bottom-btn {
    display: flex;
    gap: 10px;
    justify-content: end;
    flex-wrap: wrap;
  }
  .image-gallery {
    width: 290px;
    height: 290px;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .ant-upload-list-item-container {
    width: 260px !important;
    height: 280px !important;
   
  }
  .ant-upload-list-item-done {
    width: 260px !important;
    height: 280px !important;

  }
  .ant-upload-list-picture-card {
    @media(max-width:786px){
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items: center;
    }
      
    }
  }
  .ant-upload-select {
    width: 260px !important;
    height: 280px !important;
    .ant-upload {
      color: white;
    }
    .anticon-plus {
      color: white;
      font-size: 28px;
    }
  }
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  td,
  th {
    text-align: left;
    padding: 16px;
  }
  tr:nth-child(even) {
    background-color: #2e2e2e;
  }
  .edit-btn {
    display: flex;
    justify-content: end;
    padding: 10px;
  }
  .form {
    padding: 10px 15px;
  }
  label {
    color: white;
    font-size: 14px;
  }
  .form-control-box {
    display: flex;
    border: 0.3px solid #484748;
    justify-content: space-between;
    margin: 10px 0px;

    .anticon-edit {
      padding: 10px;
      font-size: 20px;
      background: #878787;
      color: white;
      cursor: pointer;
    }
  }
  .form-control {
    display: flex;
    color: white;

    align-items: center;
    .phone-outlined {
      display: flex;
      border-right: 1px solid #484748;
    }

    .anticon {
      padding: 10px;
      font-size: 20px;
      background: #3b5998;
    }
    p {
      font-size: 14px;
      padding: 5px 10px;
    }
  }
`;
export const Carddetails = styled.div`
  width: 75%;
  background: #212121;

  @media (max-width: 1000px) {
    width: 100%;
  }

  .tabs {
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #878787;
  }
  .ant-tabs-tab-btn {
    color: #878787;
  }

  .ant-tabs-nav-wrap {
    padding: 0px 20px;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: white;
    text-shadow: 0 0 0.25px currentcolor;
  }
  .ant-tabs-ink-bar {
    position: absolute;
    background: #01c853;
    pointer-events: none;
  }
  .ant-modal-content {
    background-color: #212121 !important;
  }
`;
