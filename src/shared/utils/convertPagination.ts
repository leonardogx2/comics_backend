interface IConvertPaginationData {
  page: number;
  size: number;
}

interface IConvertPaginationOutput {
  take: number;
  skip: number;
}

export function convertPagination({
  page,
  size,
}: IConvertPaginationData): IConvertPaginationOutput {
  const skip = (page - 1) * size;
  const take = Number(size);

  return { skip, take };
}
