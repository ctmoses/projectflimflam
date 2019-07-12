<template>
    <div class="navbar" v-show="user.id">
        <div class="user-name">{{ user.name }}</div>
        <div class="logout" @click="logout">Logout</div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { Action, Getter } from 'vuex-class';
    import * as firebase from 'firebase/app';

    import * as Interfaces from '@/types';

    @Component
    export default class Navbar extends Vue {
        @Action('SET_USER') setUser!: any;
        @Getter('USER') user!: Interfaces.IUser;

        logout() {
            this.setUser({id: null, name: ''});
            firebase.auth().signOut().then(function() {
                    this.$router.push('/login');
                }, function(error) {
                    console.log(error);
                });
        }
    }
</script>


<style lang="scss" scoped>
    .navbar {
        position: fixed;
        top: 0;
        width: 100%;
        height: $block-size * 5;
        background: $primary;
        color: #fff;

        padding: 0 $block-size * 3;
        box-sizing: border-box;

        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;

        .logout {
            &:hover {
                cursor: pointer;
                text-decoration: underline;
            }
        }
    }
</style>
