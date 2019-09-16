import { Graph, GraphEdge, GraphVertex } from '../../src';

describe('Graph - BFS & DFS', () => {
  describe('无向图：', () => {
    let graph: Graph;
    let vertexFrom: GraphVertex;
    let vertexFrom6: GraphVertex;
    beforeAll(() => {
      graph = new Graph();

      const vertex1 = new GraphVertex('1');
      const vertex2 = new GraphVertex('2');
      const vertex3 = new GraphVertex('3');
      const vertex4 = new GraphVertex('4');
      const vertex5 = new GraphVertex('5');
      const vertex6 = new GraphVertex('6');
      const vertex7 = new GraphVertex('7');
      const vertex8 = new GraphVertex('8');
      const vertex9 = new GraphVertex('9');
      const vertex10 = new GraphVertex('10');

      graph
        .addEdge(new GraphEdge(vertex1, vertex2))
        .addEdge(new GraphEdge(vertex1, vertex3))
        .addEdge(new GraphEdge(vertex1, vertex4))
        .addEdge(new GraphEdge(vertex2, vertex5))
        .addEdge(new GraphEdge(vertex5, vertex9))
        .addEdge(new GraphEdge(vertex3, vertex6))
        .addEdge(new GraphEdge(vertex3, vertex7))
        .addEdge(new GraphEdge(vertex4, vertex8))
        .addEdge(new GraphEdge(vertex6, vertex10));

      vertexFrom = vertex1;
      vertexFrom6 = vertex6;
    });
    it('支持在无向图中以 generator 形式进行 BFS', () => {
      const bfsFromFirst = graph.bfs(vertexFrom);

      expect(bfsFromFirst.next().value.value).toBe('1');
      expect(bfsFromFirst.next().value.value).toBe('2');
      expect(bfsFromFirst.next().value.value).toBe('3');
      expect(bfsFromFirst.next().value.value).toBe('4');
      expect(bfsFromFirst.next().value.value).toBe('5');
      expect(bfsFromFirst.next().value.value).toBe('6');
      expect(bfsFromFirst.next().value.value).toBe('7');
      expect(bfsFromFirst.next().value.value).toBe('8');
      expect(bfsFromFirst.next().value.value).toBe('9');
      expect(bfsFromFirst.next().value.value).toBe('10');
    });

    it('借助 Array.from 获取 BFS 结果序列 - 以 vertex1 节点开始', () => {
      const bfsFromFirst = graph.bfs(vertexFrom);
      const visitedOrder = Array.from(bfsFromFirst);
      const values = visitedOrder.map(node => node.value);
      expect(values).toEqual([
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10'
      ]);
    });
    it('借助 Array.from 获取 BFS 结果序列 - 以 vertex6 节点开始', () => {
      const bfsFromFirst = graph.bfs(vertexFrom6);
      const visitedOrder = Array.from(bfsFromFirst);
      const values = visitedOrder.map(node => node.value);
      expect(values).toEqual([
        '6',
        '3',
        '10',
        '1',
        '7',
        '2',
        '4',
        '5',
        '8',
        '9'
      ]);
    });

    it('借助 Array.from 获取 DFS 结果序列 - 以 vertex1 节点开始', () => {
      const dfsFromFirst = graph.dfs(vertexFrom);
      const visitedOrder = Array.from(dfsFromFirst);
      const values = visitedOrder.map(node => node.value);
      expect(values).toEqual([
        '1',
        '4',
        '8',
        '3',
        '7',
        '6',
        '10',
        '2',
        '5',
        '9'
      ]);
    });
    it('借助 Array.from 获取 DFS 结果序列 - 以 vertex6 节点开始', () => {
      const dfsFromFirst = graph.dfs(vertexFrom6);
      const visitedOrder = Array.from(dfsFromFirst);
      const values = visitedOrder.map(node => node.value);
      expect(values).toEqual([
        '6',
        '10',
        '3',
        '7',
        '1',
        '4',
        '8',
        '2',
        '5',
        '9'
      ]);
    });
  });

  describe('有向图：', () => {
    let graph: Graph;
    let vertexFrom: GraphVertex;
    let vertexFrom6: GraphVertex;
    beforeAll(() => {
      graph = new Graph(true);

      const vertex1 = new GraphVertex('1');
      const vertex2 = new GraphVertex('2');
      const vertex3 = new GraphVertex('3');
      const vertex4 = new GraphVertex('4');
      const vertex5 = new GraphVertex('5');
      const vertex6 = new GraphVertex('6');
      const vertex7 = new GraphVertex('7');
      const vertex8 = new GraphVertex('8');
      const vertex9 = new GraphVertex('9');
      const vertex10 = new GraphVertex('10');

      graph
        .addEdge(new GraphEdge(vertex1, vertex2))
        .addEdge(new GraphEdge(vertex1, vertex3))
        .addEdge(new GraphEdge(vertex1, vertex4))
        .addEdge(new GraphEdge(vertex2, vertex5))
        .addEdge(new GraphEdge(vertex5, vertex9))
        .addEdge(new GraphEdge(vertex3, vertex6))
        .addEdge(new GraphEdge(vertex3, vertex7))
        .addEdge(new GraphEdge(vertex4, vertex8))
        .addEdge(new GraphEdge(vertex6, vertex10));

      vertexFrom = vertex1;
      vertexFrom6 = vertex6;
    });
    it('支持在有向图中以 generator 形式进行 BFS', () => {
      const bfsFromFirst = graph.bfs(vertexFrom);

      expect(bfsFromFirst.next().value.value).toBe('1');
      expect(bfsFromFirst.next().value.value).toBe('2');
      expect(bfsFromFirst.next().value.value).toBe('3');
      expect(bfsFromFirst.next().value.value).toBe('4');
      expect(bfsFromFirst.next().value.value).toBe('5');
      expect(bfsFromFirst.next().value.value).toBe('6');
      expect(bfsFromFirst.next().value.value).toBe('7');
      expect(bfsFromFirst.next().value.value).toBe('8');
      expect(bfsFromFirst.next().value.value).toBe('9');
      expect(bfsFromFirst.next().value.value).toBe('10');
    });

    it('借助 Array.from 获取 BFS 结果序列 - 以 vertex1 节点开始', () => {
      const bfsFromFirst = graph.bfs(vertexFrom);
      const visitedOrder = Array.from(bfsFromFirst);
      const values = visitedOrder.map(node => node.value);
      expect(values).toEqual([
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10'
      ]);
    });

    it('借助 Array.from 获取 BFS 结果序列 - 以 vertex6 节点开始', () => {
      const bfsFromFirst = graph.bfs(vertexFrom6);
      const visitedOrder = Array.from(bfsFromFirst);
      const values = visitedOrder.map(node => node.value);
      expect(values).toEqual([
        '6',
        '10'
      ]);
    });

    it('借助 Array.from 获取 DFS 结果序列 - 以 vertex1 节点开始', () => {
      const dfsFromFirst = graph.dfs(vertexFrom);
      const visitedOrder = Array.from(dfsFromFirst);
      const values = visitedOrder.map(node => node.value);
      expect(values).toEqual([
        '1',
        '4',
        '8',
        '3',
        '7',
        '6',
        '10',
        '2',
        '5',
        '9'
      ]);
    });

    it('借助 Array.from 获取 DFS 结果序列 - 以 vertex6 节点开始', () => {
      const dfsFromFirst = graph.dfs(vertexFrom6);
      const visitedOrder = Array.from(dfsFromFirst);
      const values = visitedOrder.map(node => node.value);
      expect(values).toEqual([
        '6',
        '10'
      ]);
    });
  });
});
