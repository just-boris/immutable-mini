# immutable-mini

> Immutable wrapper for basic Javascript objects

## Why another immutable library?

If you need something, like [Immutable.js], but simpler.

* `fromJS` and `toJS` with O(1) complexity
* Original mutable data is hidden in Symbol, no need to use freeze it with performance penalty
* Uses native Javascript data structures internaly as much as possible
* API is very similar to original from [Immutable.js]

## Examples:

```js
import {fromJS} from 'immutable-mini';

const data = {
  id: 4,
  message: 'test message',
  children: [
    {name: 'children one'},
    {name: 'children two'}
  ]
};

const iData = fromJS(data);

const iDataNext = immutableData.setIn(['children', 0, 'name'], 'new name');

assert.notEqual(iData, iDataNext, 'returns new instance');
assert.equal(iData.getIn(['children', 0, 'name']), 'children one', 'previous instance kept untouched'); 
assert.equal(iDataNext.getIn(['children', 0, 'name']), 'new name', 'new instance has new value');
```

[Immutable.js]: https://facebook.github.io/immutable-js/
