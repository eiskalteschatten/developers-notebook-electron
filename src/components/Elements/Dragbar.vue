<template>
    <div class="dragbar flex-0-0-auto" @mousedown="drag"></div>
</template>

<script>
    import Vue from 'vue';

    let dragging = false;
    let startX;

    export default Vue.extend({
        methods: {
            drag(e) {
                const sidebar = document.getElementById('sidebar');
                dragging = true;
                startX = e.pageX;

                document.onmousemove = function(e2) {
                    const newWidth = window.innerWidth - e2.pageX;
                    sidebar.style.width = `${newWidth}px`;
                };
            }
        },
        mounted() {
            document.onmouseup = function() {
                if (dragging) {
                    const sidebar = document.getElementById('sidebar');
                    document.onmousemove = null;
                    dragging = false;
                    localStorage.setItem('sidebarWidth', sidebar.style.width);
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
