export function contact(contacts: string[]) {
    return `
    <ul>
        ${contacts.map(bot => `<li data-bot-name="${bot}" onclick="selectContact('${bot}')">${bot}</li>`).join('')}
    </ul>`;
}
