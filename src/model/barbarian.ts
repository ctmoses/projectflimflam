import { IClass, Attributes, ArmorTypes, MeleeWeapons, RangedWeapons, ISpells, AbilityRefresh, AbilityTrigger, AbilityType, ITalents, Tiers } from '@/types';
import { spell, talent } from './spell';


export class barbarian implements IClass {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    armor: ArmorTypes;
    shield: boolean;
    weapon: MeleeWeapons;
    ranged: RangedWeapons;
    spells: ISpells[];
    talents: ITalents[];

    constructor(armor: ArmorTypes, shield: boolean, weapon: MeleeWeapons, ranged: RangedWeapons){
        this.bonusstat1 = Attributes.STRENGTH;
        this.bonusstat2 = Attributes.CONSTITUTION;
        this.armor = armor;
        this.weapon = weapon;
        this.ranged = ranged;
        this.shield = shield;
        this.talents = [    new talent(AbilityRefresh.DAILY, AbilityTrigger.NONE,AbilityType.QUICK,Tiers.ADVENTURER, true,"Barbarian Rage","Once per day, use a quick action to start raging. A rage lasts until the end of battle, or about 5 minutes.  While raging, you roll 2d20 to hit with your barbarian melee and thrown weapon attacks instead of 1d20. Use the higher roll for the attack. If you roll a natural 11+ with both dice and your highest attack roll is a hit, the attack is a critical hit! Recharge 16+: After a battle in which you rage, roll a d20 and add your Constitution modifier. On a 16+, you can use Barbarian Rage again later in the day."), 
                            new talent(AbilityRefresh.BATTLE, AbilityTrigger.MONDEATH, AbilityType.FREE, Tiers.ADVENTURER, false, "Barbaric Cleave", "Once per battle, as a free action, you can make a standard melee attack after having dropped any enemy to 0 hp with a standard melee attack. Mooks do not count for this, unless the mook you dropped was the last of its mook mob.") ,
                            new talent(AbilityRefresh.DAILY, AbilityTrigger.MISS, AbilityType.FREE,Tiers.ADVENTURER, false, "Building Frenzy", "One battle per day, as a free action after you have missed an attack, gain +1d4 damage to each successful melee attack until the end of the battle. For each missed attack following this, add another +1d4 damage, up to a maximum of +4d4 damage."),
                            new talent(AbilityRefresh.ATWILL, AbilityTrigger.HIT, AbilityType.FREE, Tiers.ADVENTURER, false, "Slayer", "During your turn, when you attack a staggered enemy you were not engaged with at the start of your turn, deal +1d6 damage per level to that creature if you hit."),
                            new talent(AbilityRefresh.ATWILL, AbilityTrigger.NONE, AbilityType.FREE,Tiers.ADVENTURER,false,"Strongheart","Your recovery dice are d12s instead of d10s."),
                            new talent(AbilityRefresh.BATTLE,AbilityTrigger.NONE, AbilityType.FREE, Tiers.ADVENTURER,false,"Unstoppable","Once per battle, declare you’re using Unstoppable before making a barbarian melee attack. If your attack hits at least one target, you can heal using a recovery"),
                            new talent(AbilityRefresh.ATWILL, AbilityTrigger.NONE, AbilityType.STANDARD,Tiers.ADVENTURER,false,"Whirlwind","You can make a Whirlwind attack as the first action of your turn when you are engaged by two or more enemies. You take a –4 penalty to your AC and PD until the start of your next turn. Then roll a separate melee attack against each enemy you are engaged with. You deal no miss damage with these attacks."),
                            new talent(AbilityRefresh.BATTLE, AbilityTrigger.NONE, AbilityType.QUICK,Tiers.CHAMPION,false,"Natural Will","One battle per day as a quick action, you gain a +2 bonus to your Mental Defense until the end of the battle."),
                            new talent(AbilityRefresh.BATTLE,AbilityTrigger.NONE,AbilityType.FREE,Tiers.CHAMPION,false,"Violence","Once per battle, add a +1d4 bonus to a barbarian melee attack roll after finding out whether you hit or missed."),
                            new talent(AbilityRefresh.DAILY,AbilityTrigger.NONE,AbilityType.QUICK,Tiers.EPIC,false,"Ancestral Warband", "One battle per day as a quick action, you can call the spirits of your ancestors to fight alongside you. Your ancestors can’t be hurt or affected by the creatures of this world. At the end of each of your turns, if you are conscious, roll a d6. If you roll less than or equal to the escalation die, a member of your spirit warband strikes from the spirit realm into the world. Make a melee attack against a nearby enemy as if you were making the attack yourself, using any talents, feats, or magic items as you see fit. This attack doesn’t take any of your actions."),
                            new talent(AbilityRefresh.ATWILL, AbilityTrigger.NONE,AbilityType.FREE,Tiers.EPIC,false,"Relentless","While raging, you have resist damage 12+ (when an attack targets you, the attacker must roll a natural 12 or higher on the attack roll or it only deals half damage).")
                        ]; 
        this.spells = [];
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
}
function calculatebasemodifier(abilityscore: number) {
    return Math.floor((abilityscore - 10) / 2);
}