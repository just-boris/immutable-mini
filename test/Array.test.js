import ImmutableArray from '../src/Array';
import expect from 'expect';
import freeze from 'deep-freeze';

describe('ImmutableArray', () => {
    it('read values', () => {
        const array = new ImmutableArray(freeze([1, 2, 3]));
        expect(array.get(1)).toEqual(2);
        expect(array.get('1')).toEqual(2);
        expect(array.get(3)).toNotExist();
        expect(array.toJS()).toEqual([1, 2, 3]);
    });

    it('set values', () => {
        const array = new ImmutableArray(freeze([1, 2, 3]));
        expect(array.set(1, 'new value').toJS()).toEqual([1, 'new value', 3]);
        expect(array.toJS()).toEqual([1, 2, 3]);
    });

    it('set value out of current maximum index', () => {
        const array = new ImmutableArray(freeze([1, 2, 3]));
        /* eslint-disable no-sparse-arrays */
        expect(array.set(4, 'extra value').toJS()).toEqual([1, 2, 3, /* hole */, 'extra value']);
        /* eslint-enable no-sparse-arrays */
        expect(array.toJS()).toEqual([1, 2, 3]);
    });

    it('deep get and set', () => {
        const array = new ImmutableArray(freeze([
            {id: 1, data: {message: 'number one'}},
            {id: 2, data: {message: 'number two'}},
            {id: 3, data: {message: 'number three'}}
        ]));

        expect(array.setIn([0, 'data', 'message'], 'modified message').toJS()).toEqual([
            {id: 1, data: {message: 'modified message'}},
            {id: 2, data: {message: 'number two'}},
            {id: 3, data: {message: 'number three'}}
        ]);
        expect(array.getIn([0, 'data', 'message'])).toEqual('number one');
    });

    it('returns the same instance when setting the same value', () => {
        const array = new ImmutableArray(freeze([
            {id: 1, title: 'item one'},
            {id: 2, title: 'item two'},
            {id: 3, title: 'item three'}
        ]));
        expect(array.setIn([1, 'title'], 'item two')).toBe(array);
    });
});
