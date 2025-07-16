
export interface PaginationQueryInterface {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  filters?: Record<string, string | number | object>;
}

export interface PaginatedResponseInterface<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
}

export const paginateAndSortAndFilter = async <T>(
  query: any,
  paginationQuery: PaginationQueryInterface
): Promise<PaginatedResponseInterface<T>> => {
  const page = paginationQuery.page || 1;
  const limit = paginationQuery.limit || 10;
  const sortBy = paginationQuery.sortBy || 'id';
  const sortOrder = paginationQuery.sortOrder || 'ASC';
  const filters = paginationQuery.filters || {};

  Object.entries(filters).forEach(([key, value]) => {
    query = query.where(key, value);
  });

  const [result, total] = await Promise.all([
    query
      .orderBy(sortBy, sortOrder)
      .offset((page - 1) * limit)
      .limit(limit)
      .getMany(),
    query.getCount ? query.getCount() : query.clone().getCount(),
  ]);

  return {
    data: result,
    page,
    limit,
    total: typeof total === 'number' ? total : total[0]?.count || 0,
  };
};