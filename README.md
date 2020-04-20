# gRPC Web App Demo

Leverage gRPC's powerful bidirectional streaming capabilities with a simple gRPC Golang Service consumed by a NodeJS Client proxying the stream to a Progressive Web App build in VueJS.

<img src="./assets/demo.gif" alt="demo gif" width="720px">

The front-end VueJS application streams the mouse X and Y coordinates via Sockets.io to the backend `proxy` client, which bidirectionally streams the points to the `transform` service, flipping the coordinates along a horizontal axis, and streams them back to the front end service to be displayed.

The contract between services is defined in the `demo.proto` file, with `flip` being the lone RPC call, that both _receives_ and _returns_ a gRPC stream of `Point` messages.

```proto
service Transform {
	rpc flip(stream Point) returns (stream Point) {}
}

message Point {
	double x = 1;
	double y = 2;
	Canvas canvas = 3;
}

message Canvas {
	int64 width = 1;
	int64 height = 2;
}
```

The `Point` message is received by the backend `proxy` client, which streams to the `transform` service to flip the X and Y values along the horizontal axis.

```go
func (s *Server) Flip(stream pb.Transform_FlipServer) error {

    for {

        in, err := stream.Recv()

        if err != nil {
            return err
        }

        if (in.X >= 0) && (in.Y >= 0) {

            out := gfx.Mirror(in)
            err := stream.Send(&out)

            if err != nil {
                return err
            }
        }
    }
}
```

On mouse-down, the front-end VueJS application draws a line from the user's previous mouse location to its current mouse location, and sends the current mouse location the backend to the `transform` service, and draws a line from the previous mirror point to the current mirror point.

```python
for flip_point in stub.flip(send([event_point])):
    if len(flip_points) > 1:
        draw_line(flip_points[-2],flip_points[-1])
    flip_points.append(flip_point)
```

---

&nbsp;

## Build & Run Instructions
<div class="note">
    <div class="title">Note:</div>
    Proxy runs a gRPC client that connects to the Transform gRPC server,
    Run Proxy after you start the gRPC server to avoid errors
</div>

<br>
From the `/transform` directory, pull all dependencies.

```bash
$ go get
```

Serve up transform service on `:9901`

```bash
$ go run server.go
```

From the `/proxy` directory, run `npm install`. Then serve up the proxy service on `:5000`

```bash
$ node server.js
```

From the `/ui` directory, run `npm install`. Then start up the application:

```bash
$ npm run serve
```

---

&nbsp;

## Compililing Protos

Go

```bash
$ protoc -I . demo.proto --go_out=plugins=grpc:transform/protos/
```

Python

```bash
$ python -m grpc_tools.protoc -I . demo.proto --python_out=draw/protos/ --grpc_python_out=draw/protos/
```

Node

gprc-js automatically compiles your proto at runtime...reference `/proxy/grpc.js`
