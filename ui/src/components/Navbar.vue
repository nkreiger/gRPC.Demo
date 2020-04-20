<template>
    <v-app-bar app color="primary" dark>
        <div class="d-flex align-center">
            <v-img
                    alt="Dev Ops Logo"
                    class="shrink mt-1"
                    contain
                    min-width="100"
                    src="../assets/devops-demo.svg"
                    max-width="8vw"
            />
        </div>

        <v-spacer></v-spacer>

        <v-btn href="https://git.pncint.net/projects/DD" target="_blank" text>
            <span class="mr-2">Source Code</span>
            <link-in-new-tab-icon height="16px"/>
        </v-btn>

    </v-app-bar>
</template>

<script>
    export default {
        name: "Navbar"
    }
</script>
