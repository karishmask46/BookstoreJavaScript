let word = new Promise((resolve, reject) => {
    let b = 2 + 3;
    if (b == 5) {
        resolve('success')
    }
    else {
        reject('fail')
    }
})
word.then((message) => {
    console.log('this is in then ' + message);
}).catch((message) => {
    console.log('this is in the catch ' + message);
})
const var1 = new Promise((resolve, reject) => {
    resolve("apple")
})
const var2 = new Promise((resolve, reject) => {
    resolve("banana")
})
const var3 = new Promise((resolve, reject) => {
    resolve("mango")

})
Promise.all([var1, var2, var3]).then((messagge) => {
    console.log(messagge);
})



function fun1(name) {
    return new Promise((resolve, reject) => {
        console.log("making request " + name);
        if (name === 'karishma') {
            resolve('say hi')
        } else {
            reject('say good bye')
        }
    })
}
function func2(location) {
    return new Promise((resolve, reject) => {
        console.log("loading");
        resolve('extra information ' + location)
    })
}
async function func3() {
    try {
        const firstfun1 = await fun1('pavan');
        console.log(firstfun1);
        const secondfunc2 = await func2('reshu')
        console.log(secondfunc2);
    }
    catch (err) {
        console.log(err);
    }

}
func3();
