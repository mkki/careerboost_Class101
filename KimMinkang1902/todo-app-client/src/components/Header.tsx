import React from "react";
import styled from "styled-components";

const StyledHeaderContainer = styled.div`
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

const StyledTitle = styled.div`
  flex-grow: 2;
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  text-align: left;
`;

const StyledNavigation = styled.div`
  flex-grow: 1;
  text-align: right;
`;

const Header: React.FC = () => {
  return (
    <StyledHeaderContainer>
      <StyledHeader>
        <StyledTitle>Hello, Todo App!</StyledTitle>
        <StyledNavigation />
      </StyledHeader>
    </StyledHeaderContainer>
  );
};

export default Header;
