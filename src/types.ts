export interface IUser {
    id: number | null,
    name: string,
}

export interface IIcon {
    name: string,
    level: number,
}

export interface ICharacter {
    name: string,
    class: string,
    race: string,
    level: number,
    str: number,
    con: number,
    dex: number,
    int: number,
    wis: number,
    cha: number,
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
    racialPower: string,
    icon: IIcon[],
    backgrounds: string,
    powersAndSpells: string[] | null,
    magicItems: string[] | null,
    talents: string[] | null,
    feats: string[] | null,
}
