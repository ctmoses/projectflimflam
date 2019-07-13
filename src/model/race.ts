enum Attributes {
    STRENGTH,
    DEXTERITY,
    INTELLIGENCE,
    WISDOM,
    CONSTITUTION,
    CHARISMA
};

enum AbilityRefresh {
    ATWILL,
    BATTLE,
    DAILY
};
enum AbilityType {
    STANDARD,
    MOVE,
    QUICK,
    INTERRUPT,
    FREE
};
enum AbilityTrigger {
    HIT,
    DAMAGETAKEN,
    MISS,
};
export interface IRace {
    bonusstat1: Attributes,
    bonusstat2: Attributes,
    abilityrefresh: AbilityRefresh,
    abilitytype: AbilityType,
    abilitytrigger: AbilityTrigger,
    abilitytext: string

};

class dwarf implements IRace {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    abilityrefresh: AbilityRefresh;
    abilitytype: AbilityType;
    abilitytrigger: AbilityTrigger;
    abilitytext: string;
    constructor(){
        this.bonusstat1 = Attributes.WISDOM;
        this.bonusstat2 =Attributes.CONSTITUTION;
        this.abilityrefresh = AbilityRefresh.BATTLE;
        this.abilitytrigger = AbilityTrigger.DAMAGETAKEN;
        this.abilitytype = AbilityType.FREE;
        this.abilitytext = "Once per battle as a free action after you have been hit by an enemy attack, you can heal using a recovery. If the escalation die is less than 2, you only get half the usual healing from the recovery. Unlike other recoveries that might allow you to take an average result, you have to roll this one! Note that you can’t use this ability if the attack drops you to 0 hp or below. You’ve got to be on your feet to sneer at their attack and recover.";
    }
}

// This probably belongs in some utility folder
function calculatebasemodifier(abilityscore: number) {
    return Math.floor((abilityscore - 10) / 2);
}