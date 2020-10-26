const addon = require('../native');

const IDX = 50;
const PRIME = 200000;
const LOOP = 100000;
const TEXT = "SOME_STRING_FOR_TESTING"

console.log(addon);
//console.log(addon.hello());
console.log(`CPU thread count: ${addon.thread_count()}`);

const { sha256, find_prime, fibonacci } = addon
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

console.time("SHA256-RS")
for (let x = 0; x < LOOP; x++)
    sha256(TEXT);
console.timeEnd("SHA256-RS")

console.time("PRIME-JS")
console.log(`PrimeJS: ${find_prime_js(PRIME)}`)
console.timeEnd("PRIME-JS")

console.time("PRIME-RS")
console.log(`Prime:   ${find_prime(PRIME)}`)
console.timeEnd("PRIME-RS")