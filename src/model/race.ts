enum Attributes {
    STRENGTH,
    DEXTERITY,
    INTELLIGENCE,
    WISDOM,
    CONSTITUTION,
    CHARISMA
};

enum AbilityRefresh {
    ATWILL,
    BATTLE,
    DAILY
};
enum AbilityType {
    STANDARD,
    MOVE,
    QUICK,
    INTERRUPT,
    FREE
};
enum AbilityTrigger {
    HIT,
    DAMAGETAKEN,
    MISS,
};
enum ArmorTypes {
    NONE,
    LIGHT,
    HEAVY,
    SHIELD
};
enum MeleeWeapons {
    ONEHSMALL,
    ONEHLIGHT,
    ONEHHEAVY,
    TWOHSMALL,
    TWOHLIGHT,
    TWOHHEAVY
};
enum RangedWeapons {
    THROWNSMALL,
    THROWNLIGHT,
    THROWNHEAVY,
    XBOWSMALL,
    XBOWLIGHT,
    XBOWHEAVY,
    BOWLIGHT,
    BOWHEAVY
};
enum Tiers {
    ADVENTURER,
    CHAMPION,
    EPIC
}
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
    powertext: string,
}
export interface IClass {
    bonusstat1: Attributes,
    bonusstat2: Attributes,
    armor: ArmorTypes,
    weapon: MeleeWeapons,
    ranged: RangedWeapons,
    calchp(con:number,level:number): number,
    calcinitiative(dex:number, level:number): number,
    calcac(con:number, dex:number,wis:number, level:number): number,
    calcpd(str:number, con:number,dex:number,level:number): number,
    calcmd(int:number, wis:number, cha:number, level:number): number,
    calcrecoveries(): number,
    calcrecoveryroll(con:number, level:number): string,  //SM: Not sure what we want to return here...just something like 4d8+4?
    calcmeleehit():number,
    calcrangedhit():number,
    calcmeleedmg():number,
    calcrangeddmg():number,   
    spells: ISpells[]
}
class spell implements ISpells{
    refresh: AbilityRefresh;
    trigger: AbilityTrigger;
    type: AbilityType;
    powertext: string;
    constructor(refresh: AbilityRefresh, trigger: AbilityTrigger, type: AbilityType, powertext: string){
        this.refresh = refresh;
        this.trigger = trigger;
        this.type = type;
        this.powertext = powertext;
    }
}
class dwarf implements IRace {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    power: ISpells;
    constructor(){
        this.bonusstat1 = Attributes.WISDOM;
        this.bonusstat2 = Attributes.CONSTITUTION;
        var text = "Once per battle as a free action after you have been hit by an enemy attack, you can heal using a recovery. If the escalation die is less than 2, you only get half the usual healing from the recovery. Unlike other recoveries that might allow you to take an average result, you have to roll this one! Note that you can’t use this ability if the attack drops you to 0 hp or below. You’ve got to be on your feet to sneer at their attack and recover.";
        this.power = new spell(AbilityRefresh.BATTLE, AbilityTrigger.DAMAGETAKEN, AbilityType.FREE, text);
    }
}

// This probably belongs in the player class
function calculatebasemodifier(abilityscore: number) {
    return Math.floor((abilityscore - 10) / 2);
}