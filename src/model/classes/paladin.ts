import {
    IClass, Attributes, ArmorTypes, MeleeWeapons, RangedWeapons, ISpells, AbilityRefresh, AbilityType, ITalents, Tiers, IFeats,
} from '@/types';
import { feat } from '../spell';
import charclass from './charclass';

export default class paladin extends charclass {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    armor: ArmorTypes=ArmorTypes.NONE;
    shield: boolean=false;;
    weapon: MeleeWeapons=MeleeWeapons.NONE;
    ranged: RangedWeapons=RangedWeapons.NONE;


    constructor() {
        super();
        this.bonusstat1 = Attributes.STRENGTH;
        this.bonusstat2 = Attributes.CHARISMA;
    }
    calctalents(level:number):number[] {
        if (level <= 4) return [3, 0, 0];
        if (level > 4 && level < 8) return [4, 0, 0];
        if (level >= 8) return [5, 0, 0];
        return [-1, -1, -1];
    }
    calcspells(level:number, feats?: IFeats[], talents?: ITalents[]):number[]{
        var spells;
        if(talents && this.talenttaken(talents,"Cleric Training")){
            switch(level){
                case 1:
                case 2:
                    spells = [1,0,0,0,0];
                    break;
                case 3:
                case 4:
                    spells = [0,1,0,0,0];
                    break;
                case 5:
                case 6:
                    spells = [0,0,1,0,0];
                    break;
                case 7:
                case 8:
                    spells = [0,0,0,1,0];
                    break;
                case 9:
                case 10:
                    spells = [0,0,0,0,1];
                    break;
                default:
                    spells = [0,0,0,0,0];
                    break;
            }
        }
        else{
            spells = [0,0,0,0,0];
        }
        return spells;
    }
    baselineHP():number {
        return 8;
    }
    calcac(con:number, dex:number, wis:number, level:number, feats?: IFeats[], talents?: ITalents[]): number {
        let armor = 0;
        switch (this.armor) {
        case ArmorTypes.NONE:
            armor = 10;
            break;
        case ArmorTypes.LIGHT:
            armor = 12;
            break;
        case ArmorTypes.HEAVY:
            armor = 16;
            break;
        default:
            armor = -99;
            break;
        }
        if(talents && this.talenttaken(talents,"Bastion"))
            armor+=1;

        return super.calcac(con,dex,wis,level) + armor;
    }
    calcpd(str:number, con:number, dex:number, level:number, feats?: IFeats[]): number {
        let mod = 0;
        if(feats && this.feattaken(feats,"Implacable",Tiers.EPIC))
            mod+=1;

        return super.calcpd(str,con,dex,level) + 10 + mod;
    }
    calcmd(int:number, wis:number, cha:number, level:number, feats?: IFeats[]): number {
        let mod = 0;
        if(feats && this.feattaken(feats,"Implacable",Tiers.EPIC))
            mod+=1;

        return super.calcmd(int,wis,cha,level) + 12 + mod;
    }
    calcrecoveries(feats?: IFeats[]): number {
        let recoveries = 8;
        if(feats && this.feattaken(feats,"Bastion",Tiers.EPIC))
            recoveries += 1;

        return recoveries;
    }
    calcrecoveryroll(con:number, level:number): number[] {
        return [level, 10, this.calculatebasemodifier(con)];
    }
    calcabilitytohit(attr:number, level:number, feats?: IFeats[], talents?: ITalents[]):number{
        return this.calculatebasemodifier(attr) + level;
    }
    type():string {
        return 'Paladin';
    }
}
