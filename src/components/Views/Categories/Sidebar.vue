<template>
    <Sidebar closeRoute="/categories">
        <h3 class="sidebar-title">Edit Category</h3>

        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control full-width" id="name" v-model="category.name">
        </div>
        <div class="form-group">
            <label for="decription">Description</label>
            <textarea class="form-control full-width" id="decription" v-model="category.description"></textarea>
        </div>
        <div class="flex-row">
            <div class="form-group color-form-group">
                <label for="colorcolorForm">Color</label>
                <input type="color" id="colorForm" class="hidden" v-model="category.color">
                <div class="color-stripe" v-bind:style="{ 'background-color': category.color }" @click="openColorPicker"></div>
            </div>
            <delete-button/>
        </div>
    </Sidebar>
</template>

<script>
    import Vue from 'vue';
    import Category from '../../../models/category';

    import Sidebar from '../Sidebar';
    import DeleteButton from '../../Elements/DeleteButton.vue';

    export default Vue.extend({
        props: ['id'],
        data() {
            return {
                category: {}
            }
        },
        components: {
            Sidebar,
            DeleteButton
        },
        methods: {
            async getCategory() {
                this.category = await Category.findById(this.id);
            },
            openColorPicker() {
                document.getElementById('colorForm').click();
            }
        },
        async mounted() {
            this.getCategory();
        },
        watch: {
            id: async function() {
                await this.getCategory();
            }
        }
    });
</script>

<style lang="scss" scoped>
    textarea {
        min-height: 200px;
    }

    .color-form-group {
        flex: 1 1 auto;

        .color-stripe {
            $size: 30px;
            border: 1px solid #333333;
            border-radius: 50%;
            cursor: pointer;
            height: $size;
            width: $size;
        }
    }

    .delete-button {
        margin-top: 5px;
    }
</style>