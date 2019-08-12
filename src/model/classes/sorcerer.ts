import {
    IClass, Attributes, ArmorTypes, MeleeWeapons, RangedWeapons, ISpells, AbilityRefresh,  AbilityType, ITalents, Tiers, IFeats,
} from '@/types';
import charclass from './charclass';

//Wizard spell choices from arcane heritage and class feat

export default class sorcerer extends charclass {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    armor: ArmorTypes=ArmorTypes.NONE;
    shield: boolean=false;;
    weapon: MeleeWeapons=MeleeWeapons.NONE;
    ranged: RangedWeapons=RangedWeapons.NONE;


    constructor() {
        super();
        this.bonusstat1 = Attributes.CHARISMA;
        this.bonusstat2 = Attributes.CONSTITUTION;
    }
    calcnumberoficons(feats?: IFeats[], talents?: ITalents[]):number{
        var mod = 0;
        if(talents && this.talenttaken(talents, "Blood Link"))
            mod+=1;
        if(feats && this.feattaken(feats,"Blood Link",Tiers.CHAMPION))
            mod+=1;
        return mod;
    }
    calcnumberofbackgrounds(feats?: IFeats[], talents?: ITalents[]):number{
        if(talents && this.talenttaken(talents, "Arcane Heritage"))
            return 2;
        return 0;
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
                spells =  [3,3,0,0,0];
                break;
            case 4:
                spells =  [0,6,0,0,0];
                break;
            case 5:
                spells =  [0,3,4,0,0];
                break;                
            case 6:
                spells =  [0,0,7,0,0];
                break;
            case 7:
                spells =  [0,0,3,5,0];
                break;
            case 8:
                spells =  [0,0,0,8,0];
                break;
            case 9:
                spells =  [0,0,0,3,6];
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
    baselineHP():number {
        return 6;
    }
    calcac(con:number, dex:number, wis:number, level:number, feats?: IFeats[], talents?: ITalents[]): number { 
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
            armor = -99;
            break;
        }
        if(talents && this.talenttaken(talents,"Spell Fist"))
            armor+=2;
        return super.calcac(con,dex,wis,level) + armor;
    }
    calcpd(str:number, con:number, dex:number, level:number, feats?: IFeats[]): number {
        return super.calcpd(str,con,dex,level)+ 11;
    }
    calcmd(int:number, wis:number, cha:number, level:number, feats?: IFeats[]): number {
        return super.calcmd(int, wis, cha, level)+ 10;
    }
    calcrecoveryroll(con:number, level:number, feats?: IFeats[], talents?: ITalents[]): number[] {
        return [level, 6, this.calculatebasemodifier(con)];
    }
    calcmeleehit(dex:number, level:number, feats?: IFeats[]):number {
        let mod = 0;
        if (this.armor == ArmorTypes.HEAVY) {
            mod = -2;
        }
        if (this.shield){
            mod += -2;
        }
        if (this.weapon== MeleeWeapons.ONEHHEAVY){
            mod += -2;
        }
        if (this.weapon == MeleeWeapons.TWOHHEAVY){
            mod += -2;
        }
        if(feats && this.feattaken(feats,"Undead Remnant Heritage",Tiers.EPIC))
            mod+=1;
        return this.calculatebasemodifier(dex) + level + mod;
    }
    calcrangedhit(dex:number, level:number, feats?: IFeats[]):number {
        let mod = 0;
        if (this.ranged == RangedWeapons.XBOWHEAVY){
            mod += -3;
        }
        if (this.ranged == RangedWeapons.BOWHEAVY){
            mod += -4;
        }
        if (this.ranged == RangedWeapons.XBOWLIGHT){
            mod += -1;
        }
        if (this.ranged == RangedWeapons.BOWLIGHT){
            mod += -2;
        }
        if (this.armor == ArmorTypes.HEAVY) {
            mod += -2;
        }
        if (this.shield){
            mod += -2;
        }
        if(feats && this.feattaken(feats,"Undead Remnant Heritage",Tiers.EPIC))
            mod+=1;
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
        return 'Sorcerer';
    }
}
