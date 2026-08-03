import Image from "next/image";
import { getAllTasks, getArchivedTasks } from "../../db/tasks";
import { TaskManager } from "@/components/TaskManager";

export default function Home() {
  const tasks = getAllTasks();
  const archivedTasks = getArchivedTasks();

  return (
    <main className="min-h-screen bg-transparent p-6 text-zinc-950 sm:p-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <section className="overflow-hidden rounded-[2rem] border border-pink-200 bg-white/90 shadow-[0_20px_60px_rgba(241,95,166,0.18)] backdrop-blur">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:p-10">
            <div className="space-y-5">
              <div className="inline-flex items-center rounded-full border border-pink-200 bg-pink-50 px-3 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-pink-700">
                The Pink Panther
              </div>
              <h1 className="text-4xl font-black leading-[0.95] tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl">
                todo... todo... todo... todo... todo... todo... todoooooo
              </h1>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-sm overflow-hidden rounded-[2rem] border border-pink-200 bg-pink-50 p-4 shadow-inner">
                <Image
                  src="/pink.png"
                  alt="Pink Panther illustration"
                  width={640}
                  height={640}
                  priority
                  className="h-auto w-full rounded-[1.5rem]"
                />
              </div>
            </div>
          </div>
        </section>

        <TaskManager tasks={tasks} archivedTasks={archivedTasks} />
      </div>
    </main>
  );
}
