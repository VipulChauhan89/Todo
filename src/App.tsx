import './App.css';
import TaskPopUp from './components/TaskPopUp';

function App() {

  return (
    <>
    <div>
      <div className="flex justify-center m-[50px] gap-2">
        <h1 className="text-4xl font-extrabold">TODO LIST</h1>
        <h4 className="font-extralight underline underline-offset-8">Do it now</h4>
      </div>
      <TaskPopUp/>
      
    </div>
    </>
  );
}

export default App
