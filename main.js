const fs = require('fs');
fs.writeFileSync("file1.txt", "Hello Node!!!");

// Arrow function - allows this keyword
const summarizeUser = (name) => { return ('Hello ' + name); }
console.log(summarizeUser("Ashish"))
const add = (a, b) => a + b;    // omit return keyword
const addOne = a => a + 1;      // no paranthesis is needed
const addRandom = () => 1 + 2;  // empty brackets for no arg

// objects
const person = {
    name: 'Ashish',
    age: 30,
    // greet: () => { console.log('Hi, I am ' + this.name); } // undefined as this refers to the global scope
    // greet: function() { console.log('Hi, I am ' + this.name); }  // works
    greet() { console.log('Hi, I am ' + this.name); }         // even better syntax
};
person.greet();

// Arrays
const hobbies = [ 'Sports', 'Cookies' ];
for (let hobby of hobbies) {
    console.log(hobby);
}
console.log(hobbies.map(hobby => {
    return 'MyHobby: ' + hobby
}));
console.log(hobbies.map(hobby => 'MyHobby: ' + hobby ));     // better syntax
hobbies.push('Programming');    // editable - ref types only stores address

// Spreads
const copy1 = hobbies.slice();  // copy
const copy2 = [hobbies];    // Array within an array
const copy3 = [...hobbies]; // works well, exact copy
const copy4 = {...person};  // user defined obj

// Rest
const toArray = (arg1, arg2) => { return [arg1, arg2]; };
console.log(toArray(10, 20));   // not flextible if we add 30
const toArrayRest = (...args) => {
    return args;        // better flextible way
};
console.log(toArrayRest(10, 20, 30))

// object destructuring
const printNameAge = ({name, greet}) => {
    console.log(name + " " + person.greet()); // todo: why undef?
}
printNameAge(person);
const {name, age} = person;
console.log(name, age);
const [hobby1, hobby2] = hobbies;

// Promise and callbacks
const fetchData = callback => {
    setTimeout(() => {
        callback("Callback completed")
    }, 2000);
}

setTimeout(() => {
    console.log("Timer is done!");
    fetchData(text => {
        console.log(text);
    })
}, 3000);

const fetchDataPromise = () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise callback is completed")
        }, 2000);
    });
    return promise;
}

setTimeout(() => {
    console.log("Promise timer is done!");
    fetchDataPromise().then(text => {
        console.log(text);
        return fetchDataPromise();
    })
    .then(text2 => {
        console.log(text2 + ", 2nd promise");
    });
}, 3000);