import React from "react";
import type { User } from "../models/user.model";

interface UserTableProps {
    users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="py-3 px-4 text-left">Name</th>
                        <th className="py-3 px-4 text-left">Email</th>
                        <th className="py-3 px-4 text-left">Birth Day</th>
                        <th className="py-3 px-4 text-left">Program</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {users.map((user) => (
                        <tr
                            key={user.id}
                            className="border-b hover:bg-gray-100"
                        >
                            <td className="py-3 px-4">{user.nombre}</td>
                            <td className="py-3 px-4">{user.correo}</td>
                            <td className="py-3 px-4">
                                {user.fechaNacimiento}
                            </td>
                            <td className="py-3 px-4">{user.programa}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
