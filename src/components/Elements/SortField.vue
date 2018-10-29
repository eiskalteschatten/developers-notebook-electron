<template>
    <div class="sort-field">
        Sort by:
        <select class="form-control" v-model="sortBy" @change="changeSortBy">
            <option v-for="(field, value) in fields" :key="value" :value="value">
                {{ field }}
            </option>
        </select>
        <span class="book-sort-order" title="Change sort order" @click="changeSortDirection">
            <span v-if="sortDirection === 'ASC'">&uarr;</span>
            <span v-else>&darr;</span>
        </span>
    </div>
</template>

<script>
    import Vue from 'vue';

    import {eventBus} from '../../app';

    export default Vue.extend({
        props: ['fields', 'type', 'sortByDefault', 'sortDirectionDefault'],
        data() {
            return {
                sortBy: this.sortByDefault,
                sortDirection: this.sortDirectionDefault
            }
        },
        methods: {
            changeSortBy() {
                localStorage.setItem(`${this.type}SortBy`, this.sortBy);
                this.emitEvent();
            },
            changeSortDirection() {
                this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';
                localStorage.setItem(`${this.type}SortDirection`, this.sortDirection);
                this.emitEvent();
            },
            emitEvent() {
                eventBus.$emit(`${this.type}-change-sort`, this.sortBy, this.sortDirection);
            }
        }
    });
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/variables';

    .sort-field {
        font-size: .8em;
        margin-top: 10px;

        .book-sort-order {
            cursor: pointer;
        }
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
