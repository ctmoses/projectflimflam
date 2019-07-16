<template>
    <div class="new-char">
        <md-steppers :md-active-step.sync="active">
            <md-step id="first"
                     md-label="Identifying Characteristics"
                     :md-done.sync="first">
                <md-field class="half">
                    <label>Character name *</label>
                    <md-input v-model="name" />
                </md-field>

                <md-field class="half">
                    <label>Race *</label>
                    <md-input v-model="race" />
                </md-field>

                <md-field class="half">
                    <label>Class *</label>
                    <md-input v-model="charClass" />
                </md-field>

                <md-field class="half">
                    <label>Level</label>
                    <md-input v-model="level"
                              type="number" />
                </md-field>

                <md-field>
                    <label>Unique</label>
                    <md-textarea v-model="unique" />
                </md-field>

                <md-field>
                    <label>Background</label>
                    <md-textarea v-model="background" />
                </md-field>

                <md-button class="md-raised md-primary"
                           @click="setDone('first', 'second')"
                           :disabled="disableButton([name, race, charClass, level])">
                    Continue
                </md-button>
            </md-step>

            <md-step id="second"
                     md-label="Abilities"
                     :md-done.sync="second" />
        </md-steppers>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class NewCharacter extends Vue {
        active ='first';
        first = false;
        second = false;

        name = null;
        race = null;
        charClass = null;
        level = 1;
        unique = '';
        background = '';

        disableButton(conditions: any[]) {
            const unset = conditions.filter(c => c !== null);
            return !(unset.length === conditions.length);
        }

        setDone (id: string, index: string) {
            this[id] = true;

            if (index) {
            this.active = index;
            }
        }
    }
</script>


<style lang="scss" scoped>
    .new-char {
        width: 75vw;
        min-height: 250px;
        padding-bottom: 16px;
    }

    .half {
        width: 50%;
    }
</style>
