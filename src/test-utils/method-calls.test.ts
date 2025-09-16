export function _testMethodCalls(
    calls: { args: any[] }[],
    expectedCalls: { args: any[] }[],
) {
    expect(calls.length)
        .withContext(`is the expected number of calls?`)
        .toEqual(expectedCalls.length);

    // for each call
    for (let i = 0; i < calls.length; i++) {
        // args of the call
        const args = calls[i].args;
        const expectedArgs = expectedCalls[i].args;
        expect(args.length)
            .withContext(
                `do call #${i + 1} has the expected number of arguments?`,
            )
            .toEqual(expectedArgs.length);
        // for each argument in the call
        for (let j = 0; j < args.length; j++) {
            const arg = args[j];
            const expectedArg = expectedArgs[j];
            expect(arg)
                .withContext(
                    `Iscal call #${i + 1}'s argument #${j + 1} the expected one?`,
                )
                .toEqual(expectedArg);
        }
    }
}
