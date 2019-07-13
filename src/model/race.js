//SM: Seriously?  Enums?  What is the right model to do this in JS?  Is the right answer just strings everwhere?
const Attributes = Object.freeze({
    STRENGTH:       Symbol("str"),
    DEXTERITY:      Symbol("dex"),
    INTELLIGENCE:   Symbol("int"),
    WISDOM:         Symbol("wis"),
    CONSTITUTION:   Symbol("con"),
    CHARISMA:       Symbol("cha")
});

const AbilityRefresh = Object.freeze({
    ATWILL:     Symbol("will"),
    BATTLE:     Symbol("battle"),
    DAILY:      Symbol("daily")
});
const AbilityType = Object.freeze({
    STANDARD:   Symbol("standard"),
    MOVE:       Symbol("move"),
    QUICK:      Symbol("quick"),
    INTERRUPT:  Symbol("interrupt"),
    FREE:       Symbol("free")
});
const AbilityTrigger = Object.freeze({
    HIT:            Symbol("hit"),
    DAMAGETAKEN:    Symbol("dmgtaken"),
    MISS:           Symbol("miss"),
});

//SM: I assume when we pick a race, we want the parent character..uhh..object? class? to reach in and find these bonus stats
//    but also copy this ability somehow into itself.  You always get your racial ability, but later we'll need the ability to choose feat/talent/spell etc..
//    Sometime later we can code the ability based on triggers/conditions
var dwarf = {
    bonusstats: [Attributes.CONSTITUTION, Attributes.WISDOM],
    ability:  {
        abilityrefresh: AbilityRefresh.BATTLE,
        abilitytype: AbilityType.FREE,
        abilitytrigger: AbilityTrigger.DAMAGETAKEN,
        abilitytext: "Once per battle as a free action after you have been hit by an enemy attack, you can heal using a recovery. If the escalation die is less than 2, you only get half the usual healing from the recovery. Unlike other recoveries that might allow you to take an average result, you have to roll this one! Note that you can’t use this ability if the attack drops you to 0 hp or below. You’ve got to be on your feet to sneer at their attack and recover."
    },
};
// This probably belongs in some utility folder
function calculatebasemodifier(abilityscore) {
    return Math.floor((abilityscore - 10) / 2);
}