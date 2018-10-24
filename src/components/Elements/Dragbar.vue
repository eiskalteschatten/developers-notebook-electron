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
                // const mainView = document.getElementsByClassName('js-main-column')[0];
                const sidebar = document.getElementById('sidebar');
                dragging = true;
                startX = e.pageX;

                document.onmousemove = function(e2) {
                    const newWidth = (startX - (e2.pageX + startX)) * -1; //e.pageX - sidebar.offsetLeft;
                    sidebar.style.width = `${newWidth}px`;
                };
            }
        },
        mounted() {
            // $(document).mouseup(async function() {
            //     if (dragging) {
            //         $(document).unbind('mousemove');
            //         dragging = false;

            //         changePreferences({
            //             sidebarWidth: parseInt($('#sidebarWrapper').css('width')),
            //             middleColumnWidth: parseInt($('#bookListWrapper').css('width'))
            //         });
            //     }
            // });
        }
    });
</script>

<style lang="scss">
    .dragbar {
        cursor: col-resize;
        width: 2px;
    }
</style>
