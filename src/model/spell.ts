import { AbilityRefresh, AbilityTrigger, AbilityType, ISpells, ITalents, Tiers, IFeats, IMagicItem, ItemType } from "@/types";


export class spell implements ISpells{
    refresh: AbilityRefresh;
    trigger: AbilityTrigger;
    type: AbilityType;
    name: string;
    powertext: string;
    level: number;
    constructor(refresh: AbilityRefresh, trigger: AbilityTrigger, type: AbilityType, level: number,  name: string, powertext: string){
        this.refresh = refresh;
        this.trigger = trigger;
        this.type = type;
        this.name = name;
        this.powertext = powertext;
        this.level = level;
    }
}
export class talent implements ITalents{
    refresh: AbilityRefresh;
    trigger: AbilityTrigger;
    type: AbilityType;
    innate: boolean;
    name: string;
    powertext: string;
    tier: Tiers;
    constructor(refresh: AbilityRefresh, trigger: AbilityTrigger, type: AbilityType, tier: Tiers, innate: boolean,  name: string, powertext: string){
        this.refresh = refresh;
        this.trigger = trigger;
        this.type = type;
        this.name = name;
        this.powertext = powertext;
        this.innate = innate;
        this.tier=tier;
    }
}
export class feat implements IFeats {
    tier: Tiers;
    prereq: string;
    power: string;
    name: string;
    constructor(tier:Tiers,prereq:string,power:string, name:string){
        this.tier=tier;
        this.prereq=prereq;  //SM: Should the prereq be the ID of the adventurer or champion tier feat that is required?
        this.power=power;
        this.name=name;
    }
}
export class magicitems implements IMagicItem {
    type:ItemType;
    tier: Tiers;
    constructor(itemType:ItemType,tier: Tiers){
        this.type=itemType;
        this.tier=tier;
    }
}