import { IRace, IClass, ICharacter, IIcon, IFeats, ITalents, ISpells, IBackground } from '@/types';

export class Character implements ICharacter {
    name: string = "Default";
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
    recRoll: string;
    attMelee: number;
    hitMelee: string;
    missMelee: number;
    attRanged: number;
    hitRanged: string;
    missRanged: number;
    unique: string = "Default";
    icon: IIcon[] = [];
    feats: IFeats[] = []; 
    talents: ITalents[] = [];
    spells: ISpells[] = [];
    backgrounds: IBackground[] = [];
    magicItems: string[] = []; 
    constructor(charclass: IClass, race:IRace, str:number,con:number,dex:number,int:number,wis:number,cha:number,level:number ){
        this.class = charclass;
        this.race = race;
        this.str=str;
        this.con=con;
        this.dex=dex;
        this.int=int;
        this.wis=wis;
        this.cha=cha;
        this.level=level;
        this.initiative=this.class.calcinitiative(this.dex,this.level);
        this.ac=this.class.calcac(this.con,this.dex,this.wis,this.level);
        this.pd=this.class.calcpd(this.str,this.con,this.dex,this.level);
        this.md=this.class.calcmd(this.int,this.wis,this.cha,this.level);
        this.maxHp=this.class.calchp(this.con,this.level);
        this.curHp=this.maxHp;
        this.maxRec=this.class.calcrecoveries();
        this.curRec=this.maxRec;
        this.recRoll=this.class.calcrecoveryroll(this.con,this.level);
        this.attRanged=this.class.calcrangedhit(this.dex,this.level);
        this.hitRanged=this.class.calcrangeddmg(this.dex,this.level);
        if(this.class.type()=="Bard"||this.class.type()=="Ranger"){
            if(this.str>=this.dex){
                this.attMelee=this.class.calcmeleehit(this.str,this.level);
                this.hitMelee = this.class.calcmeleedmg(this.str,this.level);
            }
            else{
                this.attMelee=this.class.calcmeleehit(this.dex,this.level);
                this.hitMelee = this.class.calcmeleedmg(this.dex,this.level);
            }
        }
        else if(this.class.type()=="Rogue"){
            this.attMelee=this.class.calcmeleehit(this.dex,this.level);
            this.hitMelee = this.class.calcmeleedmg(this.dex,this.level);
        }
        else{
            this.attMelee=this.class.calcmeleehit(this.str,this.level);
            this.hitMelee = this.class.calcmeleedmg(this.str,this.level);
        }
        if(this.class.type()=="Rogue"||this.class.type()=="Ranger"){
            this.missRanged = this.level;
        }
        else{
            this.missRanged = 0;
        }
        if(this.class.type()=="Wizard"){
            this.missMelee = 0;
        }
        else{
            this.missMelee = this.level;
        }
    }
    setName(name:string){
        this.name=name;
    }
};