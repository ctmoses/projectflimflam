<template>
    <div class="nc-basics">
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
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default class NCBasics extends Vue {
        name = null;
        race = null;
        charClass = null;
        level = 1;
        unique = '';
        background = '';
    }
</script>
