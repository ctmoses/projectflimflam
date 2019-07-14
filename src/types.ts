export interface IUser {
    id: number | null,
    name: string,
};

export interface IIcon {
    name: string,
    level: number,
};
export interface IRace {
    bonusstat1: Attributes,
    bonusstat2: Attributes,
    power: ISpells

};
export interface IBackground {
    backgroundtitle : string,
    backgroundmod : number
}
export interface IFeats {
    tier: Tiers,
    prereq: string,
    power: string
}
export interface ISpells {
    refresh: AbilityRefresh,
    trigger: AbilityTrigger,
    type: AbilityType,
    level: number,
    name: string,
    powertext: string,
}
export interface ITalents {
    refresh: AbilityRefresh,
    trigger: AbilityTrigger,
    type: AbilityType,
    tier: Tiers,
    innate: boolean,
    name: string,
    powertext: string,
}
export interface IClass {
    bonusstat1: Attributes,
    bonusstat2: Attributes,
    armor: ArmorTypes,
    shield: boolean,
    weapon: MeleeWeapons,
    ranged: RangedWeapons,
    calchp(con:number,level:number): number,
    calcinitiative(dex:number, level:number): number,
    calcac(con:number, dex:number,wis:number, level:number): number,
    calcpd(str:number, con:number,dex:number,level:number): number,
    calcmd(int:number, wis:number, cha:number, level:number): number,
    calcrecoveries(): number,
    calcrecoveryroll(con:number, level:number): string,  //SM: Not sure what we want to return here...just something like 4d8+4?
    calcmeleehit(attr:number, level:number):number,
    calcrangedhit(attr:number, level:number):number,
    calcmeleedmg(attr:number, level:number):string,
    calcrangeddmg(attr:number, level:number):string, 
    calctalents(level:number):number,
    calcspells(level:number):number,  
    spells: ISpells[],
    talents: ITalents[]
}
export interface ICharacter {
    name: string,
    class: IClass,  //reset spells when rolling initiative or you do a full rest
    race: IRace,
    level: number,
    str: number,
    con: number,
    dex: number,
    int: number,
    wis: number,
    cha: number,
    initiative: number,
    escalationdie: number,  //probably increments after each "to-hit" input, reset to zero when rolling initiative
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

export enum Attributes {
    STRENGTH,
    DEXTERITY,
    INTELLIGENCE,
    WISDOM,
    CONSTITUTION,
    CHARISMA,
    ALL
};

export enum AbilityRefresh {
    ATWILL,
    BATTLE,
    DAILY
};
export enum AbilityType {
    STANDARD,
    MOVE,
    QUICK,
    INTERRUPT,
    FREE
};
export enum AbilityTrigger {
    HIT,
    DAMAGETAKEN,
    MISS,
    NONE,
    MONDEATH,
    MONSTAGGER,
    PCSTAGGER,
};
export enum ArmorTypes {
    NONE,
    LIGHT,
    HEAVY,
};
export enum MeleeWeapons {
    ONEHSMALL,
    ONEHLIGHT,
    ONEHHEAVY,
    TWOHSMALL,
    TWOHLIGHT,
    TWOHHEAVY
};
export enum RangedWeapons {
    THROWNSMALL,
    THROWNLIGHT,
    THROWNHEAVY,
    XBOWSMALL,
    XBOWLIGHT,
    XBOWHEAVY,
    BOWLIGHT,
    BOWHEAVY
};
export enum Tiers {
    ADVENTURER,
    CHAMPION,
    EPIC
}