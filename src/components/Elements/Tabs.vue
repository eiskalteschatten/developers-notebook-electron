<template>
    <div class="tabs">
        <router-link :to="{ name: tab.routeName }" v-bind:class="getClasses(tab.id)" v-for="tab in tabs" :key="tab.id">
            {{ tab.name }}
        </router-link>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        props: ['tabs', 'activeTab'],
        methods: {
            getClasses(tabName) {
                const classes = ['tab'];
                if (this.activeTab === tabName) {
                    classes.push('selected');
                }
                return classes;
            }
        }
    });
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/variables';

    .tabs {
        margin-bottom: 15px;

        .tab {
            display: inline-block;
            font-size: .9em;
            opacity: .7;
            padding: 10px;
            text-decoration: none;
            text-transform: uppercase;

            &:hover, &.selected {
                opacity: 1;
            }
        }
    }

    .dark {
        .tab {
            color: $mainFontColorDark;

            &.selected {
                border-bottom: 1px solid lighten($mainBgDark, 5%);
            }
        }
    }

    .light {
        .tab {
            color: $mainFontColorLight;

            &.selected {
                border-bottom: 1px solid darken($mainBgLight, 5%);
            }
        }
    }
</style>
