/** User table row. */
// TODO: turn into a generic interface used both by table and list.
// TODO: remover?
export interface UserTableRow {
    /** Row id. */
    id: string;
    /** User name. */
    name: string;
    /** User email. */
    email: string;
    /** If user is active. */
    active: boolean;
    /** If user is deleted. */
    deleted: boolean;
}
