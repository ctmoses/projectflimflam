<template>
    <div class="main">
        <div class="status">
            <div class="rest" />
            <div class="health" />
            <div class="avatar">
                <img :src="user.imageURL"
                     alt=""
                     class="avatar-img">
            </div>
            <div class="level">
                4
            </div>
        </div>

        <div class="attributes">
            <div class="attribute">
                <div class="label">
                    AC
                </div>
                <div class="value">
                    20
                </div>
            </div>
            <div class="attribute">
                <div class="label">
                    AC
                </div>
                <div class="value">
                    20
                </div>
            </div>
            <div class="attribute">
                <div class="label">
                    AC
                </div>
                <div class="value">
                    20
                </div>
            </div>
        </div>

        <div class="actions">
            <div class="action">
                ACTION
            </div>
            <div class="action">
                SKILL CHECK
            </div>
            <div class="action">
                REST
            </div>
        </div>

        <div class="equipped" />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { Getter } from 'vuex-class';
    import { IUser } from '@/types';

    @Component
    export default class Main extends Vue {
        @Getter('USER') user!: IUser;
    }
</script>


<style lang="scss" scoped>
    .main {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        display: flex;
        flex-flow: columns;
        justify-content: space-between;
        align-items: flex-start;

        .status {
            position: relative;

            .avatar {
                $avatar-size: 160px;
                position: absolute;
                top: -8px;
                left: -8px;
                height: $avatar-size;
                width: $avatar-size;
                border-radius: 50%;
                background: blue;

                .avatar-img {
                    height: 100%;
                    width: 100%;
                    border-radius: 50%;
                }
            }

            .health {
                $health-size: 120px;
                position: absolute;
                top: 24px;
                left: 142px;
                height: $health-size;
                width: $health-size;
                border-radius: 50%;
                background: red;
            }

            .rest {
                $health-size: 120px;
                position: absolute;
                top: 16px;
                left: 252px;
                height: $health-size;
                width: $health-size;
                border-radius: 50%;
                background: lightblue;
            }

            .level {
                $level-size: 24px;
                height: $level-size;
                width: $level-size;
                position: absolute;
                top: 136px;
                left: 24px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                background: #fff;
                border: 1px solid gray;
            }
        }
    }

    .attributes {
        position: absolute;
        top: 200px;
        left: 0;
        right: 0;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;

        .attribute {
            $att-size: 80px;
            height: $att-size;
            width: $att-size;
            border-radius: 6px;
            border: 1px solid gray;

            .label {
                width: 100%;
                height: 33%;
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                align-items: center;
                border-top-left-radius: 6px;
                border-top-right-radius: 6px;
                background: gray;
                color: #fff;
            }

            .value {
                width: 100%;
                height: 67%;
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                align-items: center;
                border-bottom-left-radius: 6px;
                border-bottom-right-radius: 6px;
                background: #fff;
            }
        }
    }

    .actions {
        position: absolute;
        top: 400px;
        width: 100%;
        display: flex;
        flex-flow: column;
        justify-content: space-evenly;
        align-items: center;

        .action {
            width: 90%;
            border-radius: 6px;
            background: gray;
            color: #fff;
            margin-bottom: 16px;
            padding: 8px 0;
        }
    }
</style>
