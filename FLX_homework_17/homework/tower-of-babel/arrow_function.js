const inputs = process.argv.slice(2);

/* const result = inputs.map(el => [...el.toUpperCase()].reduce((acc, cur) => acc[0])).join('');*/
const result = inputs.map(word => word[0].toUpperCase()).reduce((acc, cur) => acc + cur);

console.log(result);
