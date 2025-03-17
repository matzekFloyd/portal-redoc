import { OpenAPIParameterLocation } from "../../types";

export type ParameterType = OpenAPIParameterLocation | 'body';

export type ParameterValues = {
  [parameterType in ParameterType]?: {
    [parameterKey: string]: string
  };
};
