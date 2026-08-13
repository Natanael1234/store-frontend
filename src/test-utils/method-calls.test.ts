export function _testMethodCalls(
    calls: { args: any[] }[],
    expectedCalls: { args: any[] }[],
) {
    expect(calls.length)
        .withContext(`Call count`)
        .toEqual(expectedCalls.length);

    // for each call
    for (let i = 0; i < calls.length; i++) {
        // args of the call
        const args = calls[i].args;
        const expectedArgs = expectedCalls[i].args;
        expect(args.length)
            .withContext(`Call #${i + 1} argument count`)
            .toEqual(expectedArgs.length);
        // for each argument in the call
        for (let j = 0; j < args.length; j++) {
            const arg = args[j];
            const expectedArg = expectedArgs[j];
            expect(arg)
                .withContext(`Call #${i + 1} argument #${j + 1}`)
                .toEqual(expectedArg);
        }
    }
}
