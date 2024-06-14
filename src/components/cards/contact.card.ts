import { Bot } from "../../types/bot.type";

export const contactCard = (contacts: Bot<any>[]) => {
  return `
  ${contacts.map(contact => `
  <li data-bot-name="${contact.name}" onclick="selectContact('${contact.name}')" style="display: flex; align-items: center; margin-bottom: 10px;">
  <img src="${contact.avatar}" alt="${contact.name}" style="border-radius: 50%; width: 40px; height: 40px; margin-right: 10px; object-fit: cover; object-position: center;" />
  <span>${contact.name}</span>
  </li>
`).join('')}  `;
};