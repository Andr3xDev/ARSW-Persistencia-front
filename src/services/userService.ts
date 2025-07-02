import type { User } from "../models/user.model";

const API_URL = "http://localhost:8080/users";

export const getAllUsers = async (): Promise<User[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
    }
    return response.json();
};

export const createUser = async (user: User): Promise<User> => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw new Error("Error al crear el usuario");
    }
    return response.json();
};
