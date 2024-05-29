import { Message } from "../types/message.type";

export const messageCard = (message: Message) => {
  return `
  <div style="max-width: 60%; margin: 10px; padding: 10px; background-color: ${message.isUser ? '#DCF8C6' : '#ADD8E6'}; border-radius: 10px; box-shadow: 0px 1px 1px #B2B2B2;">
    <p style="margin: 0; color: #000;">${message.content}</p>
    <p style="margin: 0; font-size: 0.75em; color: #777;">${message.time}</p>
  </div>
  `;
}
