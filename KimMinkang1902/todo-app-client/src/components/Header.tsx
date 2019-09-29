import React from "react";
import styled from "styled-components";

const StyledHeaderContainer = styled.header`
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
`;

const StyledHeader = styled.div`
  max-width: 1024px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 20px;
`;

const StyledTitle = styled.h1`
  flex-grow: 2;
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  text-align: left;
`;

const Header: React.FC = () => {
  return (
    <StyledHeaderContainer>
      <StyledHeader>
        <StyledTitle>Hello, Todo App!</StyledTitle>
      </StyledHeader>
    </StyledHeaderContainer>
  );
};

export default Header;
