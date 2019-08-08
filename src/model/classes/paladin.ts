import {
    IClass, Attributes, ArmorTypes, MeleeWeapons, RangedWeapons, ISpells, AbilityRefresh, AbilityType, ITalents, Tiers, IFeats,
} from '@/types';
import { feat } from '../spell';
import charclass from './charclass';

export default class paladin extends charclass {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    armor: ArmorTypes;
    shield: boolean;
    weapon: MeleeWeapons;
    ranged: RangedWeapons;


    constructor(armor: ArmorTypes, shield: boolean, weapon: MeleeWeapons, ranged: RangedWeapons) {
        super(armor,shield,weapon,ranged);
        this.bonusstat1 = Attributes.STRENGTH;
        this.bonusstat2 = Attributes.CHARISMA;
        this.armor = armor;
        this.weapon = weapon;
        this.ranged = ranged;
        this.shield = shield;
    }
    calctalents(level:number):number[] {
        if (level <= 4) return [3, 0, 0];
        if (level > 4 && level < 8) return [4, 0, 0];
        if (level >= 8) return [5, 0, 0];
        return [-1, -1, -1];
    }
    calcspells(level:number, feats?: IFeats[], talents?: ITalents[]):number[]{
        if(talents){
            talents.forEach(element => {
                if(element.name=="Cleric Training"){
                    switch(level){
                        case 1:
                        case 2:
                            return [1,0,0,0,0];
                            break;
                        case 3:
                        case 4:
                            return [0,1,0,0,0];
                            break;
                        case 5:
                        case 6:
                            return [0,0,1,0,0];
                            break;
                        case 7:
                        case 8:
                            return [0,0,0,1,0];
                            break;
                        case 9:
                        case 10:
                            return [0,0,0,0,1];
                            break;
                        default:
                            return [0,0,0,0,0];
                            break;
                    }
                }
            });
        }
        return [0,0,0,0,0];
    }
    baselineHP():number {
        return 8;
    }
    calcac(con:number, dex:number, wis:number, level:number, feats?: IFeats[], talents?: ITalents[]): number {
        let armor = 0;
        switch (this.armor) {
        case ArmorTypes.NONE:
            armor = 10;
            break;
        case ArmorTypes.LIGHT:
            armor = 12;
            break;
        case ArmorTypes.HEAVY:
            armor = 16;
            break;
        default:
            armor = 16;
            break;
        }
        if (talents) {
            talents.forEach((element) => {
                if (element.name == 'Bastion') {
                    armor += 1;
                }
            });
        }
        return super.calcac(con,dex,wis,level) + armor;
    }
    calcpd(str:number, con:number, dex:number, level:number, feats?: IFeats[]): number {
        let mod = 0;
        if (feats) {
            feats.forEach((element) => {
                if (element.name == 'Implacable') {
                    if (element.tier == Tiers.EPIC) {
                        mod += 1;
                    }
                }
            });
        }
        return super.calcpd(str,con,dex,level) + 10 + mod;
    }
    calcmd(int:number, wis:number, cha:number, level:number, feats?: IFeats[]): number {
        let mod = 0;

        if (feats) {
            feats.forEach((element) => {
                if (element.name == 'Implacable') {
                    if (element.tier == Tiers.EPIC) {
                        mod += 1;
                    }
                }
            });
        }

        return super.calcmd(int,wis,cha,level) + 12 + mod;
    }
    calcrecoveries(feats?: IFeats[]): number {
        let recoveries = 8;
        if (feats) {
            feats.forEach((element) => {
                if (element.name == 'Bastion') {
                    if (element.tier == Tiers.ADVENTURER) recoveries += 1;
                }
            });
        }
        return recoveries;
    }
    calcrecoveryroll(con:number, level:number): number[] {
        return [level, 10, this.calculatebasemodifier(con)];
    }
    type():string {
        return 'Paladin';
    }
}
