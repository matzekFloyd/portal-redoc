import * as React from "react";
import { ButtonHTMLAttributes } from "react";
import styled, { css } from "../../../styled-components";

interface ButtonStyledProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: "primary" | "secondary";
}

const variantStyles = {
    primary: css`
        border: 1px solid #0A1264;
        background-color: #0A1264;
        color: #fff;

        &:hover {
            border-color: #080e50;
            background-color: #080e4b;
        }
    `,
    secondary: css`
        border: 1px solid ${props => props.theme.colors.gray['200']};
        color: ${props => props.theme.colors.text.primary};
        background-color: #fff;

        &:hover {
            color: #fff;
            background-color: #37474F;
            border-color: #37474F;
        }
    `,
};

// Base styled button component with common styles
const StyledButton = styled.button<ButtonStyledProps>`
  font-family: ${props => props.theme.typography.fontFamily};
  box-sizing: border-box;
  border-radius: 30px;
  box-shadow: none;
  cursor: pointer;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  padding: 6px 12px;

  ${props => variantStyles[props.variant]}

  &:disabled {
      pointer-events: none;
      cursor: not-allowed;
      opacity: 0.65;
  }
`;

export function ButtonStyled({ variant, ...props }: ButtonStyledProps) {
    return <StyledButton variant={variant} {...props} />;
}
