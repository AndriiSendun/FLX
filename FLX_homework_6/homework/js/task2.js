'use strict';
const price = parseFloat(prompt('type amount of money'));
const discount = parseFloat(prompt('type discount'));

const discountPrice = parseFloat((price * (discount / 100)).toFixed(2));
const saved = parseFloat((price - discountPrice).toFixed(2));

const messageFalse = 'Invalid input data';
const messageTrue = `
      Price without discount: ${price}
      Discount: ${discount}%
      Price with discount: ${discountPrice}
      Saved: ${saved}
      `;

const message = (price >= 0 && price <= 9999999) &&
                (discount >= 0 && discount <= 99) &&
                !(isNaN(discountPrice)) ?
                messageTrue :
                messageFalse;

alert(message);

