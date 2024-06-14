import { Bot } from "../../types/bot.type";

const API_KEY = 'V1NRdedILequm/VxtQ+/IA==xKXW2dSpwmdVPIXy';

export const dinoBot: Bot<{
    temp: (city: string) => Promise<string>;
    wind_speed: (city: string) => Promise<string>;
    humidity: (city: string) => Promise<string>;
}> = {    
    name: 'Dino',
    avatar: 'https://www.evasion-communication.com/content/filemanager/Dino-train-evasion-communication-mascotte-alphanim-expendo-organisation-event.jpg',
    command: {
        temp: async (city: string) => {
            const url = `https://api.api-ninjas.com/v1/weather?city=${city}`;
            const response = await fetch(url, {
                headers: {
                    'X-Api-Key': API_KEY,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
            return data.error ? 'La température n\'est pas disponible' : `Il fait actuellement ${data.temp}°C à ${city}`;
        },
        wind_speed: async (city: string) => {
            const url = `https://api.api-ninjas.com/v1/weather?city=${city}`;
            const response = await fetch(url, {
                headers: {
                    'X-Api-Key': API_KEY,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            return data.error ? 'Le vent n\'est pas disponible' : `Le vent à ${city} est de ${data.wind_speed} km/h`;
        },
        humidity: async (city: string) => {
            const url = `https://api.api-ninjas.com/v1/weather?city=${city}`;
            const response = await fetch(url, {
                headers: {
                    'X-Api-Key': API_KEY,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            return data.error ? 'L\'humidité n\'est pas disponible' : `L'humidité à ${city} est de ${data.humidity}%`;
        },
        help: () => {
            return 'Commandes disponibles: temp (ville), wind_speed (ville), humidity (ville)';
        }
    }
};