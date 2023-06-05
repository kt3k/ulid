// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.
// Copyright 2017 Alizain Feerasta. All rights reserved. MIT license.

import * as ulid from "./mod.ts";

const prng = ulid.detectPrng();

Deno.bench("encodeTime", function () {
  ulid.encodeTime(1469918176385);
});

Deno.bench("encodeRandom", function () {
  ulid.encodeRandom(10, prng);
});

Deno.bench("generate", function () {
  ulid.ulid(1469918176385);
});
