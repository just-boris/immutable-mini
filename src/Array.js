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
        const source = this.toJS();
        var dest;
        if (source.length < index) {
            dest = source.slice();
            dest[index] = value;
        } else {
            dest = source.slice(0, index).concat([value], source.slice(index + 1));
        }
        return new ImmutableArray(dest);
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
