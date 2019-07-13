"use strict";
exports.__esModule = true;
var Attributes;
(function (Attributes) {
    Attributes[Attributes["STRENGTH"] = 0] = "STRENGTH";
    Attributes[Attributes["DEXTERITY"] = 1] = "DEXTERITY";
    Attributes[Attributes["INTELLIGENCE"] = 2] = "INTELLIGENCE";
    Attributes[Attributes["WISDOM"] = 3] = "WISDOM";
    Attributes[Attributes["CONSTITUTION"] = 4] = "CONSTITUTION";
    Attributes[Attributes["CHARISMA"] = 5] = "CHARISMA";
})(Attributes || (Attributes = {}));
;
var AbilityRefresh;
(function (AbilityRefresh) {
    AbilityRefresh[AbilityRefresh["ATWILL"] = 0] = "ATWILL";
    AbilityRefresh[AbilityRefresh["BATTLE"] = 1] = "BATTLE";
    AbilityRefresh[AbilityRefresh["DAILY"] = 2] = "DAILY";
})(AbilityRefresh || (AbilityRefresh = {}));
;
var AbilityType;
(function (AbilityType) {
    AbilityType[AbilityType["STANDARD"] = 0] = "STANDARD";
    AbilityType[AbilityType["MOVE"] = 1] = "MOVE";
    AbilityType[AbilityType["QUICK"] = 2] = "QUICK";
    AbilityType[AbilityType["INTERRUPT"] = 3] = "INTERRUPT";
    AbilityType[AbilityType["FREE"] = 4] = "FREE";
})(AbilityType || (AbilityType = {}));
;
var AbilityTrigger;
(function (AbilityTrigger) {
    AbilityTrigger[AbilityTrigger["HIT"] = 0] = "HIT";
    AbilityTrigger[AbilityTrigger["DAMAGETAKEN"] = 1] = "DAMAGETAKEN";
    AbilityTrigger[AbilityTrigger["MISS"] = 2] = "MISS";
})(AbilityTrigger || (AbilityTrigger = {}));
;
;
var dwarf = /** @class */ (function () {
    function dwarf() {
        this.bonusstat1 = Attributes.WISDOM;
        this.bonusstat2 = Attributes.CONSTITUTION;
        this.abilityrefresh = AbilityRefresh.BATTLE;
        this.abilitytrigger = AbilityTrigger.DAMAGETAKEN;
        this.abilitytype = AbilityType.FREE;
        this.abilitytext = "Once per battle as a free action after you have been hit by an enemy attack, you can heal using a recovery. If the escalation die is less than 2, you only get half the usual healing from the recovery. Unlike other recoveries that might allow you to take an average result, you have to roll this one! Note that you can’t use this ability if the attack drops you to 0 hp or below. You’ve got to be on your feet to sneer at their attack and recover.";
    }
    return dwarf;
}());
// This probably belongs in some utility folder
function calculatebasemodifier(abilityscore) {
    return Math.floor((abilityscore - 10) / 2);
}
