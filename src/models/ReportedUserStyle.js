import { Viewbtn } from "Pages/Stylepage";
import styled from "styled-components";

/* Reported user page styled components */
export const LoaderWrapper = styled.div`
  width: 100%;
  height: 450px;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Buttonactive = styled(Viewbtn)`
  background: #01c853;
`;
export const Buttonview = styled(Viewbtn)`
  background: #2879ff;
  cursor: pointer;
`;

export const ButtonResolved = styled(Viewbtn)`
  background: #ed7d31;
  cursor: pointer;
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
export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

/* Sticky notes modal page styled components */
export const StickyWrapper = styled.div`
  width: 250px;
  height: 250px;
  background: yellow;
  color: black;
  padding: 30px 15px 15px 15px;
  text-align: center;
`;
