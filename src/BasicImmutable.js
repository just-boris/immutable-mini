import fromJS from './fromJS';

const data = Symbol('mutable-data');

export default class BasicImmutable {
    constructor (values) {
        this[data] = values;
    }

    get (index) {
        return fromJS(this.toJS()[index]);
    }

    getIn (path) {
        if (!path.length) {
            throw new TypeError('Path argument should be an array with at least one item');
        }
        if (path.length === 1) {
            return this.get(path[0]);
        }
        const [key, ...rest] = path;
        return this.get(key).getIn(rest);
    }

    set () {
        throw new Error('must be implemented');
    }

    setIn (path, value) {
        if (!path.length) {
            throw new TypeError('Path argument should be an array with at least one item');
        }
        if (path.length === 1) {
            return this.set(path[0], value);
        }
        const [key, ...rest] = path;
        return this.set(key, this.get(key).setIn(rest, value).toJS());
    }

    update (key, updater) {
        if (!updater) {
            return key(this);
        } else {
            const newValue = updater(this.get(key));
            return this.set(key, newValue instanceof BasicImmutable ? newValue.toJS() : newValue);
        }
    }

    updateIn (path, updater) {
        if (!path.length) {
            throw new TypeError('Path argument should be an array with at least one item');
        }
        if (path.length === 1) {
            return this.update(path[0], updater);
        }
        const [key, ...rest] = path;
        return this.set(key, this.get(key).updateIn(rest, updater).toJS());
    }

    toJS () {
        return this[data];
    }
}
