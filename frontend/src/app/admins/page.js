"use client"
import React, { useState } from "react";
import { FindUserByName } from "../utils/fetchFindUserByName";
import { setUserRole } from "../utils/fetchSetRole";

const AdminUserManagement = () => {
  const [name, setUsername] = useState("");
  const [users, setUsers] = useState([]); // список найденных пользователей
  const [selectedUserId, setSelectedUserId] = useState(""); // ID выбранного пользователя
  const [newRole, setNewRole] = useState("");
  const [message, setMessage] = useState(""); // Сообщение для пользователя
  const [messageType, setMessageType] = useState(""); // "success" или "error"

  const roles = ["ROLE_ADMIN", "ROLE_CLIENT"];

  const handleSearch = async () => {
    setMessage(""); // очистить сообщение
    try {
      const users = await FindUserByName(name);
      if (Array.isArray(users) && users.length > 0) {
        setUsers(users);
        setSelectedUserId("");
        setMessageType("success");
        setMessage(`Найдено ${users.length} пользователь(ей)`);
      } else {
        setUsers([]);
        setMessageType("error");
        setMessage("Пользователи не найдены");
      }
    } catch (error) {
      console.error("Ошибка при поиске:", error);
      setMessageType("error");
      setMessage("Произошла ошибка при поиске");
    }
  };

  const handleSetRole = async () => {
    if (!selectedUserId || !newRole) {
      setMessageType("error");
      setMessage("Выберите пользователя и новую роль");
      return;
    }

    setMessage(""); // очистить сообщение
    try {
      await setUserRole(selectedUserId, newRole);
      setMessageType("success");
      setMessage("Роль успешно изменена");

      // Обновляем пользователя в списке
      const updated = users.map((u) =>
        u.id === parseInt(selectedUserId) ? { ...u, role: newRole } : u
      );
      setUsers(updated);
    } catch (error) {
      console.error("Ошибка при изменении роли:", error);
      setMessageType("error");
      setMessage("Произошла ошибка при изменении роли");
    }
  };

  return (
    <div className="mt-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-4">Управление пользователями</h1>

      {/* Поиск */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Имя пользователя
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Поиск
        </button>
      </div>

      {/* Выбор пользователя из списка */}
      {users.length > 0 && (
        <div className="mb-4">
          <label htmlFor="selectUser" className="block text-sm font-medium text-gray-700">
            Найденные пользователи
          </label>
          <select
            id="selectUser"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          >
            {users.map((username) => (
              <option key={username.id} value={username.id}>
                {username.username} (роль: {username.role})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Выбор новой роли и кнопка */}
      {selectedUserId && (
        <div className="bg-white shadow-md rounded-lg p-4 mt-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-2 sm:mb-0">
              <label htmlFor="role" className="mr-2">Новая роль:</label>
              <select
                id="role"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="border rounded p-2"
              >
                <option value="">Выберите роль</option>
                {roles.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            <button
              onClick={handleSetRole}
              className="mt-2 sm:mt-0 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Изменить роль
            </button>
          </div>
        </div>
      )}

      {/* Вывод сообщения */}
      {message && (
        <div
          className={`mt-4 p-3 rounded ${
            messageType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default AdminUserManagement;
