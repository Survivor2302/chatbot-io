type HelpCommand = {
    help: () => void;
};

export type Bot<Commands> = {
    name: string;
    avatar: string;
    command: Commands & HelpCommand;
}