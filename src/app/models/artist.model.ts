export class Artist {
    _id: string;
    name: string;
    photoUrl: string;
    birthdate: Date;
    deathDate: Date;
    _createdAt: string;
    _updatedAt: string;

    constructor(pName: string, pPhotoUrl: string, pBirthDate: Date, pDeathDate: Date) {
        this.name = pName;
        this.photoUrl = pPhotoUrl;
        this.birthdate = pBirthDate;
        this.deathDate = pDeathDate;
    }
}