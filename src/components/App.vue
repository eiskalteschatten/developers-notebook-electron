<template>
    <div class="structure-wrapper">
        <div class="title-bar" v-if="showTitlebar" @dblclick="maximizeWindow"></div>
        <div class="main-structure">
            <left-nav/>
            <div class="view">
                <router-view/>
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

    import LeftNav from './Nav.vue';
    import Modal from './Modal.vue';
    import AboutModal from './Modal/About.vue';

    export default Vue.extend({
        mounted() {
            const platform = process.platform;

            document.body.className = platform;

            if (platform === 'darwin') {
                this.showTitlebar = true;
            }
        },
        data() {
            return {
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
        },
        components: {
            LeftNav,
            Modal,
            AboutModal
        }
    });
</script>

<style lang="scss">
    $titleBarHeight: 22px;

    .structure-wrapper {
        height: 100%;
        width: 100%;
    }

    .main-structure {
        display: flex;
        flex-direction: row;
        height: 100%;
        width: 100%;

        .view {
            margin-left: 15px;
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
            .view {
                margin-left: 15px;
                padding-top: $titleBarHeight;
            }
        }
    }
</style>
