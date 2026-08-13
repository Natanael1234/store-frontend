import { ColumnData } from '@components/table/table/model/column-data/column-data.model';

export class Row {
    public id: string;
    public columns: { [key: string]: ColumnData };

    constructor(options: {
        id: string;
        columns: { [key: string]: ColumnData };
    }) {
        this.id = options.id;
        this.columns = options.columns;
    }
}
