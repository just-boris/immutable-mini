import BasicImmutable from './BasicImmutable';
import toJS from './toJS';

export default class ImmutableArray extends BasicImmutable {

    get size () {
        return this.toJS().length;
    }

    set (index, value) {
        if (toJS(this.get(index)) === value) {
            return this;
        }
        var copy;
        if (this.toJS().length < index) {
            copy = this.toJS().slice();
            copy[index] = value;
        } else {
            copy = this.toJS().slice(0, index).concat([value], this.toJS().slice(index + 1));
        }
        return new ImmutableArray(copy);
    }

    delete (index) {
        return new ImmutableArray([
            ...this.toJS().slice(0, index),
            ...this.toJS().slice(index + 1)
        ]);
    }

    insert (index, value) {
        return new ImmutableArray([
            ...this.toJS().slice(0, index),
            value,
            ...this.toJS().slice(index)
        ]);
    }

    clear () {
        return new ImmutableArray([]);
    }

    push (...values) {
        return new ImmutableArray(this.toJS().concat(values));
    }

    unshift (...values) {
        return new ImmutableArray(values.concat(this.toJS()));
    }
}
