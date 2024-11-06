import styled from "styled-components";

/* Add Country Modal page styled components */
export const AddCountryModalWrapper = styled.div`
  .content {
    margin-top: 20px;

    label {
      display: block;
    }

    input {
      width: 100%;
      border-radius: 8px;
      border: none;
      margin-top: 5px;
      padding: 10px;
      height: 35px;

      :focus {
        outline: none;
      }
    }

    h3 {
      color: #fff;
      margin-bottom: 20px;
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
      background: green;
      padding: 6px 18px;
      border: none;
      border-radius: 8px;
      color: #fff;
      cursor: pointer;
    }
  }
`;

/* Country info modal page styled components */
export const CountryInfoModalWrapper = styled.div`
  .content {
    margin-top: 20px;

    h3 {
      color: #fff;
      margin-bottom: 20px;
    }
    .edit-or-delete {
      display: flex;
      align-items: center;
      gap: 10px;
      justify-content: space-between;
      margin-bottom: 20px;

      span {
        display: flex;
        align-items: center;
        gap: 10px;

        img {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }
      }
    }
    .edit-section {
      .buttons {
        display: flex;
        width: 100%;
        justify-content: end;
        gap: 10px;
        button {
          background: green;
          padding: 8px 16px;
          border-radius: 8px;
          border: none;
          color: #fff;
          margin-top: 10px;
          cursor: pointer;
        }
      }
      .label {
        display: block;
      }
      .input {
        width: 100%;
        border-radius: 8px;
        border: none;
        margin-top: 5px;
        padding: 10px;
        height: 35px;

        :focus {
          outline: none;
        }
      }
    }
    .buttons {
      display: flex;
      width: 100%;
      justify-content: end;
      button {
        background: green;
        padding: 8px 16px;
        border-radius: 8px;
        border: none;
        color: #fff;
      }
    }
  }
  .ban-btn {
    width: 100%;
    display: flex;
    justify-content: end;
    margin-top: 15px;

    button {
      background: green;
      padding: 6px 18px;
      border: none;
      border-radius: 8px;
      color: #fff;
      cursor: pointer;
    }
  }
`;

/* Super admin actions page styled components */
export const Updateprofilebox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  justify-content: center;
  padding: 0px 60px;

  @media (max-width: 1150px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
export const SuperAdminWrapper = styled.div`
  display: ${({ listingLoader }) => (listingLoader ? "flex" : "inline")};
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px 20px 20px 20px;
  margin: 20px 0px;
  border: 1px solid #484748;
  border-radius: 10px;
  background: #979797;
  color: #000;
  min-height: 396px;
  position: relative;

  @media (max-width: 1101px) {
    min-height: 414px;
  }

  @media (max-width: 786px) {
    width: 100%;
  }

  .select-country {
    .country-header {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .country-heading {
        margin: 0px;
      }
      input {
        height: 30px;
        padding: 5px;
        font-size: 14px;
        width: 30%;
        border: 1px solid #484748;
        background: #212121;
        color: white;
        border-radius: 6px;

        :focus {
          outline: none;
        }
      }
    }
    .grid-div {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      max-height: 285px;
      overflow-x: auto;

      @media (max-width: 1150px) {
        grid-template-columns: repeat(1, 1fr);
      }

      div {
        margin-top: 10px;
        display: flex;
        align-items: center;
        gap: 8px;
        input {
          width: 16px;
          height: 16px;
        }
        p {
          display: flex;
          align-items: center;
          gap: 10px;

          img {
            width: 18px;
            height: 18px;
            cursor: pointer;
          }
        }
      }
    }
    .btns-div {
      display: flex;
      justify-content: end;
      position: absolute;
      width: 95%;
      right: 20px;
      bottom: 20px;
      .update-setting {
        border-radius: 8px;
        padding: 8px 16px;
        border: none;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        :hover {
          transform: scale(1.07);
        }
      }

      .only-btns {
        display: flex;
        gap: 10px;
      }
    }
  }

  .admin-actions {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .actions {
      display: flex;
      gap: 20px;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
      }
      h3 {
        white-space: nowrap;
      }
      span {
        flex-direction: column;
      }
    }
  }
  .edit-icon {
    cursor: pointer;
    padding: 10px 14px;
    border: 1px solid #000;
    border-radius: 50%;
    img {
      width: 20px;
      height: 20px;
    }
  }

  .toggle-switch {
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Modalbox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  .anticon {
    font-size: 60px;
    color: #d33;
  }
  .ant-btn-primary {
    color: #fff;
    background-color: #d33;
  }
  h1 {
    color: white;
    padding: 10px 0px;
    color: #d33;
  }
  p {
    color: white;
    font-size: 18px;
  }
`;
