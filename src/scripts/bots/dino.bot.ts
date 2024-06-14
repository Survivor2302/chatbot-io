import { Bot } from "../../types/bot.type";

export const dinoBot: Bot<{
    generate: () => Promise<string>;
    calc: (expression: string) => number | null;
    translate: (sourceLang: string,targetLang: string,text: string) => Promise<string>;
}> = {    
    name: 'Dino',
    avatar: 'https://www.evasion-communication.com/content/filemanager/Dino-train-evasion-communication-mascotte-alphanim-expendo-organisation-event.jpg',
    command: {
        generate: async () => {
            const url = ' http://dinotoapi.com/api/dinosaures/$'
            const response = await fetch(url);
            console.log(response);
            const data = await response.json();

            const randomIndex = Math.floor(Math.random() * 25) + 1;
            console.log(data[randomIndex]);
            console.log(data);
            console.log(data.length);
            const message = `Name: ${data[randomIndex].name}\nDescription: ${data[randomIndex].description}`;
            return message;
        },
        calc: (expression: string) => {
            try {
                return eval(expression);
            } catch (error) {
                return "Calculation failed.";
            }
        },
        translate: async (sourceLang: string,targetLang: string,text: string) => {
            try {
                const url = `https://api.mymemory.translated.net/get?q=${text.toString()}!&langpair=${sourceLang}|${targetLang}`;
                const response = await fetch(url);
                const data = await response.json();
                return data.responseData.translatedText;
            } catch (error) {
                return "Translation failed.";
            }
        },
        help: () => {
            return 'Commands: generate, calc, translate';
        }
    }
};