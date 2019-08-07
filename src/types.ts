export interface IUser {
    id: number | null,
    name: string,
    imageURL: string,
}

export interface IIcon {
    name: string,
    level: number,
};
export interface IRace {
    bonusstat1: Attributes,
    bonusstat2: Attributes,
    type(): string
};
export interface IBackground {
    backgroundtitle : string,
    backgroundmod : number
};
export interface IFeats {
    tier: Tiers,
    prereq: string,
    power: string,
    name: string
};
export interface ISpells {
    refresh: AbilityRefresh,
    trigger: AbilityTrigger,
    type: AbilityType,
    level: number,
    name: string,
    powertext: string,
};
export interface ITalents {
    refresh: AbilityRefresh,
    type: AbilityType,
    tier: Tiers,
    feature: boolean,
    name: string,
    powertext: string,
    url: string,
};
export interface IMagicItem{
    type: ItemType,
    tier: Tiers,
    equipped: boolean
};
export interface IClass {
    bonusstat1: Attributes,
    bonusstat2: Attributes,
    armor: ArmorTypes,
    shield: boolean,
    weapon: MeleeWeapons,
    ranged: RangedWeapons,
    calchp(con:number,level:number, feats?: IFeats[], talents?: ITalents[]): number,
    baselineHP(): number,
    calcinitiative(dex:number, level:number, feats?: IFeats[], talents?: ITalents[]): number,
    calcac(con:number, dex:number,wis:number, level:number, feats?: IFeats[], talents?: ITalents[]): number,
    calcpd(str:number, con:number,dex:number,level:number, feats?: IFeats[], talents?: ITalents[]): number,
    calcmd(int:number, wis:number, cha:number, level:number, feats?: IFeats[], talents?: ITalents[]): number,
    calcrecoveries(feats?: IFeats[], talents?: ITalents[]): number,
    calcrecoveryroll(con:number, level:number, feats?: IFeats[], talents?: ITalents[]): number[],  //SM: Not sure what we want to return here...just something like 4d8+4?
    calcmeleehit(attr:number, level:number, feats?: IFeats[], talents?: ITalents[]):number,
    calcrangedhit(attr:number, level:number, feats?: IFeats[], talents?: ITalents[]):number,
    calcmeleedmg(attr:number, level:number, feats?: IFeats[], talents?: ITalents[]):number[],
    calcrangeddmg(attr:number, level:number, feats?: IFeats[], talents?: ITalents[]):number[], 
    calctalents(level:number, feats?: IFeats[], talents?: ITalents[]):number[],
    calcspells(level:number, feats?: IFeats[], talents?: ITalents[]):number[],
    type():string,  
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
    recRoll: number[],
    meleeToHit: number,
    meleeDmg: number[],
    missMelee: number,
    rangedToHit: number,
    rangedDmg: number[],
    missRanged: number,
    unique: string,
    icon: IIcon[],
    feats: IFeats[], 
    talents: ITalents[],
    spells: ISpells[],
    backgrounds: IBackground[],
    magicItems: IMagicItem[], 
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
};
export enum ItemType {
    ARMOR,
    BELT,
    CLOAK,
    HELM,
    SHIELD,
    MELEE,
    RANGED,
}
