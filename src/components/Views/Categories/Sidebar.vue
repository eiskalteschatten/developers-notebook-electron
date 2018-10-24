<template>
    <Sidebar closeRoute="/categories">
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control full-width" id="name" v-model="category.name" @change="saveCategoryTimer">
        </div>
        <div class="form-group">
            <label for="decription">Description</label>
            <textarea class="form-control full-width" id="decription" v-model="category.description" @change="saveCategoryTimer"></textarea>
        </div>
        <div class="flex-row">
            <div class="form-group color-form-group">
                <label for="colorcolorForm">Color</label>
                <input type="color" id="colorForm" class="hidden" v-model="category.color" @change="saveCategoryTimer">
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

    let saveTimeout;

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
            },
            async saveCategory() {
                const id = this.category.id;

                try {
                    if (this.category.name) {
                        if (id === '') {
                            this.category = await Category.create(category);
                        }
                        else {
                            await Category.update(category, {where: {id}});
                        }
                    }
                }
                catch(error) {
                    console.error(error);
                }
            },
            saveCategoryTimer() {
                clearTimeout(saveTimeout);
                saveTimeout = setTimeout(this.saveCategory, 500);
            }
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
