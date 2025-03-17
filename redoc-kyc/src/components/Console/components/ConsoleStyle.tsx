import styled from '../../../styled-components';
import { ConsoleStyleProps } from '../Console';

export default styled.div<ConsoleStyleProps>`
  width: ${(props) => `calc(100% - ${props.theme.sidebar.width})`};
  position: fixed;
  top: 0; // Set from our CSS (variable), since native ReDoc "scrollYOffset" option is not so great
  right: 0;
  bottom: 0;
  background: ${(props) => props.theme.rightPanel.backgroundColor};
  z-index: 20;
  color: ${(props) => props.theme.rightPanel.textColor};
  display: ${(props) => (props.fullWidth ? 'flex' : 'block')};

  & > :first-child {
    padding-right: 1em;
    margin-right: 1em;
    flex-grow: 1;
  }

  .response {
    position: relative;
  }

  .response p,
  .response h3 {
    margin: 0;
  }

  .wrap-console {
    display: contents;
    padding-right: 0;
    margin-right: 0;
  }

  .wrap-console ul,
  .response ul {
    list-style-type: none;
    padding-left: 0;
  }

  .upper-part {
    background-color: #FFFFFF;
    color: #000000;
    padding: 40px 60px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .whole-response {
    overflow-wrap: anywhere;
    padding: 40px;
    overflow-y: auto;
  }

  .style-input {
    border: 1px solid #d9d9d6;
    box-sizing: border-box;
    border-radius: 3px;
    padding: 7px;
  }

  .form-select:focus {
    box-shadow: none;
  }

  .small-text {
    color: #afb0af;
    font-size: 12px;
    font-weight: 400;
  }

  .label-style {
    color: #373a36;
    font-size: 12px;
    font-weight: 400;
  }

  .oper-name {
    color: #005EFF;
    font-size: 20px;
    font-weight: 700;
  }

  .required {
    text-transform: lowercase;
    font-size: 10px;
    color: #c20042;
  }

  .overflow {
    overflow-y: scroll;
    overflow-x: hidden;
    margin-bottom: 20px;
  }
`;
