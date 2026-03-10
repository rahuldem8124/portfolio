"use server";

import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

// ✅ Use a global prisma client or initialize here
const prisma = new PrismaClient();

/**
 * USER ACTION: Create a new project request
 */
export async function createProjectRequest(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("You must be logged in to request a project.");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  if (!title || !description) throw new Error("All fields are required.");

  await prisma.projectRequest.create({
    data: {
      title,
      description,
      userId: userId, // Clerks userId maps to our clerkId relation
    },
  });

  // Refresh the UI for the user
  revalidatePath("/members");
}

/**
 * ADMIN ACTION: Update status and add feedback notes
 */
export async function updateProjectStatus(id: string, status: any, notes: string) {
  const { userId } = await auth();
  
  if (!userId) throw new Error("Unauthorized");

  // ✅ SECURITY CHECK: Verify the requester is actually the Admin in Supabase
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { role: true }
  });

  if (dbUser?.role !== "ADMIN") {
    throw new Error("Access Denied: Only the Outlaw Admin can update requests.");
  }

  await prisma.projectRequest.update({
    where: { id },
    data: { 
        status,
        adminNotes: notes 
    },
  });

  // Refresh both pages so changes reflect immediately for everyone
  revalidatePath("/dashboard");
  revalidatePath("/members");
}

// Add this to src/app/actions/projects.ts

export async function deleteProjectRequest(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Security: Verify Admin role
  const admin = await prisma.user.findUnique({ 
    where: { clerkId: userId as string },
    select: { role: true } 
  });
  
  if (admin?.role !== "ADMIN") throw new Error("Access Denied");

  await prisma.projectRequest.delete({
    where: { id },
  });

  revalidatePath("/dashboard");
  revalidatePath("/members");
}