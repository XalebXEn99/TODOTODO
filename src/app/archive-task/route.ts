import { archiveTaskAction } from "@/app/actions";

export async function POST(request: Request) {
  const formData = await request.formData();
  await archiveTaskAction(formData);
  return new Response(null, { status: 303, headers: { Location: "/" } });
}
