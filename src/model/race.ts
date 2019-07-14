import { ISpells, IRace, AbilityRefresh,AbilityTrigger,Attributes,AbilityType } from "@/types";
import {spell} from "@/model/spell"

export class dwarf implements IRace {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    power: ISpells;
    constructor(){
        this.bonusstat1 = Attributes.WISDOM;
        this.bonusstat2 = Attributes.CONSTITUTION;
        var text = "Once per battle as a free action after you have been hit by an enemy attack, you can heal using a recovery. If the escalation die is less than 2, you only get half the usual healing from the recovery. Unlike other recoveries that might allow you to take an average result, you have to roll this one! Note that you can’t use this ability if the attack drops you to 0 hp or below. You’ve got to be on your feet to sneer at their attack and recover.";
        this.power = new spell(AbilityRefresh.BATTLE, AbilityTrigger.DAMAGETAKEN, AbilityType.FREE, "That’s Your Best Shot? ", text);
    }
}
export class darkelf implements IRace {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    power: ISpells;
    constructor(){
        this.bonusstat1 = Attributes.DEXTERITY;
        this.bonusstat2 = Attributes.CHARISMA;
        var text = "Once per battle, deal ongoing damage to a target you hit with a natural even attack roll as a free action. The ongoing damage equals 5 times your level. (For example, at 3rd level you would deal 15 ongoing damage against a single target.) As usual, a normal save (11+) ends the damage. A critical hit doesn’t double this ongoing damage.";
        this.power = new spell(AbilityRefresh.BATTLE, AbilityTrigger.HIT, AbilityType.FREE,"Cruel", text);
    }
}

export class gnome implements IRace {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    power: ISpells;
    size: string;  //SM: Only gnomes and halflings are not normal size..add to interface?  ignore this crap?
    extrapower: ISpells;  //SM: Gnomes have special crap.  Change powers to an array?
    constructor(){
        this.bonusstat1 = Attributes.DEXTERITY;
        this.bonusstat2 = Attributes.INTELLIGENCE;
        var text = "Once per battle, when you roll a natural 16+ with an attack, you can also daze the target until the end of your next turn.";
        this.power = new spell(AbilityRefresh.BATTLE, AbilityTrigger.HIT, AbilityType.FREE,"Confoundoing", text);
        this.size = "Small Gnomes have a +2 AC bonus against opportunity attacks."
        this.extrapower = new spell(AbilityRefresh.ATWILL, AbilityTrigger.NONE, AbilityType.STANDARD, "Minor Illusions", "As a standard action, at-will, you can create a strong smell or a sound nearby. Nearby creatures that fail a normal save notice the smell or sound. Creatures that make the save may notice it but recognize it as not exactly real.")
    }
}
export class halfelf implements IRace {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    power: ISpells;
    constructor(){
        this.bonusstat1 = Attributes.CONSTITUTION;
        this.bonusstat2 = Attributes.CHARISMA;
        var text = "Once per battle, subtract one from the natural result of one of your own d20 rolls.";
        this.power = new spell(AbilityRefresh.BATTLE, AbilityTrigger.NONE, AbilityType.FREE, "Surprising", text);
    }
}
export class halforc implements IRace {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    power: ISpells;
    constructor(){
        this.bonusstat1 = Attributes.STRENGTH;
        this.bonusstat2 = Attributes.DEXTERITY;
        var text = "Once per battle, reroll a melee attack and use the roll you prefer as the result.";
        this.power = new spell(AbilityRefresh.BATTLE, AbilityTrigger.NONE, AbilityType.FREE, "Lethal", text);
    }
}
export class halfling implements IRace {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    power: ISpells;
    size: string;
    constructor(){
        this.bonusstat1 = Attributes.CONSTITUTION;
        this.bonusstat2 = Attributes.DEXTERITY;
        var text = "Once per battle, force an enemy that hits you with an attack to reroll the attack with a –2 penalty.";
        this.power = new spell(AbilityRefresh.BATTLE, AbilityTrigger.DAMAGETAKEN, AbilityType.FREE, "Evasive", text);
        this.size = "Small: Halflings have a +2 AC bonus against opportunity attacks."
    }
}
export class highelf implements IRace {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    power: ISpells;
    constructor(){
        this.bonusstat1 = Attributes.INTELLIGENCE;
        this.bonusstat2 = Attributes.CHARISMA;
        var text = "Once per battle as a move action, place yourself in a nearby location you can see.";
        this.power = new spell(AbilityRefresh.BATTLE, AbilityTrigger.NONE, AbilityType.MOVE, "Highblood Teleport", text);
    }
}
export class human implements IRace {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    power: ISpells;
    constructor(){
        this.bonusstat1 = Attributes.ALL;
        this.bonusstat2 = NaN;  //SM: Uhh, humans threw a wrench in the model..maybe rewrite so bonus stats are an array?
        var text = "At the start of each battle, roll initiative twice and choose the result you want.";
        this.power = new spell(AbilityRefresh.BATTLE, AbilityTrigger.NONE, AbilityType.FREE, "Quick to Fight", text);
    }
}
export class woodelf implements IRace {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    power: ISpells;
    constructor(){
        this.bonusstat1 = Attributes.DEXTERITY;
        this.bonusstat2 = Attributes.WISDOM;  
        var text = "At the start of each of your turns, roll a die to see if you get an extra standard action. If your roll is equal to or lower than the escalation die, you get an extra standard action that turn.  At the start of battle, you roll a d6. Each time you successfully gain an extra action, the size of the die you roll increases by one step on the following progression: (d4), d6, d8, d10, d12, d20. If you get an extra action after rolling a d20, you can’t get any more extra actions that battle.";
        this.power = new spell(AbilityRefresh.BATTLE, AbilityTrigger.NONE, AbilityType.FREE, "Elven Grace", text);
    }
}


// This probably belongs in the player class
function calculatebasemodifier(abilityscore: number) {
    return Math.floor((abilityscore - 10) / 2);
}