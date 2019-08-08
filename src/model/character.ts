import {
    IRace, IClass, ICharacter, IIcon, IFeats, ITalents, ISpells, IBackground, Tiers, IMagicItem, ItemType,
} from '@/types';
import { magicitems } from './spell';

export default class Character implements ICharacter {
    name: string = 'Default';
    class: IClass;
    race: IRace;
    level: number;
    str: number;
    con: number;
    dex: number;
    int: number;
    wis: number;
    cha: number;
    initiative: number;
    ac: number;
    pd: number;
    md: number;
    maxHp: number;
    curHp: number;
    maxRec: number;
    curRec: number;
    recRoll: number[];
    meleeToHit: number;
    meleeDmg: number[];
    missMelee: number;
    rangedToHit: number;
    rangedDmg: number[];
    missRanged: number;
    unique: string = 'Default';
    icon: IIcon[] = [];
    feats: IFeats[] = [];
    talents: ITalents[] = [];
    spells: ISpells[] = [];
    backgrounds: IBackground[] = [];
    magicItems: IMagicItem[] = [];
    constructor(charclass: IClass, race:IRace, str:number, con:number, dex:number, int:number, wis:number, cha:number, level:number) {
        this.class = charclass;
        this.race = race;
        this.str = str;
        this.con = con;
        this.dex = dex;
        this.int = int;
        this.wis = wis;
        this.cha = cha;
        this.level = level;
        this.initiative = this.class.calcinitiative(this.dex, this.level);
        this.ac = this.class.calcac(this.con, this.dex, this.wis, this.level);
        this.pd = this.class.calcpd(this.str, this.con, this.dex, this.level);
        this.md = this.class.calcmd(this.int, this.wis, this.cha, this.level);
        this.maxHp = this.class.calchp(this.con, this.level);
        this.curHp = this.maxHp;
        this.maxRec = this.class.calcrecoveries();
        this.curRec = this.maxRec;
        this.recRoll = this.class.calcrecoveryroll(this.con, this.level);
        this.rangedToHit = this.class.calcrangedhit(this.dex, this.level);
        this.rangedDmg = this.class.calcrangeddmg(this.dex, this.level);
        if (this.class.type() == 'Bard' || this.class.type() == 'Ranger') {
            if (this.str >= this.dex) {
                this.meleeToHit = this.class.calcmeleehit(this.str, this.level);
                this.meleeDmg = this.class.calcmeleedmg(this.str, this.level);
            } else {
                this.meleeToHit = this.class.calcmeleehit(this.dex, this.level);
                this.meleeDmg = this.class.calcmeleedmg(this.dex, this.level);
            }
        } else if (this.class.type() == 'Rogue') {
            this.meleeToHit = this.class.calcmeleehit(this.dex, this.level);
            this.meleeDmg = this.class.calcmeleedmg(this.dex, this.level);
        } else {
            this.meleeToHit = this.class.calcmeleehit(this.str, this.level);
            this.meleeDmg = this.class.calcmeleedmg(this.str, this.level);
        }
        if (this.class.type() == 'Rogue' || this.class.type() == 'Ranger') {
            this.missRanged = this.level;
        } else {
            this.missRanged = 0;
        }
        if (this.class.type() == 'Wizard') {
            this.missMelee = 0;
        } else {
            this.missMelee = this.level;
        }
    }

    setName(name:string) {
        this.name = name;
    }
    setFeats(feats:IFeats[]) {
        this.feats = feats;
        this.calcAll();
    }
    setIcons(icons:IIcon[]) {
        this.icon = icons;
    }
    setSpells(spells:ISpells[]) {
        this.spells = spells;
        this.calcAll();
    }
    setTalents(talents:ITalents[]) {
        this.talents = talents;
        this.calcAll();
    }
    setUnique(unique:string) {
        this.unique = unique;
    }
    setMagicItems(items:magicitems[]) {
        this.magicItems = items;
        this.calcAll();
    }
    setBackgrounds(backgrounds:IBackground[]) {
        this.backgrounds = backgrounds;
        this.calcAll();
    }
    setRecoveries(newtotal:number) {
        if (newtotal > this.maxRec) {}
        // THROW ERROR
        this.curRec = newtotal;
    }
    setHP(newtotal:number) {
        if (newtotal > this.maxHp) {} // Throw error
        this.curHp = newtotal;
    }
    calcNumberofFeats():number[] {
        let mod = 0;
        if (this.race.type() == 'Human') {
            mod = 1;
        }
        // SM: TODO: Humans get an extra feat. Is it always adv tier?
        if (this.level <= 4) return [this.level + mod, 0, 0];
        if (this.level > 4 && this.level < 8) return [4, this.level % 4 + mod, 0];
        if (this.level >= 8) return [4, 3, this.level % 7 + mod];
        return [];
    }
    calcNumberofBackgrounds():number {
        let mod = 0;
        this.feats.forEach((element) => {
            if (element.name == 'Further Backgrounding') {
                if (element.tier == Tiers.ADVENTURER) {
                    mod += 2;
                } else if (element.tier == Tiers.CHAMPION) {
                    mod += 3;
                } else if (element.tier == Tiers.EPIC) {
                    mod += 2;
                }
            }
        });
        return 5 + mod;
    }
    calcBackgroundCap():number {
        let mod = 0;
        this.feats.forEach((element) => {
            if (element.name == 'Further Backgrounding') {
                if (element.tier == Tiers.EPIC) mod += 2; // SM: Chris, why doesn't "return 7; work here?"
            }
        });
        return 5 + mod;
    }
    calcNumberofSpells():number[] {
        return this.class.calcspells(this.level, this.feats, this.talents);
    }
    calcNumberofTalents():number[] {
        return this.class.calctalents(this.level, this.feats, this.talents);
    }
    calcInitiative() {
        let mod = 0;
        this.feats.forEach((element) => {
            if (element.name == 'Imp. Initiative') mod = 4;
        });
        this.initiative = this.class.calcinitiative(this.dex, this.level, this.feats, this.talents) + mod;
    }
    calcMaxHP() {
        let HPAdd = 0;
        this.feats.forEach((element) => {
            if (element.name == 'Toughness') {
                if (this.level <= 4) {
                    HPAdd += this.class.baselineHP() / 2;
                } else if (this.level > 4 && this.level < 8) {
                    HPAdd += this.class.baselineHP();
                } else {
                    HPAdd += this.class.baselineHP() * 2;
                }
            }
        });
        this.magicItems.forEach((element) => {
            if (element.type == ItemType.SHIELD) {
                if (element.equipped == true) {
                    switch (element.tier) {
                    case Tiers.ADVENTURER:
                        HPAdd += 4;
                        break;
                    case Tiers.CHAMPION:
                        HPAdd += 10;
                        break;
                    case Tiers.EPIC:
                        HPAdd += 25;
                        break;
                    }
                }
            }
        });
        this.maxHp = this.class.calchp(this.con, this.level, this.feats, this.talents) + HPAdd;
    }
    calcAC() {
        let mod = 0;
        this.magicItems.forEach((element) => {
            if (element.type == ItemType.ARMOR) {
                if (element.equipped == true) {
                    switch (element.tier) {
                    case Tiers.ADVENTURER:
                        mod = 1;
                        break;
                    case Tiers.CHAMPION:
                        mod = 2;
                        break;
                    case Tiers.EPIC:
                        mod = 3;
                        break;
                    }
                }
            }
        });
        this.ac = this.class.calcac(this.con, this.dex, this.wis, this.level, this.feats, this.talents) + mod;
    }
    calcPD() {
        let mod = 0;
        this.magicItems.forEach((element) => {
            if (element.type == ItemType.CLOAK) {
                if (element.equipped == true) {
                    switch (element.tier) {
                    case Tiers.ADVENTURER:
                        mod = 1;
                        break;
                    case Tiers.CHAMPION:
                        mod = 2;
                        break;
                    case Tiers.EPIC:
                        mod = 3;
                        break;
                    }
                }
            }
        });
        this.pd = this.class.calcpd(this.str, this.con, this.dex, this.level, this.feats, this.talents) + mod;
    }
    calcMD() {
        let mod = 0;
        this.magicItems.forEach((element) => {
            if (element.type == ItemType.HELM) {
                if (element.equipped == true) {
                    switch (element.tier) {
                    case Tiers.ADVENTURER:
                        mod = 1;
                        break;
                    case Tiers.CHAMPION:
                        mod = 2;
                        break;
                    case Tiers.EPIC:
                        mod = 3;
                        break;
                    }
                }
            }
        });
        this.md = this.class.calcmd(this.int, this.wis, this.cha, this.level, this.feats, this.talents) + mod;
    }
    calcMaxRecoveries() {
        let mod = 0;
        this.magicItems.forEach((element) => {
            if (element.type == ItemType.BELT) {
                if (element.equipped == true) {
                    switch (element.tier) {
                    case Tiers.ADVENTURER:
                        mod = 1;
                        break;
                    case Tiers.CHAMPION:
                        mod = 2;
                        break;
                    case Tiers.EPIC:
                        mod = 3;
                        break;
                    }
                }
            }
        });
        this.maxRec = this.class.calcrecoveries(this.feats, this.talents) + mod;
    }
    calcMeleeHit() {
        let mod = 0;
        this.magicItems.forEach((element) => {
            if (element.type == ItemType.MELEE) {
                if (element.equipped == true) {
                    switch (element.tier) {
                    case Tiers.ADVENTURER:
                        mod = 1;
                        break;
                    case Tiers.CHAMPION:
                        mod = 2;
                        break;
                    case Tiers.EPIC:
                        mod = 3;
                        break;
                    }
                }
            }
        });
        if (this.class.type() == 'Bard' || this.class.type() == 'Ranger') {
            if (this.str >= this.dex) {
                this.meleeToHit = this.class.calcmeleehit(this.str, this.level, this.feats, this.talents) + mod;
            } else {
                this.meleeToHit = this.class.calcmeleehit(this.dex, this.level, this.feats, this.talents) + mod;
            }
        } else if (this.class.type() == 'Rogue') {
            this.meleeToHit = this.class.calcmeleehit(this.dex, this.level, this.feats, this.talents) + mod;
        } else {
            this.meleeToHit = this.class.calcmeleehit(this.str, this.level, this.feats, this.talents) + mod;
        }
    }
    calcRangedHit() {
        let mod = 0;
        this.magicItems.forEach((element) => {
            if (element.type == ItemType.RANGED) {
                if (element.equipped == true) {
                    switch (element.tier) {
                    case Tiers.ADVENTURER:
                        mod = 1;
                        break;
                    case Tiers.CHAMPION:
                        mod = 2;
                        break;
                    case Tiers.EPIC:
                        mod = 3;
                        break;
                    }
                }
            }
        });
        this.rangedToHit = this.class.calcrangedhit(this.dex, this.level, this.feats, this.talents) + mod;
    }
    calcRangedMiss(){
        this.missRanged = this.class.calcrangedmiss(this.level,this.feats,this.talents);
    }
    calcRecoveryRoll() {
        this.recRoll = this.class.calcrecoveryroll(this.con, this.level, this.feats, this.talents);
    }

    calcAll() {
        this.calcAC();
        this.calcBackgroundCap();
        this.calcInitiative();
        this.calcMD();
        this.calcMaxHP();
        this.calcMaxRecoveries();
        this.calcMeleeHit();
        this.calcNumberofBackgrounds();
        this.calcNumberofFeats();
        this.calcNumberofSpells();
        this.calcNumberofTalents();
        this.calcPD();
        this.calcRangedHit();
        this.calcRecoveryRoll();
        this.calcRangedMiss();
    }
}
