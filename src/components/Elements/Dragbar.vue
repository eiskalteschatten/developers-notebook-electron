<template>
    <div class="dragbar flex-0-0-auto" @mousedown="drag"></div>
</template>

<script>
    import Vue from 'vue';

    let dragging = false;

    export default Vue.extend({
        props: ['dragElementId', 'saveName'],
        methods: {
            drag() {
                const dragElement = document.getElementById(this.dragElementId);
                dragging = true;

                document.onmousemove = function(e) {
                    const newWidth = window.innerWidth - e.pageX;
                    dragElement.style.width = `${newWidth}px`;
                };
            }
        },
        mounted() {
            const self = this;
            document.onmouseup = function() {
                if (dragging) {
                    const dragElement = document.getElementById(self.dragElementId);
                    document.onmousemove = null;
                    dragging = false;
                    localStorage.setItem(self.saveName, dragElement.style.width);
                }
            };
        }
    });
</script>

<style lang="scss">
    .dragbar {
        cursor: col-resize;
        width: 2px;
    }
</style>
