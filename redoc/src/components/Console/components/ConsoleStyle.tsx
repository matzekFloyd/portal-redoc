import styled from '../../../styled-components';
import { ConsoleStyleProps } from '../Console';

// noinspection CssUnusedSymbol
export default styled.div<ConsoleStyleProps>`
  width: ${props => `calc(100% - ${props.theme.sidebar.width})`};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.rightPanel.backgroundColor};
  z-index: 20;
  color: ${props => props.theme.rightPanel.textColor};
  display: ${props => (props.fullWidth ? 'flex' : 'block')};

  & > :first-child {
    padding-right: 1em;
    margin-right: 1em;
    flex-grow: 1;
  }

  .alert {
    position: relative;
    padding: 1rem 1rem;
    margin-bottom: 1rem;
    color: inherit;
    background-color: transparent;
    border: inherit;
    border-radius: 0.375rem;
  }

  .alert-dismissible {
    padding-right: 3rem;
  }

  .alert-dismissible .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    padding: 1.25rem 1rem;
  }

  .alert-warning {
    color: ${(props) => props.theme.colors.text};
    background-color: ${(props) => props.theme.colors.warning.light};
    border-color: ${(props) => props.theme.colors.warning.light};
  }

  .btn {
    text-transform: uppercase;
    letter-spacing: 0.1em;
    cursor: pointer;
  }

  .btn-close {
    box-sizing: content-box;
    width: 1em;
    height: 1em;
    padding: 0.25em 0.25em;
    color: #000;
    background: transparent url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3e%3c/svg%3e") center / 1em auto no-repeat;
    border: 0;
    border-radius: 0.375rem;
    opacity: 0.5;
    cursor: pointer;
  }

  .btn:disabled,
  .btn.disabled,
  fieldset:disabled .btn {
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.65;
    box-shadow: none;
  }

  .btn--primary {
    background-color: ${(props) => props.theme.colors.primary.main};
    border: 1px solid ${(props) => props.theme.colors.primary.main};
    color: #ffffff;
  }

  .btn--primary:hover,
  .btn--primary:active,
  .btn--primary:focus {
    background-color: ${(props) => props.theme.colors.primary.dark};
    border: 1px solid ${(props) => props.theme.colors.primary.dark};
    color: #ffffff;
  }

  .btn--white {
    background-color: #ffffff;
    border: 1px solid #63666a;
    color: #63666a;
  }

  .btn--white:hover,
  .btn--white:active,
  .btn--white:focus {
    background-color: #ffffff;
    border: 1px solid #373a36;
    color: #373a36;
  }

  .btn-sm,
  .btn-group-sm > .btn {
    padding: 0.25rem 34px;
    font-size: 0.875rem;
    border-radius: 50rem;
  }

  .col-6 {
    flex: 0 0 auto;
    width: 50%;
  }

  .col-form-label {
    padding-top: calc(0.375rem + 1px);
    padding-bottom: calc(0.375rem + 1px);
    margin-bottom: 0;
    font-size: inherit;
    font-style: normal;
    font-weight: normal;
    line-height: 1.5;
    color: #373a36;
  }

  .console-code {
    position: relative;
    font-size: 12px;
    margin: 0;
    padding: 10px;
    resize: none;
    border-radius: 4px;
    background: #000;
    font-family: monospace;
    font-weight: 600;
    color: #fff;
  }

  .console-page {
    position: fixed;
    z-index: 999;
    background-color: #fff;
    overflow: hidden;
    padding: 60px;
  }

  .copy-icon {
    position: absolute;
    top: 7px;
    right: 21px;
    z-index: 999;
    cursor: pointer;
    width: 24px;
    height: 24px;
  }

  .d-block {
    display: block !important;
  }

  .d-inline-block {
    display: inline-block !important;
  }

  .d-none {
    display: none !important;
  }

  .fade {
    transition: opacity 0.15s linear;
  }

  .form-control {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #373a36;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #d9d9d6;
    appearance: none;
    border-radius: 3px;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.075);
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .form-select {
    display: block;
    width: 100%;
    padding: 0.375rem 2.25rem 0.375rem 0.75rem;
    -moz-padding-start: calc(0.75rem - 3px);
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #373a36;
    background-color: #fff;
    //background-image: url(data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%2363666A' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e);
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 16px 12px;
    border: 1px solid #d9d9d6;
    border-radius: 3px;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.075);
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    appearance: none;

    &:focus {
      box-shadow: none;
    }
  }

  .form-select-sm {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    padding-left: 0.5rem;
    font-size: 0.875rem;
    border-radius: 0.25rem;
  }

  .label-style {
    color: ${(props) => props.theme.colors.gray};
    font-size: 12px;
    font-weight: 400;
  }

  .mb-3 {
    margin-bottom: 1rem;
  }

  .mb-8 {
    margin-bottom: 8px;
  }

  .mb-16 {
    margin-bottom: 16px;
  }

  .mb-20 {
    margin-bottom: 20px;
  }

  .mb-50 {
    margin-bottom: 50px;
  }

  .me-2 {
    margin-right: 0.5rem;
  }

  .ms-2 {
    margin-left: 0.5rem;
  }

  .mt-2 {
    margin-top: 0.5rem;
  }

  .navigation-page-right {
    font-size: 0.75rem;
    line-height: 12px;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    position: relative;
    display: inline-block;
    color: #373a36;
    cursor: pointer;
  }

  .operation-name {
    color: ${(props) => props.theme.colors.primary.main};
    font-size: 20px;
    font-weight: 700;
  }

  .overflow {
    overflow-y: scroll;
    overflow-x: hidden;
    margin-bottom: 20px;
  }

  .pe-3 {
    padding-right: 1rem;
  }

  .required {
    text-transform: lowercase;
    font-size: 10px;
    color: ${(props) => props.theme.colors.error.main};
  }

  .response {
    position: relative;
  }

  .response p,
  .response h3 {
    margin: 0;
  }

  .small-service-message .service-message {
    width: 50%;
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 0 !important;
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
    background-color: #fff;
    color: #000;
    padding: 40px 60px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .whole-response {
    overflow-wrap: anywhere;
    padding: 40px;
    overflow-y: auto;
    display: inline-block !important;
    flex: 0 0 auto;
    width: 50%;
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

  .small-text {
    color: ${(props) => props.theme.colors.text.secondary};
    font-size: 12px;
    font-weight: 400;
  }

  .style-input {
    border: 1px solid #d9d9d6;
    box-sizing: border-box;
    border-radius: 3px;
    padding: 7px;
  }

  .vertical-align-middle {
    vertical-align: middle;
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
