import { AbilityRefresh, AbilityTrigger, AbilityType, ISpells } from "@/types";


export class spell implements ISpells{
    refresh: AbilityRefresh;
    trigger: AbilityTrigger;
    type: AbilityType;
    name: string;
    powertext: string;
    constructor(refresh: AbilityRefresh, trigger: AbilityTrigger, type: AbilityType, name: string, powertext: string){
        this.refresh = refresh;
        this.trigger = trigger;
        this.type = type;
        this.name = name;
        this.powertext = powertext;
    }
}