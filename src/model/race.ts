import {
    ISpells, IRace, AbilityRefresh, Attributes, AbilityType,
} from '@/types';
import { spell } from '@/model/spell';

export class dwarf implements IRace {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    constructor() {
        this.bonusstat1 = Attributes.WISDOM;
        this.bonusstat2 = Attributes.CONSTITUTION;
    }
    type():string {
        return 'Dwarf';
    }
}
export class darkelf implements IRace {
    bonusstat1: Attributes;
    bonusstat2: Attributes;

    constructor() {
        this.bonusstat1 = Attributes.DEXTERITY;
        this.bonusstat2 = Attributes.CHARISMA;
    }
    type():string {
        return 'Dark Elf';
    }
}

export class gnome implements IRace {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    constructor() {
        this.bonusstat1 = Attributes.DEXTERITY;
        this.bonusstat2 = Attributes.INTELLIGENCE;
    }
    type():string {
        return 'Gnome';
    }
}
export class halfelf implements IRace {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    constructor() {
        this.bonusstat1 = Attributes.CONSTITUTION;
        this.bonusstat2 = Attributes.CHARISMA;
    }
    type():string {
        return 'Half Elf';
    }
}
export class halforc implements IRace {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    constructor() {
        this.bonusstat1 = Attributes.STRENGTH;
        this.bonusstat2 = Attributes.DEXTERITY;
    }
    type():string {
        return 'Half Orc';
    }
}
export class halfling implements IRace {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    constructor() {
        this.bonusstat1 = Attributes.CONSTITUTION;
        this.bonusstat2 = Attributes.DEXTERITY;
    }
    type():string {
        return 'Halfling';
    }
}
export class highelf implements IRace {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    constructor() {
        this.bonusstat1 = Attributes.INTELLIGENCE;
        this.bonusstat2 = Attributes.CHARISMA;
    }
    type():string {
        return 'High Elf';
    }
}
export class human implements IRace {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    constructor() {
        this.bonusstat1 = Attributes.ALL;
        this.bonusstat2 = Attributes.NONE; // SM: Uhh, humans threw a wrench in the model..maybe rewrite so bonus stats are an array?
    }
    type():string {
        return 'Human';
    }
}
export class woodelf implements IRace {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    constructor() {
        this.bonusstat1 = Attributes.DEXTERITY;
        this.bonusstat2 = Attributes.WISDOM;
    }
    type():string {
        return 'Wood Elf';
    }
}

export const RaceFactory = (name: String): any => {
    switch(name) {
        case 'dwarf':
            return dwarf;
        case 'darkelf':
            return darkelf;
        case 'gnome':
            return gnome;
        default:
            return -1;
    }
};
