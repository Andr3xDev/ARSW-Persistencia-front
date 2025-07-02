import React, { useState, useEffect } from "react";

export interface User {
    id?: string;
    nombre: string;
    correo: string;
    fechaNacimiento: string;
    programa: string;
}

// --- Lógica del Servicio (antes en userService.ts) ---
const API_URL = "http://localhost:8080/users";

const getAllUsers = async (): Promise<User[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
    }
    return response.json();
};

const createUser = async (user: User): Promise<User> => {
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

// --- Componente de Formulario ---
interface UserFormProps {
    onUserCreated: (user: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onUserCreated }) => {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [programa, setPrograma] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nombre || !correo || !fechaNacimiento || !programa) {
            setError("Todos los campos son obligatorios.");
            return;
        }
        setError(null);
        setIsSubmitting(true);

        const newUser: User = { nombre, correo, fechaNacimiento, programa };

        try {
            const createdUser = await createUser(newUser);
            onUserCreated(createdUser);
            // Limpiar formulario
            setNombre("");
            setCorreo("");
            setFechaNacimiento("");
            setPrograma("");
        } catch (err) {
            setError(
                "Fallo al conectar con el servidor. Revisa la consola para más detalles."
            );
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg mb-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Registrar Nuevo Estudiante
            </h2>
            <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <label
                            htmlFor="nombre"
                            className="mb-2 font-semibold text-gray-700"
                        >
                            Nombre Completo
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="programa"
                            className="mb-2 font-semibold text-gray-700"
                        >
                            Programa Académico
                        </label>
                        <input
                            type="text"
                            id="programa"
                            value={programa}
                            onChange={(e) => setPrograma(e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="correo"
                            className="mb-2 font-semibold text-gray-700"
                        >
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="correo"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="fechaNacimiento"
                            className="mb-2 font-semibold text-gray-700"
                        >
                            Fecha de Nacimiento
                        </label>
                        <input
                            type="date"
                            id="fechaNacimiento"
                            value={fechaNacimiento}
                            onChange={(e) => setFechaNacimiento(e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>
                {error && (
                    <p className="text-red-500 mt-4 text-center">{error}</p>
                )}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
                >
                    {isSubmitting ? "Registrando..." : "Registrar Estudiante"}
                </button>
            </form>
        </div>
    );
};

// --- Componente de Tabla ---
interface UserTableProps {
    users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
    return (
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Estudiantes Registrados
            </h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-5 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                                Nombre
                            </th>
                            <th className="py-3 px-5 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                                Correo
                            </th>
                            <th className="py-3 px-5 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                                Fecha Nacimiento
                            </th>
                            <th className="py-3 px-5 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                                Programa
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {users.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="text-center py-10 text-gray-500"
                                >
                                    No hay estudiantes registrados.
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-b border-gray-200 hover:bg-gray-50"
                                >
                                    <td className="py-4 px-5">{user.nombre}</td>
                                    <td className="py-4 px-5">{user.correo}</td>
                                    <td className="py-4 px-5">
                                        {user.fechaNacimiento}
                                    </td>
                                    <td className="py-4 px-5">
                                        {user.programa}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- Componente Principal App ---
function App() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const data = await getAllUsers();
                setUsers(data);
                setError(null);
            } catch (err) {
                setError(
                    "No se pudo cargar la lista de estudiantes. ¿El servidor backend está en ejecución?"
                );
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []); // El array vacío asegura que esto se ejecute solo una vez, al montar el componente

    const handleUserCreated = (newUser: User) => {
        // Actualiza el estado para que la tabla se refresque instantáneamente
        setUsers([...users, newUser]);
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans p-4 md:p-8">
            <header className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900">
                    Gestión de Estudiantes
                </h1>
                <p className="text-gray-600 mt-2">
                    Aplicación React + Spring Boot
                </p>
            </header>

            <main>
                <UserForm onUserCreated={handleUserCreated} />

                {loading && (
                    <p className="text-center text-blue-600">
                        Cargando estudiantes...
                    </p>
                )}
                {error && (
                    <p className="text-center text-red-600 bg-red-100 p-4 rounded-lg max-w-4xl mx-auto">
                        {error}
                    </p>
                )}
                {!loading && !error && <UserTable users={users} />}
            </main>
        </div>
    );
}

export default App;
