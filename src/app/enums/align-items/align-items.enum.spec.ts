import { AlignItems } from './align-items.enum';

describe('AlignItems enum', () => {
    it('should be defined', () => {
        expect(AlignItems).toBeDefined();
    });

    it('should have valid keys and values', () => {
        const options = { ...AlignItems } as any;
        expect(options).toEqual({
            normal: 'normal',
            stretch: 'stretch',
            center: 'center',
            flex_start: 'flex-start',
            flex_end: 'flex-end',
            start: 'start',
            end: 'end',
            baseline: 'baseline',
            initial: 'initial',
            inherit: 'inherit',
        });
    });
});
