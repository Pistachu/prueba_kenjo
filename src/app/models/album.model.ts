export class Album {
    _id: string;
    title: string;
    artistId: string;
    coverUrl: string;
    year: number;
    genre: string;
    _createdAt: string;
    _updatedAt: string;

    constructor(pTitle: string, pArtistId: string, pCoverUrl: string, pYear: number, pGenre: string) {
        this.title = pTitle;
        this.artistId = pArtistId;
        this.coverUrl = pCoverUrl;
        this.year = pYear;
        this.genre = pGenre;
    }
}