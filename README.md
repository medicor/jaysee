Jaysee
=======

Yet another JSON visualizer. Made with [Vue.js](https://vuejs.org/) and [D3](https://d3js.org/).


A tiny application that visualizes the JSON response from an api call with the
help of D3 (more specifically [`d3.tree`](https://github.com/d3/d3-hierarchy/blob/master/README.md#tree)).
I often feel i am missing a tool for this. Support for zooming with the mouse
wheel and panning by dragging. Much more could be refined but other interesting things lies ahead :wink:.
All JavaScript is in ES6 so it won't work in IE11.

One restriction is that api calls are proxied through my NGINX server to avoid CORS problems.
Unfortunately, my server does not support HTTPS yet, so only calls through HTTP works.
A simple NGINX configuration is used:

```sh
location /api { # Proxy api call to avoid CORS problems.
   resolver 192.168.1.1;
   proxy_pass $arg_call;
}
```

There is also a version made with nested HTML tables and Google MDL in the [master](https://github.com/medicor/jaysee/tree/master) branch.

