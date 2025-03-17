import * as React from 'react';

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
