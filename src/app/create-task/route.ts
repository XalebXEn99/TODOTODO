import { createTaskAction } from "@/app/actions";

export async function POST(request: Request) {
  const formData = await request.formData();
  await createTaskAction(formData);
  return new Response(null, { status: 303, headers: { Location: "/" } });
}
