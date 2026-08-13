import { FirstErrorMessagePipe } from '@pipes/first-error-message.pipe';

describe('FirstErrorMessagePipe', () => {
    it('create an instance', () => {
        const pipe = new FirstErrorMessagePipe();
        expect(pipe).toBeTruthy();
    });
});
