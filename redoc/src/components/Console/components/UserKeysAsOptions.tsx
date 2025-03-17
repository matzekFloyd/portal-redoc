import * as React from 'react';

type UserKeysAsOptionsProps = {
  userKeys: any[];
};

export function UserKeysAsOptions({ userKeys }: UserKeysAsOptionsProps) {
  const multipleKeys = userKeys.length > 1;
  const singleKey = userKeys.length === 1 && userKeys[0] !== '';
  return (
    <>
      {multipleKeys
        ? userKeys.map((userKey, index) => {
            return (
              <option key={'default ' + index} value={userKey}>
                User key - default {index}
              </option>
            );
          })
        : singleKey && (
            <option key={'default'} value={userKeys}>
              User key - default
            </option>
          )}
    </>
  );
}
