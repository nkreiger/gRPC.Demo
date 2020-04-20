import { SocketMirror } from "../main";

const socketMixin = {
    data: () => ({
        socket: null
    }),
    mounted() {
        this.socket = SocketMirror;
    }
}

export default socketMixin;
