export interface IInitialState {
    users: object;
    modalreg: string | undefined;
    modallog: string | undefined;
    check: boolean
}

export interface IuserInfo {
    id: number;
    name: string;
    email: string;
}

export interface IsellerInfo {
    id: number;
    name: string;
    INN: string;
    email: string;
}

export interface Imodallog {
    modallog: boolean;
}

export interface Imodalreg {
    modalreg: boolean;
}
