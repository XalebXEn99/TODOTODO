import { getAllTasks, getArchivedTasks } from "../../db/tasks";
import { TaskManager } from "@/components/TaskManager";

export default function Home() {
  const tasks = getAllTasks();
  const archivedTasks = getArchivedTasks();

  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-950 sm:p-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <TaskManager tasks={tasks} archivedTasks={archivedTasks} />
      </div>
    </main>
  );
}
