import { expect, vi } from 'vitest';

export function testCreateMockedTokenService() {
    return {
        getAccessToken: vi.fn(),
        setAccessToken: vi.fn(),
        getRefreshToken: vi.fn(),
        setRefreshToken: vi.fn(),
        clearTokens: vi.fn(),
    };
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
    mockedTokenService: Record<string, any>,
) {
    const methodsWithParams = ['setAccessToken', 'setRefreshToken'];
    const methodKeys = [...methodsWithParams, 'getAccessToken', 'getRefreshToken', 'clearTokens'];

    for (const methodKey of methodKeys) {
        const mockFn = mockedTokenService[methodKey];
        const calls = mockFn.mock.calls ?? [];
        const expectedCalls = expectedMethodsCalls[methodKey as keyof MethodsCallCount] || 0;

        if (Array.isArray(expectedCalls)) {
            // Check call count
            expect(calls.length, `TokenService.${methodKey}'s call count`).toEqual(
                expectedCalls.length,
            );

            // Check call parameters
            for (let callIdx = 0; callIdx < calls.length; callIdx++) {
                expect(
                    calls[callIdx][0],
                    `TokenService.${methodKey}'s params at call ${callIdx}`,
                ).toEqual(expectedCalls[callIdx]);
            }
        } else {
            expect(calls.length, `TokenService.${methodKey}'s call count`).toEqual(expectedCalls);
        }
    }
    return true;
}
