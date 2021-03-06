import { IClass, Attributes, ArmorTypes, MeleeWeapons, RangedWeapons, ISpells, AbilityRefresh, AbilityType, ITalents, Tiers, IFeats } from '@/types';
import charclass from './charclass';
import { spell } from '../spell';

export default class fighter extends charclass {
    bonusstat1: Attributes;
    bonusstat2: Attributes;
    armor: ArmorTypes=ArmorTypes.NONE;
    shield: boolean=false;;
    weapon: MeleeWeapons=MeleeWeapons.NONE;
    ranged: RangedWeapons=RangedWeapons.NONE;


    constructor(){
        super();
        this.bonusstat1 = Attributes.STRENGTH;
        this.bonusstat2 = Attributes.CONSTITUTION;
    }
    calctalents(level:number, feats?: IFeats[], talents?: ITalents[]):number[]{
        if(level<6)
            return [3,0,0];
        if(level>=6)
            return [4,0,0];
        return [-1,-1,-1];
    }
    calcspells(level:number, feats?: IFeats[], talents?: ITalents[]):number[]{
        var spells;
        switch(level){
            case 1:
                spells =  [3,0,0,0,0];
                break;
            case 2:
                spells =  [4,0,0,0,0];
                break;
            case 3:
                spells =  [0,4,0,0,0];
                break;
            case 4:
                spells =  [0,5,0,0,0];
                break;
            case 5:
                spells =  [0,0,5,0,0];
                break;                
            case 6:
                spells =  [0,0,6,0,0];
                break;
            case 7:
                spells =  [0,0,0,6,0];
                break;
            case 8:
                spells =  [0,0,0,7,0];
                break;
            case 9:
                spells =  [0,0,0,0,7];
                break;
            case 10:
                spells =  [0,0,0,0,8];
                break;
            default:
                spells =  [-1,-1,-1,-1,-1,-1]
                break;
        }
        return spells;
    }
    baselineHP():number {
        return 8;
    }
    calcac(con:number, dex:number,wis:number, level:number, feats?: IFeats[], talents?: ITalents[]): number{
        var armor;
        switch(this.armor){
            case ArmorTypes.NONE:
                armor=10;
                break;
            case ArmorTypes.LIGHT:
                armor=13;
                break;
            case ArmorTypes.HEAVY:
                armor = 15;
                break;
            default:
                armor=-99;
                break;
        }
        return super.calcac(con,dex,wis,level)+armor;
    }
    calcpd(str:number, con:number,dex:number,level:number, feats?: IFeats[], talents?: ITalents[]): number{
        return super.calcpd(str,con,dex,level)+10;
    }
    calcmd(int:number, wis:number, cha:number, level:number, feats?: IFeats[], talents?: ITalents[]): number{
        return super.calcmd(int,wis,cha,level)+10;
    }
    calcrecoveries(feats?: IFeats[], talents?: ITalents[]): number{
        var mod=0;
        if(feats && this.feattaken(feats,"Extra Tough",Tiers.ADVENTURER))
            mod+=1;
        if(feats && this.feattaken(feats,"Tough as Iron",Tiers.CHAMPION))
            mod+=2;

        return 9+mod;
    }
    calcrecoveryroll(con:number, level:number, feats?: IFeats[], talents?: ITalents[]): number[]{
        return [level,10,this.calculatebasemodifier(con)];
    }
    calcrangeddmg(dex:number, level:number, feats?: IFeats[], talents?: ITalents[]):number[] {
        var damage;
        if(talents && this.talenttaken(talents,"Deadeye Archer")){
            let dice;
            switch (this.ranged) {
            case RangedWeapons.THROWNSMALL:
            case RangedWeapons.XBOWSMALL:
                dice = 4;
                break;
            case RangedWeapons.THROWNLIGHT:
            case RangedWeapons.XBOWLIGHT:
            case RangedWeapons.BOWLIGHT:
                dice = 8;
                break;
            case RangedWeapons.XBOWHEAVY:
            case RangedWeapons.BOWHEAVY:
                dice = 10;
                break;
            default:
                dice = 6;
                break;
            }
            const mult = this.calcDamageBonusMult(level);
            damage = [level, dice, this.calculatebasemodifier(dex) * mult];
            //TODO Epic feat for crit range
        }
        else
            damage = super.calcrangeddmg(dex,level); 
        return damage;
    }
    calcrangedmiss(level:number, feats?: IFeats[], talents?: ITalents[]){
        var damage=0;
        if(talents && this.talenttaken(talents,"Deadeye Archer"))
            damage=level;
        return damage;
    }
    type():string{
        return "Fighter";
    }
}