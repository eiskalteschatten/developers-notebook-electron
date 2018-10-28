<template>
    <div class="notification flex-row" v-bind:class="{ open: isOpen }" v-if="iExist" :id="id">
        <div class="flex-0-0-auto" v-if="hasIcon" v-bind:class="['icon', type]"></div>
        <div class="flex-1-1-auto">
            {{ message }}
        </div>
        <close-button @click.native="close" class="flex-0-0-auto"></close-button>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {eventBus} from '../../app';

    import CloseButton from './Buttons/CloseButton.vue';

    export default Vue.extend({
        props: ['hasIcon', 'type', 'message'],
        data() {
            return {
                id: '',
                isOpen: false,
                iExist: true
            };
        },
        methods: {
            close() {
                this.isOpen = false;

                setTimeout(() => {
                    this.iExist = false;
                    this.$destory();
                }, 500);
            }
        },
        components: {
            CloseButton
        },
        mounted() {
            this.id = this.type + '_' + this.message;

            if (document.getElementById(this.id)) {
                this.$destroy();
            }
            else {
                document.body.appendChild(this.$el);
                eventBus.$once('close-notification', this.close);

                setTimeout(() => {
                    this.isOpen = true;
                }, 50);
            }
        }
    });
</script>

<style lang="scss">
    @import '../../assets/scss/variables';

    .notification {
        border-radius: 2px;
        left: 50%;
        max-height: 100px;
        overflow: hidden;
        padding: 15px;
        position: absolute;
        top: -50%;
        transform: translateX(-50%);
        transition: all 400ms;
        z-index: 1000;

        &.open {
            top: 25px;
        }

        .icon {
            $size: 17px;
            background-position: center;
            background-repeat: no-repeat;
            background-size: 16px;
            height: $size;
            margin-right: 15px;
            width: $size;

            &.error {
                background-image: url('../../assets/images/error.svg');
            }
        }

        .close-button {
            margin-left: 15px;
            margin-top: 2px;
            opacity: .8;

            &:hover {
                opacity: 1;
            }
        }
    }

    .dark {
        .notification {
            background: $mainBgDark;
            box-shadow: 0 0 15px $boxShadowColorDark;

            .icon {
                &.info {
                    background-image: url('../../assets/images/dark/info.svg');
                }

                &.warning {
                    background-image: url('../../assets/images/dark/warning.svg');
                }
            }
        }
    }

    .light {
        .notification {
            background: $mainBgLight;
            box-shadow: 0 0 15px $boxShadowColorLight;

            .icon {
                &.info {
                    background-image: url('../../assets/images/light/info.svg');
                }

                &.warning {
                    background-image: url('../../assets/images/light/warning.svg');
                }
            }
        }
    }
</style>
