class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (!current.left) {
          current.left = new Node(val);
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = new Node(val);
          return this;
        }
        current = current.right;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }
    function insert(node) {
      if (node === null) {
        return new Node(val);
      }
      if (val < node.val) {
        node.left = insert(node.left);
      } else {
        node.right = insert(node.right);
      }
      return node;
    }

    insert(this.root);
    return this
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let cur = this.root
    while (cur && cur.val !== val) {
      if (val > cur.val) {
        cur = cur.right
      } else {
        cur = cur.left
      }
    }
    if (cur && cur.val === val) {
      return cur
    }
    return undefined
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    function find(node) {
      if (!node) return undefined
      if (val > node.val) {
        return find(node.right)
      } else if (val < node.val) {
        return find(node.left)
      } else {
        return node
      }
    }
    return find(this.root)
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    function visit(node) {
      if (!node) return []
      return [
        node.val,
        ...visit(node.left),
        ...visit(node.right)
      ]
    }
    return visit(this.root)
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    function visit(node) {
      if (!node) return []
      return [
        ...visit(node.left),
        node.val,
        ...visit(node.right)
      ]
    }
    return visit(this.root)
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    function visit(node) {
      if (!node) return []
      return [
        ...visit(node.left),
        ...visit(node.right),
        node.val
      ]
    }
    return visit(this.root)
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const queue = [this.root]
    const result = []
    while (queue.length) {
      const node = queue.shift()
      result.push(node.val)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    return result
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    const findMin = (node, parent) => {
      if (!node.left) return [node, parent] 
      return findMin(node.left, node)
    }
    const swap = (a, b) => {
      const temp = a.val 
      a.val = b.val
      b.val = temp
    }
    function removeNode(node, parent) {
      if (!node.left && !node.right) {
        if (parent.left === node) parent.left = null;
        if (parent.right === node) parent.right = null;
        return node
      }
      if (node.left && node.right) {
        let result = findMin(node.right, node)
        let minNode = result[0], minParent = result[1];
        swap(node, minNode)

        return removeNode(minNode, minParent)
      }
      if (node.left) {
        if (parent.left === node) parent.left = node.left;
        if (parent.right === node) parent.right = node.left;
        node.left = null;
        return node
      }

      if (parent.left === node) parent.left = node.right;
      if (parent.right === node) parent.right = node.right;
      node.right = null;
      return node
    }
    

    let cur = this.root
    let parent = null
    while (cur && cur.val !== val) {
      parent = cur
      if (val > cur.val) {
        cur = cur.right
      } else {
        cur = cur.left
      }
    }
    if (!cur || cur.val !== val) {
      return null
    }
    if (!parent) {
      const fakeParent = new Node(null, cur)
      removeNode(cur, fakeParent)
      this.root = fakeParent.left
      return cur
    }
    removeNode(cur, parent)
    return cur
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    function level(node, high) {
      if (node === null) return high
      return Math.max(level(node.left, high + 1), level(node.right, high + 1))
    }
    if (!this.root) return true 
    return Math.abs(level(this.root.left, 0) - level(this.root.right, 0)) <= 1
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    if (!this.root) return undefined
    function secondHighest(node) {
      if (node === null) return undefined
      if (node.right) {
        const h = secondHighest(node.right)
        if (h === undefined) return node.val
        return h
      }
      if (node.left) {
        return highest(node.left)
      }
      return undefined
    }
    function highest(node) {
      if (node === null) return undefined
      if (node.right) {
        return highest(node.right)
      }
      return node.val
    }
    return secondHighest(this.root)
  }
}

module.exports = BinarySearchTree;
