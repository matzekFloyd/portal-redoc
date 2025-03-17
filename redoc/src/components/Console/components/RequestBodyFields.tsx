import * as React from 'react';
import { FieldModel } from '../../../services';
import { Parameter } from './Parameter';

type RequestBodyFieldsProps = {
  fields: FieldModel[] | undefined;
  paramByOperation: (type: string, name: string) => string;
  setParameter: (type: string, name: string, value: string) => void;
};

/**
 *
 * @param fields
 * @param paramByOperation
 * @param setParameter
 * @constructor
 */
export const RequestBodyFields = ({
  fields,
  paramByOperation,
  setParameter,
}: RequestBodyFieldsProps) => {
  if (!fields) return <></>;

  return (
    <ul>
      {fields.map((field, index) => {
        if (field.schema.fields && field.schema.fields.length !== 0) {
          const paramByOperationParent = (_body: any, name: string | number) => {
            const param = paramByOperation('body', field.name) || '{}';
            const jsonObject = JSON.parse(param);
            return jsonObject[name];
          };

          const setParameterParent = (_body: any, name: string | number, value: any) => {
            const jsonObject = JSON.parse(paramByOperation('body', field.name) || '{}');
            jsonObject[name] = value;
            setParameter('body', field.name, JSON.stringify(jsonObject));
          };

          return (
            <li key={`${index}-${field.name}`}>
              <p>{field.name}</p>
              <RequestBodyFields
                fields={field.schema.fields}
                paramByOperation={paramByOperationParent}
                setParameter={setParameterParent}
              />
            </li>
          );
        }

        return (
          <Parameter
            key={`${index}-${field.name}`}
            parameter={field}
            /* field.in is null for body params, making it 'body' explicitly */
            setParameter={(_in, name, value) => setParameter('body', name, value)}
            paramByOperation={(_in, name) => paramByOperation('body', name)}
          />
        );
      })}
    </ul>
  );
};
