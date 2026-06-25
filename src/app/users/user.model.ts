export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
}

export interface ResponseUsers {
    users: User[];
    total: number;
    skip: number;
    limit: number;
}

/** Payload de criação/edição (DummyJSON aceita campos parciais do usuário). */
export interface UserPayload {
    firstName: string;
    lastName: string;
}
