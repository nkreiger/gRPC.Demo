<template>
    <v-footer color="primary lighten-1" style="padding:16px;" dark>

        <v-row justify="center">

            <v-btn href="https://grpc.io" target="_blank" text>
                <grpc-icon :maxWidth="maxWidth" :maxHeight="maxHeight"/>
            </v-btn>
            <v-btn href="https://www.docker.com" target="_blank" text>
                <docker-icon :maxWidth="maxWidth" :maxHeight="maxHeight"/>
            </v-btn>
            <v-btn href="https://www.envoyproxy.io" target="_blank" text>
                <envoy-icon :maxWidth="maxWidth" :maxHeight="maxHeight"/>
            </v-btn>
            <v-btn href="https://kubernetes.io" target="_blank" text>
                <kubernetes-icon :maxWidth="maxWidth" :maxHeight="maxHeight"/>
            </v-btn>
            <v-btn href="https://kiali.io" target="_blank" text>
                <kiali-icon :maxWidth="maxWidth" :maxHeight="maxHeight"/>
            </v-btn>
            <v-btn href="https://istio.io" target="_blank" text>
                <istio-icon :maxWidth="maxWidth" :maxHeight="maxHeight"/>
            </v-btn>

        </v-row>

    </v-footer>
</template>

<script>
    export default {
        name: "Footer",
        data: () => ({
            maxWidth: "8vw",
            maxHeight: "6vh",
            testData: ''
        })
    }
</script>
