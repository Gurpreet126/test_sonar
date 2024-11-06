import styled from "styled-components";

export const ChangePasswordbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ChangePasswordinfo = styled.div`
  width: 70%;
  padding: 20px;
  display: flex;
  flex-direction: column;

  margin: 20px 0px;
  background: #212121;
  border: 1px solid #484748;
  border-radius: 10px;
  @media (max-width: 500px) {
    padding: 8px;
    width: 100%;
    height: 200px;
    gap: 20px;
  }

  div {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    @media (max-width: 786px) {
      padding: 0px;
    }
  }

  .submit-btn {
    padding: 20px;
    display: flex;
    justify-content: center;
    button {
      border-radius: 20px;
    }
    @media (max-width: 786px) {
      padding: 10px;
    }
  }

  label {
    display: flex;
    align-items: center;
    color: white;
  }

  input {
    width: 70%;
    height: 40px;
    background: #212121;
    border: 1px solid #484748;
    color: white;
    &:focus {
      outline: none;
    }
  }
`;
export const LoaderWrapper = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Submitbtn = styled.button`
  padding: 10px 20px;
  width: 110px;
  font-size: 18px;
  color: white;
  background: #e91e63;
  border: #e91e63;
  cursor: pointer;
`;
