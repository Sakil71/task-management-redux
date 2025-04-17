import React from 'react'
import TaskCard from '../components/tasks/TaskCard';
import { useGetTaskQuery } from '../redux/features/api/baseApi';

const Archeive = () => {
  const { data: tasks, isError, isLoading } = useGetTaskQuery();
  const archieveTask = tasks?.filter(task => task.status === "archieve");


  return (
    <div className='p-10'>
      <div className='flex gap-3 items-center mb-4'>
        <h1 className='text-2xl font-bold'>Archieve </h1>
        <p className="bg-red-600 text-white w-6 h-6 font-medium grid place-content-center rounded-md">
          {archieveTask?.length}
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {
          archieveTask?.map(task => <TaskCard key={task._id} task={task}></TaskCard>)
        }
      </div>
    </div>
  )
}

export default Archeive;