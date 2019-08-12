import {
    IClass, Attributes, ArmorTypes, MeleeWeapons, RangedWeapons, ISpells, AbilityRefresh,  AbilityType, ITalents, Tiers, IFeats,
} from '@/types';
import charclass from './charclass';
import { talent } from '../spell';

export default class cleric extends charclass {
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
    calcnumberoficons(feats?: IFeats[], talents?: ITalents[]):number{
        var mod=0;
        
        if(talents && this.talenttaken(talents,"Domain: Love/Beauty"))
            mod+=1;
        if(feats && this.feattaken(feats,"Domain: Love/Beauty",Tiers.CHAMPION))
            mod+=1;

        return mod;
    }
    calcnumberofbackgrounds(feats?: IFeats[], talents?: ITalents[]):number{
        var mod=0;
        if(talents && this.talenttaken(talents,"Domain: Knowledge/Lore"))
            mod=4;
        return mod;
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
                spells =  [2,3,0,0,0];
                break;
            case 4:
                spells =  [1,5,0,0,0];
                break;
            case 5:
                spells =  [0,2,4,0,0];
                break;                
            case 6:
                spells =  [0,1,6,0,0];
                break;
            case 7:
                spells =  [0,0,2,5,0];
                break;
            case 8:
                spells =  [0,0,1,7,0];
                break;
            case 9:
                spells =  [0,0,0,2,6];
                break;
            case 10:
                spells =  [0,0,0,1,8];
                break;
            default:
                spells =  [-1,-1,-1,-1,-1,-1]
                break;
        }
        return spells;
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
            armor = 12;
            break;
        case ArmorTypes.HEAVY:
            armor = 14;
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
        return super.calcmd(int, wis, cha, level)+ 11;
    }
    calcrecoveryroll(con:number, level:number, feats?: IFeats[], talents?: ITalents[]): number[] {
        return [level, 8, this.calculatebasemodifier(con)];
    }
    calcmeleehit(dex:number, level:number, feats?: IFeats[], talents?: ITalents[]):number {
        let mod = 0;
        var talent = false;
        if(talents && this.talenttaken(talents,"Domain: Strength"))
            talent=true;

        if(!talent && this.weapon==MeleeWeapons.ONEHHEAVY||this.weapon==MeleeWeapons.TWOHHEAVY)
            mod +=- 2;
        return this.calculatebasemodifier(dex) + level + mod;
    }
    calcrangedhit(dex:number, level:number):number {
        let mod = 0;
        if(this.ranged==RangedWeapons.BOWLIGHT) mod+=-2;
        if(this.ranged==RangedWeapons.XBOWHEAVY) mod+=-1;
        if(this.ranged==RangedWeapons.BOWHEAVY) mod+=-5;
        
        return this.calculatebasemodifier(dex) + level + mod;
    }
    calcabilitytohit(attr:number, level:number, feats?: IFeats[], talents?: ITalents[]):number{
        return this.calculatebasemodifier(attr) + level;
    }
    type():string {
        return 'Cleric';
    }
}
