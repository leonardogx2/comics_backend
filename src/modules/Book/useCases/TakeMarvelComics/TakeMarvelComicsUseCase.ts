import crypto from "crypto-js";
import { ReqMarvelComicDTO } from "../../dtos/ReqMarvelComicDTO";
import axios from "axios";
import { Book } from "../../entity/Book";
import { seed_user_stanlee_id } from "../../../../../prisma/seeds/seedIds";
import { CreateBookDTO } from "../../dtos/CreateBookDTO";
import { IBookRepository } from "../../infra/types/IBookRepository";

export class TakeMarvelComicsUseCase {
  async execute(): Promise<CreateBookDTO[]> {
    const comicBooks: CreateBookDTO[] = [];

    const reqMarvelComics = await this.receiveComics();

    for (let i = 0; i < reqMarvelComics.length; i++) {
      const refinedComic = this.refineReqComic(reqMarvelComics[i]);
      if (refinedComic) comicBooks.push(refinedComic);
    }

    return comicBooks;
  }

  private async receiveComics(): Promise<ReqMarvelComicDTO[]> {
    const API_PUBLIC_KEY = process.env.API_MARVEL_PUBLIC_KEY;
    const API_PRIVATE_KEY = process.env.API_MARVEL_PRIVATE_KEY;
    const ts = 1;

    const hash = crypto.MD5(`${ts}${API_PRIVATE_KEY}${API_PUBLIC_KEY}`);
    const apikey = API_PUBLIC_KEY;

    const params = {
      format: "comic",
      formatType: "comic",
      limit: 60,
      noVariants: true,
      hash,
      apikey,
      ts,
    };

    const req = await axios.get(
      "https://gateway.marvel.com:443/v1/public/comics",
      {
        params,
      }
    );

    return req.data.data.results;
  }

  private refineReqComic(
    reqComic: ReqMarvelComicDTO
  ): CreateBookDTO | undefined {
    const thumbnail =
      reqComic.thumbnail && reqComic.thumbnail.path
        ? [
            {
              url: reqComic.thumbnail.path + "." + reqComic.thumbnail.extension,
              name: `${reqComic.title} photo.`,
            },
          ]
        : [];

    const otherImages = reqComic.images.map((imgData) => ({
      url: imgData.path + "." + imgData.extension,
      name: `${reqComic.title} photo.`,
    }));

    const yearRegex = /\s*\((\d{4})\)\s*/;
    const titleMatch = reqComic.title.match(yearRegex);
    const releaseYear = titleMatch
      ? parseInt(titleMatch[1], 10)
      : new Date().getFullYear();

    const titleWithoutYear = reqComic.title
      .replace(yearRegex, " ")
      .trim()
      .replace(/\s\s+/g, " ");

    const writer = reqComic.creators.items.find(
      (creator) => creator.role === "writer"
    ) || { name: "Stan Lee" };

    const penciller = reqComic.creators.items.find(
      (creator) => creator.role === "penciller"
    ) || { name: "Stan Lee" };

    const coverArtist = reqComic.creators.items.find(
      (creator) => creator.role === "penciller (cover)"
    ) || { name: "Stan Lee" };

    const bookData: CreateBookDTO = {
      title: titleWithoutYear,
      description: reqComic.description
        ? reqComic.description
        : reqComic.textObjects.length
        ? reqComic.textObjects[0].text
        : "Sem descrição",
      priceInBRL:
        reqComic.prices[0].price * 5 || Math.floor(Math.random() * 20) + 1,
      offerInBRL:
        Math.random() < 0.5
          ? Math.random() * (reqComic.prices[0].price * 5)
          : undefined,
      ownerId: seed_user_stanlee_id,
      stock: Math.floor(Math.random() * 10) + 1,
      category: "SUPERHERO",
      image: [...thumbnail, ...otherImages].filter(
        (imgData) => !imgData.url.match("image_not_available")
      )[0],
      releaseYear,
      writerName: writer.name,
      pencillerName: penciller.name,
      coverArtistName: coverArtist.name,
    };

    if (!bookData.image) return undefined;

    return bookData;
  }
}
