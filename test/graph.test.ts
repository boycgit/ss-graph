import {Graph, GraphEdge, GraphVertex } from "../src";

describe('Graph - 图', () => {
    it('支持在图中添加节点', () => {
        const graph = new Graph();

        const vertexA = new GraphVertex('A');
        const vertexB = new GraphVertex('B');

        graph
            .addVertex(vertexA)
            .addVertex(vertexB);

        expect(graph.toString()).toBe('A,B');
        expect(graph.getVertexByKey(vertexA.getKey())).toEqual(vertexA);
        expect(graph.getVertexByKey(vertexB.getKey())).toEqual(vertexB);
    });

    it('支持在无向图中添加边', () => {
        const graph = new Graph();

        const vertexA = new GraphVertex('A');
        const vertexB = new GraphVertex('B');

        const edgeAB = new GraphEdge(vertexA, vertexB);
        graph.addEdge(edgeAB);

        expect(graph.getAllVertices().length).toBe(2);
        expect(graph.getAllVertices()[0]).toEqual(vertexA);
        expect(graph.getAllVertices()[1]).toEqual(vertexB);

        const graphVertexA = graph.getVertexByKey(vertexA.getKey());
        const graphVertexB = graph.getVertexByKey(vertexB.getKey());

        expect(graph.toString()).toBe('A,B');
        expect(graphVertexA).toBeDefined();
        expect(graphVertexB).toBeDefined();

        expect(graph.getVertexByKey('not existing')).toBeUndefined();

        expect(graphVertexA.getNeighbors().length).toBe(1);
        expect(graphVertexA.getNeighbors()[0]).toEqual(vertexB);
        expect(graphVertexA.getNeighbors()[0]).toEqual(graphVertexB);

        expect(graphVertexB.getNeighbors().length).toBe(1);
        expect(graphVertexB.getNeighbors()[0]).toEqual(vertexA);
        expect(graphVertexB.getNeighbors()[0]).toEqual(graphVertexA);
    });

    it('支持在有向图中添加边', () => {
        const graph = new Graph(true);

        const vertexA = new GraphVertex('A');
        const vertexB = new GraphVertex('B');

        const edgeAB = new GraphEdge(vertexA, vertexB);

        graph.addEdge(edgeAB);

        const graphVertexA = graph.getVertexByKey(vertexA.getKey());
        const graphVertexB = graph.getVertexByKey(vertexB.getKey());

        expect(graph.toString()).toBe('A,B');
        expect(graphVertexA).toBeDefined();
        expect(graphVertexB).toBeDefined();

        expect(graphVertexA.getNeighbors().length).toBe(1);
        expect(graphVertexA.getNeighbors()[0]).toEqual(vertexB);
        expect(graphVertexA.getNeighbors()[0]).toEqual(graphVertexB);

        expect(graphVertexB.getNeighbors().length).toBe(0);
    });

    it('支持在无向图中通过节点查找指定边', () => {
        const graph = new Graph();

        const vertexA = new GraphVertex('A');
        const vertexB = new GraphVertex('B');
        const vertexC = new GraphVertex('C');

        const edgeAB = new GraphEdge(vertexA, vertexB, 10);
        const edgeBA = new GraphEdge(vertexB, vertexA, 10);

        graph.addEdge(edgeAB);

        const graphEdgeAB = graph.findEdge(vertexA, vertexB);
        const graphEdgeBA = graph.findEdge(vertexB, vertexA);
        const graphEdgeAC = graph.findEdge(vertexA, vertexC);
        const graphEdgeCA = graph.findEdge(vertexC, vertexA);

        expect(graphEdgeAC).toBeNull();
        expect(graphEdgeCA).toBeNull();
        expect(graphEdgeAB).toEqual(edgeAB);
        expect(graphEdgeBA).toEqual(edgeBA);
        expect(graphEdgeAB!.weight).toBe(10);
    });

    it('支持在有向图中通过节点查找指定边', () => {
        const graph = new Graph(true);

        const vertexA = new GraphVertex('A');
        const vertexB = new GraphVertex('B');
        const vertexC = new GraphVertex('C');

        const edgeAB = new GraphEdge(vertexA, vertexB, 10);

        graph.addEdge(edgeAB);

        const graphEdgeAB = graph.findEdge(vertexA, vertexB);
        const graphEdgeBA = graph.findEdge(vertexB, vertexA);
        const graphEdgeAC = graph.findEdge(vertexA, vertexC);
        const graphEdgeCA = graph.findEdge(vertexC, vertexA);

        expect(graphEdgeAC).toBeNull();
        expect(graphEdgeCA).toBeNull();
        expect(graphEdgeBA).toBeNull();
        expect(graphEdgeAB).toEqual(edgeAB);
        expect(graphEdgeAB!.weight).toBe(10);
    });

    it('能返回指定节点的相邻节点', () => {
        const graph = new Graph(true);

        const vertexA = new GraphVertex('A');
        const vertexB = new GraphVertex('B');
        const vertexC = new GraphVertex('C');

        const edgeAB = new GraphEdge(vertexA, vertexB);
        const edgeAC = new GraphEdge(vertexA, vertexC);

        graph
            .addEdge(edgeAB)
            .addEdge(edgeAC);

        const neighbors = graph.getNeighbors(vertexA);

        expect(neighbors.length).toBe(2);
        expect(neighbors[0]).toEqual(vertexB);
        expect(neighbors[1]).toEqual(vertexC);
    });

    it('当尝试添加两条边的时候，默认会抛出错误', () => {
        function addSameEdgeTwice() {
            const graph = new Graph(true);

            const vertexA = new GraphVertex('A');
            const vertexB = new GraphVertex('B');

            const edgeAB = new GraphEdge(vertexA, vertexB);

            graph
                .addEdge(edgeAB)
                .addEdge(edgeAB);
        }

        expect(addSameEdgeTwice).toThrow();
    });

    it('当尝试添加两条边的时候，可以通过第二个参数为 true, 忽略错误提示', () => {
        function addSameEdgeTwice() {
            const graph = new Graph(true);

            const vertexA = new GraphVertex('A');
            const vertexB = new GraphVertex('B');

            const edgeAB = new GraphEdge(vertexA, vertexB);

            graph
                .addEdge(edgeAB, true)
                .addEdge(edgeAB, true);
        }

        expect(addSameEdgeTwice).not.toThrow();
    });



    it('可以返回图中所有的边', () => {
        const graph = new Graph(true);

        const vertexA = new GraphVertex('A');
        const vertexB = new GraphVertex('B');
        const vertexC = new GraphVertex('C');

        const edgeAB = new GraphEdge(vertexA, vertexB);
        const edgeBC = new GraphEdge(vertexB, vertexC);

        graph
            .addEdge(edgeAB)
            .addEdge(edgeBC);

        const edges = graph.getAllEdges();

        expect(edges.length).toBe(2);
        expect(edges[0]).toEqual(edgeAB);
        expect(edges[1]).toEqual(edgeBC);
    });

    it('计算无权重图的权重总和为 0', () => {
        const graph = new Graph();

        const vertexA = new GraphVertex('A');
        const vertexB = new GraphVertex('B');
        const vertexC = new GraphVertex('C');
        const vertexD = new GraphVertex('D');

        const edgeAB = new GraphEdge(vertexA, vertexB);
        const edgeBC = new GraphEdge(vertexB, vertexC);
        const edgeCD = new GraphEdge(vertexC, vertexD);
        const edgeAD = new GraphEdge(vertexA, vertexD);

        graph
            .addEdge(edgeAB)
            .addEdge(edgeBC)
            .addEdge(edgeCD)
            .addEdge(edgeAD);

        expect(graph.getWeight()).toBe(0);
    });

    it('计算有权重图中的总和', () => {
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
    });

    it('支持从图中删除多条边', () => {
        const graph = new Graph();

        const vertexA = new GraphVertex('A');
        const vertexB = new GraphVertex('B');
        const vertexC = new GraphVertex('C');

        const edgeAB = new GraphEdge(vertexA, vertexB);
        const edgeBC = new GraphEdge(vertexB, vertexC);
        const edgeAC = new GraphEdge(vertexA, vertexC);

        graph
            .addEdge(edgeAB)
            .addEdge(edgeBC)
            .addEdge(edgeAC);

        expect(graph.getAllEdges().length).toBe(3);

        graph.deleteEdge(edgeAB);

        expect(graph.getAllEdges().length).toBe(2);
        expect(graph.getAllEdges()[0].getKey()).toBe(edgeBC.getKey());
        expect(graph.getAllEdges()[1].getKey()).toBe(edgeAC.getKey());
    });

    it('当从图中删除不存在的边，默认将抛出错误', () => {
        function deleteNotExistingEdge() {
            const graph = new Graph();

            const vertexA = new GraphVertex('A');
            const vertexB = new GraphVertex('B');
            const vertexC = new GraphVertex('C');

            const edgeAB = new GraphEdge(vertexA, vertexB);
            const edgeBC = new GraphEdge(vertexB, vertexC);

            graph.addEdge(edgeAB);
            graph.deleteEdge(edgeBC);
        }

        expect(deleteNotExistingEdge).toThrowError();
    });

    it('当从图中删除不存在的边，可以通过设置第二个参数为 true，忽略错误', () => {
        function deleteNotExistingEdge() {
            const graph = new Graph();

            const vertexA = new GraphVertex('A');
            const vertexB = new GraphVertex('B');
            const vertexC = new GraphVertex('C');

            const edgeAB = new GraphEdge(vertexA, vertexB);
            const edgeBC = new GraphEdge(vertexB, vertexC);

            graph.addEdge(edgeAB);
            graph.deleteEdge(edgeBC, true);
        }

        expect(deleteNotExistingEdge).not.toThrowError();
    });

    it('支持图中所有边反向', () => {
        const vertexA = new GraphVertex('A');
        const vertexB = new GraphVertex('B');
        const vertexC = new GraphVertex('C');
        const vertexD = new GraphVertex('D');

        const edgeAB = new GraphEdge(vertexA, vertexB);
        const edgeAC = new GraphEdge(vertexA, vertexC);
        const edgeCD = new GraphEdge(vertexC, vertexD);

        const graph = new Graph(true);
        graph
            .addEdge(edgeAB)
            .addEdge(edgeAC)
            .addEdge(edgeCD);

        expect(graph.toString()).toBe('A,B,C,D');
        expect(graph.getAllEdges().length).toBe(3);
        expect(graph.getNeighbors(vertexA).length).toBe(2);
        expect(graph.getNeighbors(vertexA)[0].getKey()).toBe(vertexB.getKey());
        expect(graph.getNeighbors(vertexA)[1].getKey()).toBe(vertexC.getKey());
        expect(graph.getNeighbors(vertexB).length).toBe(0);
        expect(graph.getNeighbors(vertexC).length).toBe(1);
        expect(graph.getNeighbors(vertexC)[0].getKey()).toBe(vertexD.getKey());
        expect(graph.getNeighbors(vertexD).length).toBe(0);

        graph.reverse();

        expect(graph.toString()).toBe('A,B,C,D');
        expect(graph.getAllEdges().length).toBe(3);
        expect(graph.getNeighbors(vertexA).length).toBe(0);
        expect(graph.getNeighbors(vertexB).length).toBe(1);
        expect(graph.getNeighbors(vertexB)[0].getKey()).toBe(vertexA.getKey());
        expect(graph.getNeighbors(vertexC).length).toBe(1);
        expect(graph.getNeighbors(vertexC)[0].getKey()).toBe(vertexA.getKey());
        expect(graph.getNeighbors(vertexD).length).toBe(1);
        expect(graph.getNeighbors(vertexD)[0].getKey()).toBe(vertexC.getKey());
    });

    it('能返回节点索引映射表', () => {
        const vertexA = new GraphVertex('A');
        const vertexB = new GraphVertex('B');
        const vertexC = new GraphVertex('C');
        const vertexD = new GraphVertex('D');

        const edgeAB = new GraphEdge(vertexA, vertexB);
        const edgeBC = new GraphEdge(vertexB, vertexC);
        const edgeCD = new GraphEdge(vertexC, vertexD);
        const edgeBD = new GraphEdge(vertexB, vertexD);

        const graph = new Graph();
        graph
            .addEdge(edgeAB)
            .addEdge(edgeBC)
            .addEdge(edgeCD)
            .addEdge(edgeBD);

        const verticesIndices = graph.getVerticesIndices();
        expect(verticesIndices).toEqual({
            A: 0,
            B: 1,
            C: 2,
            D: 3,
        });
    });

    it('支持无向图生成相邻矩阵', () => {
        const vertexA = new GraphVertex('A');
        const vertexB = new GraphVertex('B');
        const vertexC = new GraphVertex('C');
        const vertexD = new GraphVertex('D');

        const edgeAB = new GraphEdge(vertexA, vertexB);
        const edgeBC = new GraphEdge(vertexB, vertexC);
        const edgeCD = new GraphEdge(vertexC, vertexD);
        const edgeBD = new GraphEdge(vertexB, vertexD);

        const graph = new Graph();
        graph
            .addEdge(edgeAB)
            .addEdge(edgeBC)
            .addEdge(edgeCD)
            .addEdge(edgeBD);

        const adjacencyMatrix = graph.getAdjacencyMatrix();
        expect(adjacencyMatrix).toEqual([
            [Infinity, 0, Infinity, Infinity],
            [0, Infinity, 0, 0],
            [Infinity, 0, Infinity, 0],
            [Infinity, 0, 0, Infinity],
        ]);
    });

    it('支持有向图生成相邻矩阵', () => {
        const vertexA = new GraphVertex('A');
        const vertexB = new GraphVertex('B');
        const vertexC = new GraphVertex('C');
        const vertexD = new GraphVertex('D');

        const edgeAB = new GraphEdge(vertexA, vertexB, 2);
        const edgeBC = new GraphEdge(vertexB, vertexC, 1);
        const edgeCD = new GraphEdge(vertexC, vertexD, 5);
        const edgeBD = new GraphEdge(vertexB, vertexD, 7);

        const graph = new Graph(true);
        graph
            .addEdge(edgeAB)
            .addEdge(edgeBC)
            .addEdge(edgeCD)
            .addEdge(edgeBD);

        const adjacencyMatrix = graph.getAdjacencyMatrix();
        expect(adjacencyMatrix).toEqual([
            [Infinity, 2, Infinity, Infinity],
            [Infinity, Infinity, 1, 7],
            [Infinity, Infinity, Infinity, 5],
            [Infinity, Infinity, Infinity, Infinity],
        ]);
    });
});