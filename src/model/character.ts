import { IRace, IClass, ICharacter, IIcon, IFeats, ITalents, ISpells, IBackground, Tiers, IMagicItem, ItemType } from '@/types';

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
    meleeToHit: number;
    meleeDmg: string;
    missMelee: number;
    rangedToHit: number;
    rangedDmg: string;
    missRanged: number;
    unique: string = "Default";
    icon: IIcon[] = [];
    feats: IFeats[] = []; 
    talents: ITalents[] = [];
    spells: ISpells[] = [];
    backgrounds: IBackground[] = [];
    magicItems: IMagicItem[] = []; 
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
        this.rangedToHit=this.class.calcrangedhit(this.dex,this.level);
        this.rangedDmg=this.class.calcrangeddmg(this.dex,this.level);
        if(this.class.type()=="Bard"||this.class.type()=="Ranger"){
            if(this.str>=this.dex){
                this.meleeToHit=this.class.calcmeleehit(this.str,this.level);
                this.meleeDmg = this.class.calcmeleedmg(this.str,this.level);
            }
            else{
                this.meleeToHit=this.class.calcmeleehit(this.dex,this.level);
                this.meleeDmg = this.class.calcmeleedmg(this.dex,this.level);
            }
        }
        else if(this.class.type()=="Rogue"){
            this.meleeToHit=this.class.calcmeleehit(this.dex,this.level);
            this.meleeDmg = this.class.calcmeleedmg(this.dex,this.level);
        }
        else{
            this.meleeToHit=this.class.calcmeleehit(this.str,this.level);
            this.meleeDmg = this.class.calcmeleedmg(this.str,this.level);
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
    setFeats(feats:IFeats[]){
        this.feats=feats;
    }
    setIcons(icons:IIcon[]){
        this.icon=icons;
    }
    setSpells(spells:ISpells[]){
        this.spells=spells;
    }
    setTalents(talents:ITalents[]){
        this.talents=talents;
    }
    setUnique(unique:string){
        this.unique=unique;
    }
    calcNumberofFeats():number{
        var mod=0;
        if(this.race.type()=="Human"){
            mod=1;
        }
        return this.level+mod;
    }
    setBackgrounds(backgrounds:IBackground[]){
        this.backgrounds=backgrounds;
    }
    calcNumberofBackgrounds():number{
        var mod=0;
        this.feats.forEach(element => {
            if(element.name=="Further Backgrounding"){
                if(element.tier==Tiers.ADVENTURER){
                    mod+=2
                }
                else if(element.tier==Tiers.CHAMPION){
                    mod+=3
                }
                else if(element.tier==Tiers.EPIC){
                    mod+=2
                }
            }
        });
        return 5+ mod;
    }
    calcBackgroundCap():number{
        this.feats.forEach(element => {
            if(element.name=="Further Backgrounding"){
                if(element.tier==Tiers.EPIC)
                    return 7;
            }
        });
        return 5;
    }
    calcNumberofSpells():number{
        return this.class.calcspells(this.level, this.feats);
    }
    calcNumberofTalents():number{
        return this.class.calctalents(this.level, this.feats);
    }
    setHP(newtotal:number){
        if(newtotal>this.maxHp){}  //Throw error
        this.curHp=newtotal;
    }
    setRecoveries(newtotal:number){
        if(newtotal>this.maxRec){}
            //THROW ERROR
        this.curRec=newtotal;
    }
    calcInitiative(){
        var mod =0;
        this.feats.forEach(element => {
            if(element.name=="Imp. Initiative")
                mod=4;
        });
        this.initiative=this.class.calcinitiative(this.dex,this.level,this.feats)+mod;
    }
    calcMaxHP(){
        var HPAdd=0;
        this.feats.forEach(element => {
            if(element.name=='Toughness'){
                if(this.level<=4){
                    HPAdd=this.class.baselineHP()/2;
                }
                else if(this.level>4&&this.level<8){
                    HPAdd=this.class.baselineHP();
                }
                else{
                    HPAdd=this.class.baselineHP()*2;
                }
            }
        });
        this.magicItems.forEach(element => {
            if(element.type==ItemType.SHIELD){
                switch (element.tier){
                    case Tiers.ADVENTURER:
                        HPAdd=4;
                        break;
                    case Tiers.CHAMPION:
                        HPAdd=10;
                        break;
                    case Tiers.EPIC:
                        HPAdd=25;
                        break;
                }
            }
        });
        this.maxHp= this.class.calchp(this.con,this.level,this.feats)+HPAdd;
    }
    calcAC(){
        var mod = 0;
        this.magicItems.forEach(element => {
            if(element.type==ItemType.ARMOR){
                switch (element.tier){
                    case Tiers.ADVENTURER:
                        mod=1;
                        break;
                    case Tiers.CHAMPION:
                        mod=2;
                        break;
                    case Tiers.EPIC:
                        mod=3;
                        break;
                }
            }
        });
        this.ac=this.class.calcac(this.con,this.dex,this.wis,this.level,this.feats)+mod;
    }
    calcPD(){
        var mod = 0;
        this.magicItems.forEach(element => {
            if(element.type==ItemType.CLOAK){
                switch (element.tier){
                    case Tiers.ADVENTURER:
                        mod=1;
                        break;
                    case Tiers.CHAMPION:
                        mod=2;
                        break;
                    case Tiers.EPIC:
                        mod=3;
                        break;
                }
            }
        });
        this.pd=this.class.calcpd(this.str,this.con,this.dex,this.level,this.feats)+mod;
    }
    calcMD(){
        var mod = 0;
        this.magicItems.forEach(element => {
            if(element.type==ItemType.HELM){
                switch (element.tier){
                    case Tiers.ADVENTURER:
                        mod=1;
                        break;
                    case Tiers.CHAMPION:
                        mod=2;
                        break;
                    case Tiers.EPIC:
                        mod=3;
                        break;
                }
            }
        });
        this.md=this.class.calcmd(this.int, this.wis, this.cha, this.level,this.feats)+mod;
    }
    calcMaxRecoveries(){
        var mod = 0;
        this.magicItems.forEach(element => {
            if(element.type==ItemType.BELT){
                switch (element.tier){
                    case Tiers.ADVENTURER:
                        mod=1;
                        break;
                    case Tiers.CHAMPION:
                        mod=2;
                        break;
                    case Tiers.EPIC:
                        mod=3;
                        break;
                }
            }
        });
        this.maxRec=this.class.calcrecoveries(this.feats)+mod;
    }
    calcMeleeHit(){
        var mod = 0;
        this.magicItems.forEach(element => {
            if(element.type==ItemType.MELEE){
                switch (element.tier){
                    case Tiers.ADVENTURER:
                        mod=1;
                        break;
                    case Tiers.CHAMPION:
                        mod=2;
                        break;
                    case Tiers.EPIC:
                        mod=3;
                        break;
                }
            }
        });
        if(this.class.type()=="Bard"||this.class.type()=="Ranger"){
            if(this.str>=this.dex){
                this.meleeToHit=this.class.calcmeleehit(this.str,this.level)+mod;
            }
            else{
                this.meleeToHit=this.class.calcmeleehit(this.dex,this.level)+mod;
            }
        }
        else if(this.class.type()=="Rogue"){
            this.meleeToHit=this.class.calcmeleehit(this.dex,this.level)+mod;
        }
        else{
            this.meleeToHit=this.class.calcmeleehit(this.str,this.level)+mod;
        }
    }
};