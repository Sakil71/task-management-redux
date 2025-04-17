import { ArrowRightIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useDeletetaskMutation, useUpdateTaskMutation } from '../../redux/features/api/baseApi';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const TaskCard = ({ task }) => {
  const [updateTask, { data: updateData, isError : isUpdateError }] = useUpdateTaskMutation();
  const [deleteTask, { data: deleteData, isError : isDeleteError }] = useDeletetaskMutation();


  useEffect(() => {
    if (updateData) {
      toast.success("Task status updated");
    }
    if (deleteData) {
      toast.success(deleteData?.message || "Task deleted successfully");
    }

    if (isUpdateError) {
      toast.error("Failed to update task");
    }

    if (isDeleteError) {
      toast.error("Failed to delete task");
    }
  }, [updateData, deleteData, isUpdateError, isDeleteError]);



  return (
    <div className="bg-secondary/10 rounded-md p-5">
      <h1
        className={`text-lg font-semibold mb-3  ${task?.priority === 'high' ? 'text-red-500' : ''
          } ${task?.priority === 'medium' ? 'text-yellow-500' : ''} ${task?.priority === 'low' ? 'text-green-500' : ''
          }`}
        title={task?.priority}
      >
        {task?.title}
      </h1>
      <p className="mb-3">{task?.description}</p>
      <p className="text-sm">Assigned to - {task?.assignTo}</p>
      <div className="flex justify-between mt-3">
        <p>{task?.deadline}</p>

        <div className="flex gap-3">
          <button onClick={() => deleteTask(task._id)} title="Delete">
            <TrashIcon className="h-5 w-5 text-red-500" />
          </button>
          <button
            className={task.status === "archieve" ? "hidden" : ""}
            onClick={() =>
              updateTask({
                id: task._id,
                status: task.status === "pending" ? "running" : task.status === "running" ? "done" : "archieve"
              })
            }
            title={task?.status}
          >
            <ArrowRightIcon className="h-5 w-5 text-primary" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
