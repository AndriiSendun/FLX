const a = parseFloat(prompt('Type "a" value for quadratic equation'));
const b = parseFloat(prompt('Type "b" value for quadratic equation'));
const c = parseFloat(prompt('Type "c" value for quadratic equation'));

if (isNaN(a) || isNaN(b) || isNaN(c)) {
  alert('Invalid input data');
} else {
  const d = Math.pow(b, 2) - 4 * a * c;

  if (d > 0) {
    const firstX = (-b + Math.sqrt(d)) / (2 * a);
    const secondX = (-b - Math.sqrt(d)) / (2 * a);
    alert(`x1 = ${firstX} and x2 = ${secondX}`);
  } else if (d === 0) {
    const x = -b / (2 * a);
    alert(`x = ${x}`);
  } else {
    alert('no solution');
  }
}
