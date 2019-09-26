import React from "react";
import styled from "styled-components";

const StyledLoading = styled.div`
  margin: 0 auto;
`;

const StyledSpinner = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 1em auto;
  background: #333;
  animation: spin 1s infinite ease-in-out;

  &::after,
  &::before {
    animation: spin 1s infinite ease-in-out;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
  }

  @keyframes spin {
    from {
      transform: scale(0);
      opacity: 1;
    }
    to {
      transform: scale(1);
      opacity: 0;
    }
  }
`;

const Loading: React.FC = () => {
  return (
    <StyledLoading>
      <StyledSpinner />
    </StyledLoading>
  );
};

export default Loading;
