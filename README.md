<h1>
  <img width="180" src="logo.png" alt="ulid">
</h1>

# [ULID](https://github.com/ulid/spec) for [Deno](https://deno.com/runtime)

[![ci](https://github.com/kt3k/ulid/actions/workflows/ci.yml/badge.svg)](https://github.com/kt3k/ulid/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/kt3k/ulid/branch/main/graph/badge.svg?token=okdKJphcWc)](https://codecov.io/gh/kt3k/ulid)

ULID is an alternative to UUID with the following features:

- 128-bit compatibility with UUID
- 1.21e+24 unique ULIDs per millisecond
- Lexicographically sortable!
- Canonically encoded as a 26 character string, as opposed to the 36 character
  UUID
- Uses Crockford's base32 for better efficiency and readability (5 bits per
  character)
- Case insensitive
- No special characters (URL safe)
- Monotonic sort order (correctly detects and handles the same millisecond)

## Import

```js
import { ulid } from "https://deno.land/x/ulid@v0.2.1/mod.ts";
```

## Usage

To generate a ULID, simply run the function:

```js
import { ulid } from "https://deno.land/x/ulid@v0.2.1/mod.ts";

ulid(); // 01ARZ3NDEKTSV4RRFFQ69G5FAV
```

### Seed Time

You can also input a seed time which will consistently give you the same string
for the time component. This is useful for migrating to ulid.

```js
ulid(1469918176385); // 01ARYZ6S41TSV4RRFFQ69G5FAV
```

### Monotonic ULIDs

To generate monotonically increasing ULIDs, create a monotonic counter.

_Note that the same seed time is being passed in for this example to demonstrate
its behaviour when generating multiple ULIDs within the same millisecond_

```js
import { monotonicFactory } from "https://deno.land/x/ulid@v0.2.1/mod.ts";

const ulid = monotonicFactory();

// Strict ordering for the same timestamp, by incrementing the least-significant random bit by 1
ulid(150000); // 000XAL6S41ACTAV9WEVGEMMVR8
ulid(150000); // 000XAL6S41ACTAV9WEVGEMMVR9
ulid(150000); // 000XAL6S41ACTAV9WEVGEMMVRA
ulid(150000); // 000XAL6S41ACTAV9WEVGEMMVRB
ulid(150000); // 000XAL6S41ACTAV9WEVGEMMVRC

// Even if a lower timestamp is passed (or generated), it will preserve sort order
ulid(100000); // 000XAL6S41ACTAV9WEVGEMMVRD
```

#### Use your own PRNG

To use your own pseudo-random number generator, import the factory, and pass it
your generator function.

```js
import { factory } from "https://deno.land/x/ulid@v0.2.1/mod.ts";
import prng from "somewhere";

const ulid = factory(prng);

ulid(); // 01BXAVRG61YJ5YSBRM51702F6M
```

You can also pass in a `prng` to the `monotonicFactory` function.

```js
import { monotonicFactory } from "https://deno.land/x/ulid@v0.2.1/mod.ts";
import prng from "somewhere";

const ulid = monotonicFactory(prng);

ulid(); // 01BXAVRG61YJ5YSBRM51702F6M
```

## Implementations in other languages

Refer to [ulid/spec](https://github.com/ulid/spec)

## Specification

Refer to [ulid/spec](https://github.com/ulid/spec)

## Test Suite

```sh
deno test
```

## Performance

```sh
deno bench
```

```
cpu: Apple M2
runtime: deno 1.36.0 (aarch64-apple-darwin)

benchmark         time (avg)        iter/s             (min … max)       p75       p99      p995
------------------------------------------------------------------ -----------------------------
encodeTime       303.42 ns/iter   3,295,776.1  (299.3 ns … 330.98 ns) 304.59 ns 326.78 ns 330.98 ns
encodeRandom     577.64 ns/iter   1,731,186.6 (337.92 ns … 738.33 ns) 640.61 ns 738.33 ns 738.33 ns
generate         670.84 ns/iter   1,490,678.9 (612.39 ns … 721.08 ns) 694.94 ns 721.08 ns 721.08 ns
```
