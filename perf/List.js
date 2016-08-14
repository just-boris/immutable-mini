const Benchmark = require('benchmark');
const Immutable = require('immutable');
const ImmutableMini = require('../');

const suites = [];

suites.push(new Benchmark.Suite('build from array')
    .add('array2', {
        onCycle () {
            this.array = [];
            for (var ii = 0; ii < 2; ii++) {
                this.array[ii] = ii;
            }
        },

        fn () {
            Immutable.List(this.array);
        }
    })
    .add('array32', {
        onCycle () {
            this.array = [];
            for (var ii = 0; ii < 32; ii++) {
                this.array[ii] = ii;
            }
        },

        fn () {
            Immutable.List(this.array);
        }
    })
    .add('array1024', {
        fn () {
            var list = Immutable.List();
            for (var ii = 0; ii < 1024; ii++) {
                list = list.push(ii);
            }
        }
    })
);

suites.push(new Benchmark.Suite('push')
    .add('32 times', () => {
        var list = Immutable.List().asMutable();
        for (var ii = 0; ii < 32; ii++) {
            list = list.push(ii);
        }
        list = list.asImmutable();
    })
    .add('1024 times', () => {
        var list = Immutable.List().asMutable();
        for (var ii = 0; ii < 1024; ii++) {
            list = list.push(ii);
        }
        list = list.asImmutable();
    })
);

suites.push(new Benchmark.Suite('mini: build')
    .add('array32', {
        onCycle () {
            this.array = [];
            for (var ii = 0; ii < 32; ii++) {
                this.array[ii] = ii;
            }
        },

        fn () {
            return new ImmutableMini.Array(this.array);
        }
    })
    .add('array1024', {
        fn () {
            var list = new ImmutableMini.Array([]);
            for (var ii = 0; ii < 1024; ii++) {
                list = list.push(ii);
            }
        }
    })
);

suites.push(new Benchmark.Suite('mini: push')
    .add('32 times', () => {
        var list = new ImmutableMini.Array([]).toJS();
        for (var ii = 0; ii < 32; ii++) {
            list.push(ii);
        }
        list = new ImmutableMini.Array(list);
    })
    .add('1024 times', () => {
        var list = new ImmutableMini.Array([]).toJS();
        for (var ii = 0; ii < 1024; ii++) {
            list.push(ii);
        }
        list = new ImmutableMini.Array(list);
    })
);

suites.reduce(
    (p, suite) => {
        return p.then(() => new Promise(resolve => {
            console.log('Start:', suite.name);
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
