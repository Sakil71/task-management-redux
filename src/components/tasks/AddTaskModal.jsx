import { useForm } from "react-hook-form"
import Modal from "../ui/Modal"
import { useAddTaskMutation } from "../../redux/features/api/baseApi";
import { useEffect } from "react";
import toast from "react-hot-toast";

const AddTaskModal = ({ isOpen, setIsOpen }) => {
    const { register, handleSubmit, reset } = useForm();
    const [addTask, { data, isSuccess, isError }] = useAddTaskMutation();

    const onCancel = () => {
        reset();
        setIsOpen(false);
    }
    const onSubmit = (data) => {
        addTask({ status: "pending", ...data });
        onCancel();
    }

    useEffect(() => {
        if (isSuccess && data?.acknowledged) {
            toast.success("Task added successfully");
        }
        if (isError) {
            toast.error("Failed to add task");
        }
    }, [isSuccess, isError, data]);

    return (
        <div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={'Task Management'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-2 flex flex-col">
                        <label className="text-xs" htmlFor="title">Title</label>
                        <input {...register("title")} className="rounded-md" type="text" name="title" id="title" />
                    </div>
                    <div className="mb-2 flex flex-col">
                        <label className="text-xs" htmlFor="description">Description</label>
                        <textarea {...register("description")} className="rounded-md" name="description" id="description"></textarea>
                    </div>
                    <div className="mb-2 flex flex-col">
                        <label className="text-xs" htmlFor="deadline">Deadline</label>
                        <input {...register("deadline")} className="rounded-md" type="date" name="deadline" id="deadline" />
                    </div>
                    <div className="mb-2 flex flex-col">
                        <label className="text-xs" htmlFor="assignTo">Assign To</label>
                        <select {...register("assignTo")} name="assignTo" id="assignTo" className="rounded-md">
                            <option value="shakil">Shakil</option>
                            <option value="jhankar">Jhankar</option>
                            <option value="Mir">Mir</option>
                            <option value="Safayet">Safayet</option>
                        </select>
                    </div>
                    <div className="mb-2 flex flex-col">
                        <label className="text-xs" htmlFor="priority">Priority</label>
                        <select {...register("priority")} name="priority" id="priority" className="rounded-md">
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>

                    <div className="flex gap-4 justify-end">
                        <button onClick={() => onCancel()} type="button" className="mt-4 btn btn-danger">Cancel</button>
                        <button type="submit" className="mt-4 btn btn-primary">Submit</button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default AddTaskModal