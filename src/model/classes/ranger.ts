import {
    IClass, Attributes, ArmorTypes, MeleeWeapons, RangedWeapons, ISpells, AbilityRefresh,  AbilityType, ITalents, Tiers, IFeats,
} from '@/types';
import charclass from './charclass';
import { feat } from '../spell';

//Animal Companion

export default class ranger extends charclass {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    armor: ArmorTypes=ArmorTypes.NONE;
    shield: boolean=false;;
    weapon: MeleeWeapons=MeleeWeapons.NONE;
    ranged: RangedWeapons=RangedWeapons.NONE;


    constructor() {
        super();
        this.bonusstat1 = Attributes.INTELLIGENCE;
        this.bonusstat2 = Attributes.WISDOM;
    }
    calctalents(level:number):number[] {
        if (level <= 4) return [3, 0, 0];
        if (level > 4 && level < 8) return [4, 0, 0];
        if (level >= 8) return [5,0,0];
        return [-1, -1, -1];
    }
    calcspells(level:number, feats?: IFeats[], talents?: ITalents[]):number[]{
        //TODO When picking these, need a way to distinguish between slots for cleric vs sorcerer.
        //Also need to filter by daily vs at-will with the extra feats.
        var spells;
        var num=0;
        if(talents && this.talenttaken(talents, "Ranger ex Cathedral"))
            num+=1;
        if(talents && this.talenttaken(talents, "Fey Queen's Enchantments"))
            num+=1;
        if(feats && this.feattaken(feats, "Ranger ex Cathedral", Tiers.EPIC))
            num+=1;
        if(feats && this.feattaken(feats, "Fey Queen's Enchantments", Tiers.EPIC))
            num+=1;
        
        switch(level){
            case 1:
                spells =  [num,0,0,0,0];
                break;
            case 2:
                spells =  [num,0,0,0,0];
                break;
            case 3:
                spells =  [0,num,0,0,0];
                break;
            case 4:
                spells =  [0,num,0,0,0];
                break;
            case 5:
                spells =  [0,0,num,0,0];
                break;                
            case 6:
                spells =  [0,0,num,0,0];
                break;
            case 7:
                spells =  [0,0,0,num,0];
                break;
            case 8:
                spells =  [0,0,0,num,0];
                break;
            case 9:
                spells =  [0,0,0,0,num];
                break;
            case 10:
                spells =  [0,0,0,0,num];
                break;
            default:
                spells =  [-1,-1,-1,-1,-1,-1]
                break;
        }
        return spells;
    }
    calcnumberofbackgrounds(feats?: IFeats[], talents?: ITalents[]):number{
        var mod;
        if(talents && this.talenttaken(talents, "Tracker"))
            mod=5;

        return mod;
    }
    baselineHP():number {
        return 7;
    }
    calcac(con:number, dex:number, wis:number, level:number): number { 
        let armor;
        switch (this.armor) {
        case ArmorTypes.NONE:
            armor = 10;
            break;
        case ArmorTypes.LIGHT:
            armor = 14;
            break;
        case ArmorTypes.HEAVY:
            armor = 15;
            break;
        default:
            armor = -99;
            break;
        }
        return super.calcac(con,dex,wis,level) + armor;
    }
    calcpd(str:number, con:number, dex:number, level:number, feats?: IFeats[]): number {
        return super.calcpd(str,con,dex,level)+ 11;
    }
    calcmd(int:number, wis:number, cha:number, level:number, feats?: IFeats[]): number {
        return super.calcmd(int, wis, cha, level)+ 10;
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
        return this.calculatebasemodifier(dex) + level + mod;
    }
    calcrangedhit(dex:number, level:number):number {
        let mod = 0;
        if (this.armor == ArmorTypes.HEAVY) {
            mod += -2;
        }
        if (this.shield){
            mod += -2;
        }
        return this.calculatebasemodifier(dex) + level + mod;
    }
    type():string {
        return 'Ranger';
    }
}
