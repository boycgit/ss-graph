# ss-graph

[![Build Status](https://travis-ci.org/boycgit/ss-graph.svg?branch=master)](https://travis-ci.org/boycgit/ss-graph) [![Coverage Status](https://coveralls.io/repos/github/boycgit/ss-graph/badge.svg?branch=master)](https://coveralls.io/github/boycgit/ss-graph?branch=master) [![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php) [![npm version](https://badge.fury.io/js/ss-graph.svg)](https://badge.fury.io/js/ss-graph)

Data Structure Serial -  Graph

 - written in Typescript
 - fully tested


## Installation

### Node.js / Browserify

```bash
npm install ss-graph --save
```

```javascript
var {Graph, GraphEdge, GraphVertex} = require('ss-graph');
```

### Global object

Include the pre-built script.

```html
<script src="./dist/index.umd.min.js"></script>

```

## usage

```js
const graph = new Graph();

const vertexA = new GraphVertex('A');
const vertexB = new GraphVertex('B');
const vertexC = new GraphVertex('C');
const vertexD = new GraphVertex('D');

const edgeAB = new GraphEdge(vertexA, vertexB, 1);
const edgeBC = new GraphEdge(vertexB, vertexC, 2);
const edgeCD = new GraphEdge(vertexC, vertexD, 3);
const edgeAD = new GraphEdge(vertexA, vertexD, 4);

graph
    .addEdge(edgeAB)
    .addEdge(edgeBC)
    .addEdge(edgeCD)
    .addEdge(edgeAD);

expect(graph.getWeight()).toBe(10);
```

## Build & test

```bash
npm run build
```

```bash
npm test
```

## document

```bash
npm run doc
```

then open the generated `out/index.html` file in your browser.

## License

[MIT](LICENSE).
