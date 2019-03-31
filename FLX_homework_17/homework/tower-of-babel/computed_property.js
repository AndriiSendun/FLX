console.log({
  [parseFloat(process.argv[2]) % 2 === 0 ? "even" : "odd"]: parseFloat(process.argv[2]),
  [parseFloat(process.argv[2]) + parseFloat(process.argv[3])]: parseFloat(process.argv[2]) + parseFloat(process.argv[3]),
});
