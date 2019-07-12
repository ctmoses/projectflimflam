<template>
    <transition name="fade">
        <div class="modal-outer" v-if="isVisible">
            <div class="modal-inner">
                <div class="header" v-if="useHeader">
                    <h3 v-if="params.title" >{{ params.title }}</h3>
                    <span class="close" @click="close">close</span>
                </div>
                <div class="body">
                    <component :is="bodyTemplate"
                               v-if="bodyTemplate"
                               :params="params">
                    </component>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import Modal from './vueModal';

export default {
    data() {
        return {
            isVisible: false,
            bodyTemplate: null,
            params: {},
        };
    },

    computed: {
        useHeader() {
            return this.params && this.params.useHeader;
        }
    },

    methods: {
        close() {
            this.handleToggleEvent(false);
        },

        handleToggleEvent(visible, template, params) {
            if (typeof visible === 'boolean') {
                this.isVisible = visible;
                this.bodyTemplate = template;
                this.params = params;
            } else {
                this.isVisible = !this.isVisible;
            }

            if (this.isVisible) {
                this.bodyTemplate = template;
                this.params = params;
            }
        }
    },

    beforeMount() {
        Modal.event.$on('toggle', this.handleToggleEvent);
    },
};
</script>


<style lang="scss" scoped>
    .modal-outer {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        width: 100%;
        padding-top: 70px;

        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: flex-start;
        background: rgba(103,108,113, 0.4);
        z-index: 999;
    }

    .modal-inner {
        /*min-height: 100px;*/
        /*min-width: 50%;*/
        background: #fff;
        box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, 0.25);
        margin-right: 50px;
    }

    .header {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        padding: 16px;

        h3{
            margin: 0;
        }

        .title {
            font-size: 14px;
            font-weight: 800;
        }

        .close {
            cursor: pointer;
            width: 35px;
            opacity: .5;
            &:hover {
                opacity: 1;
            }
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>
