import styled from "styled-components";

/* Update phone no page styled components */
export const LabelWrapper = styled.div`
  margin-bottom: 10px;
  label {
    color: white;
    font-weight: 500;
  }
`;

export const FieldWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  select {
    width: 35% !important;
  }
  input {
    width: 60%;
    border: 1px solid #484748;
    color: white;
    height: 39px;
    background: #2a2a2a;
    padding: 0 8px;
  }
`;
