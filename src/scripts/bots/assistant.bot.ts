import { Bot } from "../../types/bot.type";

export const assistantBot: Bot<{
    hello: () => string;
    calc: (expression: string) => number | null;
    translate: (sourceLang: string,targetLang: string,text: string) => Promise<string>;
}> = {    name: 'Assistant',
    command: {
        hello: () => {
            return 'Hello';
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
        }
    }
};