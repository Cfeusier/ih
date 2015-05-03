import 'core-js/shim';
var IM = require('immutable');


export default class BinarySearchTree {

  constructor(data, comparator) {
    if (data === undefined) throw new Error('Cannot create an empty BST');
    if (IM.Map.isMap(data)) {
      this._root = BinarySearchTree.cloneRoot(data, comparator);
    } else {
      this._root = BinarySearchTree.generateRoot(data, comparator);
    }
  }

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

  find(target) {
    let comparisons = this._getComparisons(target);
    if (comparisons.baseCase) return this._root.get('data');
    else if (comparisons.recurseLTest) return this._root.get('left').find(target);
    else if (comparisons.recurseRTest) return this._root.get('right').find(target);
    return null;
  }

  contains(target) {
    let comparisons = this._getComparisons(target);
    if (comparisons.baseCase) return true;
    else if (comparisons.recurseLTest) return this._root.get('left').contains(target);
    else if (comparisons.recurseRTest) return this._root.get('right').contains(target);
    return false;
  }

  remove(target) {
    return this._deleteRoot(target, this /*originalBST*/, this /*currentBST*/, [] /*ancestorStack*/);
  }

  traverseDF(cb) {
    let left = this._root.get('left'), right = this._root.get('right');
    cb(this._root.get('data'));
    if (left) left.traverseDF(cb);
    if (right) right.traverseDF(cb);
  }

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

  get min() {
    return this._traverseSide('left');
  }

  get max() {
    return this._traverseSide('right');
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

  _traverseSide(side) {
    let current_root = this._root;
    while (current_root.get(side)) current_root = current_root.get(side)._root;
    return current_root;
  }

  _deleteRoot(target, originalBST, currentBST, ancestorStack) {
    // NOT FOUND base-case
    if (!currentBST || currentBST === null)
      return BinarySearchTree.cloneRoot(originalBST._root, originalBST._root.get('comparator'));

    let comparisons = currentBST._getComparisons.call(currentBST, target);

    // MATCH base-case
    if (comparisons.baseCase) {
      let parentBST = ancestorStack.pop(),
          childrenTuple = [],
          left = currentBST._root.get('left'),
          right = currentBST._root.get('right');
      if (left && left !== null) childrenTuple.push(left);
      if (right && right !== null) childrenTuple.push(right);
      let hasChildren = !!childrenTuple.length,
          oneChild = childrenTuple.length === 1,
          twoChildren = childrenTuple.length === 2;

      if (!hasChildren) {
        // NO CHILDREN, can remove safely
      } else {
        if (oneChild) {
          // one child, must reattach child after removal of current
        } else if (twoChildren) {
          // two children, must reattach children after removal of current
        }
      }

    // recurse left
    } else if (comparisons.recurseLTest) {
      ancestorStack.push(currentBST);
      return originalBST._deleteRoot(target, originalBST, currentBST._root.get('left'), ancestorStack);
    // recurse right
    } else if (comparisons.recurseRTest) {
      ancestorStack.push(currentBST);
      return originalBST._deleteRoot(target, originalBST, currentBST._root.get('right'), ancestorStack);
    }
  }

}
