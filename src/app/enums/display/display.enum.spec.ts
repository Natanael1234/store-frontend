import { Display } from '@enums/display/display.enum';

describe('Display enum', () => {
    it('should be defined', () => {
        expect(Display).toBeDefined();
    });

    it('should have valid keys and values', () => {
        const options = { ...Display } as any;
        expect(options).toEqual({
            none: 'none',
            contents: 'contents',
            block: 'block',
            flowRoot: 'flow-root',
            inline: 'inline',
            inlineBlock: 'inline-block',
            listItem: 'list-item',
            inlineListItem: 'inline list-item',
            flex: 'flex',
            inlineFlex: 'inline-flex',
            grid: 'grid',
            inlineGrid: 'inline-grid',
            table: 'table',
            inlineTable: 'inline-table',

            // Full display (multi-value)
            blockFlow: 'block flow',
            blockFlowRoot: 'block flow-root',
            inlineFlow: 'inline flow',
            inlineFlowRoot: 'inline flow-root',
            blockFlowListItem: 'block flow list-item',
            inlineFlowListItem: 'inline flow list-item',
            blockFlex: 'block flex',
            inlineFlexFull: 'inline flex', // renamed to avoid conflict
            blockGrid: 'block grid',
            inlineGridFull: 'inline grid',
            blockTable: 'block table',
            inlineTableFull: 'inline table',

            // Global values
            inherit: 'inherit',
            initial: 'initial',
            revert: 'revert',
            revertLayer: 'revert-layer',
            unset: 'unset',
        });
    });
});
