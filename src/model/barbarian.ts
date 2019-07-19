import { IClass, Attributes, ArmorTypes, MeleeWeapons, RangedWeapons, ISpells, AbilityRefresh, AbilityTrigger, AbilityType, ITalents, Tiers } from '@/types';
import { spell, talent } from './spell';


export class barbarian implements IClass {
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
    
    calctalents(level:number):number{
        if(level<=4)
            return 3;
        if(level>4&&level<8)
            return 4;  //SM: TODO.  This class should really return something like 3 Adventurer and 1 Champion tier talent
        if(level>=8)
            return 5;
        return -1;
    }
    calcspells(level:number):number{
        return 0;
    }
    calchp(con:number,level:number): number {
        return (7+calculatebasemodifier(con))*level;
    }
    calcinitiative(dex:number, level:number): number{
        return calculatebasemodifier(dex)+level;
    }
    calcac(con:number, dex:number,wis:number, level:number): number{
        let array = [dex,con,wis];
        array.sort();
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
        return calculatebasemodifier(array[1])+level+armor;
    }
    calcpd(str:number, con:number,dex:number,level:number): number{
        let array = [str,con,dex];
        array.sort();
        return calculatebasemodifier(array[1])+11+level;
    }
    calcmd(int:number, wis:number, cha:number, level:number): number{
        let array = [int,wis,cha];
        array.sort();
        return calculatebasemodifier(array[1])+10+level;
    }
    calcrecoveries(): number{
        return 8;
    }
    calcrecoveryroll(con:number, level:number): string{
        return level+"d10"+calculatebasemodifier(con);
    }
    calcmeleehit(str:number, level:number):number{
        return calculatebasemodifier(str)+level;
    }
    calcrangedhit(dex:number, level:number):number{
        var mod=0;
        if(this.ranged==RangedWeapons.XBOWHEAVY||this.ranged==RangedWeapons.XBOWLIGHT||this.ranged==RangedWeapons.XBOWSMALL)
            mod = -5;
        return calculatebasemodifier(dex)+level+mod;
    }
    calcmeleedmg(str:number, level:number):string{
        var dice;
        switch(this.weapon){
            case MeleeWeapons.ONEHSMALL:
                dice="d4";
                break;
            case MeleeWeapons.ONEHLIGHT:
            case MeleeWeapons.TWOHSMALL:
                dice = "d6";
                break;
            case MeleeWeapons.ONEHHEAVY:
            case MeleeWeapons.TWOHLIGHT:
                dice = "d8";
                break;
            case MeleeWeapons.TWOHHEAVY:
                dice="d10";
                break;
            default:
                dice="d8"
                break;
        }
        return level+dice+calculatebasemodifier(str);
    }
    calcrangeddmg(dex:number, level:number):string{
        var dice;
        switch(this.ranged){
            case RangedWeapons.THROWNSMALL:
            case RangedWeapons.XBOWSMALL:
                dice="d4";
                break;
            case RangedWeapons.THROWNLIGHT:
            case RangedWeapons.XBOWLIGHT:
            case RangedWeapons.BOWLIGHT:
                dice = "d6";
                break;
            case RangedWeapons.XBOWHEAVY:
            case RangedWeapons.BOWHEAVY:
                dice = "d8";
                break;
            default:
                dice="d6"
                break;
        }
        return level+dice+calculatebasemodifier(dex);
    } 
    type():string{
        return "Barbarian";
    }
}
function calculatebasemodifier(abilityscore: number) {
    return Math.floor((abilityscore - 10) / 2);
}