<template>
    <div class="home" />
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class Home extends Vue {

    }
</script>

<style lang="scss" scoped>
    .add-user {
        @include button($accent, #fff);
    }

    .chars {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 16px;
        box-sizing: border-box;
    }

    .card-container {
        min-width: 300px;
        margin-right: 16px;

        &#add-char-card:hover {
            cursor: pointer;
        }
    }

    #add-char {
        font-size: 56px;
    }
</style>
