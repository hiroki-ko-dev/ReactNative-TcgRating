export type FetchStoreType<DataType, ErrorType> = {
  data: DataType | undefined;
  error: ErrorType | undefined;
};

export async function fetchStore<DataType, ErrorType>(
  path: string,
  requestBody: string,
): Promise<FetchStoreType<DataType, ErrorType>> {
  let data: DataType | undefined;
  let errorHolder: ErrorType | undefined;

  try {
    const response = await fetch(`${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: requestBody,
    });
    if (!response.ok) {
      throw new Error('Server response was not ok');
    }
    const responseJson = await response.json();
    data = responseJson.data;
  } catch (error: any) {
    errorHolder = error;
  }

  return {
    data: data,
    error: errorHolder,
  };
}
