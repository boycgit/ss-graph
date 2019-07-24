# ss-graph

[![Build Status](https://travis-ci.org/boycgit/ss-graph.svg?branch=master)](https://travis-ci.org/boycgit/ss-graph) [![Coverage Status](https://coveralls.io/repos/github/boycgit/ss-graph/badge.svg?branch=master)](https://coveralls.io/github/boycgit/ss-graph?branch=master) [![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php) [![npm version](https://badge.fury.io/js/ss-graph.svg)](https://badge.fury.io/js/ss-graph)

Data Structure Serial -  Tree

 - written in Typescript
 - fully tested


## Installation

### Node.js / Browserify

```bash
npm install ss-graph --save
```

```javascript
var {Tree, TreeNode} = require('ss-graph');
```

### Global object

Include the pre-built script.

```html
<script src="./dist/index.umd.min.js"></script>

```

## Build & test

```bash
npm run build
```

```bash
npm test
```

## document

主要注意：
 - 空树（tree.root = null） 和 根节点为空 (tree.root = new TreeNode()) 的差别；
 - 节点的 `data` 概念和 `value` 是不同的，`data` 是节点最原始的数据，而 `value` 则是 `data` 属性的映射之后的数值
 - 为 BST 能够高效运转，应当让所有数据去重后再存储

```bash
npm run doc
```

then open the generated `out/index.html` file in your browser.

## License

[MIT](LICENSE).
