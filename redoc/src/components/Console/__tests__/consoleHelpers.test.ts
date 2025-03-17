// @ts-ignore
import { filterByOperationId } from '../consoleHelpers';

describe('filterByOperationId', () => {
  it('should return an empty object when an empty object is provided', () => {
    const result = filterByOperationId({}, 'abc123');
    expect(result).toEqual({});
  });

  it('should filter by operationId and keep the rest of the object as it is', () => {
    const result = filterByOperationId({
      body: {
        'operationId1-countryCode': 'AT',
        'operationId1-searchMethod': 'NAME',
        'operationId2-monitorId': '2',
        'operationId3-monitorId': '3',
      },
      query: {
        'operationId1-countryCode': 'AT',
        'operationId1-limit': '10',
        'operationId2-countryCode': 'US',
        'operationId2-monitorId': '123',
      },
      path: {
        'operationId2-field1': 'foo',
        'operationId2-field12': 'bar',
      },
    }, 'operationId2');

    expect(result).toEqual({
      body: {
        'operationId1-countryCode': 'AT',
        'operationId1-searchMethod': 'NAME',
        'operationId3-monitorId': '3',
      },
      query: {
        'operationId1-countryCode': 'AT',
        'operationId1-limit': '10',
      },
      path: {},
    });
  });
});
