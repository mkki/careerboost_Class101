import React from "react";
import styled from "styled-components";

const ErrorMessage = styled.p`
  color: #cc0077;
`;

interface ErrorProps {
  text: string;
}

const Error: React.FC<ErrorProps> = ({ text }) => {
  return <ErrorMessage>{text}</ErrorMessage>;
};

export default Error;
