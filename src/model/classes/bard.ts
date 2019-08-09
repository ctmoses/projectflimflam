import {
    IClass, Attributes, ArmorTypes, MeleeWeapons, RangedWeapons, ISpells, AbilityRefresh,  AbilityType, ITalents, Tiers, IFeats,
} from '@/types';
import charclass from './charclass';

//TODO Jack of Spells has some restrictions that need to be implemented somewhere
//TODO Can't take spellsinger and battle skald at the same time
//TODO Loremaster and mythkenner have some choose 2 out of 3 shit

export default class bard extends charclass {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    armor: ArmorTypes;
    shield: boolean;
    weapon: MeleeWeapons;
    ranged: RangedWeapons;


    constructor(armor: ArmorTypes, shield: boolean, weapon: MeleeWeapons, ranged: RangedWeapons) {
        super(armor,shield,weapon,ranged);
        this.bonusstat1 = Attributes.CHARISMA;
        this.bonusstat2 = Attributes.CONSTITUTION;
        this.armor = armor;
        this.weapon = weapon;
        this.ranged = ranged;
        this.shield = shield;
    }


    calctalents(level:number):number[] {
        return [3, 0, 0];
    }
    calcbattlecries(level:number, feats?: IFeats[], talents?: ITalents[]):number[]{
        var spells;
        var num = 0;
        if(talents && this.talenttaken(talents,"Battle Skald"))
            num=1;
        switch(level){
            case 1:
                spells =  [2+num,0,0,0,0];
                break;
            case 2:
                spells =  [2+num,0,0,0,0];
                break;
            case 3:
                spells =  [0,3+num,0,0,0];
                break;
            case 4:
                spells =  [0,3+num,0,0,0];
                break;
            case 5:
                spells =  [0,0,3+num,0,0];
                break;                
            case 6:
                spells =  [0,0,4+num,0,0];
                break;
            case 7:
                spells =  [0,0,0,4+num,0];
                break;
            case 8:
                spells =  [0,0,0,5+num,0];
                break;
            case 9:
                spells =  [0,0,0,0,5+num];
                break;
            case 10:
                spells =  [0,0,0,0,6+num];
                break;
            default:
                spells =  [-1,-1,-1,-1,-1,-1]
                break;
        }
        return spells;
    }
    calcspells(level:number, feats?: IFeats[], talents?: ITalents[]):number[]{
        var spells;
        var num = 0;
        if(talents && this.talenttaken(talents,"Spellsinger"))
            num+=1;
        if(talents && this.talenttaken(talents,"Jack of Spells"))
            num+=1;
        if(feats && this.feattaken(feats,"Jack of Spells",Tiers.CHAMPION))
            num+=1;
        if(feats && this.feattaken(feats,"Jack of Spells",Tiers.EPIC))
            num+=1;
        switch(level){
            case 1:
                spells =  [2+num,0,0,0,0];
                break;
            case 2:
                spells =  [3+num,0,0,0,0];
                break;
            case 3:
                spells =  [1,2+num,0,0,0];
                break;
            case 4:
                spells =  [0,4+num,0,0,0];
                break;
            case 5:
                spells =  [0,3,2+num,0,0];
                break;                
            case 6:
                spells =  [0,0,5+num,0,0];
                break;
            case 7:
                spells =  [0,0,3,3+num,0];
                break;
            case 8:
                spells =  [0,0,0,6+num,0];
                break;
            case 9:
                spells =  [0,0,0,4,3+num];
                break;
            case 10:
                spells =  [0,0,0,0,7+num];
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
    calcac(con:number, dex:number, wis:number, level:number, feats?: IFeats[], talents?: ITalents[]): number { 
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
            armor = 10;
            break;
        }
        return super.calcac(con,dex,wis,level) + armor;
    }
    calcpd(str:number, con:number, dex:number, level:number, feats?: IFeats[]): number {
        return super.calcpd(str,con,dex,level)+ 10;
    }
    calcmd(int:number, wis:number, cha:number, level:number, feats?: IFeats[]): number {
        return super.calcmd(int, wis, cha, level)+ 11;
    }
    calcrecoveryroll(con:number, level:number, feats?: IFeats[], talents?: ITalents[]): number[] {
        return [level, 8, this.calculatebasemodifier(con)];
    }
    calcmeleehit(dex:number, level:number, feats?: IFeats[]):number {
        let mod = 0;
        if (this.armor == ArmorTypes.HEAVY) {
            mod = -2;
        }
        if (this.shield){
            mod += -1;
        }
        if (this.weapon == MeleeWeapons.TWOHHEAVY){
            mod += -2;
        }

        return this.calculatebasemodifier(dex) + level + mod;
    }
    calcrangedhit(dex:number, level:number, feats?: IFeats[]):number {
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
            mod += -1;
        }
        if(feats && this.feattaken(feats,"Undead Remnant Heritage",Tiers.EPIC))
            mod+=1;
        return this.calculatebasemodifier(dex) + level + mod;
    }
    type():string {
        return 'Bard';
    }
}
