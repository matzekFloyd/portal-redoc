import * as React from "react";
import { ApplicationFields } from "../types";

interface ApplicationsAsOptionsProps {
    applications: ApplicationFields[];
}

/**
 *
 * @constructor
 * @param props
 */
export const ApplicationsAsOptions = (props: ApplicationsAsOptionsProps) => {
    const { applications } = props;

    return (
        <>
            {applications?.map((application, index) => {
                const apiKey = application.credentials?.[0]?.consumerKey; //TODO what to do about the other keys in credentials?

                if (!apiKey) {
                    return null;
                }

                const applicationName = application.usageData?.product_name ?? application.name;
                const applicationId = application.appId.slice(-5);

                return (
                    <option key={index} value={apiKey}>
                        {applicationName} - {applicationId}
                    </option>
                );
            })}
        </>
    );
};

/* TODO the above is for KYC need to find a way to have both variants working at the same time

type ApplicationsAsOptionsProps = {
  applications?: any[];
}

export const ApplicationsAsOptions = ({applications}: ApplicationsAsOptionsProps) => {
  return (
    <>
      {
        applications?.map((application, index) => {
          return (
            <option key={index} value={application.userKey}>
              {application.plan.name} - {application.name} - {application.description}
            </option>
          )
        })
      }
    </>
  )
}

 */
