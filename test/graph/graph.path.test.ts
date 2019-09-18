import { Graph, GraphEdge, GraphVertex } from '../../src';

describe('Graph - findAllPath 查找两点之间所有路径 ', () => {
  // 图示：https://raw.githubusercontent.com/boycgit/web-image/master/blog20190918113252.png
  describe('无向图：', () => {
    let graph: Graph;
    let vertexFrom3: GraphVertex;
    let vertexFrom6: GraphVertex;

    beforeAll(() => {
      graph = new Graph();

      const vertex0 = new GraphVertex('0');
      const vertex1 = new GraphVertex('1');
      const vertex2 = new GraphVertex('2');
      const vertex3 = new GraphVertex('3');
      const vertex4 = new GraphVertex('4');
      const vertex5 = new GraphVertex('5');
      const vertex6 = new GraphVertex('6');
      const vertex7 = new GraphVertex('7');
      const vertex8 = new GraphVertex('8');

      graph
        .addEdge(new GraphEdge(vertex0, vertex1))
        .addEdge(new GraphEdge(vertex0, vertex2))
        .addEdge(new GraphEdge(vertex1, vertex3))
        .addEdge(new GraphEdge(vertex1, vertex4))
        .addEdge(new GraphEdge(vertex3, vertex7))
        .addEdge(new GraphEdge(vertex4, vertex7))
        .addEdge(new GraphEdge(vertex4, vertex5))
        .addEdge(new GraphEdge(vertex2, vertex5))
        .addEdge(new GraphEdge(vertex2, vertex6))
        .addEdge(new GraphEdge(vertex5, vertex6))
        .addEdge(new GraphEdge(vertex6, vertex8));

      vertexFrom3 = vertex3;
      vertexFrom6 = vertex6;
    });
    it('在无向图中以 generator 形式查找路径', () => {
      const pathIterator = graph.findAllPath(vertexFrom3, vertexFrom6);

      const getPathValue = () => {
        const vPath = pathIterator.next().value || [];
        return vPath.map((v: GraphVertex) => v.value);
      };

      expect(getPathValue()).toEqual(['3', '1', '0', '2', '5', '6']);

      expect(getPathValue()).toEqual(['3', '1', '0', '2', '6']);

      expect(getPathValue()).toEqual(['3', '1', '4', '5', '2', '6']);
      expect(getPathValue()).toEqual(['3', '1', '4', '5', '6']);

      expect(getPathValue()).toEqual(['3', '7', '4', '1', '0', '2', '5', '6']);
      expect(getPathValue()).toEqual(['3', '7', '4', '1', '0', '2', '6']);

      expect(getPathValue()).toEqual(['3', '7', '4', '5', '2', '6']);
      expect(getPathValue()).toEqual(['3', '7', '4', '5', '6']);

      //   结束了
      expect(getPathValue()).toEqual([]);
    });

    it('借助 Array.from 所有路径，节点 3 到 节点 6 共 8 条路径', () => {
      const pathIterator = graph.findAllPath(vertexFrom3, vertexFrom6);
      const allPaths = Array.from(pathIterator);
      expect(allPaths.length).toBe(8);
    });

    it('如果开始节点和结束节点相同，则只返回一条单点路径', () => {
      const pathIterator = graph.findAllPath(vertexFrom3, vertexFrom3);
      const allPaths = Array.from(pathIterator);
      expect(allPaths.length).toBe(1);
      expect(allPaths[0]).toEqual([vertexFrom3]);
    });
  });

  describe('有向图：', () => {
    let graph: Graph;
    let vertexFrom3: GraphVertex;
    let vertexFrom6: GraphVertex;

    beforeAll(() => {
      graph = new Graph(true);

      const vertex0 = new GraphVertex('0');
      const vertex1 = new GraphVertex('1');
      const vertex2 = new GraphVertex('2');
      const vertex3 = new GraphVertex('3');
      const vertex4 = new GraphVertex('4');
      const vertex5 = new GraphVertex('5');
      const vertex6 = new GraphVertex('6');
      const vertex7 = new GraphVertex('7');
      const vertex8 = new GraphVertex('8');

      graph
        .addEdge(new GraphEdge(vertex0, vertex1))
        .addEdge(new GraphEdge(vertex0, vertex2))
        .addEdge(new GraphEdge(vertex1, vertex3))
        .addEdge(new GraphEdge(vertex4, vertex1))
        .addEdge(new GraphEdge(vertex3, vertex7))
        .addEdge(new GraphEdge(vertex7, vertex4))
        .addEdge(new GraphEdge(vertex4, vertex5))
        .addEdge(new GraphEdge(vertex5, vertex2))
        .addEdge(new GraphEdge(vertex2, vertex6))
        .addEdge(new GraphEdge(vertex5, vertex6))
        .addEdge(new GraphEdge(vertex8, vertex6));

      vertexFrom3 = vertex3;
      vertexFrom6 = vertex6;
    });
    it('在有向图中以 generator 形式查找路径', () => {
      const pathIterator = graph.findAllPath(vertexFrom3, vertexFrom6);

      const getPathValue = () => {
        const vPath = pathIterator.next().value || [];
        return vPath.map((v: GraphVertex) => v.value);
      };
      expect(getPathValue()).toEqual(['3', '7', '4', '5', '2', '6']);
      expect(getPathValue()).toEqual(['3', '7', '4', '5', '6']);

      //   结束了
      expect(getPathValue()).toEqual([]);
    });

    it('借助 Array.from 所有路径，节点 3 到 节点 6 共 2 条路径', () => {
      const pathIterator = graph.findAllPath(vertexFrom3, vertexFrom6);
      const allPaths = Array.from(pathIterator);
      expect(allPaths.length).toBe(2);
    });

    it('如果开始节点和结束节点相同，则只返回一条单点路径', () => {
      const pathIterator = graph.findAllPath(vertexFrom3, vertexFrom3);
      const allPaths = Array.from(pathIterator);
      expect(allPaths.length).toBe(1);
      expect(allPaths[0]).toEqual([vertexFrom3]);
    });

    it('反之节点 6 到 节点 3 共 0 条路径', () => {
      const pathIterator = graph.findAllPath(vertexFrom6, vertexFrom3);
      const allPaths = Array.from(pathIterator);
      expect(allPaths.length).toBe(0);
    });
  });
});
