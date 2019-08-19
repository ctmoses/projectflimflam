import {
    AbilityRefresh, AbilityType, ISpells, ITalents, Tiers, IFeats, ItemType, IIcon, IBackground, IItem, ItemSubType,
} from '@/types';


export class spell implements ISpells{
    charclass: string;
    name: string;
    level: number;
    refresh: AbilityRefresh;
    type: AbilityType;
    range: string;
    target: string;
    attack: string;
    hit: string;
    miss: string;
    effect: string;
    constructor(charclass: string, name: string, level: number, refresh: AbilityRefresh, type: AbilityType, range: string, target: string, attack:string, hit: string, miss: string, effect: string){
        this.charclass=charclass;
        this.name=name;
        this.level=level;
        this.refresh=refresh;
        this.type=type;
        this.range=range;
        this.target=target;
        this.attack=attack;
        this.hit=hit;
        this.miss=miss;
        this.effect=effect;

    }
}
export class talent implements ITalents {
    refresh: AbilityRefresh;
    type: AbilityType;
    feature: boolean;
    name: string;
    powertext: string;
    tier: Tiers;
    url: string;
    constructor(refresh: AbilityRefresh, type: AbilityType, tier: Tiers, feature: boolean, name: string, powertext: string, url: string) {
        this.refresh = refresh;
        this.type = type;
        this.name = name;
        this.powertext = powertext;
        this.feature = feature;
        this.tier = tier;
        this.url = url;
    }
}
export class feat implements IFeats {
    tier: Tiers;
    prereq: string;
    power: string;
    name: string;
    constructor(tier:Tiers, prereq:string, power:string, name:string) {
        this.tier = tier;
        this.prereq = prereq; // SM: Should the prereq be the ID of the adventurer or champion tier feat that is required?
        this.power = power;
        this.name = name;
    }
}
export class items implements IItem {
    type:ItemType;
    tier: Tiers;
    equipped: boolean;
    name: string;
    power: string;
    subtype:ItemSubType;
    constructor(itemType:ItemType, subType: ItemSubType, tier: Tiers, equipped: boolean, name: string="", power: string="") {
        this.type = itemType;
        this.tier = tier;
        this.equipped = equipped;
        this.name=name;
        this.power=power;
        this.subtype=subType;
    }
    equip() {
        this.equipped = true;
    }
    unequip() {
        this.equipped = false;
    }
}

export class icon implements IIcon {
    name: string;
    level:number;

    constructor(name:string, level:number) {
        this.name = name;
        this.level = level;
    }
}

export class background implements IBackground {
    backgroundtitle: string;
    backgroundmod: number;

    constructor(backgroundtitle:string, backgroundmod: number) {
        this.backgroundtitle = backgroundtitle;
        this.backgroundmod = backgroundmod;
    }
}
