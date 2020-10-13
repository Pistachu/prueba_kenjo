export class Artist {

    name: string;
    photoUrl: string;
    birthdate: Date;
    deathDate: Date;

    constructor(pName: string, pPhotoUrl: string, pBirthDate: Date, pDeathDate: Date) {
        this.name = pName;
        this.photoUrl = pPhotoUrl;
        this.birthdate = pBirthDate;
        this.deathDate = pDeathDate;
    }
}