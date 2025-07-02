import React, { useState } from "react";
import axios from "axios";

interface IStudentData {
    _id?: string;
    name: string;
    email: string;
    birthdate: string; // ✅ CORREGIDO: de 'birthDate' a 'birthdate'
    program: string;
}

interface IStudentFormProps {
    onStudentAdded: () => void;
}

export default function UserForm({
    onStudentAdded,
}: Readonly<IStudentFormProps>) {
    const [formData, setFormData] = useState<IStudentData>({
        name: "",
        email: "",
        birthdate: "", // ✅ CORREGIDO: de 'birthDate' a 'birthdate'
        program: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/users", formData);
            onStudentAdded();
            setFormData({ name: "", email: "", birthdate: "", program: "" }); // ✅ CORREGIDO
        } catch (error) {
            console.error("Error al guardar el estudiante:", error);
            // Manejar el error, por ejemplo, mostrando una notificación al usuario.
        }
    };

    const inputStyles =
        "w-full p-3 bg-[#3c3c3c] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow";

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-96">
                        {/* ...otros inputs para name, email, program... */}
            <input
                name="name"
                value={formData.name}
                placeholder="Nombre completo"
                onChange={handleChange}
                className={inputStyles}
                required
            />
                       {" "}
            <input
                name="email"
                value={formData.email}
                placeholder="Correo electrónico"
                type="email"
                onChange={handleChange}
                className={inputStyles}
                required
            />
                       {" "}
            <input
                name="birthdate" // ✅ CORREGIDO: de 'birthDate' a 'birthdate'
                value={formData.birthdate} // ✅ CORREGIDO
                type="date"
                onChange={handleChange}
                className={inputStyles}
                required
            />
                       {" "}
            <input
                name="program"
                value={formData.program}
                placeholder="Programa académico"
                onChange={handleChange}
                className={inputStyles}
                required
            />
                       {" "}
            <button
                type="submit"
                className="w-full p-3 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#282828] transition-colors"
            >
                                Guardar Estudiante            {" "}
            </button>
                   {" "}
        </form>
    );
}
