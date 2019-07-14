import { IClass, Attributes, ArmorTypes, MeleeWeapons, RangedWeapons, ISpells, AbilityRefresh, AbilityTrigger, AbilityType } from '@/types';
import { spell } from './spell';


export class barbarian implements IClass {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    armor: ArmorTypes;
    shield: boolean;
    weapon: MeleeWeapons;
    ranged: RangedWeapons;
    spells: ISpells[];

    constructor(armor: ArmorTypes, shield: boolean, weapon: MeleeWeapons, ranged: RangedWeapons){
        this.bonusstat1 = Attributes.STRENGTH;
        this.bonusstat2 = Attributes.CONSTITUTION;
        this.armor = armor;
        this.weapon = weapon;
        this.ranged = ranged;
        this.shield = shield;
        this.spells = [ new spell(AbilityRefresh.BATTLE, AbilityTrigger.MONDEATH, AbilityType.FREE, "Barbaric Cleave", "Once per battle, as a free action, you can make a standard melee attack after having dropped any enemy to 0 hp with a standard melee attack. Mooks do not count for this, unless the mook you dropped was the last of its mook mob.") ,
                        new spell(AbilityRefresh.DAILY, AbilityTrigger.MISS, AbilityType.FREE, "Building Frenzy", "One battle per day, as a free action after you have missed an attack, gain +1d4 damage to each successful melee attack until the end of the battle. For each missed attack following this, add another +1d4 damage, up to a maximum of +4d4 damage.")
                        ]; 
        //SM: What is the easiest way to shove a bunch of spell data in here?
        //SM: Some spells are innate, but some have to be chosen...need a way to distinguish between the two.
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
            mod=-5;
        return calculatebasemodifier(dex)+level+mod;
    }
    calcmeleedmg(str:number, level:number):string{
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
        return level+dice+calculatebasemodifier(str);
    }
    calcrangeddmg(dex:number, level:number):string{
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
        return level+dice+calculatebasemodifier(dex);
    } 
    //SM: TODO.  Probably need a way to return how many spells/talents/feats the class has available at each level as well
    
}
function calculatebasemodifier(abilityscore: number) {
    return Math.floor((abilityscore - 10) / 2);
}