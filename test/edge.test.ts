import { GraphEdge, GraphVertex } from '../src';

describe('GraphEdge - 边', () => {
  it('以默认权重（权重为 0）创建边', () => {
    const startVertex = new GraphVertex('A');
    const endVertex = new GraphVertex('B');
    const edge = new GraphEdge(startVertex, endVertex);

    expect(edge.getKey()).toBe('A_B');
    expect(edge.toString()).toBe('A_B');
    expect(edge.startVertex).toEqual(startVertex);
    expect(edge.endVertex).toEqual(endVertex);
    expect(edge.weight).toEqual(0);
  });

  it('可以自定边的权重', () => {
    const startVertex = new GraphVertex('A');
    const endVertex = new GraphVertex('B');
    const edge = new GraphEdge(startVertex, endVertex, 10);

    expect(edge.startVertex).toEqual(startVertex);
    expect(edge.endVertex).toEqual(endVertex);
    expect(edge.weight).toEqual(10);
  });

  it('clone 当前边', () => {
    const startVertex = new GraphVertex('A');
    const endVertex = new GraphVertex('B');
    const edge = new GraphEdge(startVertex, endVertex, 10);

    const clonedEdge = edge.clone();

    expect(edge.startVertex).toBe(clonedEdge.startVertex);
    expect(edge.endVertex).toBe(clonedEdge.endVertex);
    expect(edge.weight).toBe(10);
    expect(clonedEdge.weight).toBe(10);

    expect(edge).not.toBe(clonedEdge);
  });

  it('支持边的方向反转', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const edge = new GraphEdge(vertexA, vertexB, 10);

    expect(edge.startVertex).toEqual(vertexA);
    expect(edge.endVertex).toEqual(vertexB);
    expect(edge.weight).toEqual(10);

    edge.reverse();

    expect(edge.startVertex).toEqual(vertexB);
    expect(edge.endVertex).toEqual(vertexA);
    expect(edge.weight).toEqual(10);
  });
});
