export default function fromJS (data) {
    if (!data || typeof data !== 'object') {
        return data;
    } else if (Array.isArray(data)) {
        const ImmutableArray = require('./Array').default;
        return new ImmutableArray(data);
    } else {
        const ImmutableObject = require('./Object').default;
        return new ImmutableObject(data);
    }
}
