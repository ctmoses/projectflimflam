import { IClass, Attributes, ArmorTypes, MeleeWeapons, RangedWeapons, ISpells, AbilityRefresh, AbilityType, ITalents, Tiers, IFeats } from '@/types';
import charclass from './charclass';

export default class fighter extends charclass {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    armor: ArmorTypes;
    shield: boolean;
    weapon: MeleeWeapons;
    ranged: RangedWeapons;


    constructor(armor: ArmorTypes, shield: boolean, weapon: MeleeWeapons, ranged: RangedWeapons){
        super(armor,shield,weapon,ranged);
        this.bonusstat1 = Attributes.STRENGTH;
        this.bonusstat2 = Attributes.CONSTITUTION;
        this.armor = armor;
        this.weapon = weapon;
        this.ranged = ranged;
        this.shield = shield;
    }
    calctalents(level:number, feats?: IFeats[], talents?: ITalents[]):number[]{
        if(level<6)
            return [3,0,0];
        if(level>=6)
            return [4,0,0];
        return [-1,-1,-1];
    }
    calcspells(level:number, feats?: IFeats[], talents?: ITalents[]):number[]{
        switch(level){
            case 1:
                return [3,0,0,0,0];
                break;
            case 2:
                return [4,0,0,0,0];
                break;
            case 3:
                return [0,4,0,0,0];
                break;
            case 4:
                return [0,5,0,0,0];
                break;
            case 5:
                return [0,0,5,0,0];
                break;                
            case 6:
                return [0,0,6,0,0];
                break;
            case 7:
                return [0,0,0,6,0];
                break;
            case 8:
                return [0,0,0,7,0];
                break;
            case 9:
                return [0,0,0,0,7];
                break;
            case 10:
                return [0,0,0,0,8];
                break;
            default:
                return [-1,-1,-1,-1,-1,-1]
                break;
        }
    }
    baselineHP():number {
        return 8;
    }
    calcac(con:number, dex:number,wis:number, level:number, feats?: IFeats[], talents?: ITalents[]): number{
        var armor;
        switch(this.armor){
            case ArmorTypes.NONE:
                armor=10;
                break;
            case ArmorTypes.LIGHT:
                armor=13;
                break;
            case ArmorTypes.HEAVY:
                armor = 15;
                break;
            default:
                armor=15;
                break;
        }
        return super.calcac(con,dex,wis,level)+armor;
    }
    calcpd(str:number, con:number,dex:number,level:number, feats?: IFeats[], talents?: ITalents[]): number{
        return super.calcpd(str,con,dex,level)+10;
    }
    calcmd(int:number, wis:number, cha:number, level:number, feats?: IFeats[], talents?: ITalents[]): number{
        return super.calcmd(int,wis,cha,level)+10;
    }
    calcrecoveries(feats?: IFeats[], talents?: ITalents[]): number{
        var mod=0;
        if(feats){
            feats.forEach(element => {
                if(element.name=="Extra Tough"){
                    mod+=1;
                }
                if(element.name=="Tough as Iron"){
                    if(element.tier==Tiers.CHAMPION){
                        mod+=2;
                    }
                }
            });
        }
        return 9+mod;
    }
    calcrecoveryroll(con:number, level:number, feats?: IFeats[], talents?: ITalents[]): number[]{
        return [level,10,this.calculatebasemodifier(con)];
    }
    calcrangeddmg(dex:number, level:number, feats?: IFeats[], talents?: ITalents[]):number[] {
        var damage;
        if(talents){
            talents.forEach(element => {
                if(element.name=="Deadeye Archer"){
                    let dice;
                    switch (this.ranged) {
                    case RangedWeapons.THROWNSMALL:
                    case RangedWeapons.XBOWSMALL:
                        dice = 4;
                        break;
                    case RangedWeapons.THROWNLIGHT:
                    case RangedWeapons.XBOWLIGHT:
                    case RangedWeapons.BOWLIGHT:
                        dice = 8;
                        break;
                    case RangedWeapons.XBOWHEAVY:
                    case RangedWeapons.BOWHEAVY:
                        dice = 10;
                        break;
                    default:
                        dice = 6;
                        break;
                    }
                    const mult = this.calcDamageBonusMult(level);
                   damage = [level, dice, this.calculatebasemodifier(dex) * mult];
                    //SM: TODO Epic feat for crit range
                }
            });
        }
        else
            damage = super.calcrangeddmg(dex,level); 
        return damage;
    }
    calcrangedmiss(level:number, feats?: IFeats[], talents?: ITalents[]){
        var damage=0;
        if(talents){
            talents.forEach(element => {
                if(element.name=="Deadeye Archer"){
                    damage=level;
                }
            });
        }
        return damage;
    }
    type():string{
        return "Fighter";
    }
}