<template>
    <v-container fluid>
        <Drawing/>
    </v-container>
</template>

<script>
    import Drawing from "../components/Drawing";

    export default {
        name: "CanvasToggle",
        components: {
            Drawing
        }
    }
</script>

<style>
    #canvas, #canvas-inverse {
        border: 3px solid #B5B5B5;
        /* box-shadow: 2.5px 2.5px 5px rgb(0, 0, 0, 0.5); */
        border-radius: 15px;
        width: 100% !important;
        height: 75vh !important;
    }

</style>
