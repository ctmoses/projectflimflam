import { IClass, Attributes, ArmorTypes, MeleeWeapons, RangedWeapons, ISpells, AbilityRefresh, AbilityTrigger, AbilityType, ITalents, Tiers, IFeats } from '@/types';
import { feat } from './spell';

export default class paladin implements IClass {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    armor: ArmorTypes;
    shield: boolean;
    weapon: MeleeWeapons;
    ranged: RangedWeapons;


    constructor(armor: ArmorTypes, shield: boolean, weapon: MeleeWeapons, ranged: RangedWeapons){
        this.bonusstat1 = Attributes.STRENGTH;
        this.bonusstat2 = Attributes.CHARISMA;
        this.armor = armor;
        this.weapon = weapon;
        this.ranged = ranged;
        this.shield = shield;
    }
    calctalents(level:number, feats?: IFeats[], talents?: ITalents[]):number[]{
        if(level<=4)
            return [3,0,0];
        if(level>4&&level<8)
            return [4,0,0];  
        if(level>=8)
            return [5,0,0];
        return [-1,-1,-1];
    }
    calcspells(level:number, feats?: IFeats[], talents?: ITalents[]):number[]{
        if(talents){
            talents.forEach(element => {
                if(element.name=="Cleric Training"){
                    switch(level){
                        case 1:
                        case 2:
                            return [1,0,0,0,0];
                            break;
                        case 3:
                        case 4:
                            return [0,1,0,0,0];
                            break;
                        case 5:
                        case 6:
                            return [0,0,1,0,0];
                            break;
                        case 7:
                        case 8:
                            return [0,0,0,1,0];
                        case 9:
                        case 10:
                            return [0,0,0,0,1];
                            break;
                        default:
                            return [0,0,0,0,0,0]
                            break;
                    }
                }
            });
        }
        return [0,0,0,0,0];
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
        return 8;
    }
    calcinitiative(dex:number, level:number, feats?: IFeats[], talents?: ITalents[]): number{
        return this.calculatebasemodifier(dex)+level;
    }
    calcac(con:number, dex:number,wis:number, level:number, feats?: IFeats[], talents?: ITalents[]): number{
        let array = [dex,con,wis];
        var sorted = array.sort((n1,n2)=>n1-n2);
        var armor=0;
        var mod = 0;
        switch(this.armor){
            case ArmorTypes.NONE:
                armor=10;
                break;
            case ArmorTypes.LIGHT:
                armor=12;
                break;
            case ArmorTypes.HEAVY:
                armor = 16;
                break;
            default:
                armor=16;
                break;
        }
        if(this.shield)
            armor+=1;

        if(talents){
            talents.forEach(element => {
                if(element.name=="Bastion"){
                    mod+=1;
                }
            });
        }


        return this.calculatebasemodifier(sorted[1])+level+armor;
    }
    calcpd(str:number, con:number,dex:number,level:number, feats?: IFeats[], talents?: ITalents[]): number{
        let array = [str,con,dex];
        var sorted = array.sort((n1,n2)=>n1-n2);
        var mod =0;

        if(feats){
            feats.forEach(element => {
                if(element.name=="Implacable"){
                    if(element.tier==Tiers.EPIC){
                        mod+=1;
                    }
                }
            });
        }
        
        return this.calculatebasemodifier(sorted[1])+10+level+mod;
    }
    calcmd(int:number, wis:number, cha:number, level:number, feats?: IFeats[], talents?: ITalents[]): number{
        let array = [int,wis,cha];
        var sorted = array.sort((n1,n2)=>n1-n2);
        var mod = 0;
        
        if(feats){
            feats.forEach(element => {
                if(element.name=="Implacable"){
                    if(element.tier==Tiers.EPIC){
                        mod+=1;
                    }
                }
            });
        }
        
        return this.calculatebasemodifier(sorted[1])+12+level+mod;
    }
    calcrecoveries(feats?: IFeats[], talents?: ITalents[]): number{
        var recoveries=8;
        if(feats){
            feats.forEach(element => {
                if(element.name=="Bastion"){
                    if(element.tier==Tiers.ADVENTURER)
                        recoveries+=1;
                }
            });
        }
        return recoveries;
    }
    calcrecoveryroll(con:number, level:number, feats?: IFeats[], talents?: ITalents[]): number[]{
        var dicetype=10;
        var mod =1;
            
        return [level,dicetype,this.calculatebasemodifier(con)*mod];
    }
    calcmeleehit(str:number, level:number, feats?: IFeats[], talents?: ITalents[]):number{
        var mod=0;

        return this.calculatebasemodifier(str)+level+mod;
    }
    calcrangedhit(dex:number, level:number, feats?: IFeats[], talents?: ITalents[]):number{
        var mod=0;

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
        return "Paladin";
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