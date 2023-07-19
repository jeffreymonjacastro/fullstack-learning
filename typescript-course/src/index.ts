
// Arrays
let numbers: number[] = [1,2,3,4,5,6,7,8,9,10];

numbers.forEach(n => n.toString)

// Tuple
let user: [number, string] = [1, 'Jeff'];

user.push(1);

// Enum
// const small = 1;
// const medium = 2;
// const large = 3;

const enum Size { Small = 1, Medium = 2, Large = 3 };

let mySize: Size = Size.Medium;
console.log(mySize);


// Functions

function calculateTax(income: number, taxYear = 2022): number{
  if (taxYear < 2022)
    return income * 1.2;

  return income * 1.3;
}

calculateTax(10_000, 2022);


// Objects
let employee: {
  readonly id: number,
  name: string,
  retire: (date: Date) => void
} = { 
  id: 1, 
  name: 'Jeff',
  retire: (date: Date) => {
    console.log(date);
    
  }  
};


// Type Aliases
type Employee = {
  readonly id: number,
  name: string,
  retire: (date: Date) => void
}

let employee2: Employee = {
  id: 2, 
  name: 'Jeff2',
  retire: (date: Date) => {
    console.log(date);
    
  }
};


// Union Types

function kgToLbs(weight: number | string) {
  // Narrowing
  if (typeof weight === 'number')
    return weight * 2.2;
  else 
    return parseInt(weight) * 2.2;
}

kgToLbs(10);
kgToLbs('10kg');


// Intersection Types

type Draggable = {
  drag: () => void
}

type Resizable = {
  resize: () => void
}

type UIwidget = Draggable & Resizable;

let textBox: UIwidget = {
  drag: () => {},
  resize: () => {}
}


// Literal types
// (exact, specific)
type Quantity = 50 | 100;

let quantity: Quantity = 100;


// Nullable Types
function greet(name: string | undefined) {
  if (name)
    console.log(name.toUpperCase());
  else 
    console.log('Hi there');
    
}

greet(undefined);


// Optional Chaining
type Customer = {
  birdthday?: Date
}

function getCustomer(id: number): Customer | null {
  return id === 0 ? null : { birdthday: new Date() };
}

let customer = getCustomer(0)

// Optional property access operator

console.log(customer?.birdthday?.getFullYear());

// Optional element access operator
// customers?.[0]

// Optional call
let log: any = null;
log?.('a')
