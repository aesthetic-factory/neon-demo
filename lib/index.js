const addon = require('../native');
const crypto = require("crypto")
const IDX = 50;
const PRIME = 200000;
const LOOP = 1000000;
const TEXT = "With Neon, you can create native Node modules like you might in C or C++, but with none of the fear and headaches associated with unsafe systems programming. Embedding Rust in Node can be useful for many reasons: \
Raw performance \
Threads and parallel programming \
Access to Rust’s growing package ecosystem \
Access to native OS-specific libraries \
Neon also works hard to make creating native modules easy, with a convenient command-line interface and workflow built around sensible project conventions. This eliminates a lot of the usual hassle of building native Node modules"

console.log(addon);
//console.log(addon.hello());
console.log(`CPU thread count: ${addon.thread_count()}`);

const { sha256, sha512, find_prime, fibonacci } = addon
/// Computes the nth Fibonacci number.
const fibonacci_js = (n) => {
    let a = 0;
    let b = 1;
    for (let x = 0; x < n; x++) {
        let tmp = a;
        a = b;
        b = a + tmp;
    }
    return b;
}

const sha256_js = (input) => {
    return crypto.createHash('sha256').update(input).digest('hex')
}

const sha512_js = (input) => {
    return crypto.createHash('sha512').update(input).digest('hex')
}


const is_prime = (num) => {
    let range = Math.ceil(Math.sqrt(num) + 1);
    for (let i = 2; i < range; i++) {
        if (num % i == 0) {
            return false;
        }
    }
    return true;
}


const find_prime_js = (num) => {
    let cnt = 2;
    let idx = 3;
    let lastest_result = 3;
    while (cnt <= num) {
        if (is_prime(idx)) {
            lastest_result = idx;
            cnt += 1;
        }
        idx += 2;
    }
    return lastest_result
}


console.time("fibonacci-JS")
for (let x = 0; x < LOOP; x++)
    fibonacci_js(IDX);
console.timeEnd("fibonacci-JS")

console.time("fibonacci-RS")
for (let x = 0; x < LOOP; x++)
    fibonacci(IDX);
console.timeEnd("fibonacci-RS")

console.time("SHA256-JS")
for (let x = 0; x < LOOP; x++)
    sha256_js(TEXT);
console.log(`SHA256-JS: ${sha256_js(TEXT)}`)
console.timeEnd("SHA256-JS")

console.time("SHA256-RS")
for (let x = 0; x < LOOP; x++)
    sha256(TEXT);
console.log(`SHA256-RS: ${sha256(TEXT)}`)
console.timeEnd("SHA256-RS")

console.time("PRIME-JS")
console.log(`PrimeJS: ${find_prime_js(PRIME)}`)
console.timeEnd("PRIME-JS")

console.time("PRIME-RS")
console.log(`Prime:   ${find_prime(PRIME)}`)
console.timeEnd("PRIME-RS")