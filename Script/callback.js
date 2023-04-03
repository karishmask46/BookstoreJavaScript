function func1(callback){
    var name = "hello";
    callback(name)
}
function func2(hello){
    var var1=hello +"karishma"
    console.log(var1);
}
func1(func2);
 const hello= new Promise((resove,reject)=>{
     let a=1+5
     if(a=6){
        resove( console.log("success"))
     }
     else{
        reject(console.log("failed"))
     }
 })
hello.then(()=>{
    console.log("resoloved");
}).catch((error)=>{
    console.log(error);
})


function word(b,c){
  let a= b+c
  console.log(a);
}
function book(d,f){
    let g= d*f
    console.log(g);

}
async function world(){
    try{
        const a= await word(2,3);
        const b= await book(4,5);
    }
    catch{
        console.log("something went wrong");
    }

}
world();