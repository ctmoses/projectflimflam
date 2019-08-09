import {
    IClass, Attributes, ArmorTypes, MeleeWeapons, RangedWeapons, ISpells, AbilityRefresh,  AbilityType, ITalents, Tiers, IFeats,
} from '@/types';
import charclass from './charclass';


export default class wizard extends charclass {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    armor: ArmorTypes;
    shield: boolean;
    weapon: MeleeWeapons;
    ranged: RangedWeapons;


    constructor(armor: ArmorTypes, shield: boolean, weapon: MeleeWeapons, ranged: RangedWeapons) {
        super(armor,shield,weapon,ranged);
        this.bonusstat1 = Attributes.INTELLIGENCE;
        this.bonusstat2 = Attributes.WISDOM;
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
                spells =  [5,0,0,0,0];
                break;
            case 2:
                spells =  [6,0,0,0,0];
                break;
            case 3:
                spells =  [3,4,0,0,0];
                break;
            case 4:
                spells =  [2,6,0,0,0];
                break;
            case 5:
                spells =  [1,4,4,0,0];
                break;                
            case 6:
                spells =  [0,2,8,0,0];
                break;
            case 7:
                spells =  [0,1,4,5,0];
                break;
            case 8:
                spells =  [0,0,3,8,0];
                break;
            case 9:
                spells =  [0,0,1,5,6];
                break;
            case 10:
                spells =  [0,0,0,3,9];
                break;
            default:
                spells =  [-1,-1,-1,-1,-1,-1]
                break;
        }
        return spells;
    }
    baselineHP():number {
        return 6;
    }
    calcac(con:number, dex:number, wis:number, level:number): number { 
        let armor;
        switch (this.armor) {
        case ArmorTypes.NONE:
            armor = 10;
            break;
        case ArmorTypes.LIGHT:
            armor = 10;
            break;
        case ArmorTypes.HEAVY:
            armor = 11;
            break;
        default:
            armor = 10;
            break;
        }
        return super.calcac(con,dex,wis,level) + armor;
    }
    calcpd(str:number, con:number, dex:number, level:number, feats?: IFeats[]): number {
        return super.calcpd(str,con,dex,level)+ 10;
    }
    calcmd(int:number, wis:number, cha:number, level:number, feats?: IFeats[]): number {
        return super.calcmd(int, wis, cha, level)+ 12;
    }
    calcrecoveryroll(con:number, level:number, feats?: IFeats[], talents?: ITalents[]): number[] {
        return [level, 6, this.calculatebasemodifier(con)];
    }
    calcmeleehit(dex:number, level:number):number {
        let mod = 0;
        if (this.armor == ArmorTypes.HEAVY) {
            mod = -2;
        }
        if (this.shield){
            mod += -2;
        }
        if (this.weapon== MeleeWeapons.ONEHLIGHT){
            mod += -2;
        }
        if (this.weapon== MeleeWeapons.TWOHLIGHT){
            mod += -2;
        }
        if (this.weapon== MeleeWeapons.ONEHHEAVY){
            mod += -5;
        }
        if (this.weapon == MeleeWeapons.TWOHHEAVY){
            mod += -5;
        }
        return this.calculatebasemodifier(dex) + level + mod;
    }
    calcrangedhit(dex:number, level:number):number {
        let mod = 0;
        if (this.ranged == RangedWeapons.XBOWHEAVY){
            mod += -4;
        }
        if (this.ranged == RangedWeapons.BOWHEAVY){
            mod += -5;
        }
        if (this.ranged == RangedWeapons.XBOWLIGHT){
            mod += -1;
        }
        if (this.ranged == RangedWeapons.BOWLIGHT){
            mod += -2;
        }
        if (this.ranged == RangedWeapons.THROWNLIGHT){
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
    calcabilitytohit(attr:number, level:number, feats?: IFeats[], talents?: ITalents[]):number{
        //TODO Technicaly weapons should mod downwards, but need a way to know if ranged or melee is equipped
        let mod = 0;
        if (this.armor == ArmorTypes.HEAVY) {
            mod = -2;
        }
        if (this.shield){
            mod += -2;
        }
        return this.calculatebasemodifier(attr) + level+mod;
    }
    type():string {
        return 'Wizard';
    }
}
