export class PaginatedResponseDTO<T, O> {
  constructor(
    public readonly textQuery: string,

    public readonly count: number,

    public readonly page: number,

    public readonly pageSize: number,

    public readonly orderBy: O[],

    public readonly results: T[]
  ) {}
}
