import BasicImmutable from './BasicImmutable';

export default function toJS (object) {
    return object instanceof BasicImmutable ? object.toJS() : object;
}
