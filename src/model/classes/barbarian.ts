import {
    IClass, Attributes, ArmorTypes, MeleeWeapons, RangedWeapons, ISpells, AbilityRefresh,  AbilityType, ITalents, Tiers, IFeats,
} from '@/types';
import charclass from './charclass';

export default class barbarian extends charclass {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    armor: ArmorTypes=ArmorTypes.NONE;
    shield: boolean=false;
    weapon: MeleeWeapons=MeleeWeapons.NONE;
    ranged: RangedWeapons=RangedWeapons.NONE;


    constructor() {
        super();
        this.bonusstat1 = Attributes.STRENGTH;
        this.bonusstat2 = Attributes.CONSTITUTION;
    }
    calctalents(level:number):number[] {
        if (level <= 4) return [3, 0, 0];
        if (level > 4 && level < 8) return [3, 1, 0];
        if (level >= 8) return [3, 1, 1];
        return [-1, -1, -1];
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
            armor = 13;
            break;
        default:
            armor = -99;
            break;
        }
        return super.calcac(con,dex,wis,level) + armor;
    }
    calcpd(str:number, con:number, dex:number, level:number, feats?: IFeats[]): number {
        let mod = 0;
        if(feats && this.feattaken(feats,"Strongheart",Tiers.CHAMPION)){
            mod =1;
        }
        return   super.calcpd(str,con,dex,level)+ 11 + mod;
    }
    calcmd(int:number, wis:number, cha:number, level:number): number {
        return   super.calcmd(int, wis, cha, level)+ 10;
    }
    calcrecoveries(feats?: IFeats[]): number {
        let recoveries = 8;
        if(feats && this.feattaken(feats,"Strongheart",Tiers.ADVENTURER))
            recoveries+=1;
        if(feats && this.feattaken(feats,"Strongheart",Tiers.EPIC))
            recoveries+=1;
        
        return recoveries;
    }
    calcrecoveryroll(con:number, level:number, feats?: IFeats[], talents?: ITalents[]): number[] {
        let dicetype = 10;
        let mod = 1;
        if(talents && this.talenttaken(talents,"Strongheart"))
            dicetype = 12;
        if(feats && this.feattaken(feats,"Unstoppable",Tiers.CHAMPION))
            mod = 2;

        return [level, dicetype, this.calculatebasemodifier(con) * mod];
    }
    calcmeleehit(str:number, level:number):number {
        let mod = 0;
        if (this.armor == ArmorTypes.HEAVY) mod = -2;
        return this.calculatebasemodifier(str) + level + mod;
    }
    calcrangedhit(dex:number, level:number):number {
        let mod = 0;
        if (this.ranged == RangedWeapons.XBOWHEAVY || this.ranged == RangedWeapons.XBOWLIGHT || this.ranged == RangedWeapons.XBOWSMALL) mod += -5;
        if (this.armor == ArmorTypes.HEAVY) mod += -2;
        return this.calculatebasemodifier(dex) + level + mod;
    }
    type():string {
        return 'Barbarian';
    }
}
