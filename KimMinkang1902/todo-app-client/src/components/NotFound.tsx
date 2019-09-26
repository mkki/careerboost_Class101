import React from "react";
import styled from "styled-components";

const StyledNotFound = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1010px;
  width: 100%;
  margin: 20px auto;
  text-align: center;

  font-weight: 700;
`;

const StyledTitle = styled.div`
  color: #b8000f;
  font-size: 2.5rem;
`;

const StyledDescription = styled.div`
  font-size: 2rem;
`;
const NotFound = () => {
  return (
    <StyledNotFound>
      <StyledTitle>404</StyledTitle>
      <StyledDescription>Page not found</StyledDescription>
    </StyledNotFound>
  );
};

export default NotFound;
