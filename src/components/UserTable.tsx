import { useEffect, useState } from "react";
import axios from "axios";

// ✅ 1. Corregir el nombre del campo para que coincida con la API.
interface IStudent {
    id: string | number;
    name: string;
    email: string;
    birthdate: string; // De 'birthDate' a 'birthdate'
    program: string;
}

interface IStudentTableProps {
    refresh: boolean;
}

// ✅ 2. Crear el formateador de fecha fuera del componente para mejor rendimiento.
// 'es-CO' usa el formato para Colombia. 'long' da un estilo como "2 de julio de 2025".
const dateFormatter = new Intl.DateTimeFormat("es-CO", {
    dateStyle: "long",
    timeZone: "UTC", // Usar UTC para evitar errores de un día por la zona horaria del navegador.
});

export default function UserTable({ refresh }: Readonly<IStudentTableProps>) {
    const [students, setStudents] = useState<IStudent[]>([]);

    useEffect(() => {
        axios
            .get<IStudent[]>("http://localhost:8080/users")
            .then((res) => setStudents(res.data));
    }, [refresh]);

    return (
        <div className="overflow-x-auto rounded-lg">
                       {" "}
            <table className="min-w-full text-sm text-left text-gray-300">
                               {" "}
                <thead className="bg-[#3c3c3c] text-xs text-gray-200 uppercase tracking-wider">
                                       {" "}
                    <tr>
                                                <th className="p-4">Nombre</th> 
                                              <th className="p-4">Email</th>   
                                           {" "}
                        <th className="p-4">Fecha de Nacimiento</th>           
                                    <th className="p-4">Programa</th>           
                               {" "}
                    </tr>
                                   {" "}
                </thead>
                               {" "}
                <tbody>
                                       {" "}
                    {students.length > 0 ? (
                        students.map((student) => (
                            <tr
                                key={student.id}
                                className="bg-[#282828] border-b border-[#3c3c3c] hover:bg-[#353535]"
                            >
                                                               {" "}
                                <td className="p-4 font-medium text-white">
                                                                       {" "}
                                    {student.name}                             
                                     {" "}
                                </td>
                                                               {" "}
                                <td className="p-4">{student.email}</td>
                                {/* ✅ 3. Formatear la fecha para mostrarla */} 
                                                             {" "}
                                <td className="p-4">
                                    {dateFormatter.format(
                                        new Date(student.birthdate)
                                    )}
                                </td>
                                                               {" "}
                                <td className="p-4">{student.program}</td>     
                                                     {" "}
                            </tr>
                        ))
                    ) : (
                        <tr>
                                                       {" "}
                            <td
                                colSpan={4}
                                className="text-center p-6 text-gray-400"
                            >
                                                                No hay
                                estudiantes registrados.                        
                                   {" "}
                            </td>
                                                   {" "}
                        </tr>
                    )}
                                   {" "}
                </tbody>
                           {" "}
            </table>
                   {" "}
        </div>
    );
}
