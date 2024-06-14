import { Bot } from "../../types/bot.type";

export const assistantBot: Bot<{
    hello: () => string;
    calc: (expression: string) => number | null;
    translate: (sourceLang: string,targetLang: string,text: string) => Promise<string>;
}> = {    
    name: 'Assistante sexy',
    avatar: 'https://static1.terrafemina.com/articles/7/11/35/37/@/107747-fete-des-secretaires-le-metier-evolue-les-stereotypes-restent-622x0-1.jpg',
    command: {
        hello: () => {
            return 'Bonjour, je suis une assistante sexy, je peux vous aider à résoudre vos calculs, traduire vos textes et bien plus encore ! grrrrr';
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
            return 'Commandes disponibles: hello, calc (expression), translate (sourceLang, targetLang, text)';
        }
    }
};