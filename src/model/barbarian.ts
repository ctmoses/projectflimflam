import { IClass, Attributes, ArmorTypes, MeleeWeapons, RangedWeapons, ISpells, AbilityRefresh, AbilityTrigger, AbilityType, ITalents, Tiers, IFeats } from '@/types';

export default class barbarian implements IClass {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    armor: ArmorTypes;
    shield: boolean;
    weapon: MeleeWeapons;
    ranged: RangedWeapons;


    constructor(armor: ArmorTypes, shield: boolean, weapon: MeleeWeapons, ranged: RangedWeapons){
        this.bonusstat1 = Attributes.STRENGTH;
        this.bonusstat2 = Attributes.CONSTITUTION;
        this.armor = armor;
        this.weapon = weapon;
        this.ranged = ranged;
        this.shield = shield;
    }
    calctalents(level:number, feats?: IFeats[], talents?: ITalents[]):number[]{
        if(level<=4)
            return [3,0,0];
        if(level>4&&level<8)
            return [3,1,0];  //SM: TODO.  This class should really return something like 3 Adventurer and 1 Champion tier talent
        if(level>=8)
            return [3,1,1];
        return [-1,-1,-1];
    }
    calcspells(level:number, feats?: IFeats[], talents?: ITalents[]):number[]{
        return [0,0,0];
    }
    calchp(con:number,level:number, feats?: IFeats[], talents?: ITalents[]): number {
        var multiplier=1;
        switch(level){
            case 1:
                multiplier = 3;
                break;
            case 2:
                multiplier = 4;
                break;
            case 3:
                multiplier = 5;
                break;
            case 4:
                multiplier = 6;
                break;
            case 5:
                multiplier = 8;
                break;  
            case 6:
                multiplier = 10;
                break;  
            case 7:
                multiplier = 12;
                break;
            case 8:
                multiplier = 16;
                break;
            case 9:
                multiplier = 20;
                break;
            case 10:
                multiplier = 24;
                break;
        
        }
        return (this.baselineHP()+this.calculatebasemodifier(con))*multiplier;
    }
    baselineHP():number {
        return 7;
    }
    calcinitiative(dex:number, level:number, feats?: IFeats[], talents?: ITalents[]): number{
        return this.calculatebasemodifier(dex)+level;
    }
    calcac(con:number, dex:number,wis:number, level:number, feats?: IFeats[], talents?: ITalents[]): number{
        let array = [dex,con,wis];
        var sorted = array.sort((n1,n2)=>n1-n2);
        var armor;
        switch(this.armor){
            case ArmorTypes.NONE:
                armor=10;
                break;
            case ArmorTypes.LIGHT:
                armor=12;
                break;
            case ArmorTypes.HEAVY:
                armor = 13;
                break;
            default:
                armor=12;
                break;
        }
        if(this.shield)
            armor+=1;
        return this.calculatebasemodifier(sorted[1])+level+armor;
    }
    calcpd(str:number, con:number,dex:number,level:number, feats?: IFeats[], talents?: ITalents[]): number{
        let array = [str,con,dex];
        var sorted = array.sort((n1,n2)=>n1-n2);
        return this.calculatebasemodifier(sorted[1])+11+level;
    }
    calcmd(int:number, wis:number, cha:number, level:number, feats?: IFeats[], talents?: ITalents[]): number{
        let array = [int,wis,cha];
        var sorted = array.sort((n1,n2)=>n1-n2);
        return this.calculatebasemodifier(sorted[1])+10+level;
    }
    calcrecoveries(feats: IFeats[]=[]): number{
        return 8;
    }
    calcrecoveryroll(con:number, level:number, feats?: IFeats[], talents?: ITalents[]): number[]{
        return [level,10,this.calculatebasemodifier(con)];
    }
    calcmeleehit(str:number, level:number, feats?: IFeats[], talents?: ITalents[]):number{
        var mod=0;
        if(this.armor==ArmorTypes.HEAVY)
            mod=-2;
        return this.calculatebasemodifier(str)+level+mod;
    }
    calcrangedhit(dex:number, level:number, feats?: IFeats[], talents?: ITalents[]):number{
        var mod=0;
        if(this.ranged==RangedWeapons.XBOWHEAVY||this.ranged==RangedWeapons.XBOWLIGHT||this.ranged==RangedWeapons.XBOWSMALL)
            mod += -5;
        if(this.armor==ArmorTypes.HEAVY)
            mod+=-2;
        return this.calculatebasemodifier(dex)+level+mod;
    }
    calcmeleedmg(str:number, level:number, feats?: IFeats[], talents?: ITalents[]):number[]{
        var dice;
        switch(this.weapon){
            case MeleeWeapons.ONEHSMALL:
                dice=4;
                break;
            case MeleeWeapons.ONEHLIGHT:
            case MeleeWeapons.TWOHSMALL:
                dice = 6;
                break;
            case MeleeWeapons.ONEHHEAVY:
            case MeleeWeapons.TWOHLIGHT:
                dice = 8;
                break;
            case MeleeWeapons.TWOHHEAVY:
                dice=10;
                break;
            default:
                dice=8;
                break;
        }
        var mult=this.calcDamageBonusMult(level);
        return [level,dice,this.calculatebasemodifier(str)*mult]; 
    }
    calcrangeddmg(dex:number, level:number, feats?: IFeats[], talents?: ITalents[]):number[]{
        var dice;
        switch(this.ranged){
            case RangedWeapons.THROWNSMALL:
            case RangedWeapons.XBOWSMALL:
                dice=4;
                break;
            case RangedWeapons.THROWNLIGHT:
            case RangedWeapons.XBOWLIGHT:
            case RangedWeapons.BOWLIGHT:
                dice = 6;
                break;
            case RangedWeapons.XBOWHEAVY:
            case RangedWeapons.BOWHEAVY:
                dice = 8;
                break;
            default:
                dice=6;
                break;
        }
        var mult = this.calcDamageBonusMult(level);
        return [level,dice,this.calculatebasemodifier(dex)*mult];
    } 
    type():string{
        return "Barbarian";
    }
    calcDamageBonusMult(level:number):number{
        if(level<5)
            return 1;
        if(level>4 && level<8)
            return 2;
        if(level>7)
            return 3;
        return 0;
    }
    calculatebasemodifier(abilityscore: number):number {
        return Math.floor((abilityscore - 10) / 2);
    }
}