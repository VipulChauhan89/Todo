import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import Task from "./Task";
import DropDown from './DropDown';

export default function TaskPopUp() {
  const storedTasks = window.localStorage.getItem('TASKS');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>('');
  const [taskStatus, setTaskStatus] = useState<string>('⚪ Todo');
  const [tasks, setTasks] = useState<Task[]>(storedTasks ? JSON.parse(storedTasks) : []);
  const [currentFilter, setCurrentFilter] = useState(window.localStorage.getItem('STATUS'));
  const [temp,setTemp] = useState<Task[]> ([]);
  
  useEffect(() => {
    window.localStorage.setItem('TASKS', JSON.stringify(tasks));
  }, [tasks, taskName, taskStatus]);

  useEffect(() => {
    setCurrentFilter(window.localStorage.getItem('STATUS'));
  }, []);

  // Update temp whenever currentFilter or tasks change
  useEffect(() => {
    if (currentFilter === "All") {
      setTemp(tasks);
    } else {
      setTemp(tasks.filter(task => task.status === currentFilter));
    }
  }, [currentFilter, tasks]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
    setTaskName("");
    setTaskStatus("⚪ Todo");
  };

  const filter = (status: string) => {
    setCurrentFilter(status);
  };
  const handleSaveTask = () => {
    if (taskName) {
      const newTask = {
        name: taskName,
        status: taskStatus,
      };

      // Update the tasks state with the new task
      setTasks([...tasks, newTask]);

      // Clear the form fields
      setTaskName('');
      setTaskStatus('Todo');

      // Close the dialog
      closeModal();
    }
  };

  const deleteCompleted = () => {
    const updatedTasks = tasks.filter( tasks => tasks.status !== "✅ Completed")
    console.log(storedTasks);
    setTasks(updatedTasks);
  };
  const handleDeleteTask = (index: number) => {
    // Delete the task with the provided index
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };
  const editTask = (index: number, newName: string, newStatus: string) => {
    // Set the editingTaskIndex to the index of the task being edited
    const taskToEdit = tasks[index];
    taskToEdit.name = newName;
    taskToEdit.status = newStatus;
    setTaskName(newName);
    setTaskStatus(newStatus);
  };

  interface Task {
    name: string;
    status: string;
  }

  return (
    <>
      <div className="flex justify-end mr-10 gap-4">
        <button
          className="rounded text-blue-400 border-blue-300 border pl-3 pr-3 hover:bg-blue-400 hover:text-white hover:border-black duration-500"
          onClick={openModal}
        >
          Add task
        </button>
        <DropDown onChange={(status) => filter(status)}/>
        <button
          className="rounded text-red-400 border-red-300 border pl-3 pr-3 hover:bg-red-400 hover:text-white hover:border-black duration-500"
          onClick={deleteCompleted}
        >
          Delete Completed
        </button>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add a task
                  </Dialog.Title>
                  <div className="mt-2">
                    <input
                      className="text-sm text-gray-900 w-full rounded border focus:border-blue-300 pl-2 pr-2 pt-1 pb-1"
                      placeholder="Task Name"
                      value={taskName}
                      onChange={(e) => setTaskName(e.target.value)}
                    />
                  </div>
                  <div className="mt-2">
                    <label className="text-sm text-gray-700">Task Status</label>
                    <select
                      className="block w-full text-sm text-gray-900 mt-1 p-2 border border-gray-300 rounded"
                      value={taskStatus}
                      onChange={(e) => setTaskStatus(e.target.value)}
                    >
                      <option value="⚪ Todo">⚪ Todo</option>
                      <option value="🟡 In Progress">🟡 In Progress</option>
                      <option value="✅ Completed">✅ Completed</option>
                    </select>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleSaveTask}
                    >
                      Save Task
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {tasks.length > 0 && (
        <div>
          <div className="grid grid-cols-5 justify-start gap-4 ml-4 pt-2 pb-1">
            <h2 className="font-bold w-[20%]">No</h2>
            <h2 className="font-bold w-[20%]">Name</h2>
            <h2 className="font-bold w-[20%]">Status</h2>
            <h2 className="font-bold w-[20%]">Edit</h2>
            <h2 className="font-bold w-[20%]">Delete</h2>
          </div>
          <ul>
            {temp.map((task, index) => (
              <li key={index}>
                <Task index={index} name={task.name} status={task.status} onDeleteTask={() => handleDeleteTask(index)} onEditTask={(newName, newStatus) => editTask(index, newName, newStatus)} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
