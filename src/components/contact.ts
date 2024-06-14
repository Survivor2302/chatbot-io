import { Bot } from "../types/bot.type";
import { contactCard } from "./cards/contact.card";

export function contact(contacts: Bot<any>[]) {
    return `
    <ul style="list-style-type: none; padding: 0;">
        ${contactCard(contacts)}
    </ul>`;
}