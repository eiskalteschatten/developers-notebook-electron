<template>
    <div class="structure-wrapper">
        <div class="title-bar" v-if="showTitlebar" @dblclick="maximizeWindow"></div>
        <div class="main-structure">
            <left-nav/>
            <div class="main-view">
                <header class="main-header">
                    <div class="float-left">
                        <back-forward/>
                    </div>
                    <h1 class="float-left">{{ viewTitle }}</h1>
                </header>
                <div class="view">
                    <router-view/>
                </div>
            </div>
        </div>
        <div class="modal-container" v-if="showModal" v-bind:class="{ 'open': showOpenModalClass }" @click="closeModal">
            <modal v-bind:class="{ 'open': showOpenModalClass }" v-if="modalToShow === 'about'">
                <about-modal/>
            </modal>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {eventBus} from '../app';
    import {remote} from 'electron';
    import {routeTitles} from '../router';

    import LeftNav from './Nav.vue';
    import BackForward from './Header/BackForward.vue';
    import Modal from './Modal.vue';
    import AboutModal from './Modal/About.vue';

    export default Vue.extend({
        mounted() {
            if (process.platform === 'darwin') {
                this.showTitlebar = true;
            }
        },
        data() {
            return {
                viewTitle: '',
                showTitlebar: false,
                showModal: false,
                showOpenModalClass: false
            }
        },
        methods: {
            maximizeWindow() {
                remote.getCurrentWindow().maximize();
            },
            closeModal() {
                eventBus.$emit('toggle-modal');
            }
        },
        created() {
            const vm = this;

            eventBus.$on('toggle-modal', modal => {
                if (this.showModal && modal && this.modalToShow !== modal) return;

                const self = this;

                if (!modal || self.showModal) {
                    self.showOpenModalClass = false;

                    setTimeout(() => {
                        self.showModal = false;
                        self.modalToShow = '';
                    }, 400);
                }
                else {
                    self.showModal = true;
                    self.modalToShow = modal;

                    setTimeout(() => {
                        self.showOpenModalClass = true;
                    }, 50);
                }
            });

            eventBus.$on('route-changed', (to, from) => {
                vm.viewTitle = routeTitles[to.name];
            });
        },
        components: {
            LeftNav,
            BackForward,
            Modal,
            AboutModal
        }
    });
</script>

<style lang="scss" scoped>
    @import '../assets/scss/variables';

    $titleBarHeight: 22px;

    h1 {
        font-size: 1.2em;
        padding: 0 0 0 15px;
    }

    .structure-wrapper {
        height: 100%;
        width: 100%;
    }

    .main-structure {
        display: flex;
        flex-direction: row;
        height: 100%;
        width: 100%;

        .main-view {
            display: flex;
            flex: 1 1 auto;
            flex-direction: column;
            padding: 15px 0 0 15px;

            .main-header {
                flex: 0 1 auto;
            }

            .view {
                display: flex;
                flex: 1 1 auto;
                flex-direction: row;
                margin-top: 15px;
            }
        }
    }

    .modal-container {
        height: 100%;
        left: 0;
        opacity: 0;
        position: fixed;
        top: 0;
        transition: all 400ms;
        width: 100%;
        z-index: 100;

        &.open {
            opacity: 1;
        }
    }

    .dark {
        .modal-container {
            background: rgba(2, 2, 2, .5);
        }
    }

    .light {
        .modal-container {
            background: rgba(240, 240, 240, .8);
        }
    }


    .darwin {
        .title-bar {
            display: block;
            height: $titleBarHeight;
            left: 0;
            position: absolute;
            top: 0;
            width: 100%;
            -webkit-app-region: drag;
            -webkit-user-select: none;
            z-index: 1000;
        }

        .main-structure {
            .main-view {
                padding-top: $titleBarHeight;
            }
        }
    }
</style>
