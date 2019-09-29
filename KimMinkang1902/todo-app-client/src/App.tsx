import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import GlobalStyle from "./theme/globalStyle";
import { FolderContainer, TodoContainer, NotFoundContainer } from "./containers";
import { Header } from "./components";
import styled from "styled-components";

const StyledAppContainer = styled.main`
  font-size: 16px;
  min-height: 840px;
`;

const App: React.FC = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <Header />
      <StyledAppContainer>
        <Switch>
          <Route exact path="/" component={FolderContainer} />
          <Route exact path="/folders/:id" component={TodoContainer} />
          <Route path="" component={NotFoundContainer} />
        </Switch>
      </StyledAppContainer>
    </Fragment>
  );
};

export default App;
