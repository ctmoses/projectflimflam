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

            <div class="field">
                <md-field name="armor-select">
                    <md-select v-model="armor"
                               name="class"
                               id="class"
                               :placeholder="'Pick an armor'">
                        <md-option v-for="a in armors"
                                   :key="a"
                                   :value="a">
                            {{ a }}
                        </md-option>
                    </md-select>
                </md-field>
            </div>
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
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import * as TYPES from '@/types';
    import Models from '@/model';

    @Component
    export default class CharacterCreation extends Vue {
        race: String = '';
        className = '';
        meleeWeapon = '';
        rangedWeapon = '';
        
        armor = "";
        stats = {
            str: 9,
            con: 10,
            dex: 11,
            int: 12,
            wis: 13,
            cha: 14,
        };

        create() {
            const raceName = Models.constants.RACES.filter(r => r.label === this.race)[0];
            const RaceClass =  Models.Race.RaceFactory(raceName.name);
            const myRace = new RaceClass();
            var test = 0;
            const className = Models.constants.CLASSES.filter(c => c.label === this.className)[0];
            const ClassClass = Models[className.label];
            
            switch(this.armor)
            {
                case "Light":
                    test = TYPES.ArmorTypes.LIGHT;
            }
            const myClass = new ClassClass(test, false, this.meleeWeapon, this.rangedWeapon);
            
            const myStats = Object.values(this.stats);
            //TODO Editing stats on the page passes them in as strings and not numbers
            const myChar = new Models.Character(myClass, myRace, myStats[0], myStats[1], myStats[2], myStats[3], myStats[4], myStats[5], 5);
            //const myChar = new Models.Character(myClass, myRace, ...myStats, 1);
            console.log(myChar);
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
