import { Viewbtn } from "Pages/Stylepage";
import styled from "styled-components";

/* Heart Like Modal global page styled components */
export const HeartLikeTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;
export const HeartLikeButtonMatch = styled(Viewbtn)`
  background: #f6ca16;
  color: black;
  font-weight: bold;
  cursor: pointer;
`;
export const HeartLikeRealusers = styled(Viewbtn)`
  background: green;
`;
export const HeartLikeButtonview = styled(Viewbtn)`
  background: #2879ff;
  cursor: pointer;
`;
