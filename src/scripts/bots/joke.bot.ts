import { Bot } from "../../types/bot.type";

export const jokeBot: Bot<{
    frenchjoke: () => Promise<string>;
    programmingjoke: () => Promise<string>;
    darkjoke: () => Promise<string>;
}> = {
    name: 'Le mec drole',
    avatar: 'https://i.ytimg.com/vi/pPyDCKjiuOQ/maxresdefault.jpg',
    command: {
        frenchjoke: async () => {
                const response = await fetch('https://v2.jokeapi.dev/joke/Any?lang=fr');
                const data = await response.json();
                return data.setup + ' ' + data.delivery;
        },
        programmingjoke: async () => {
            const response = await fetch('https://v2.jokeapi.dev/joke/Programming');
            const data = await response.json();
            return data.setup + ' ' + data.delivery;
        },
        darkjoke: async () => {
            const response = await fetch('https://v2.jokeapi.dev/joke/Dark');
            const data = await response.json();
            return data.setup + ' ' + data.delivery;
        },
        help: () => 'Commands: frenchjoke, programmingjoke, darkjoke'
    }
};
