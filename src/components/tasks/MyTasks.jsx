import { CheckIcon, DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import Modal from '../ui/Modal';
import { useState } from 'react';
import { useUpdateTaskMutation } from '../../redux/features/api/baseApi';

const MyTasks = ({ tasks }) => {
  const [updatatask, { data, error }] = useUpdateTaskMutation();

  const [selectedTask, setSelectedTask] = useState(null);
  const { name, email } = useSelector(state => state.userSlice);
  const userName = name.split(" ")[0].toLowerCase();

  const userSpecificTask = tasks?.filter(task => task.assignTo === userName);


  return (
    <div>
      <h1 className="text-xl my-3">My Tasks</h1>
      <div className="h-[750px] overflow-auto space-y-3">
        {
          userSpecificTask?.map(item => (
            <div
              key={item._id}
              className="bg-secondary/10 rounded-md p-3 flex justify-between"
            >
              <h1>{item.title}</h1>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedTask(item)}
                  className="grid place-content-center"
                  title="Details"
                >
                  <DocumentMagnifyingGlassIcon className="w-5 h-5 text-primary" />
                </button>

                <button
                  onClick={() => updatatask({ id: item._id, status: "done" })}
                  disabled={item.status === "done"}
                  className="grid place-content-center" title="Done">
                  <CheckIcon
                    className={`w-5 h-5 ${item.status === "pending"
                      ? "text-red-600"
                      : item.status === "running"
                        ? "text-yellow-500"
                        : item.status === "done"
                          ? "text-green-500"
                          : item.status === "archieve"
                            ? "opacity-10"
                            : "text-primary"
                      }`}
                  />
                </button>
              </div>
            </div>
          ))
        }
      </div>

      {/* MOdal */}
      {selectedTask && (
        <Modal
          isOpen={!!selectedTask}
          setIsOpen={() => setSelectedTask(null)}
          title={selectedTask.title}
        >
          <p>{selectedTask?.description}</p>
          <div className='flex gap-4 mt-4'>
            <small>Deadline: {selectedTask?.deadline}</small>
            <small title='priority' className={
              selectedTask?.priority === 'high' ? 'text-red-500'
                : selectedTask?.priority === 'medium' ? 'text-yellow-500'
                  : 'text-green-500'
            }>
              {selectedTask?.priority}
            </small>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MyTasks;
