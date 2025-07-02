// src/components/UserForm.tsx
import React, { useState } from "react";
import { type User } from "../models/user.model";
import { createUser } from "../services/userService";

interface UserFormProps {
    onUserCreated: (user: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onUserCreated }) => {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [programa, setPrograma] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newUser: User = { nombre, correo, fechaNacimiento, programa };
        try {
            const createdUser = await createUser(newUser);
            onUserCreated(createdUser); // Notifica al componente padre
            // Limpiar formulario
            setNombre("");
            setCorreo("");
            setFechaNacimiento("");
            setPrograma("");
        } catch (error) {
            console.error(error);
            alert("Fallo al crear el usuario.");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-6 mb-8 bg-white shadow-md rounded-lg"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* ... campos del formulario ... */}
            </div>
            <button
                type="submit"
                className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
                Registrar Estudiante
            </button>
        </form>
    );
};

export default UserForm;
