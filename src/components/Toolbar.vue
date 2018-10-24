<template>
    <header class="flex-0-1-auto flex-row">
        <div class="flex-0-0-auto">
            <back-forward/>
        </div>
        <div class="flex-1-0-auto">
            <h1>{{ viewTitle }}</h1>
        </div>
        <div class="flex-0-0-auto top-right-toolbar">
            <router-view name="topRightToolbar"/>
        </div>
    </header>
</template>

<script>
    import Vue from 'vue';
    import {eventBus} from '../app';
    import {routeTitles} from '../router';

    import BackForward from './Header/BackForward.vue';

    export default Vue.extend({
        data() {
            return {
                viewTitle: ''
            }
        },
        created() {
            const self = this;

            eventBus.$on('route-changed', (to, from) => {
                self.viewTitle = routeTitles[to.name];
            });
        },
        mounted() {
            const initialViewTitle = sessionStorage.getItem('initialViewTitle');
            if (initialViewTitle) {
                this.viewTitle = initialViewTitle;
                sessionStorage.setItem('initialViewTitle', '');
            }
        },
        components: {
            BackForward
        }
    });
</script>

<style lang="scss" scoped>
    h1 {
        font-size: 1.2em;
        padding: 0 0 0 15px;
    }

    .top-right-toolbar {
        padding: 15px;
    }
</style>
