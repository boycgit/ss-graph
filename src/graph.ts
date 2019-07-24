import { GraphEdge } from "./edge";
import { GraphVertex } from "./vertex";
import { invariant } from "./lib";
export class Graph {

    isDirected: boolean
    vertices: { [key: string]: GraphVertex}
    edges: { [key: string]: GraphEdge}
    /**
     * Creates an instance of Graph.
     * @param {boolean} [isDirected=false] - 是否是有向图
     * @memberof Graph
     */
    constructor(isDirected = false) {
        this.vertices = {};
        this.edges = {};
        this.isDirected = isDirected;
    }

    /**
     * 添加节点
     *
     * @param {GraphVertex} newVertex
     * @returns {Graph}
     * @memberof Graph
     */
    addVertex(newVertex: GraphVertex): Graph {
        this.vertices[newVertex.getKey()] = newVertex;

        return this;
    }


    /**
     * 根据 key 值返回指定节点
     *
     * @param {string} vertexKey
     * @returns {GraphVertex}
     * @memberof Graph
     */
    getVertexByKey(vertexKey: string): GraphVertex {
        return this.vertices[vertexKey];
    }

    /**
     * 返回指定节点的相邻节点
     * 
     * @param {GraphVertex} vertex
     * @returns {GraphVertex[]}
     */
    getNeighbors(vertex: GraphVertex): GraphVertex[] {
        return vertex.getNeighbors();
    }


    /**
     * 返回图中所有的节点
     *
     * @returns {GraphVertex[]}
     * @memberof Graph
     */
    getAllVertices(): GraphVertex[] {
        return Object.values(this.vertices);
    }


    /**
     * 返回图中所有的边
     *
     * @returns {GraphEdge[]}
     * @memberof Graph
     */
    getAllEdges(): GraphEdge[] {
        return Object.values(this.edges);
    }


    /**
     * 给图中添加边
     *
     * @param {GraphEdge} edge - 待添加的边
     * @param {boolean} [disableErrorWhenExist=false] - 是否关闭错误提示（当边已经存在图中的时候），默认是有错误提示
     * @returns {Graph}
     * @memberof Graph
     */
    addEdge(edge: GraphEdge, disableErrorWhenExist = false): Graph {

        // 判断边是否已经添加到图中
        if (this.edges[edge.getKey()]) {
            if (disableErrorWhenExist) {
                return this;
            } else {
                invariant(false, 'Edge has already been added before');
            }
        }

        // 首先找到开始和结束节点
        let startVertex = this.getVertexByKey(edge.startVertex.getKey());
        let endVertex = this.getVertexByKey(edge.endVertex.getKey());

        // 如果开始节点不存在图中，需要先添加
        if(!startVertex) {
            this.addVertex(edge.startVertex);
            startVertex = this.getVertexByKey(edge.startVertex.getKey()); // 注意：需要重新获取一次，不然 startVertex 不存在
        }

        // 如果结束节点不存在图中，需要先添加
        if (!endVertex) {
            this.addVertex(edge.endVertex);
            endVertex = this.getVertexByKey(edge.endVertex.getKey()); // 注意：需要重新获取一次，不然 endVertex 不存在
        }

        // 在图中添加这条边
        this.edges[edge.getKey()] = edge;

        // 根据是否是双向图
        if (this.isDirected) { // 如果是有向图，那么只用给 startVertex 添加此边
            startVertex.addEdge(edge)
        } else { // 否则就给开始、结束节点都添加该边
            startVertex.addEdge(edge);
            endVertex.addEdge(edge);
        }

        return this;
    }


    /**
     * 删除图中的某条边
     *
     * @param {GraphEdge} edge - 边的实例
     * @param {boolean} [disableErrorWhenExist=false] - 是否关闭错误提示（当图中不存在边时），默认是有错误提示
     * @returns {Graph}
     * @memberof Graph
     */
    deleteEdge(edge: GraphEdge, disableErrorWhenExist = false): Graph {
        // 判断边是否存在
        if (!this.edges[edge.getKey()]) {
            if (disableErrorWhenExist) {
                return this;
            } else {
                invariant(false, 'Edge not found in graph');
            }
        }

        // 先删除该边
        delete this.edges[edge.getKey()];

        // 同时找到该边所在开始节点和结束节点
        const startVertex = this.getVertexByKey(edge.startVertex.getKey());
        const endVertex = this.getVertexByKey(edge.endVertex.getKey());

        // 分别在节点上删除该边
        startVertex.deleteEdge(edge);
        endVertex.deleteEdge(edge);

        return this;
    }


    /**
     * 查找开始节点和结束节点之间的那条边
     *
     * @param {GraphVertex} startVertex - 开始节点
     * @param {GraphVertex} endVertex - 结束节点
     * @returns {(GraphEdge | null)}
     * @memberof Graph
     */
    findEdge(startVertex: GraphVertex, endVertex: GraphVertex): GraphEdge | null {
        
        // 首先判断开始节点是否在图中
        const vertex = this.getVertexByKey(startVertex.getKey());

        if (!vertex) {
            return null;
        }

        // 然后通过开始节点 - 结束节点对应的边的实例
        return vertex.findEdge(endVertex);
    }


    /**
     * 返回图中所有边的权重之和
     *
     * @returns {number}
     * @memberof Graph
     */
    getWeight(): number {
        return this.getAllEdges().reduce((weight, graphEdge) =>{
            return weight + graphEdge.weight;
        }, 0)
    }


    /**
     * 让图中所有的边都方向
     *
     * @returns {Graph}
     * @memberof Graph
     */
    reverse(): Graph {
        // 遍历所有的边
        this.getAllEdges().forEach((edge: GraphEdge) =>{
            // 先将边从图中删除（反向操作之前一定要删除边，不然数据会存在不一致性 -  key 没有反向，而 this.edges[key] 反向了 ）
            this.deleteEdge(edge);

            // 然后将边进行反向操作
            edge.reverse();

            // 再将边添加回图中
            this.addEdge(edge);
        });
        return this;
    }


    /**
     * 返回“节点 - 索引”映射表
     *
     * @returns {{ [key: string]: number }} - 映射表对象
     * @memberof Graph
     */
    getVerticesIndices(): { [key: string]: number }{
        const verticesIndices: {[key: string]: number} = {}
        this.getAllVertices().forEach((vertex, index)=>{
            verticesIndices[vertex.getKey()] = index;
        });

        return verticesIndices;
    }


    /**
     * 生成邻接矩阵
     * 
     * @returns {number[][]}
     * @memberof Graph
     */
    getAdjacencyMatrix(): number[][] {
        // 获取所有的节点列表
        const vertices = this.getAllVertices();
        // 获取节点索引映射表
        const verticesIndices = this.getVerticesIndices(); 

        // 初始化邻接矩阵，赋值 `Infinity` 表示两点之间不可达
        // 邻接矩阵是 N x N 大小的
        const adjacencyMatrix = Array(vertices.length).fill(null).map(() => {
            return Array(vertices.length).fill(Infinity);
        }); 

        // 给每一列赋值
        vertices.forEach((vertex, vertexIndex) => {
            vertex.getNeighbors().forEach((neighbor) => {
                const neighborIndex = verticesIndices[neighbor.getKey()];
                const edge = this.findEdge(vertex, neighbor);
                if(!!edge) {
                    adjacencyMatrix[vertexIndex][neighborIndex] = edge.weight;
                }
                
            });
        });

        return adjacencyMatrix;
    }
    

    /**
     * 重写 toString 方法，仅仅是打印出所有节点的列表
     * @return {string}
     */
    toString() {
        return Object.keys(this.vertices).toString();
    }

}