import { OpenAPIParameterLocation } from '../../types';
import { DeveloperApp, PortalCurrentUsage } from "./components/types";

export type ParameterType = OpenAPIParameterLocation | 'body';

export type ParameterValues = {
  [parameterType in ParameterType]?: {
    [parameterKey: string]: string;
  };
};

export interface ApplicationFields
  extends Pick<DeveloperApp, "appId" | "name" | "createdAt" | "attributes" | "status" | "credentials"> {
  usageData?: PortalCurrentUsage;
}
