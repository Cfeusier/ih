import 'core-js/shim';
const IM = require('immutable');


// @TODO: pass comparator along anytime a new BST is generated
// @TODO: #remove instance method

export default class BinarySearchTree {

  /**
   * BinarySearchTree constructor
   * @param {Function}  comparator, Must return {0, 1, -1} to sort subtrees
   * @constructor
   */
  constructor(data, comparator = BinarySearchTree.defaultComparator) {
    if (data === undefined) throw new Error('Cannot create an empty BST');
    if (IM.Map.isMap(data)) {
      this._root = BinarySearchTree.cloneRoot(data, comparator);
    } else {
      this._root = BinarySearchTree.generateRoot(data, comparator);
    }
    Object.freeze(this);
  }

  /**
   * O(log n) insertion - average time complexity
   * @param   {*}  data
   * @returns {BinarySearchTree}  A new BST is returned with the data inserted
   */
  insert(data) {
    switch(this._root.get('comparator')(this._root.get('data'), data)) {
      case 1:
        return this._insertSide(data, 'left');
        break;
      case -1:
        return this._insertSide(data, 'right');
        break;
      case 0:
        return new BinarySearchTree(this._root);
        break;
      default:
        throw new Error('Cannot use data given to insert method with the comparator for this BST');
        break;
    }
  }

  /**
   * O(log n) search - average time complexity
   * @param   {*}  target
   * @returns {BinarySearchTree|null}  The found subtree is returned; null if not found
   */
  find(target) {
    let comparisons = this._getComparisons(target);
    if (comparisons.baseCase) return this;
    else if (comparisons.recurseLTest) return this._root.get('left').find(target);
    else if (comparisons.recurseRTest) return this._root.get('right').find(target);
    return null;
  }

  /**
   * O(log n) search variation - average time complexity
   * @param   {*}  target
   * @returns {Boolean}  If the target is found, returns true; false if not found
   */
  contains(target) {
    let comparisons = this._getComparisons(target);
    if (comparisons.baseCase) return true;
    else if (comparisons.recurseLTest) return this._root.get('left').contains(target);
    else if (comparisons.recurseRTest) return this._root.get('right').contains(target);
    return false;
  }


  /**
   * O(n) in-order traversal - asymptotically optimal
   * @param   {BinarySearchTree} subtree, the root from which to start the traversal
   * @param   {Function}  cb, each BST data field will be passed to cb, in-sorted order
   */
  traverseInOrder(subtree, cb) {
    if (!subtree) return;
    let _root = subtree._root, left = _root.get('left'), right = _root.get('right');
    if (left) left.traverseInOrder(left, cb);
    cb(_root.get('data'));
    if (right) right.traverseInOrder(right, cb);
  }

  /**
   * O(n) depth-first traversal - average time complexity
   * @param   {Function}  cb, each BST data field will be passed to cb, depth-first
   */
  traverseDF(cb) {
    let left = this._root.get('left'), right = this._root.get('right');
    cb(this._root.get('data'));
    if (left) left.traverseDF(cb);
    if (right) right.traverseDF(cb);
  }

  /**
   * O(n) breadth-first traversal - average time complexity
   * @param   {Function}  cb, each BST data field will be passed to cb, breadth-first
   */
  traverseBF(cb) {
    let q = [], current = this;
    while (current && current !== null) {
      let _root = current._root, left = _root.get('left'), right = _root.get('right');
      cb(_root.get('data'));
      if (left !== null) q.push(left);
      if (right !== null) q.push(right);
      current = q.shift();
    }
  }

  /**
   * O(log n) BST minimum getter - average time complexity
   * @returns {BinarySearchTree}, the minimum subtree in the current tree
   */
  get min() {
    return this._traverseSide('left');
  }

  /**
   * O(log n) BST maximum getter - average time complexity
   * @returns {BinarySearchTree}, the maximum subtree in the current tree
   */
  get max() {
    return this._traverseSide('right');
  }

  get size() {
    let count = 0, countSubTrees = () => count++;
    this.traverseInOrder(this, countSubTrees);
    return count;
  }

  static defaultComparator(left, right) {
    if (left > right) return 1;
    else if (left < right) return -1;
    else if (left === right) return 0;
    else return new Error('Bad inputs for comparison');
  }

  static generateRoot(data, comparator) {
    return IM.Map({
      left: null,
      right: null,
      data: data,
      comparator: comparator || BinarySearchTree.defaultComparator
    });
  }

  static cloneRoot(_root, comparator) {
    return _root.set('comparator', comparator || BinarySearchTree.defaultComparator);
  }

  static findInOrderPredecessor(baseBST, leftChild) {
    currentRoot = leftChild._root;
    let rightPointers = 0;
    while (currentRoot.get('right')) {
      rightPointers++;
      currentRoot = currentRoot.get('right')._root;
    }
    return [rightPointers, currentRoot];
  }

  _insertSide(data, side) {
    if (this._root.get(side) === null)  {
      return new BinarySearchTree(this._root.set(side, new BinarySearchTree(data)));
    } else {
      return new BinarySearchTree(this._root.set(side, this._root.get(side).insert(data)));
    }
  }

  _getComparisons(target) {
    let comparison = this._root.get('comparator')(this._root.get('data'), target);
    return {
      baseCase: comparison === 0,
      recurseLTest: comparison === 1 && !!this._root.get('left'),
      recurseRTest: comparison === -1 && !!this._root.get('right')
    };
  }

  _traverseSide(side, currentRoot) {
    currentRoot = currentRoot || this._root;
    while (currentRoot.get(side)) currentRoot = currentRoot.get(side)._root;
    return currentRoot;
  }

}
