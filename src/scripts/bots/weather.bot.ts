import { Bot } from "../../types/bot.type";

export const weatherBot: Bot<{
    weather: (city: string) => string;
    temperature: (city: string) => string;
    undefined: () => void;
}> = {
    name: 'Weather',
    command: {
        weather: (city: string) => 'Weather in ' + city,
        temperature: (city: string) => Math.round(Math.random() * 100) + "°C at " + city,
        undefined: () => 'Undefined command'
    }
};
