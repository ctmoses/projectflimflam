<template>
    <div id="app">
        <Navbar />
        <div class="viewer">
            <router-view />
        </div>
        <vue-modal />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import Navbar from '@/components/Navbar.vue';

    @Component({
        components: {
            Navbar,
        },
    })
    export default class App extends Vue {}
</script>


<style lang="scss">
    html, body, #app {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        width: 100%;

        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    .viewer {
        position: absolute;
        top: $navsize;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>
