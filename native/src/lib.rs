extern crate num_cpus;
use neon::prelude::*;
use sha2::{Digest, Sha256};

fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    Ok(cx.string("hello node"))
}

fn thread_count(mut cx: FunctionContext) -> JsResult<JsNumber> {
    Ok(cx.number(num_cpus::get() as f64))
}

fn fibonacci(input: u32) -> u32 {
    let mut a: u32 = 0;
    let mut b: u32 = 1;
    for _ in 0..input {
        let t = a + b;
        a = b;
        b = t;
    }
    return b;
}

fn is_prime(num: u32) -> bool {
    let range: u32 = ((num as f64).sqrt() + 1.0) as u32;
    for i in 2..range {
        if num % i == 0 {
            return false;
        }
    }
    return true;
}

pub fn find_prime(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let num = cx.argument::<JsNumber>(0)?.value() as u32;
    let mut cnt = 2;
    let mut idx = 3;
    let mut lastest_result = 3;
    while cnt < num {
        if is_prime(idx) == true {
            lastest_result = idx;
            cnt += 1;
        }
        idx += 2;
    }
    Ok(cx.number(lastest_result))
    //return lastest_result;
}

pub fn run_fibonacci(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let num = cx.argument::<JsNumber>(0)?.value() as u32;
    Ok(cx.number(fibonacci(num)))
    //return fibonacci(n);
}

pub fn sha256(mut cx: FunctionContext) -> JsResult<JsString> {
    let input = cx.argument::<JsString>(0)?.value();
    let mut hasher = Sha256::new();
    hasher.update(input);
    let result = hasher.finalize();
    let string = format!("{:x}", result);
    Ok(cx.string(string))
}

register_module!(mut cx, {
    cx.export_function("hello", hello)?;
    cx.export_function("thread_count", thread_count)?;
    cx.export_function("find_prime", find_prime)?;
    cx.export_function("fibonacci", run_fibonacci)?;
    cx.export_function("sha256", sha256)?;
    Ok(())
});
