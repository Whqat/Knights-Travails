function possibleMoves(coordinate) {
    let x = coordinate[0];
    let y = coordinate[1];
    let possibleMoves = [];

    possibleMoves.push([x + 2, y + 1]);
    possibleMoves.push([x + 2, y - 1]);
    possibleMoves.push([x + 1, y + 2]);
    possibleMoves.push([x + 1, y - 2]);

    possibleMoves.push([x - 2, y + 1]);
    possibleMoves.push([x - 2, y - 1]);
    possibleMoves.push([x - 1, y + 2]);
    possibleMoves.push([x - 1, y - 2]);

    return possibleMoves;
}

function getEdges(node) {
    let edges = [];

    possibleMoves(node).forEach((move) => {
        if ((0 <= move[0]) && (0 <= move[1]) && (7 >= move[0]) && (7 >= move[1])) {
            edges.push(new Node(value = move));
        }
    });

    return edges;
}

class Node {
    constructor(value = null, edges = null, parent = null, chain = null) {
        this.value = value;
        this.parent = parent;
        this._edges = edges;
        this._chain = chain;
    }

    get edges() {
        return getEdges(this.value);
    }

    get chain() {
        let path = [this.value];
        let parent = this.parent;
        while (parent != null) {
            path.unshift(parent.value);
            parent = parent.parent;
        }
        return path;
    }
}

class shortestPath {
    constructor(start, end) {
        this.start = new Node(start);
        this.end = end;
        this.frontier = [this.start];
        this.explored = new Set();
    }

    isExplored(node) {
        return this.explored.has(node.value);
    }

    enqueueToFrontier(node) {
        if (!this.frontier.includes(node)) {
            this.frontier.push(node);
        }
    }

    dequeueFromFrontier() {
        const dequeuedNode = this.frontier.shift();
        this.explored.add(dequeuedNode);
        return dequeuedNode;
    }

    search() {
        let node = this.dequeueFromFrontier();

        if (JSON.stringify(node.value) === JSON.stringify(this.end)) {
            return node.chain;
        }
        
        let edges = node.edges
        edges.forEach((edge) => {
            edge.parent = node;
            if (!this.isExplored(edge)) {
                this.enqueueToFrontier(edge);
            }
        });
        return this.search();
    }
}
let start = [0, 0];
let end = [5, 6];

let path = new shortestPath(start, end);

console.log(path.search());