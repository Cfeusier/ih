import 'core-js/shim';
var IM = require('immutable');


export default class BinarySearchTree {

  constructor(data, comparator) {
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

  find() {

  }

  contains() {

  }

  remove() {

  }

  traverseDF() {

  }

  traverseBF() {

  }

  _insertSide(data, side) {
    if (this._root.get(side) === null)  {
      return new BinarySearchTree(this._root.set(side, new BinarySearchTree(data)));
    } else {
      return new BinarySearchTree(this._root.set(side, this._root.get(side).insert(data)));
    }
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

}
