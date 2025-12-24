// This is shallow copy of the array
const arr = [13,54,57,10,99]
const arr2 = arr

arr2.push(45)
// Changes are made in array1 but it will aslo affect in array2
console.log(arr2);
console.log(arr);
// To remove this ,we can create deep copy using spread operator

const arr3 = [43,65,63,21,43]
const arr4 = [...arr3]//-->Another way of writing [arr[0],arr[1] .... arr[n]]
arr4.push(69)
console.log(arr3);
console.log(arr4);

const [...arr5]=arr4 //Another way of writing
arr5.push(90)
console.log(arr4);
console.log(arr5);

const [a,b,...c] =arr5
console.log(a,b,c);

// With Objects

let obj = {
    user:"Jap",
    age:22,
    course:"Psyc"
}

let obj2 = {...obj}
obj2.user = "Luvin"
obj2.age = 21
console.log(obj,obj2);

let {user,age,course} = {...obj2}
console.log(user);


// Importing from main
import text from './main.js'
// Default export can be imported using any name
import {ba} from './main.js'
// Named export has to imported using the same name 
console.log(text);
console.log(ba);

import {info} from './main.js'
const {name,id}={...info}
console.log(name,id);




