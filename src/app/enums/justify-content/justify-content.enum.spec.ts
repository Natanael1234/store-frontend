import { JustifyContent } from './justify-content.enum';

describe('JustifyContent enum', () => {
    it('should be defined', () => {
        expect(JustifyContent).toBeDefined();
    });

    it('should have valid keys and values', () => {
        const options = { ...JustifyContent } as any;
        expect(options).toEqual({
            flex_start: 'flex-start',
            flex_end: 'flex-end',
            center: 'center',
            space_between: 'space-between',
            space_around: 'space-around',
            space_evenly: 'space-evenly',
            initial: 'initial',
            inherit: 'inherit',
        });
    });
});
