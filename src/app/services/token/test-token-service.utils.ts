export function testCreateMockedTokenService() {
  return jasmine.createSpyObj('TokenService', [
    'getAccessToken',
    'setAccessToken',
    'getRefreshToken',
    'setRefreshToken',
    'clearTokens',
  ]);
}

type MethodsCallCount = {
  setAccessToken?: (string | null | undefined)[] | number;
  setRefreshToken?: (string | null | undefined)[] | number;
  getAccessToken?: number;
  getRefreshToken?: number;
  clearTokens?: number;
};

export function testTokenServiceCalls(
  expectedMethodsCalls: MethodsCallCount,
  mockedTokenService: any
) {
  const methodsWithParams = ['setAccessToken', 'setRefreshToken'];
  const methodKeys = [
    ...methodsWithParams,
    'getAccessToken',
    'getRefreshToken',
    'clearTokens',
  ];

  // for each method
  for (const methodKey of methodKeys) {
    const calls = mockedTokenService[methodKey].calls ?? [];
    const expectedCalls =
      expectedMethodsCalls[methodKey as keyof MethodsCallCount] || 0;

    // if array of calls/parameters
    if (Array.isArray(expectedCalls)) {
      // check if method has the expected call count
      expect(calls.count())
        .withContext(`TokenService.${methodKey}'s call count`)
        .toEqual(expectedCalls.length);

      // for each call of the method
      for (let callIdx = 0; callIdx < calls.length; callIdx++) {
        // check call params
        expect(calls.argsFor[callIdx])
          .withContext(`TokenService.${methodKey}'s params`)
          .toEqual(calls[callIdx]);
      }
    }
    // if number of calls
    else {
      expect(calls.count())
        .withContext(`TokenService.${methodKey}'s call count`)
        .toEqual(expectedCalls);
    }
  }
  return true;
}
