<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-6">
                <div class="icon"></div>
            </div>
            <div class="col-xs-6">
                <div class="padding">
                    <div>
                        <h2 class="modal-title">{{ appName }}</h2>
                        <div class="by">by <a href="https://www.alexseifert.com" class="js-external-link">Alex Seifert</a></div>
                    </div>

                    <div class="version-number">
                        {{ versionInfo.app }}
                    </div>

                    <div class="information clear-fix">
                        <div><b>Node Version:</b> {{ versionInfo.node }}</div>
                        <div><b>Chromium Version:</b> {{ versionInfo.chrome }}</div>
                        <div><b>Electron Version:</b> {{ versionInfo.electron }}</div>
                    </div>

                    <div class="legal">
                        Copyright &copy; Alex Seifert 2018.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import config from '../../config/config';

    export default Vue.extend({
        data() {
            return {
                showModal: false,
                appName: config.app.name,
                versionInfo: {
                    app: config.app.version,
                    node: process.versions.node,
                    chrome: process.versions.chrome,
                    electron: process.versions.electron
                }
            }
        }
    });
</script>

<style lang="scss" scoped>
    .modal-title {
        margin: 0 0 5px 0;
        padding-right: 35px;
    }

    .icon {
        background: url('../../assets/images/icon.svg') no-repeat;
        background-size: cover;
        height: 175px;
        width: 175px;
    }

    .padding {
        padding-left: 20px;
    }

    .by {
        font-size: .9em;
    }

    .version-number {
        font-size: .8em;
        font-weight: bold;
        margin-top: 15px;
        min-height: 15px;
    }

    .information {
        font-size: .7em;
        margin-top: 15px;

        div {
            margin: 5px 0;
        }
    }

    .legal {
        font-size: .6em;
        margin-top: 15px;
    }
</style>
