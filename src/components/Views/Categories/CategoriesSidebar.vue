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
        <div class="form-group">
            <label for="colorcolorForm">Color</label>
            <input type="color" id="colorForm" class="hidden" v-model="category.color">
            <div class="color-stripe" v-bind:style="{ 'background-color': category.color }" @click="openColorPicker"></div>
        </div>
    </Sidebar>
</template>

<script>
    import Vue from 'vue';
    import Category from '../../../models/category';

    import Sidebar from '../Sidebar';

    export default Vue.extend({
        props: ['id'],
        data() {
            return {
                category: {}
            }
        },
        components: {
            Sidebar
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

    .color-stripe {
        $size: 30px;
        border: 1px solid #333333;
        border-radius: 50%;
        cursor: pointer;
        height: $size;
        width: $size;
    }
</style>
