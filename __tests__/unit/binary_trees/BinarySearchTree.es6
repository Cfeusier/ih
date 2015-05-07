jest.autoMockOff();
const IM = require('immutable');
const BinarySearchTree = require('../../../src/binary_trees/BinarySearchTree');

describe('BinarySearchTree Operations', () => {

  describe('Instantiation', () => {
    let newBST = new BinarySearchTree(1);
    let clarkObj  = { name: "Clark", age: 27, };
    let objectBST = new BinarySearchTree(clarkObj, (a, b) => a.age > b.age);

    it('throws an error when initialized with no data', () => {
      let errorMessage;
      try {
        new BinarySearchTree();
      } catch (e) {
        errorMessage = e.message;
      }
      expect(errorMessage).toBe('Cannot create an empty BST');
    });

    it('stores data, checks size and data', () => {
      expect(newBST.size).toBe(1);
      expect(objectBST.size).toBe(1);
      expect(newBST._root.get('data')).toBe(1);
      expect(objectBST._root.get('data')).toBe(clarkObj);
    });

    // it("instantiates with a comparator", () => {
    //   let compare = () => 0;
    //   let compareHeap = new BinarySearchTree(undefined, undefined, compare);
    //   expect(compareHeap.comparator).toEqual(compare);
    // });
  });

  describe('Internal Methods', () => {

  });

  describe('Basic Instance Methods', () => {

  });

  describe('Basic Getters', () => {

    it('gets size', () => {

    });

    it('gets min', () => {

    });

    it('gets max', () => {

    });

  });

  describe('Static Methods', () => {

  });

});
