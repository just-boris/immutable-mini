const Benchmark = require('benchmark');
const Immutable = require('immutable');
const ImmutableMini = require('../');

const suites = [];

function prepareArray () {
    this.array = new Array(1024);
    for (var ii = 0; ii < 1024; ii++) {
        this.array[ii] = ii;
    }
}

suites.push(new Benchmark.Suite('initialize')
    .add('immutable', {
        setup: prepareArray,
        fn () {
            return new Immutable.List(this.array);
        }
    })
    .add('mini', {
        setup: prepareArray,
        fn () {
            return new ImmutableMini.Array(this.array);
        }
    })
);

suites.push(new Benchmark.Suite('access')
    .add('immutable', {
        setup: prepareArray,
        fn () {
            var list = new Immutable.List(this.array);
            for (var ii = 0; ii < 1024; ii++) {
                list.get(ii);
            }
        }
    })
    .add('mini', {
        setup: prepareArray,
        fn () {
            var list = new ImmutableMini.Array(this.array);
            for (var ii = 0; ii < 1024; ii++) {
                list.get(ii);
            }
        }
    })
);

suites.push(new Benchmark.Suite('batch push')
    .add('immutable: 32 times', () => {
        var list = Immutable.List().asMutable();
        for (var ii = 0; ii < 32; ii++) {
            list = list.push(ii);
        }
        list = list.asImmutable();
    })
    .add('immutable: 1024 times', () => {
        var list = Immutable.List().asMutable();
        for (var ii = 0; ii < 1024; ii++) {
            list = list.push(ii);
        }
        list = list.asImmutable();
    })
    .add('mini: 32 times', () => {
        var list = new ImmutableMini.Array([]).toJS();
        for (var ii = 0; ii < 32; ii++) {
            list.push(ii);
        }
        list = new ImmutableMini.Array(list);
    })
    .add('mini: 1024 times', () => {
        var list = new ImmutableMini.Array([]).toJS();
        for (var ii = 0; ii < 1024; ii++) {
            list.push(ii);
        }
        list = new ImmutableMini.Array(list);
    })
);

suites.push(new Benchmark.Suite('delete')
    .add('immutable', {
        setup: prepareArray,
        fn () {
            var list = new Immutable.List(this.array);
            while (list.size > 0) {
                list = list.delete(Math.floor(list.size / 2));
            }
        }
    })
    .add('mini', {
        setup: prepareArray,
        fn () {
            var list = new ImmutableMini.Array(this.array);
            while (list.size > 0) {
                list = list.delete(Math.floor(list.size / 2));
            }
        }
    })
);

suites.push(new Benchmark.Suite('update')
    .add('immutable', {
        setup: prepareArray,
        fn () {
            var list = new Immutable.List(this.array);
            for (var ii = 0; ii < 1024; ii++) {
                list = list.update(ii, val => val * 2);
            }
        }
    })
    .add('mini', {
        setup: prepareArray,
        fn () {
            var list = new ImmutableMini.Array(this.array);
            for (var ii = 0; ii < 1024; ii++) {
                list = list.update(ii, val => val * 2);
            }
        }
    })
);

suites.reduce(
    (p, suite) => {
        return p.then(() => new Promise(resolve => {
            console.log('Suite:', suite.name);
            suite
                .on('cycle', e => console.log(e.target.toString()))
                .on('error', e => console.error(e.target.error))
                .on('complete', () => {
                    console.log('   ');
                    resolve();
                })
                .run();
        }));
    },
    Promise.resolve()
);
