export interface ReqMarvelComicDTO {
  title: string;
  description?: string;
  images: {
    path: string;
    extension: string;
  }[];
  thumbnail: {
    path: string;
    extension: string;
  };
  textObjects: {
    type: string;
    language: string;
    text: string;
  }[];
  dates: {
    type: string;
    date: string;
  }[];
  prices: {
    type: string;
    price: number;
  }[];
  creators: {
    items: {
      name: string;
      role: string;
    }[];
  };
}
