<template>
    <div class="sort-field">
        Sort by:
        <select class="form-control">
            <option v-for="(field, value) in fields" :key="value" value="value" v-bind:selected="field.default">
                {{ field.title }}
            </option>
        </select>
        <a href="#" class="book-sort-order" title="Change sort order">&uarr;</a>
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

        .book-sort-order {
            text-decoration: none;
        }
    }

    .dark {
        .sort-field {
            .form-control {
                background: $mainBgDark;
            }
        }

        .book-sort-order {
            color: $mainFontColorDark;
        }
    }

    .light {
        .sort-field {
            .form-control {
                background: $mainBgLight;
            }
        }

        .book-sort-order {
            color: $mainFontColorLight;
        }
    }
</style>
