<template>
    <v-row>
        <v-col/>
        <v-col cols="5">
            <canvas
                    id="canvas"
                    style="cursor: crosshair;"
                    v-on:mousedown="mouseDown($event)"
            />
        </v-col>
        <v-col cols="5">
            <canvas
                    id="canvas-inverse"
            />
        </v-col>
        <v-col/>
    </v-row>
</template>

<script>
    // packages
    const paper = require('paper');

    // mixins
    import socket from '../mixins/socket';

    export default {
        name: "Drawing",
        mixins: [socket],
        data: () => ({
            scope: null,
            scopeInverse: null,
            down: false,
            path: null,
            pathInverse: null,
            tool: null,
            points: []
        }),
        methods: {
            pathCreate(scope) {
                scope.activate();
                return new paper.Path({
                    strokeColor: '#000000',
                    strokeJoin: 'round',
                    strokeWidth: 1.5
                });
            },
            createTool(scope) {
                scope.activate();
                return new paper.Tool();
            },
            mouseDown() {
                // set down to true and reset points
                this.down = true;
                this.points = [];
                // create stream
                this.socket.emit("createStream");
                // create drawing tool
                this.tool = this.createTool(this.scope);
                // assign current data state to pass to nested functions
                const self = this;
                // set canvas width and height
                const positionInfo = document.getElementById('canvas-inverse').getBoundingClientRect();
                const canvas = {
                    width: positionInfo.width,
                    height: positionInfo.height
                }

                this.tool.onMouseDown = (event) => {
                    self.path = self.pathCreate(self.scope);
                    self.pathInverse = self.pathCreate(self.scopeInverse);

                    self.socket.on('invertPoint', (data) => {
                        self.pathInverse.add(data);
                    });

                    self.path.add(event.point);

                    self.socket.emit('sendPoint', {
                        point: {
                            x: event.point.x,
                            y: event.point.y
                        },
                        canvas: canvas
                    });
                };

                this.tool.onMouseDrag = (event) => {
                    self.path.add(event.point);

                    self.socket.emit('sendPoint', {
                        point: {
                            x: event.point.x,
                            y: event.point.y
                        },
                        canvas: canvas
                    });
                };

                this.tool.onMouseUp = async () => {
                    await self.socket.emit('sendPoint', {
                        point: {
                            x: -1,
                            y: -1
                        },
                        canvas: canvas
                    });

                    await self.socket.emit('endStream');
                }

            }
        },
        mounted() {
            this.scope = new paper.PaperScope();
            this.scopeInverse = new paper.PaperScope();

            this.scope.setup('canvas');
            this.scopeInverse.setup('canvas-inverse');

            this.socket.on('connected', (res) => {
                // eslint-disable-next-line no-console
                console.log("socket connected on: ", res);
            })
        },
        destroyed() {
            this.socket.off('invertPoint');
        }
    }
</script>
