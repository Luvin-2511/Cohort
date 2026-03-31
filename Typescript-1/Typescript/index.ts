const a:string = "Hello";
const n:number = 69
const m:number = 69
const arr:number[] = [1, 5, 3,]
const list:[number,string,number] = [1, "Hello", 3,]

const sum = (m:number,n:number):void => {
    console.log(m+n)
}


list.push("Hello")
console.log(typeof(list[list.length-1]))
sum(m,n)

type USER = {name:string, age:number,isMale:boolean}

const user: USER = {
    name: "Tom",
    age:69,
    isMale:true
}

function introduction(data:USER):void {
    console.log(`Hello my name is ${data.name} and i am ${data.age} yr old`)
}

introduction(user)