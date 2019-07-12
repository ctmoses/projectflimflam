<template>
    <div class="home">
        <div class="chars">
            <div class="card-container">
                <md-card>
                    <md-card-header>
                        <md-card-header-text>
                            <div class="md-title">Test Card</div>
                            <div class="md-subhead">Test sub</div>
                        </md-card-header-text>
                    </md-card-header>

                    <md-card-actions>
                        <md-button>View</md-button>
                    </md-card-actions>
                </md-card>
            </div>

            <div class="card-container" 
                id="add-char-card" 
                @click="addCharacter">
                <md-card>
                    <md-ripple>
                        <md-card-header>
                            <md-card-header-text>
                                <div class="md-title">Add new character</div>
                            </md-card-header-text>
                            <md-card-media>
                                <i class="material-icons" id="add-char">
                                    account_circle
                                </i>
                            </md-card-media>
                        </md-card-header>
                    </md-ripple>
                </md-card>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import NewCharacter from '@/components/modals/NewCharacter';

    @Component({
        components: {
            NewCharacter,
        }
    })
    export default class Home extends Vue {
        showNewChar = false;

        addCharacter() {
            this.$modal.show(
                true, 
                NewCharacter,
                {
                    title: 'Add a new character',
                    useHeader: false,
                    message: 'something',
                });
            this.showNewChar = !this.showNewChar;
        }
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

