<template>
    <div class="modal">
        <div class="modal-close" @click="closeModal"></div>
        <slot/>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {eventBus} from '../app';

    export default Vue.extend({
        methods: {
            closeModal() {
                eventBus.$emit('toggle-modal');
            }
        }
    });
</script>

<style lang="scss">
    @import '../assets/scss/variables';

    .modal {
        border-radius: 5px;
        display: flex;
        flex: 0 0 auto;
        flex-direction: column;
        left: 50%;
        max-height: 90%;
        overflow: hidden;
        padding: 25px;
        position: absolute;
        top: 150%;
        transform: translate(-50%, -50%);
        transition: all 400ms;
        z-index: 1000;

        &.open {
            top: 50%;
        }

        .modal-title {
            flex: 0 0 auto;
            margin-top: 0;
        }

        .modal-close {
            $size: 15px;

            background-position: center;
            background-repeat: no-repeat;
            background-size: $size;
            cursor: pointer;
            height: $size;
            position: absolute;
            right: 10px;
            top: 10px;
            width: $size;
        }

        .modal-scroll {
            flex: 1 1 auto;
            overflow: auto;
        }

        .modal-header {
            display: block;
            margin-bottom: 25px;
            padding-bottom: 5px;
            width: 100%;
        }
    }

    .dark {
        .modal {
            background: $mainBgDark;
            box-shadow: 0 0 25px $boxShadowColorDark;

            .modal-close {
                background-image: url('../assets/images/dark/modal-close-x.svg');
            }

            .modal-header {
                border-bottom: 1px solid darken($mainFontColorDark, 70%);
            }
        }
    }

    .light {
        .modal {
            background: $mainBgLight;
            box-shadow: 0 0 25px $boxShadowColorLight;

            .modal-close {
                background-image: url('../assets/images/light/modal-close-x.svg');
            }

            .modal-header {
                border-bottom: 1px solid lighten($mainFontColorLight, 80%);
            }
        }
    }
</style>
