import BasicImmutable from './BasicImmutable';
import toJS from './toJS';

export default class ImmutableObject extends BasicImmutable {
    set (key, value) {
        if (toJS(this.get(key)) === value) {
            return this;
        }
        return this.merge({[key]: value});
    }

    merge (obj) {
        return new ImmutableObject({
            ...this.toJS(),
            ...obj
        });
    }
}
