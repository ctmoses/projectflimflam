import {
    IClass, Attributes, ArmorTypes, MeleeWeapons, RangedWeapons, ISpells, AbilityRefresh, AbilityType, ITalents, Tiers, IFeats,
} from '@/types';

export default abstract class charclass implements IClass {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    armor: ArmorTypes;
    shield: boolean;
    weapon: MeleeWeapons;
    ranged: RangedWeapons;

    constructor(armor: ArmorTypes, shield: boolean, weapon: MeleeWeapons, ranged: RangedWeapons) {
        this.bonusstat1 = Attributes.NONE;
        this.bonusstat2 = Attributes.NONE;
        this.armor = ArmorTypes.NONE;
        this.weapon = MeleeWeapons.NONE;
        this.ranged = RangedWeapons.NONE;
        this.shield = false;
    }

    abstract calctalents(level:number, feats?: IFeats[], talents?: ITalents[]):number[];
    abstract baselineHP():number;
    abstract calcrecoveryroll(con:number, level:number, feats?: IFeats[], talents?: ITalents[]): number[];
    
    calcnumberoficons(feats?: IFeats[], talents?: ITalents[]):number{
        return 0;
    }
    calcspells(level:number):number[] {
        return [0, 0, 0];
    }
    calchp(con:number, level:number): number {
        let multiplier = 1;
        switch (level) {
        case 1:
            multiplier = 3;
            break;
        case 2:
            multiplier = 4;
            break;
        case 3:
            multiplier = 5;
            break;
        case 4:
            multiplier = 6;
            break;
        case 5:
            multiplier = 8;
            break;
        case 6:
            multiplier = 10;
            break;
        case 7:
            multiplier = 12;
            break;
        case 8:
            multiplier = 16;
            break;
        case 9:
            multiplier = 20;
            break;
        case 10:
            multiplier = 24;
            break;
        }
        return (this.baselineHP() + this.calculatebasemodifier(con)) * multiplier;
    }
    
    calcinitiative(dex:number, level:number): number {
        return this.calculatebasemodifier(dex) + level;
    }
    calcac(con:number, dex:number, wis:number, level:number): number {
        const array = [dex, con, wis];
        const sorted = array.sort((n1, n2) => n1 - n2);
        let armor=0;
        if (this.shield) 
            armor += 1;

        return this.calculatebasemodifier(sorted[1]) + level + armor;
    }
    calcpd(str:number, con:number, dex:number, level:number): number {
        const array = [str, con, dex];
        const sorted = array.sort((n1, n2) => n1 - n2);
        
        return this.calculatebasemodifier(sorted[1]) + level;
    }
    calcmd(int:number, wis:number, cha:number, level:number): number {
        const array = [int, wis, cha];
        const sorted = array.sort((n1, n2) => n1 - n2);
        
        return this.calculatebasemodifier(sorted[1]) + level;
    }
    calcrecoveries(): number {
        return 8;
    }
    
    calcmeleehit(str:number, level:number):number {
        return this.calculatebasemodifier(str) + level;
    }
    calcrangedhit(dex:number, level:number):number {
        return this.calculatebasemodifier(dex) + level;
    }
    calcrangedmiss(level:number){
        return 0;
    }
    calcmeleedmg(str:number, level:number):number[] {
        let dice;
        switch (this.weapon) {
        case MeleeWeapons.ONEHSMALL:
            dice = 4;
            break;
        case MeleeWeapons.ONEHLIGHT:
        case MeleeWeapons.TWOHSMALL:
            dice = 6;
            break;
        case MeleeWeapons.ONEHHEAVY:
        case MeleeWeapons.TWOHLIGHT:
            dice = 8;
            break;
        case MeleeWeapons.TWOHHEAVY:
            dice = 10;
            break;
        default:
            dice = 8;
            break;
        }
        const mult = this.calcDamageBonusMult(level);
        return [level, dice, this.calculatebasemodifier(str) * mult];
    }
    calcrangeddmg(dex:number, level:number):number[] {
        let dice;
        switch (this.ranged) {
        case RangedWeapons.THROWNSMALL:
        case RangedWeapons.XBOWSMALL:
            dice = 4;
            break;
        case RangedWeapons.THROWNLIGHT:
        case RangedWeapons.XBOWLIGHT:
        case RangedWeapons.BOWLIGHT:
            dice = 6;
            break;
        case RangedWeapons.XBOWHEAVY:
        case RangedWeapons.BOWHEAVY:
            dice = 8;
            break;
        default:
            dice = 6;
            break;
        }
        const mult = this.calcDamageBonusMult(level);
        return [level, dice, this.calculatebasemodifier(dex) * mult];
    }
    type():string {
        return 'Base';
    }
    calcDamageBonusMult(level:number):number {
        if (level < 5) return 1;
        if (level > 4 && level < 8) return 2;
        if (level > 7) return 3;
        return 0;
    }
    calculatebasemodifier(abilityscore: number):number {
        return Math.floor((abilityscore - 10) / 2);
    }
    calcnumberofbackgrounds(feats?: IFeats[], talents?: ITalents[]):number{
        return 0;
    }
    talenttaken(talents: ITalents[], name: string){
        let val = false;
        if(talents){
            talents.forEach(element => {
                if(element.name==name){
                    val = true;
                }
            });
        }
        return val;
    }
    feattaken(feats: IFeats[], name: string, tier: Tiers){
        let val = false;
        if(feats){
            feats.forEach(element => {
                if(element.name==name){
                    if(element.tier==tier){
                        val=true;;
                    }
                }
            });
        }
        return val;
    }
}
