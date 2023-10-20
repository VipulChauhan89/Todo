import React, { useState } from 'react';

export default function Task(Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(Props.name);
  const [newStatus, setNewStatus] = useState(Props.status);

  const edit = () => {
    setIsEditing(true);
  };

  const saveEdit = () => {
    setIsEditing(false);
    Props.onEditTask(newName,newStatus); // Trigger the editing action in the main app
  };

  const cancelEdit = () => {
    setIsEditing(false);
    // Reset the input fields to their original values
    setNewName(Props.name);
    setNewStatus(Props.status);
  };

  return (
    <>
      <hr />
      <div className="grid grid-cols-5 justify-start gap-4 ml-4 pt-2 pb-1">
        <p className="w-[10%]">{Props.index + 1}</p>
        {isEditing ? (
          <input
            className="w-full text-gray-900 border border-blue-400 pl-1"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        ) : (
          <p className="w-[100%]">{Props.name}</p>
        )}
        {isEditing ? (
          <select
            className="block w-full text-sm text-gray-900 mt-1 p-2 border border-gray-300 rounded"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value="⚪ Todo">⚪ Todo</option>
            <option value="🟡 In Progress">🟡 In Progress</option>
            <option value="✅ Completed">✅ Completed</option>
          </select>
        ) : (
          <p className="w-[100%]">{Props.status}</p>
        )}
        {isEditing ? (
          <>
            <button
              className="w-[30%] sm:bg-green-200 text-green-700 rounded px-2 py-1 sm:hover:bg-green-300"
              onClick={saveEdit}
            >
              Save
            </button>
            <button
              className="w-[30%] sm:bg-red-200 text-red-700 rounded px-2 py-1 sm:hover:bg-red-300"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          </>
        ) : (
            <>
                <button
                    className="w-[40%] sm:bg-blue-200 text-blue-700 rounded px-2 py-1 sm:hover:bg-blue-300"
                    onClick={edit}
                >
                    Edit
                </button>
                <button
                    className="w-[40%] sm:bg-red-200 text-red-700 rounded px-2 py-1 sm:hover:bg-red-300"
                    onClick={Props.onDeleteTask}
                >
                    Delete
                </button>
            </>
        )}
        
      </div>
    </>
  );
}
