<template>
    <div class="dragbar flex-0-0-auto" @mousedown="drag"></div>
</template>

<script>
    import Vue from 'vue';

    let dragging = false;
    let startX;

    export default Vue.extend({
        props: ['dragElementId', 'saveName'],
        methods: {
            drag(e) {
                const dragElement = document.getElementById(this.dragElementId);
                dragging = true;
                startX = e.pageX;

                document.onmousemove = function(e2) {
                    const deltaX = e2.pageX - startX;
                    const newWidth = dragElement.offsetLeft - deltaX;
                    dragElement.style.width = `${newWidth}px`;
                };
            }
        },
        mounted() {
            const self = this;
            document.onmouseup = function() {
                if (dragging) {
                    console.log(self.saveName);
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
