import { PaginateType } from '../components/Paginator/Paginator.type'

export type FetchIndexType<DataType, ErrorType> = {
  data: DataType | undefined;
  paginate: PaginateType | undefined;
  error: ErrorType | undefined;
};

export async function fetchIndex<DataType, ErrorType>(
  path: string,
  query: string,
  page: number,
): Promise<FetchIndexType<DataType, ErrorType>> {
  let data: DataType | undefined;
  let paginate: PaginateType | undefined;
  let errorHolder: ErrorType | undefined;

  try {
    const response = await fetch(`${path}?page=${page}${query}`, { method: 'GET' });
    if (!response.ok) {
      throw new Error('Server response was not ok');
    }
    const responseJson = await response.json();
    data = responseJson.data.paginate.data;
    paginate = responseJson.data.paginate;
  } catch (error: any) {
    errorHolder = error;
  }

  return {
    data: data,
    paginate: {
      currentPage: paginate?.currentPage,
      perPage: paginate?.perPage,
      lastPage: paginate?.lastPage,
      total: paginate?.total,
    },
    error: errorHolder,
  };
}
