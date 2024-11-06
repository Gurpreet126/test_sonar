import styled from "styled-components";

/* Header page styled components */
export const Loginheader = styled.div`
  width: 100%;
  max-width: 1212px;
  margin: 0 auto;
  height: 81px;
  border-radius: 0 0 4px 4px;
  background: linear-gradient(45deg, #fff 80%, #8ca7d4);
`;

/* Hide user modal page styled components */
export const ShadowBanModalWrapper = styled.div`
  .content {
    display: flex;
    align-items: center;
    gap: 8px;

    h3 {
      color: #fff;
    }
    svg {
      font-size: 20px;
      color: red;
    }
  }
  .ban-btn {
    width: 100%;
    display: flex;
    justify-content: end;
    margin-top: 15px;

    button {
      background: red;
      padding: 6px 18px;
      border: none;
      border-radius: 8px;
      color: #fff;
      cursor: pointer;
    }
  }
`;

/* Navbar page styled components */
export const NotificationBellWarpper = styled.div`
height: 100%;
display: flex;
justify-content: center;
align-content: center;

.notificationBell {
  display:flex;
  align-items: center;
  postion:relative;
  cursor:pointer;
  span{
      font-size:20px;
      
  }
  label{
    position: absolute;
    top:5px;
    right:15px;
    font-size:18px;
    color: #fff;
  }

`;

export const Settingbtn = styled.div`
  width: 50px;
  position: fixed;
  right: 1%;
  bottom: 16%;
  z-index: 1;
  .drawer {
    width: 300px !important;
  }

  button {
    position: fixed;
    padding: 10px;
    background: #01c853;
    border: solid 1px #01c853;
    border-radius: 50px;
  }
`;

export const Navbarfixed = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  justify-content: space-between;
  padding: 0px 15px;
  background: black;
  border-bottom: 1px solid #484748;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 99;
`;
export const Navlogo = styled.div`
display:flex;
align-items: center;

.ibeor-logo{
  width:190px;
  
    img{
      display:flex;
  justify-content: center;
  width:80px;
  }
  @media (max-width:786px){
    display:none;
  }
   }
.menu-logo{
  width:130px;
  display:flex;
  justify-content:center;
  @media (max-width:786px){
   width:40px;
  }
}

}
`;

export const Accountinfo = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 10px;
  h4 {
    color: white;
    padding: 0px 10px;
    cursor: pointer;

    font-family: "Roboto", sans-serif;
    font-size: 14px;
    @media (max-width: 500px) {
      font-size: 8px;
    }
  }
  .ant-avatar {
    cursor: pointer;
  }
`;
export const Popoverinfo = styled.div`
  div {
    display: flex;
    align-items: center;
    padding: 8px 8px;

    cursor: pointer;
  }
  p {
    padding: 0px 10px;
  }
  .anticon {
    font-size: 16px;
  }
  .ant-popover {
    padding: 0px;
  }

  button {
    height: 24px;
  }

  .Online-Status {
    width: 30px;
    height: 30px;
  }
`;
export const Colortheme = styled.div`
  p {
    font-size: 15px;
    font-weight: 500;
    padding: 10px;
  }
  .card-box {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 10px;
    gap: 20px;
  }
  .color-box {
    width: 40px;
    height: 40px;
    border: 1px solid grey;
  }
  .box-header {
    width: 100%;
    height: 30%;
    background: black;
  }
  .box-main {
    display: flex;
    width: 100%;
    height: 70%;
  }
  .box-leftbar {
    width: 20%;
    height: 100%;

    background: #212121;
  }
  .box-rightbar {
    width: 80%;
    background: #f5f5f5;
  }
`;
export const Primarycolor = styled.div`
  padding: 30px 10px;
  color: white;
  p {
    font-weight: 500;
    font-size: 15px;
    padding: 10px 0px;
  }
  .ant-radio {
    color: white;
  }
  .ant-radio-wrapper span {
    color: white;
  }
`;
