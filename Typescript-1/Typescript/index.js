"use strict";
// const a:string = "Hello";
// const n:number = 69
// const m:number = 69
// const arr:number[] = [1, 5, 3,]
// const list:[number,string,number] = [1, "Hello", 3,]
const user = {
    name: "Tom",
    age: 69,
    isMale: true
};
function introduction(data) {
    console.log(`Hello my name is ${data.name} and i am ${data.age} yr old`);
}
introduction(user);
