import { Userdetailsbtn, Viewbtn } from "Pages/Stylepage";
import styled from "styled-components";

/* Add User or Create Fake User global page styled components */
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
  select {
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
  .form-data {
    padding: 20px 0px;
  }
  .personal-info {
    padding: 20px;
    display: flex;
    border-bottom: 1px solid #484748;
    .anticon {
      padding: 0px 5px;
    }
  }
  .form-input {
    display: flex;
    padding: 10px 10px;
    width: 100%;
    align-items: center;

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
  .form-details {
    padding: 20px 0px;
  }
  .phone-input {
    padding: 20px 11px;
    width: 48%;
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
  .phone-input {
    width: 100%;

    input {
      background: #212121;
      border-radius: 0px;
      width: 100%;
      border: 1px solid #484748;
    }
    .react-tel-input {
      color: black;
    }
  }
`;

/* Delete User global page styled components */
export const Filters = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/* Fake User global page styled components */
export const FakeUserSearchbox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0px 10px;
  button {
    background: #2879ff;
  }
  input {
    border: none;

    height: 40px;
    padding: 5px;
    font-size: 14px;
    width: 30%;
    border: 1px solid #484748;
    background: #212121;
    color: white;
    &:focus {
      outline: none;
    }
    @media (max-width: 786px) {
      width: 100%;
    }
  }
  .active-btn {
    display: flex;
    gap: 8px;
  }
  .filter-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #01c853;
    border: solid 1px #01c853;
    padding: 10px 20px;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  .adduser-btn {
    background: #2879ff;
    border: solid 1px #2879ff;
    padding: 10px 20px;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  .ant-switch {
    border: 1px solid #484748;
    background: rgba(0, 0, 0, 0.88);
  }
  .ant-switch-checked {
    background: green;
  }
`;
export const FakeUserDropdowndiv = styled.div`
  background: #2a2a2a;
  border: red;

  color: white;
  width: 200px;
  .pause-btn {
    padding: 10px;
    display: flex;
    justify-content: space-between;

    align-items: center;
    p {
      padding: 0px 5px;
    }

    .pause-switch {
      background: black;
    }
  }
  .radio-btns-date {
    padding: 10px;
    color: white;
    .ant-radio-wrapper {
      color: white;
    }
  }
  .dropdown-btn {
    padding: 10px;
    color: white;
    gap: 10px;
    display: flex;
    align-items: center;
    .apply-btn {
      background: #f6cd22;
      color: black;
      padding: 5px 10px;
      border-radius: 5px;
      cursor: pointer;
      border: 1px solid #f6cd22;
    }
    .cancel-btn {
      background: #dee1e6;
      color: Black;
      padding: 5px;
      border-radius: 5px;
      border: 1px solid #dee1e6;
    }
  }
`;

/* Hide User global page styled components */
export const HideUserTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

/* Pre Reg global page style components */
export const PreRegTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

/* Real User global page styled components */
export const RealUserTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;
export const RealUserDropdowndiv = styled.div`
  background: #2a2a2a;
  border: red;

  color: white;
  width: 200px;
  select {
    width: 100%;
  }
  .dropdown-items {
    padding: 10px;
    color: white;
    label {
      color: white;
    }
  }
  .search-box {
    width: 200px;
    padding: 10px;
    input {
      padding: 10px;
      width: 100%;
      height: 30px;
      border-radius: 10px;
    }
  }
  .radio-btns-date {
    padding: 10px;
    color: white;
    .ant-radio-wrapper {
      color: white;
    }
  }
  .day-date {
    color: #000;
    padding: 10px;
  }
  .dropdown-btn {
    padding: 10px;

    color: white;
    gap: 10px;
    display: flex;
    align-items: center;
    .apply-btn {
      background: #f6cd22;
      color: black;
      padding: 5px 10px;
      border-radius: 5px;
      cursor: pointer;

      border: 1px solid #f6cd22;
    }
    .cancel-btn {
      background: #dee1e6;
      color: Black;
      padding: 5px;
      border-radius: 5px;
      cursor: pointer;

      border: 1px solid #dee1e6;
    }
  }
`;

/* Shadow Ban global page styled components */
export const ShadowBanTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

/* User Listin global page styled components */
export const UserListingSearchbox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 10px;

  input {
    color: white;

    height: 40px;
    padding: 5px;
    font-size: 14px;
    width: 30%;
    background: #212121;
    border: 1px solid #484748;
    &:focus {
      outline: none;
    }
  }
  button {
    background: #2879ff;
    border: solid 1px #2879ff;
    padding: 10px 20px;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
`;

/* User Detail global page styled components */
export const UserDetailLoaderWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
  .recomended {
    margin: 10px;
    display: flex;
    gap: 10px;
    justify-content: space-between;
    width: max-content;
    margin: auto;
    .recomended-btn {
      background: #1a7aed;
      color: white;
      border: none;
      padding: 8px;
      cursor: pointer;
    }
    .recomended-hide-btn {
      background: green;
      color: #fff;
      border: none;
      padding: 7px 18px;
      cursor: pointer;
      border-radius: 20px;
    }
  }

  .background-img {
    display: flex;
    justify-content: center;
    height: 50%;
    background: darkgrey;
  }
  .action-btns {
    margin: 10px;
  }

  .profile-pic {
    margin-top: 140px;
    // background: grey;
    border: 5px solid white;
    width: 145px;
    height: 145px;
    background: black;
    display: flex;
    justify-content: center;
    overflow: hidden;
    img {
      width: auto;
      height: 100%;
    }
  }
  .profile-video {
    object-fit: fill;
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
      .swipe-btn {
        cursor: pointer;
      }
    }
  }
`;
export const Carddetails = styled.div`
  width: 75%;
  background: #212121;
  min-height: 535px;

  @media (max-width: 1000px) {
    width: 100%;
    margin-top: 80px;
  }

  .tabs {
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #878787;
  }
  .ant-tabs-tab-btn {
    color: #878787;
  }
  .ant-tabs-nav-list {
    transform: translate(-631px, 0px);
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
  .delete-icon{
    display:none;
    position: absolute;
    top: 12px;
    right: 12px;
    color: #fff;
    z-index: 999;
    cursor: pointer;   
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
  .bottom-btn {
    padding:0px 10px;
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
    span{
      color: white;
    font-size: 14px;
    }
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
      align-items:center;
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
  .video-section{
    height: 280px;
    width: auto;
    padding: 20px 10px 10px 10px;
    border: 1px solid white;
    border-radius: 10px;
    overflow: hidden;
    position:relative;
  }
`;
export const Unverified = styled.div`
  .unverifed-account {
    display: flex;
    width: 24%;
    justify-content: end;
    padding: 0px 10px;
    @media (max-width: 1000px) {
      width: 95%;
    }
    @media (min-width: 1300px) {
      width: 23%;
    }
    @media (min-width: 1500px) {
      width: 22%;
    }
    @media (min-width: 1600px) {
      width: 21%;
    }
    @media (min-width: 1770px) {
      width: 20%;
    }
    @media (min-width: 1870px) {
      width: 19%;
    }
    @media (min-width: 2050px) {
      width: 18%;
    }
  }
  .unverifed-account-box {
    width: 120;
    padding: 2px 5px;
    background: white;
    cursor: pointer;
  }
  .verifed-box {
    background: #01c853;
    display: flex;
    width: 120px;
    align-items: center;
    border-radius: 20px;
    justify-content: center;
    p {
      color: white;
      padding: 8px 2px;
      font-size: 14px;
    }
  }
  .unverifed-box {
    background: #ff2a00;
    display: flex;
    width: 120px;
    align-items: center;
    border-radius: 20px;
    justify-content: center;
    p {
      color: white;
      padding: 8px 2px;
      font-size: 14px;
    }
  }
`;
export const Modals = styled.div`
  .ant-modal .ant-modal-content {
    &:where {
      background: #212121;
    }
  }
`;
export const Yellow = styled(Userdetailsbtn)`
  background: #f6ca16;
`;
export const VoiletBtn = styled(Userdetailsbtn)`
  background: #992fc6;
`;
export const Orangebtn = styled(Userdetailsbtn)`
  background: #ff2a00;
`;
export const Greenbtn = styled(Userdetailsbtn)`
  background: #01c853;
`;
export const Modalbox = styled.div`
  font-size: 14px;
  font-weight: 500;
  background: #2a2a2a;
  color: white;

  .ant-modal-content {
    background: #212121 !important;
  }
  input {
    width: 100%;
    padding: 10px;
    background: #212121;
    border: 1px solid #484748;
    color: white;
    &:focus {
      outline: none;
    }
  }
  select {
    width: 100%;
    padding: 10px;
    background: #212121;
    border: 1px solid #484748;
    color: white;
  }
  textarea {
    background: #212121;
    border: 1px solid #484748;
    width: 100%;
    color: white;
    height: 100px;
    &:focus {
      outline: none;
    }
  }
  .modal-info {
    padding: 10px 0px;
    hr {
      border-width: 0px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 15px;
      margin-top: 10px;
    }
    #about_me {
      padding: 10px;
    }

    .subheading {
      margin-bottom: 10px;
    }
    .add-inspiration {
      font-size: 14px;
      cursor: pointer;
    }
  }
  .flex-wrap {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .half-section {
    padding: 10px 0px;
    width: 48%;
  }
  .btn-style {
    height: 42px;
    min-width: 87px;
    padding: 10px 25px;
    text-transform: capitalize;
    border-radius: 2px;
    cursor: pointer;
    border: 0px;
    font-size: 14px;
    font-weight: 400;
    margin-right: 5px;
  }
  .close {
    background-color: #dcdcdc;
    color: #8b8b8b;
  }
  .update {
    background-color: #2879ff;
    color: white;
  }
`;
export const Personalinfoedit = styled.div`
  level {
    color: white;
  }
  .modal-cheakbox {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    @media (max-width: 500px) {
      flex-direction: column;
    }
    label {
      // font-size:20px;
      font-weight: 600;
    }
    .subheading: {
      margin-bottom: 10px;
    }
    .right-box,
    .left-box {
      width: 50%;
      display: flex;
      padding: 10px 0px;
      flex-direction: column;
      label.subheading {
        color: white;
      }
    }
    .cheakbox {
      display: flex;
      align-items: center;
      padding: 5px 2px;
      label {
        padding: 0px 10px;
        font-size: 16px;
        font-weight: 500;
      }
    }
  }
`;

/* Common styled components used in global user pages */
export const LoaderWrapper = styled.div`
  width: 100%;
  height: 450px;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Buttonview = styled(Viewbtn)`
  background: #2879ff;
  cursor: pointer;
`;
export const Buttonactive = styled(Viewbtn)`
  background: #01c853;
`;
export const Searchbox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  padding: 0px 10px;

  input {
    border: none;

    height: 40px;
    padding: 5px;
    font-size: 14px;
    width: 300px;
    border: 1px solid #484748;
    background: #212121;
    color: white;
    &:focus {
      outline: none;
    }
    @media (max-width: 786px) {
      width: 100%;
    }
  }
  button {
    background: #2879ff;
  }
  select {
    width: 80px;
    border-radius: 5px;
    background: #212121;
    color: white;
    &:focus {
      outline: none;
    }
  }
  .active-btn {
    display: flex;
    gap: 8px;
  }
  .filter-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #01c853;
    border: solid 1px #01c853;
    padding: 10px 20px;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  .export-btn {
    background: red;
    border: solid 1px red;
    padding: 10px 20px;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  .adduser-btn {
    background: #2879ff;
    border: solid 1px #2879ff;
    padding: 10px 20px;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export const SearchboxForPendingPages = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  padding: 0px 10px;

  input {
    border: none;

    height: 40px;
    padding: 5px;
    font-size: 14px;
    width: 30%;
    border: 1px solid #484748;
    background: #212121;
    color: white;
    &:focus {
      outline: none;
    }
    @media (max-width: 786px) {
      width: 100%;
    }
  }
  button {
    background: #2879ff;
  }
  select {
    width: 80px;
    border-radius: 5px;
    background: #212121;
    color: white;
    &:focus {
      outline: none;
    }
  }
  .active-btn {
    display: flex;
    gap: 8px;
  }
  .filter-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #01c853;
    border: solid 1px #01c853;
    padding: 10px 20px;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  .export-btn {
    background: red;
    border: solid 1px red;
    padding: 10px 20px;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  .adduser-btn {
    background: #2879ff;
    border: solid 1px #2879ff;
    padding: 10px 20px;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
`;
