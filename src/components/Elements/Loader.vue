<template>
    <div class="loader hidden" id="generalLoader"></div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
    });
</script>

<style lang="scss">
    .loader {
        $size: 15px;

        background: url('../../assets/images/loader.svg') no-repeat center center;
        background-size: 32px;
        background-size: $size;
        display: inline-block;
        height: $size;
        margin-right: 5px;
        width: $size;
    }
</style>
