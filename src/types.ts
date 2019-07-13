import { IRace, IClass, IBackground, IFeats } from './model/race';

export interface IUser {
    id: number | null,
    name: string,
};

export interface IIcon {
    name: string,
    level: number,
};

export interface ICharacter {
    name: string,
    class: IClass,
    race: IRace,
    level: number,
    str: number,
    con: number,
    dex: number,
    int: number,
    wis: number,
    cha: number,
    initiative: number,
    ac: number,
    pd: number,
    md: number,
    maxHp: number,
    curHp: number,
    maxRec: number,
    curRec: number,
    recRoll: number,
    attMelee: number,
    hitMelee: number,
    missMelee: number,
    attRanged: number,
    hitRanged: number,
    missRanged: number,
    unique: string,
    icon: IIcon[],
    feats: IFeats[], //SM: Need to think through feats, they can affect base character stats, specific spells, races, etc..  moved them here and out of class b/c of that
    backgrounds: IBackground[],
    magicItems: string[] | null, 
};