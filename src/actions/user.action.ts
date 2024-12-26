'use server';

import { eq } from 'drizzle-orm';

import { db } from "@/db/connection";
import { users } from "@/db/schema";

import { IUser } from '@/interfaces';

export const findUser = async (email: string): Promise<IUser | undefined> => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .get();

  return user;
}