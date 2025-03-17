import * as React from "react";
import { useContext } from "react";
import { ConsoleContext, ConsoleContextObject } from "./ConsoleContext";
import styled from "../../styled-components";

const ButtonStyled = styled.div<ConsoleToggleProps>`
  background-color: ${(props) => props.theme.colors.primary.main};
  border: 2px solid #3d7bdc;
  box-sizing: border-box;
  border-radius: 30px;
  box-shadow: none;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.1em;
  color: #ffffff;
  text-transform: uppercase;
  padding: 10px 15px;
  margin-top: 10px;
  cursor: pointer;
  max-width: 225px;
  text-align: center;

  &:hover,
  &:active,
  &:focus {
    background-color: ${(props) => props.theme.colors.primary.dark};
    border: 2px solid ${(props) => props.theme.colors.primary.dark};
    color: #ffffff;
  }
`;

export interface ConsoleToggleProps {
  operation?: boolean;
}

/**
 *
 * @param props
 * @constructor
 */
export function ConsoleToggle(props: ConsoleToggleProps) {
  const { operation } = props;
  const context = useContext(ConsoleContext) as ConsoleContextObject;

  const toggleConsole = () => {
    context.toggleConsole(operation);
  };

  return (
    <>
      <ButtonStyled onClick={() => toggleConsole()}>Try it in our console</ButtonStyled>
    </>
  );
}
