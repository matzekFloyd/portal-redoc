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
