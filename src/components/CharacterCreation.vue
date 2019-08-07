<template>
    <div class="char-create">
        <div class="section"
             id="race">
            <div class="field">
                <md-field name="race-select">
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
        </div>

        <div class="section"
             id="weapons" />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import * as TYPES from '@/types';
    import Models from '@/model';

    export default class CharacterCreation extends Vue {
        race = '';
        className = '';

        get races() {
            return Models.constants.RACES.map(r => r.label);
        }

        get classes() {
            return Models.constants.CLASSES.map(c => c.label);
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

        .field {
            padding: 24px 0;
            width: 33%;
        }
    }
</style>
