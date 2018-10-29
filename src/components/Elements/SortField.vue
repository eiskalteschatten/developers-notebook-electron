<template>
    <div class="sort-field">
        Sort by:
        <select class="form-control">
            <option v-for="(field, value) in fields" :key="value" value="value">
                {{ field }}
            </option>
        </select>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        props: ['fields']
    });
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/variables';

    .sort-field {
        font-size: .8em;
        margin-top: 10px;
    }

    .dark {
        .sort-field {
            .form-control {
                background: $mainBgDark;
            }
        }
    }

    .light {
        .sort-field {
            .form-control {
                background: $mainBgLight;
            }
        }
    }
</style>
