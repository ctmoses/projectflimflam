export interface IUser {
    id: number | null,
    name: string,
    imageURL: string,
}

export interface IIcon {
    name: string,
    level: number,
}
export interface IRace {
    bonusstat1: Attributes,
    bonusstat2: Attributes,
    type(): string
}
export interface IBackground {
    backgroundtitle : string,
    backgroundmod : number
}
export interface IFeats {
    tier: Tiers,
    prereq: string,
    power: string,
    name: string
}
export interface ISpells {
    charclass: string,
    name: string,
    level: number,
    refresh: AbilityRefresh,
    type: AbilityType,
    range: string,
    target: string,
    attack: string,
    hit: string,
    miss: string,
    effect: string,
};
export interface IManeuvers {
    charclass: string,
    name: string,
    powertext: string,
}
export interface ITalents {
    refresh: AbilityRefresh,
    type: AbilityType,
    tier: Tiers,
    feature: boolean,
    name: string,
    powertext: string,
    url: string,
}
export interface IItem{
    type: ItemType,
    tier: Tiers,
    equipped: boolean,
    name: string,
    power: string
}
export interface IClass {
    bonusstat1: Attributes,
    bonusstat2: Attributes,
    armor: ArmorTypes,
    shield: boolean,
    weapon: MeleeWeapons,
    ranged: RangedWeapons,
    calchp(con:number, level:number, feats?: IFeats[], talents?: ITalents[]): number,
    baselineHP(): number,
    calcinitiative(dex:number, level:number, feats?: IFeats[], talents?: ITalents[]): number,
    calcac(con:number, dex:number, wis:number, level:number, feats?: IFeats[], talents?: ITalents[]): number,
    calcpd(str:number, con:number, dex:number, level:number, feats?: IFeats[], talents?: ITalents[]): number,
    calcmd(int:number, wis:number, cha:number, level:number, feats?: IFeats[], talents?: ITalents[]): number,
    calcrecoveries(feats?: IFeats[], talents?: ITalents[]): number,
    calcrecoveryroll(con:number, level:number, feats?: IFeats[], talents?: ITalents[]): number[], 
    calcmeleehit(attr:number, level:number, feats?: IFeats[], talents?: ITalents[]):number,
    calcrangedhit(attr:number, level:number, feats?: IFeats[], talents?: ITalents[]):number,
    calcrangedmiss(level:number, feats?: IFeats[], talents?: ITalents[]),
    calcmeleedmg(attr:number, level:number, feats?: IFeats[], talents?: ITalents[]):number[],
    calcrangeddmg(attr:number, level:number, feats?: IFeats[], talents?: ITalents[]):number[],
    calctalents(level:number, feats?: IFeats[], talents?: ITalents[]):number[],
    calcspells(level:number, feats?: IFeats[], talents?: ITalents[]):number[],
    calcnumberofbackgrounds(feats?: IFeats[], talents?: ITalents[]):number,
    calcnumberoficons(feats?: IFeats[], talents?: ITalents[]):number,
    calcbattlecries(level:number, feats?: IFeats[], talents?: ITalents[]):number[],
    type():string,
    talenttaken(talents: ITalents[], name:string):boolean,
    feattaken(feats: IFeats[], name: string, tier: Tiers):boolean,
    calcabilitytohit(attr:number, level:number, feats?: IFeats[], talents?: ITalents[]):number
    setshield(shield:boolean),
    setmeleeweapon(weapon: MeleeWeapons);
    setrangedweapon(weapon: RangedWeapons);
    setarmor(armor:ArmorTypes);
}
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
    items: IItem[],
}

export enum Attributes {
    STRENGTH,
    DEXTERITY,
    INTELLIGENCE,
    WISDOM,
    CONSTITUTION,
    CHARISMA,
    ALL,
    NONE
}

export enum AbilityRefresh {
    ATWILL,
    BATTLE,
    DAILY
}
export enum AbilityType {
    STANDARD,
    MOVE,
    QUICK,
    INTERRUPT,
    FREE
}
export enum ArmorTypes {
    NONE,
    LIGHT,
    HEAVY,
}
export enum MeleeWeapons {
    NONE,
    ONEHSMALL,
    ONEHLIGHT,
    ONEHHEAVY,
    TWOHSMALL,
    TWOHLIGHT,
    TWOHHEAVY,
}
export enum RangedWeapons {
    NONE,
    THROWNSMALL,
    THROWNLIGHT,
    XBOWSMALL,
    XBOWLIGHT,
    XBOWHEAVY,
    BOWLIGHT,
    BOWHEAVY,
    
}
export enum Tiers {
    NOTMAGIC,
    ADVENTURER,
    CHAMPION,
    EPIC
}
export enum ItemType {
    ARMOR,
    BELT,
    CLOAK,
    HELM,
    SHIELD,
    MELEE,
    RANGED,
    OTHER
}

export enum ItemSubType {
    NONE,
    LIGHT,
    HEAVY,
    ONEHSMALL,
    ONEHLIGHT,
    ONEHHEAVY,
    TWOHSMALL,
    TWOHLIGHT,
    TWOHHEAVY,
    THROWNSMALL,
    THROWNLIGHT,
    XBOWSMALL,
    XBOWLIGHT,
    XBOWHEAVY,
    BOWLIGHT,
    BOWHEAVY,
}
