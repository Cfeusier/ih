jest.autoMockOff();
const IM = require('immutable');
const BSTree = require('../../../src/binary_trees/BSTree');
const BSTNode = require('../../../src/binary_trees/BSTNode');


describe('BSTree', () => {

  describe('Instantiation', () => {
    let bst = new BSTree(),
        _node = new BSTNode(0, 'first node value', null, null, 1),
        bstWithNode = new BSTree(null, _node);

    it('instantiates empty, checks size', () => {
      expect(bst.size).toBe(0);
    });

    it('instantiates with a root node, checks size', () => {
      expect(bstWithNode.size).toBe(1);
    });

    it('instantiates with a default comparator', () => {
      expect(bst.comparator).toBeDefined();
      expect(typeof bst.comparator).toBe('function');
    });

    it('instantiates with a custom comparator', () => {
      let comp = () => 0, compBST = new BSTree(comp);
      expect(compBST.comparator).toBe(comp);
      expect(typeof compBST.comparator).toBe('function');
    });

  });

  describe('Instance Methods', () => {

    describe('#insert', () => {

      describe('empty trees', () => {
        let bst = new BSTree();

        it('returns current tree when no args', () => {
          expect(bst.insert()).toBe(bst);
        });

        it('returns new tree for simple insert into empty tree', () => {
          expect(bst.insert(2, 'val')).toEqual(jasmine.any(BSTree));
        });

        it('returns a tree with the correct root node', () => {
          let _node = bst.insert(2, 'val').root;
          expect(_node.key).toBe(2);
          expect(_node.value).toBe('val');
        });

      })

      describe('nonempty trees', () => {
        let rootNode = new BSTNode(1, 'hi', null, null, 1),
            bst = new BSTree(null, rootNode);

        it('returns a new tree', () => {
          expect(bst.insert(2, 'a')).toEqual(jasmine.any(BSTree));
        });

        describe('root node', () => {
          let newTree1 = bst.insert(8, 'string');

          it('has correct id', () => {
            expect(newTree1.root.id).toBe(1);
          });

          it('has correct key', () => {
            expect(newTree1.root.key).toBe(1);
          });

          it('has correct value', () => {
            expect(newTree1.root.value).toBe('hi');
          });

          it('has correct right child', () => {
            expect(newTree1.root.right).toEqual(new BSTNode(8, 'string', null, null, 2));
          });

          it('has correct left child', () => {
            expect(newTree1.root.left).toBeNull();
          });

        });

      });

      describe('chained insertion', () => {
        let rootNode = new BSTNode(50, 'hi', null, null, 1),
            bst = new BSTree(undefined, rootNode),
            chainedResult = bst.insert(25, 'a').insert(75, 'b').insert(95, 'c');

        describe('resulting tree', () => {

          it('returns a new tree', () => {
            expect(chainedResult).toEqual(jasmine.any(BSTree));
          });

          it('has correct max node', () => {
            expect(chainedResult.max.key).toBe(95);
          });

          it('has correct min node', () => {
            expect(chainedResult.min.key).toBe(25);
          });

        });

        describe('root node of chained tree', () => {

          it('has the correct id', () => {
            expect(chainedResult.root.id).toBe(1);
          });

          it('has the correct key', () => {
            expect(chainedResult.root.key).toBe(50);
          });

          it('has the correct value', () => {
            expect(chainedResult.root.value).toBe('hi');
          });

          it('has the correct left and right nodes', () => {
            expect(chainedResult.root.left.key).toBe(25);
            expect(chainedResult.root.right.key).toBe(75);
          });

        });

      });

      describe('insertion operation immutability', () => {

        it('does not mutate tree', () => {
          let bst = new BSTree();
          bst.insert(1, 'a');
          expect(bst.size).toBe(0);
        });

        it('does not mutate nodes', () => {
          let node = new BSTNode(1, 'a', null, null, 1),
              bst = new BSTree(node);
          bst.insert(2, 'b');
          expect(node.right).toBeNull();
        });

      });

    });

    xdescribe('#remove', () => {

    });

    describe('#find', () => {

      describe('key not present in tree', () => {

        it('returns null for empty tree', () => {
          expect((new BSTree()).find(1)).toBeNull();
        });

        it('returns null for nonempty tree', () => {
          let bst = new BSTree(null, new BSTNode(1, 'a', null, null, 1));
          expect(bst.find(20)).toBeNull();
        });

      });

      describe('key present in tree', () => {

        it('returns associated node, shallow tree', () => {
          let node = new BSTNode(1, 'a', null, null, 1),
              bst = new BSTree(null, node);
          expect(bst.find(1)).toEqual(node);
        });

        it('returns associated node, deep tree', () => {
          let maxNode = new BSTNode(100, 'max', null, null, 4),
              rootRight = new BSTNode(75, 'b', null, maxNode, 2),
              rootLeft = new BSTNode(25, 'c', null, null, 3),
              rootNode = new BSTNode(50, 'a', rootLeft, rootRight, 1),
              bst = new BSTree(null, rootNode);
          expect(bst.find(100)).toEqual(maxNode);
        });

      });

    });

    describe('#get', () => {

      describe('key not present in tree', () => {

        it('returns null for empty tree', () => {
          expect((new BSTree()).get(1)).toBeNull();
        });

        it('returns null for nonempty tree', () => {
          let bst = new BSTree(null, new BSTNode(1, 'a', null, null, 1));
          expect(bst.get(20)).toBeNull();
        });

      });

      describe('key present in tree', () => {

        it('returns associated node value, shallow tree', () => {
          let node = new BSTNode(1, 'a', null, null, 1),
              bst = new BSTree(null, node);
          expect(bst.get(1)).toBe('a');
        });

        it('returns associated node value, deep tree', () => {
          let maxNode = new BSTNode(100, 'max', null, null, 4),
              rootRight = new BSTNode(75, 'b', null, maxNode, 2),
              rootLeft = new BSTNode(25, 'c', null, null, 3),
              rootNode = new BSTNode(50, 'a', rootLeft, rootRight, 1),
              bst = new BSTree(null, rootNode);
          expect(bst.get(100)).toBe('max');
        });

      });

    });

    describe('#contains', () => {

      describe('value not present in tree', () => {

        it('returns false for empty tree', () => {
          expect((new BSTree()).contains(1)).toBe(false);
        });

        it('returns false for nonempty tree', () => {
          let bst = new BSTree(null, new BSTNode(1, 'a', null, null, 1));
          expect(bst.contains('b')).toBe(false);
        });

      });

      describe('value present in tree', () => {

        it('returns true, shallow tree', () => {
          let node = new BSTNode(1, 'a', null, null, 1),
              bst = new BSTree(null, node);
          expect(bst.contains('a')).toBe(true);
        });

        it('returns true, deep tree', () => {
          let maxNode = new BSTNode(100, 'max', null, null, 4),
              rootRight = new BSTNode(75, 'b', null, maxNode, 2),
              rootLeft = new BSTNode(25, 'c', null, null, 3),
              rootNode = new BSTNode(50, 'a', rootLeft, rootRight, 1),
              bst = new BSTree(null, rootNode);
          expect(bst.contains('max')).toBe(true);
        });

      });

    });

    describe('#forEach', () => {

      it('does not execute callback for empty tree', () => {
        let bstEmpty = new BSTree(),
            result = [];
        bstEmpty.forEach(node => result.push(node.key));
        expect(result.length).toBe(0);
      });

      it('executes callback on each node in order for nonempty tree', () => {
        let maxNode = new BSTNode(100, 'max', null, null, 4),
            rootRight = new BSTNode(75, 'b', null, maxNode, 2),
            rootLeft = new BSTNode(25, 'c', null, null, 3),
            rootNode = new BSTNode(50, 'a', rootLeft, rootRight, 1),
            bst = new BSTree(null, rootNode),
            result = [];
        bst.forEach(node => result.push(node.key));
        expect(result.length).toBe(4);
        expect(result).toEqual([25, 50, 75, 100]);
      });

    });

    xdescribe('#insertAll', () => {

    });

    xdescribe('#balanceTree', () => {

    });

  });

  describe('Basic Getters', () => {

    xdescribe('get size', () => {

      it('returns current number of nodes in tree', () => {
        let bst1 = new BSTree(),
            bst2 = bst1.insert(5, 'first value'),
            bst3 = bst2.insert(0, 'second value'),
            bst4 = bst3.insert(10, 'third value');
        expect(bst1.size).toBe(0);
        expect(bst2.size).toBe(1);
        expect(bst3.size).toBe(2);
        expect(bst4.size).toBe(3);
      });

    });

    describe('get comparator', () => {

      it('returns default comparator, duck-check', () => {
        let bstDefault = (new BSTree()).comparator;
        expect(bstDefault(2, 1)).toBe(1);
        expect(bstDefault(1, 2)).toBe(-1);
        expect(bstDefault(1, 1)).toBe(0);
      });

      it('returns custom comparator, duck-check', () => {
        let bstCustom = (new BSTree(() => 0)).comparator;
        expect(bstCustom(2, 1)).toBe(0);
        expect(bstCustom(1, 2)).toBe(0);
        expect(bstCustom('a', 'hi')).toBe(0);
      });

    });

    describe('get root', () => {

      it('returns null for empty tree', () => {
        expect((new BSTree()).root).toBeNull();
      });

      it('returns root node for nonempty tree', () => {
        let rootNode = new BSTNode(1, 'a', null, null, 1);
        expect((new BSTree(null, rootNode)).root).toEqual(rootNode);
      });

    });

    describe('get min', () => {

      it('returns null for empty tree', () => {
        expect((new BSTree()).min).toBeNull();
      });

      it('returns node with min key for nonempty tree', () => {
        let minNode = new BSTNode(0, 'min', null, null, 4),
            rootRight = new BSTNode(75, 'b', null, null, 2),
            rootLeft = new BSTNode(25, 'c', minNode, null, 3),
            rootNode = new BSTNode(50, 'a', rootLeft, rootRight, 1),
            bst = new BSTree(null, rootNode);
        expect(bst.min).toEqual(minNode);
      });

    });

    describe('get max', () => {

      it('returns null for empty tree', () => {
        expect((new BSTree()).max).toBeNull();
      });

      it('returns node with max key for nonempty tree', () => {
        let maxNode = new BSTNode(100, 'max', null, null, 4),
            rootRight = new BSTNode(75, 'b', null, maxNode, 2),
            rootLeft = new BSTNode(25, 'c', null, null, 3),
            rootNode = new BSTNode(50, 'a', rootLeft, rootRight, 1),
            bst = new BSTree(null, rootNode);
        expect(bst.max).toEqual(maxNode);
      });

    });

    describe('get keys', () => {

      it('returns empty array for empty tree', () => {
        expect((new BSTree()).keys).toEqual([]);
      });

      it('returns in-order array of all node keys for nonempty tree', () => {
        let maxNode = new BSTNode(100, 'max', null, null, 4),
            rootRight = new BSTNode(75, 'b', null, maxNode, 2),
            rootLeft = new BSTNode(25, 'c', null, null, 3),
            rootNode = new BSTNode(50, 'a', rootLeft, rootRight, 1),
            bst = new BSTree(null, rootNode);
        expect(bst.keys).toEqual([25, 50, 75, 100]);
      });

    });

    describe('get values', () => {

      it('returns empty array for empty tree', () => {
        expect((new BSTree()).values).toEqual([]);
      });

      it('returns in-order array of all node values for nonempty tree', () => {
        let maxNode = new BSTNode(100, 'max', null, null, 4),
            rootRight = new BSTNode(75, 'b', null, maxNode, 2),
            rootLeft = new BSTNode(25, 'c', null, null, 3),
            rootNode = new BSTNode(50, 'a', rootLeft, rootRight, 1),
            bst = new BSTree(null, rootNode);
        expect(bst.values).toEqual(['c', 'a', 'b', 'max']);
      });

    });

  });

});