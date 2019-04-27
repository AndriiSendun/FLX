export function personTemplate({
  id,
  name,
  location,
  email,
  phone,
  picture,
  timezone
}) {
  return `
  <tr class="person" id=${id}>
    <td class="person__photo"><img src=${picture} alt="photo"/></td>
    <td class="person__name">${name}</td>
    <td class="person__address">${location}</td>
    <td class="person__email">${email}</td>
    <td class="person__phone">${phone}</td>
    <td class="person__timezone">${timezone}</td>
    <td><button class="btn btn--remove">Remove</button></td>
  </tr>
  `;
}
