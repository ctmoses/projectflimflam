<template>
    <div class="char-create">
        <div class="section"
             id="race">
            <div class="field">
                <md-field name="race-select">
                    <label for="race">Race</label>
                    <md-select v-model="race"
                               name="race"
                               id="race"
                               :placeholder="'Pick a race'">
                        <md-option v-for="r in races"
                                   :key="r"
                                   :value="r">
                            {{ r }}
                        </md-option>
                    </md-select>
                </md-field>
                Race: {{ race }}
            </div>

            <div class="field">
                <md-field name="class-select">
                    <md-select v-model="className"
                               name="class"
                               id="class"
                               :placeholder="'Pick a class'">
                        <md-option v-for="c in classes"
                                   :key="c"
                                   :value="c">
                            {{ c }}
                        </md-option>
                    </md-select>
                </md-field>
            </div>

            <div class="section">
                <div class="stats">
                    <div class="stat" 
                            v-for="(value, key) in stats"
                            :key="key">
                        <md-field >    
                            <label>{{ key.toUpperCase() }}</label>
                            <md-input v-model="stats[key]" type="number"></md-input>
                        </md-field>
                    </div>
                </div>
            </div>
            <md-button class="md-primary" @click="create">Create</md-button>
            <div>
                AC:
                {{ac}}
            </div>
            <div>
                HP:
                {{hp}}
            </div>
            <div>
                Initiative:
                {{init}}
            </div>
            <div>
                MD:
                {{md}}
            </div>
            <div>
                PD:
                {{pd}}
            </div>
            <div>
                Melee Hit:
                {{mhit}}
            </div>
            <div>
                Melee Dmg: <!-- These arent updating when create is pushed for some reason, but they update if you flip a different selection -->
                <!-- Fixed this by assigning the three variables to zero in the initializer..why does that matter? -->
                {{mdmgdicemult}}d{{mdmgdice}}+{{mdmgmod}}
            </div>
             <div>
                Ranged Dmg: 
                {{rdmdgdicemult}}d{{rdmgdice}}+{{rdmgmod}}
            </div>
            <div>
                Recovery Roll:
                {{recdicemult}}d{{recdice}}+{{recmod}}
            </div>
            <div class="section">
                <div class="stats">       
                    <div class="field">
                        <md-field name="melee-select">
                            <md-select v-model="meleeWeapon"
                                    name="class"
                                    id="class"
                                    :placeholder="'Pick a melee weapon'">
                                <md-option v-for="w in meleeWeapons"
                                        :key="w"
                                        :value="w">
                                    {{ w }}
                                </md-option>
                            </md-select>
                        </md-field>
                    </div>
                    <md-field name="magic-select">
                        <md-select v-model="mTier"
                                    name="class"
                                    id="class"
                                    :placeholder="'Item Tier'">
                            <md-option v-for="t in tiers"
                                        :key="t"
                                        :value="t">
                                {{ t }}
                            </md-option>
                        </md-select>
                    </md-field>
                



                <div class="field">
                        <md-field name="ranged-select">
                            <md-select v-model="rangedWeapon"
                                    name="class"
                                    id="class"
                                    :placeholder="'Pick a ranged weapon'">
                                <md-option v-for="w in rangedWeapons"
                                        :key="w"
                                        :value="w">
                                    {{ w }}
                                </md-option>
                            </md-select>
                        </md-field>
                    </div>
                    <md-field name="magic-select">
                        <md-select v-model="rTier"
                                    name="class"
                                    id="class"
                                    :placeholder="'Item Tier'">
                            <md-option v-for="t in tiers"
                                        :key="t"
                                        :value="t">
                                {{ t }}
                            </md-option>
                        </md-select>
                    </md-field>
                



                <div class="field">
                        <md-field name="armor-select">
                            <md-select v-model="armor"
                                    name="class"
                                    id="class"
                                    :placeholder="'Pick armor'">
                                <md-option v-for="w in armors"
                                        :key="w"
                                        :value="w">
                                    {{ w }}
                                </md-option>
                            </md-select>
                        </md-field>
                    </div>
                    <md-field name="magic-select">
                        <md-select v-model="aTier"
                                    name="class"
                                    id="class"
                                    :placeholder="'Item Tier'">
                            <md-option v-for="t in tiers"
                                        :key="t"
                                        :value="t">
                                {{ t }}
                            </md-option>
                        </md-select>
                    </md-field>
                


                <div class="field">
                    <md-checkbox v-model="shield" class="md-primary">Shield</md-checkbox>
                     Shield: {{shield}}
                    </div>
                    <md-field name="magic-select">
                        <md-select v-model="sTier"
                                    name="class"
                                    id="class"
                                    :placeholder="'Item Tier'">
                            <md-option v-for="t in tiers"
                                        :key="t"
                                        :value="t">
                                {{ t }}
                            </md-option>
                        </md-select>
                    </md-field>
                </div>
                </div>
            <md-button class="md-primary" @click="equip">Equip</md-button>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import * as TYPES from '@/types';
    import Models from '@/model';
    import VueMaterial from 'vue-material'
    Vue.use(VueMaterial);
    @Component
    export default class CharacterCreation extends Vue {
        race: String = '';
        className = '';
        meleeWeapon = '';
        rangedWeapon = '';
        armor = "";
        mTier="";
        aTier="";
        rTier="";
        sTier="";
        hTier="";
        cTier="";
        bTier="";

        ac=0;
        md=0;
        pd=0;
        mdmgdice=0;
        mdmgdicemult=0;
        mdmgmod=0;
        rdmgdice=0;
        rdmdgdicemult=0;
        rdmgmod=0;
        recdice=0;
        recdicemult=0;
        recmod=0;
        mhit=0;
        init=0;
        hp=0;
        shield=false;
        melee=false;
        myChar;
        stats = {
            str: 10,
            con: 10,
            dex: 10,
            int: 10,
            wis: 10,
            cha: 10,
        };

        equip() {
            var armortype=0;
            var weapontype=0;
            var rangedtype=0;
            var tier=0;
            
            tier= this.mapTierString(this.mTier);
            weapontype = this.mapWeaponString(this.meleeWeapon);
            var weapon= new Models.Spell.items(TYPES.ItemType.MELEE, weapontype, tier,true);
           
            armortype = this.mapArmorString(this.armor);
            tier= this.mapTierString(this.aTier);
            var armor= new Models.Spell.items(TYPES.ItemType.ARMOR, armortype, tier,true);

            rangedtype = this.mapRangedString(this.rangedWeapon);
            tier= this.mapTierString(this.rTier);
            var ranged= new Models.Spell.items(TYPES.ItemType.RANGED, rangedtype, tier,true);

            tier= this.mapTierString(this.sTier);
            var shield = new Models.Spell.items(TYPES.ItemType.SHIELD, TYPES.ItemSubType.NONE, tier, this.shield);
            
            tier= this.mapTierString(this.hTier);
            var helm = new Models.Spell.items(TYPES.ItemType.HELM, TYPES.ItemSubType.NONE, tier, true);
            tier= this.mapTierString(this.cTier);
            var cloak = new Models.Spell.items(TYPES.ItemType.CLOAK, TYPES.ItemSubType.NONE, tier, true);
            tier= this.mapTierString(this.bTier);
            var belt = new Models.Spell.items(TYPES.ItemType.BELT, TYPES.ItemSubType.NONE, tier, true);

            this.myChar.setItems([weapon,armor,ranged,shield,helm,cloak,belt]);
            this.refreshStats();
        }
        create() {
            const raceName = Models.constants.RACES.filter(r => r.label === this.race)[0];
            const RaceClass =  Models.Race.RaceFactory(raceName.name);
            const myRace = new RaceClass();
            const className = Models.constants.CLASSES.filter(c => c.label === this.className)[0];
            const ClassClass = Models[className.label];
            const myClass = new ClassClass();
           
            const myStats = Object.values(this.stats);
            //Editing stats on the page passes them in as strings and not numbers..but seems to work?
            this.myChar = new Models.Character(myClass, myRace, myStats[0], myStats[1], myStats[2], myStats[3], myStats[4], myStats[5], 5);
            //const myChar = new Models.Character(myClass, myRace, ...myStats, 1);
            this.refreshStats();
            
            console.log(this.myChar);
        }

        setRace(r) {
            this.race = r;
        }

        get races() {
            return Models.constants.RACES.map(r => r.label);
        }

        get classes() {
            return Models.constants.CLASSES.map(c => c.label);
        }

        get meleeWeapons () {
            return Models.constants.WEAPONS_MELEE_TYPES.map(w => w.label);
        }

        get rangedWeapons () {
            return Models.constants.WEAPONS_RANGED_TYPES.map(w => w.label);
        }

        get armors() {
            return Models.constants.ARMOR_TYPES.map(a => a.label);
        }
        get tiers() {
            return Models.constants.TIERS.map(t => t.label);
        }
        refreshStats() {
            this.ac=this.myChar.ac;
            this.md=this.myChar.md;
            this.pd=this.myChar.pd;
            this.hp=this.myChar.maxHp;
            this.init=this.myChar.initiative;
            this.mhit=this.myChar.meleeToHit;
            this.mdmgdice=this.myChar.meleeDmg[1];
            this.mdmgdicemult=this.myChar.meleeDmg[0];
            this.mdmgmod=this.myChar.meleeDmg[2];
            this.recdicemult=this.myChar.recRoll[0];
            this.recdice=this.myChar.recRoll[1];
            this.recmod=this.myChar.recRoll[2];
            this.rdmgdice=this.myChar.rangedDmg[1];
            this.rdmdgdicemult=this.myChar.rangedDmg[0];
            this.rdmgmod=this.myChar.rangedDmg[2];
        }
        mapTierString(tier:string):TYPES.Tiers{
            switch(tier){
            case "Not Magic":
                return TYPES.Tiers.NOTMAGIC;
                break;
            case "Adventurer":
                return TYPES.Tiers.ADVENTURER;
                break;
            case "Champion":
                return TYPES.Tiers.CHAMPION;
                break;
            case "Epic":
                return TYPES.Tiers.EPIC;
                break;
            }
            return -99;
        }
        mapWeaponString(weapon:string):TYPES.ItemSubType{
            switch(this.meleeWeapon){
                case "Small, one-handed - 1d4":
                    return TYPES.ItemSubType.ONEHSMALL;
                    break;
                case "Light, one-handed - 1d6":
                    return TYPES.ItemSubType.ONEHLIGHT;
                    break;
                case "Heavy, one-handed - 1d8":
                    return TYPES.ItemSubType.ONEHHEAVY;
                    break;
                case "Small, two-handed - 1d6":
                    return TYPES.ItemSubType.TWOHSMALL;
                    break;
                case "Light, two-handed - 1d8":
                    return TYPES.ItemSubType.TWOHLIGHT;
                    break;
                case "Heavy, two-handed - 1d10":
                    return TYPES.ItemSubType.TWOHHEAVY;
                    break;
            }
            return -99;
        }
        mapArmorString(armor:string):TYPES.ItemSubType{
            switch(this.armor)
            {
                case "None":
                    return TYPES.ItemSubType.NONE;
                    break;
                case "Light":
                    return TYPES.ItemSubType.LIGHT;
                    break;
                case "Heavy":
                    return TYPES.ItemSubType.HEAVY;
                    break;
                    
            }
            return -99;
        }
        mapRangedString(ranged:string):TYPES.ItemSubType{
            switch(ranged){
                case "Small, thrown weapon - 1d4":
                    return TYPES.ItemSubType.THROWNSMALL;
                    break;
                case "Light, thrown weapon - 1d6":
                    return TYPES.ItemSubType.THROWNLIGHT;
                    break;
                case "Small crossbow - 1d4":
                    return TYPES.ItemSubType.XBOWSMALL;
                    break;
                case "Light crossbow - 1d6":
                    return TYPES.ItemSubType.XBOWLIGHT;
                    break;
                case "Heavy cross bow - 1d8":
                    return TYPES.ItemSubType.XBOWHEAVY;
                    break;
                case "Light bow - 1d6":
                    return TYPES.ItemSubType.BOWLIGHT;
                    break;
                case "Heavy bow - 1d8":
                    return TYPES.ItemSubType.BOWHEAVY;
                    break;
            }
            return -99;
        }
        
    }
</script>

<style lang="scss" scoped>
    .section {
        width: 100%;
        padding: 16px;
        display: flex;
        flex-flow: column;
        justify-content: flex-start;
        align-items: flex-start;

        &.row {
            flex-flow: row nowrap;
            justify-content: space-around;
            align-items: center;
        }

        .field {
            padding: 24px 0;
            width: 33%;
        }
    }

    .stats {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;

        .stat {
            $size: 75px;
            width: $size;
            height: $size;
            text-align: center !important;
        }
    }
</style>
