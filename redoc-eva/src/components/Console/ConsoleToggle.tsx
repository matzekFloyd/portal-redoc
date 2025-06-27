import * as React from "react";
import { useContext } from "react";
import { ButtonStyled } from "./components/ButtonStyled";
import { ConsoleContext, ConsoleContextObject } from "./ConsoleContext";
import styled from "../../styled-components";

const ConsoleToggleStyled = styled.div`
    text-align: right;
    margin-top: 1rem;
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
        <ConsoleToggleStyled>
            <ButtonStyled onClick={() => toggleConsole()} variant={"secondary"}>Try in console</ButtonStyled>
        </ConsoleToggleStyled>
    );
}
