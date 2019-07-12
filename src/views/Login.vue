<template>
    <div class="login">
        <div id="firebaseui-auth-container"></div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import firebaseui from 'firebaseui';
    import * as firebase from 'firebase/app';

    @Component
    export default class Login extends Vue {
        mounted() {
            const ui = new firebaseui.auth.AuthUI(firebase.auth());
            ui.start('#firebaseui-auth-container', {
                signInOptions: [{
                        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                        requireDisplayName: false,
                        // signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
                    },
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                ],
                callbacks: {
                    signInSuccessWithAuthResult(authResult) {
                        console.log(authResult);
                        window.location.href = '/'
                    }
                }
            });
        }
    }
</script>

