import { BellIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline';
import MyTasks from '../components/tasks/MyTasks';
import TaskCard from '../components/tasks/TaskCard';
import { useEffect, useRef, useState } from 'react';
import AddTaskModal from '../components/tasks/AddTaskModal';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UserDropDown from '../components/ui/UserDropDown';
import { useGetTaskQuery } from '../redux/features/api/baseApi';

const Tasks = () => {
  const { data: tasks } = useGetTaskQuery();
  const { email, photoURL, name } = useSelector(state => state.userSlice);
  const prevTaskCount = useRef(0);
  let [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchterm, setSearchterm] = useState('');

  const filterSearch = task => {
    return task.title?.toLowerCase().includes(searchterm.toLowerCase());
  }

  const pendingTask = tasks?.filter(task => task.status == "pending" && filterSearch(task));
  const runningTask = tasks?.filter(task => task.status == "running" && filterSearch(task));
  const doneTask = tasks?.filter(task => task.status == "done" && filterSearch(task));



  useEffect(() => {
    if (tasks && prevTaskCount.current !== 0 && tasks.length > prevTaskCount.current) {
      setShowNotification(true);
    }
    if (tasks) {
      prevTaskCount.current = tasks.length;
    }
  }, [tasks]);

  return (
    <div className="h-screen grid grid-cols-12">
      <div className="col-span-full md:col-span-9 px-2 md:px-10 pt-4 md:pt-10">
        <div className="md:flex justify-between items-center">
          <div>
            <h1 className="font-semibold text-3xl mb-2 md:mb-0">Tasks</h1>
          </div>
          <div className="flex items-center gap-5">

            <div className='flex flex-row-reverse gap-2'>
              <button onClick={() => setSearchOpen(prev => !prev)} className="border-2 border-secondary/20 hover:border-primary hover:bg-primary rounded-xl h-10 w-10  grid place-content-center text-secondary hover:text-white transition-all">
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>
              {
                searchOpen && <input onChange={e => setSearchterm(e.target.value)} type="search" placeholder="Search tasks..." className=" rounded-md  text-sm shadow-md" />
              }
            </div>

            <div className='relative'>
              <button onClick={() => setShowNotification(false)} className="border-2 border-secondary/20 hover:border-primary hover:bg-primary rounded-xl h-10 w-10 grid place-content-center text-secondary hover:text-white transition-all">
                <BellIcon className="h-6 w-6" />
                {
                  showNotification && <span className="absolute -top-1 -right-1 bg-red-500 text-white w-4 h-4 rounded-full text-xs flex items-center justify-center">!</span>
                }
              </button>
            </div>

            <button onClick={() => setIsOpen(!isOpen)} className="btn btn-primary text-xs">Add Task</button>
            <AddTaskModal isOpen={isOpen} setIsOpen={setIsOpen}></AddTaskModal>

            {
              email ?
                <div className="relative inline-block text-left">
                  <UserDropDown>
                    <div className={`${photoURL ? '' : 'p-2'} h-10 w-10 flex justify-center items-center border rounded-full overflow-hidden`}>
                      {
                        photoURL ?
                          <img className='rounded-full border-2 border-blue-600 object-cover' src={photoURL} alt="" />
                          :
                          <UserIcon></UserIcon>
                      }
                    </div>
                  </UserDropDown>
                </div>
                :
                <Link to={'signup'}>Signup</Link>
            }

          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          <div className="relative overflow-auto">
            <div className="flex sticky top-0 justify-between bg-[#D3DDF9] p-5 rounded-md mb-3">
              <h1>Pending</h1>
              <p className="bg-primary text-white w-6 h-6 grid place-content-center rounded-md">
                {pendingTask?.length}
              </p>
            </div>
            <div className="space-y-3">
              {
                pendingTask?.map(item => <TaskCard task={item} key={item._id} />)
              }
            </div>
          </div>
          <div className="relative overflow-auto">
            <div className="flex sticky top-0 justify-between bg-[#D3DDF9] p-5 rounded-md mb-3">
              <h1>In Progress</h1>
              <p className="bg-primary text-white w-6 h-6 grid place-content-center rounded-md">
                {runningTask?.length}
              </p>
            </div>
            <div className="space-y-3">
              {
                runningTask?.map(item => <TaskCard task={item} key={item._id} />)
              }
            </div>
          </div>
          <div className="relative overflow-auto">
            <div className="flex sticky top-0 justify-between bg-[#D3DDF9] p-5 rounded-md mb-3">
              <h1>Completed</h1>
              <p className="bg-primary text-white w-6 h-6 grid place-content-center rounded-md">
                {doneTask?.length}
              </p>
            </div>
            <div className="space-y-3">
              {
                doneTask?.map(item => <TaskCard task={item} key={item._id} />)
              }
            </div>
          </div>
        </div>
      </div>

      {/* My task */}
      <div className="col-span-3 border-l-2 border-secondary/20 px-10 pt-10 hidden md:block">
        <div>
          <h1 className="text-xl">Members</h1>
          <div className="flex gap-3 mt-3">
            <div className="h-10 w-10 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                alt=""
                className="object-cover h-full w-full "
              />
            </div>
            <div className="h-10 w-10 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                alt=""
                className="object-cover h-full w-full "
              />
            </div>
            <div className="h-10 w-10 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                alt=""
                className="object-cover h-full w-full "
              />
            </div>
            <div className="h-10 w-10 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                alt=""
                className="object-cover h-full w-full "
              />
            </div>
            <div className="h-10 w-10 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                alt=""
                className="object-cover h-full w-full "
              />
            </div>
          </div>
        </div>
        <MyTasks tasks={tasks} />
      </div>
    </div>
  );
};

export default Tasks;
