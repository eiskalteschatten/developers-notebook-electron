<template>
    <div>
        <button @click="goBack">Back</button>
        <button @click="goForward">Forward</button>
    </div>
</template>

<script>
    import Vue from 'vue';
    import router from '../../router';

    export default Vue.extend({
        methods: {
            goBack() {
                router.go(-1);
            },
            goForward() {
                router.go(1);
            }
        }
    });
</script>

<style lang="scss">

</style>
