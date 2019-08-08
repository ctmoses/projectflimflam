import {
    IClass, Attributes, ArmorTypes, MeleeWeapons, RangedWeapons, ISpells, AbilityRefresh,  AbilityType, ITalents, Tiers, IFeats,
} from '@/types';
import charclass from './charclass';

export default class rogue extends charclass {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    armor: ArmorTypes;
    shield: boolean;
    weapon: MeleeWeapons;
    ranged: RangedWeapons;


    constructor(armor: ArmorTypes, shield: boolean, weapon: MeleeWeapons, ranged: RangedWeapons) {
        super(armor,shield,weapon,ranged);
        this.bonusstat1 = Attributes.DEXTERITY;
        this.bonusstat2 = Attributes.CHARISMA;
        this.armor = armor;
        this.weapon = weapon;
        this.ranged = ranged;
        this.shield = shield;
    }
    calctalents(level:number):number[] {
        return [3, 0, 0];
    }
    calcspells(level:number, feats?: IFeats[], talents?: ITalents[]):number[]{
        var spells;
        switch(level){
            case 1:
                spells =  [4,0,0,0,0];
                break;
            case 2:
                spells =  [5,0,0,0,0];
                break;
            case 3:
                spells =  [0,5,0,0,0];
                break;
            case 4:
                spells =  [0,6,0,0,0];
                break;
            case 5:
                spells =  [0,0,6,0,0];
                break;                
            case 6:
                spells =  [0,0,7,0,0];
                break;
            case 7:
                spells =  [0,0,0,7,0];
                break;
            case 8:
                spells =  [0,0,0,8,0];
                break;
            case 9:
                spells =  [0,0,0,0,8];
                break;
            case 10:
                spells =  [0,0,0,0,9];
                break;
            default:
                spells =  [-1,-1,-1,-1,-1,-1]
                break;
        }
        return spells;
    }
    calcnumberofbackgrounds(feats?: IFeats[], talents?: ITalents[]):number{
        var mod;
        if(talents){
            talents.forEach(element => {
                if(element.name=="Cunning")
                    mod=2;
                if(element.name=="Thievery")
                    mod=5;
            });
        }
        return mod;
    }
    baselineHP():number {
        return 6;
    }
    calcac(con:number, dex:number, wis:number, level:number): number { 
        let armor;
        switch (this.armor) {
        case ArmorTypes.NONE:
            armor = 11;
            break;
        case ArmorTypes.LIGHT:
            armor = 12;
            break;
        case ArmorTypes.HEAVY:
            armor = 13;
            break;
        default:
            armor = 12;
            break;
        }
        return super.calcac(con,dex,wis,level) + armor;
    }
    calcpd(str:number, con:number, dex:number, level:number, feats?: IFeats[]): number {
        return super.calcpd(str,con,dex,level)+ 12;
    }
    calcmd(int:number, wis:number, cha:number, level:number, feats?: IFeats[]): number {
        var mod;
        if(feats){
            feats.forEach(element => {
                if(element.name=="Cunning")
                    if(element.tier==Tiers.ADVENTURER)
                        mod=2;
            });
        }
        return super.calcmd(int, wis, cha, level)+ 10 + mod;
    }
    calcrecoveryroll(con:number, level:number, feats?: IFeats[], talents?: ITalents[]): number[] {
        return [level, 8, this.calculatebasemodifier(con)];
    }
    calcmeleehit(dex:number, level:number):number {
        let mod = 0;
        if (this.armor == ArmorTypes.HEAVY) {
            mod = -2;
        }
        if (this.shield){
            mod += -2;
        }
        if (this.weapon== MeleeWeapons.ONEHHEAVY){
            mod += -1;
        }
        if (this.weapon == MeleeWeapons.TWOHHEAVY){
            mod += -2;
        }
        return this.calculatebasemodifier(dex) + level + mod;
    }
    calcrangedhit(dex:number, level:number):number {
        let mod = 0;
        if (this.ranged == RangedWeapons.XBOWHEAVY){
            mod += -1;
        }
        if (this.ranged == RangedWeapons.BOWHEAVY){
            mod += -2;
        }
        if (this.armor == ArmorTypes.HEAVY) {
            mod += -2;
        }
        if (this.shield){
            mod += -2;
        }
        return this.calculatebasemodifier(dex) + level + mod;
    }
    type():string {
        return 'Rogue';
    }
}
