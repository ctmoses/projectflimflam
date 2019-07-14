import { IClass, Attributes, ArmorTypes, MeleeWeapons, RangedWeapons, ISpells } from '@/types';
import { spell } from './spell';


export class barbarian implements IClass {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    armor: ArmorTypes;
    weapon: MeleeWeapons;
    ranged: RangedWeapons;
    spells: ISpells[];
    constructor(armor: ArmorTypes, weapon: MeleeWeapons, ranged: RangedWeapons){
        this.bonusstat1 = Attributes.STRENGTH;
        this.bonusstat2 = Attributes.CONSTITUTION;
        this.armor = armor;
        this.weapon = weapon;
        this.ranged = ranged;
        this.spells[] = new spell();  //SM: What is the easiest way to shove a bunch of spell data in here?
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
    calcmeleehit(attr:number, level:number):number{
        return calculatebasemodifier(attr)+level;
    }
    calcrangedhit(attr:number, level:number):number{
        var mod=0;
        if(this.ranged==RangedWeapons.XBOWHEAVY||this.ranged==RangedWeapons.XBOWLIGHT||this.ranged==RangedWeapons.XBOWSMALL)
            mod=-5;
        return calculatebasemodifier(attr)+level+mod;
    }
    calcmeleedmg(attr:number, level:number):string{
        var dice;
        switch(this.weapon){
            case MeleeWeapons.ONEHSMALL:
                dice="d4";
                break;
            case MeleeWeapons.ONEHLIGHT:
                dice = "d6";
                break;
            case MeleeWeapons.ONEHHEAVY:
                dice = "d8";
                break;
            case MeleeWeapons.TWOHSMALL:
                dice = "d6";
                break;
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
        return level+dice+calculatebasemodifier(attr);
    }
    calcrangeddmg(attr:number, level:number):string{
        var dice;
        switch(this.ranged){
            case RangedWeapons.THROWNSMALL:
                dice="d4";
                break;
            case RangedWeapons.THROWNLIGHT:
                dice = "d6";
                break;
            case RangedWeapons.XBOWSMALL:
                dice = "d4";
                break;
            case RangedWeapons.XBOWLIGHT:
                dice = "d6";
                break;
            case RangedWeapons.XBOWHEAVY:
                dice = "d8";
                break;
            case RangedWeapons.BOWLIGHT:
                dice="d6";
                break;
            case RangedWeapons.BOWHEAVY:
                dice="d8";
                break;
            default:
                dice="d6"
                break;
        }
        return level+dice+calculatebasemodifier(attr);
    } 
    
}
function calculatebasemodifier(abilityscore: number) {
    return Math.floor((abilityscore - 10) / 2);
}