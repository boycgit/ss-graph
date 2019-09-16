import { GraphEdge, GraphVertex } from "../src";

describe('GraphVertex - 节点', () => {
    it('当创建一个没有数值的节点，应当抛出错误', () => {
        let vertex = null;

        function createEmptyVertex() {
            vertex = new GraphVertex(null);
        }

        expect(vertex).toBeNull();
        expect(createEmptyVertex).toThrow();
    });

    it('正常创建图节点', () => {
        const vertex = new GraphVertex('A');

        expect(vertex).toBeDefined();
        expect(vertex.value).toBe('A');
        expect(vertex.toString()).toBe('A');
        expect(vertex.getKey()).toBe('A');
        expect(vertex.getEdges()).toEqual([]);
    });

    it('正常创建节点、添加边', () => {
        const vertexA = new GraphVertex('A');
        const vertexB = new GraphVertex('B');

        const edgeAB = new GraphEdge(vertexA, vertexB);
        vertexA.addEdge(edgeAB);

        expect(vertexA.hasEdge(edgeAB)).toBe(true);
        expect(vertexB.hasEdge(edgeAB)).toBe(false);
        expect(vertexA.getEdges().length).toBe(1);
        expect(vertexA.getEdges()[0].toString()).toBe('A_B');
    });

    it('正常可以从节点上新增、删除边', () => {
        const vertexA = new GraphVertex('A');
        const vertexB = new GraphVertex('B');
        const vertexC = new GraphVertex('C');

        const edgeAB = new GraphEdge(vertexA, vertexB);
        const edgeAC = new GraphEdge(vertexA, vertexC);
        vertexA
            .addEdge(edgeAB)
            .addEdge(edgeAC);

        // 注意，这是有向图的，存在 AB 边并不等于存在 BA 边
        expect(vertexA.hasEdge(edgeAB)).toBe(true);
        expect(vertexB.hasEdge(edgeAB)).toBe(false);

        expect(vertexA.hasEdge(edgeAC)).toBe(true);
        expect(vertexC.hasEdge(edgeAC)).toBe(false);

        expect(vertexA.getEdges().length).toBe(2);

        expect(vertexA.getEdges()[0].toString()).toBe('A_B');
        expect(vertexA.getEdges()[1].toString()).toBe('A_C');

        vertexA.deleteEdge(edgeAB);
        expect(vertexA.hasEdge(edgeAB)).toBe(false);
        expect(vertexA.hasEdge(edgeAC)).toBe(true);
        expect(vertexA.getEdges()[0].toString()).toBe('A_C');

        vertexA.deleteEdge(edgeAC);
        expect(vertexA.hasEdge(edgeAB)).toBe(false);
        expect(vertexA.hasEdge(edgeAC)).toBe(false);
        expect(vertexA.getEdges().length).toBe(0);
    });

    it('支持从节点上删除所有的边', () => {
        const vertexA = new GraphVertex('A');
        const vertexB = new GraphVertex('B');
        const vertexC = new GraphVertex('C');

        const edgeAB = new GraphEdge(vertexA, vertexB);
        const edgeAC = new GraphEdge(vertexA, vertexC);
        vertexA
            .addEdge(edgeAB)
            .addEdge(edgeAC);

        expect(vertexA.hasEdge(edgeAB)).toBe(true);
        expect(vertexB.hasEdge(edgeAB)).toBe(false);

        expect(vertexA.hasEdge(edgeAC)).toBe(true);
        expect(vertexC.hasEdge(edgeAC)).toBe(false);

        expect(vertexA.getEdges().length).toBe(2);

        vertexA.deleteAllEdges();

        expect(vertexA.hasEdge(edgeAB)).toBe(false);
        expect(vertexB.hasEdge(edgeAB)).toBe(false);

        expect(vertexA.hasEdge(edgeAC)).toBe(false);
        expect(vertexC.hasEdge(edgeAC)).toBe(false);

        expect(vertexA.getEdges().length).toBe(0);
    });

    it('当节点是开始节点，支持返回当前节点的所有相邻节点', () => {
        const vertexA = new GraphVertex('A');
        const vertexB = new GraphVertex('B');
        const vertexC = new GraphVertex('C');

        const edgeAB = new GraphEdge(vertexA, vertexB);
        const edgeAC = new GraphEdge(vertexA, vertexC);
        vertexA
            .addEdge(edgeAB)
            .addEdge(edgeAC);

        // vertexB 节点对应的 edges 属性不存在，所以返回空集
        expect(vertexB.getNeighbors()).toEqual([]);

        const neighbors = vertexA.getNeighbors();

        expect(neighbors.length).toBe(2);
        expect(neighbors[0]).toEqual(vertexB);
        expect(neighbors[1]).toEqual(vertexC);
    });

    it('当节点是结束节点，也能获取相邻节点属性', () => {
        const vertexA = new GraphVertex('A');
        const vertexB = new GraphVertex('B');
        const vertexC = new GraphVertex('C');

        const edgeBA = new GraphEdge(vertexB, vertexA);
        const edgeCA = new GraphEdge(vertexC, vertexA);
        vertexA
            .addEdge(edgeBA)
            .addEdge(edgeCA);

        expect(vertexB.getNeighbors()).toEqual([]);

        const neighbors = vertexA.getNeighbors();

        expect(neighbors.length).toBe(2);
        expect(neighbors[0]).toEqual(vertexB);
        expect(neighbors[1]).toEqual(vertexC);
    });

    it('检查当前节点是否存在指定的相邻节点', () => {
        const vertexA = new GraphVertex('A');
        const vertexB = new GraphVertex('B');
        const vertexC = new GraphVertex('C');

        const edgeAB = new GraphEdge(vertexA, vertexB);
        vertexA.addEdge(edgeAB);

        expect(vertexA.hasNeighbor(vertexB)).toBe(true);
        expect(vertexA.hasNeighbor(vertexC)).toBe(false);
    });

    it('能通过当前节点找到指定边', () => {
        const vertexA = new GraphVertex('A');
        const vertexB = new GraphVertex('B');
        const vertexC = new GraphVertex('C');

        const edgeAB = new GraphEdge(vertexA, vertexB);
        vertexA.addEdge(edgeAB);

        expect(vertexA.findEdge(vertexB)).toEqual(edgeAB);
        expect(vertexA.findEdge(vertexC)).toBeNull();
    });

    it('获取节点的 degree 数值', () => {
        const vertexA = new GraphVertex('A');
        const vertexB = new GraphVertex('B');

        expect(vertexA.getDegree()).toBe(0);

        const edgeAB = new GraphEdge(vertexA, vertexB);
        vertexA.addEdge(edgeAB);

        expect(vertexA.getDegree()).toBe(1);

        const edgeBA = new GraphEdge(vertexB, vertexA);
        vertexA.addEdge(edgeBA);

        expect(vertexA.getDegree()).toBe(2);

        // 重复添加
        vertexA.addEdge(edgeAB);
        expect(vertexA.getDegree()).toBe(2);

        expect(vertexA.getEdges().length).toEqual(2);
    });
});