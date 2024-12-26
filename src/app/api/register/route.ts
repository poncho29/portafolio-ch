import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { db } from "@/db/connection";
import { users } from "@/db/schema";

import { findUser } from "@/actions/user.action";

export async function POST(request: Request) {
  try {
    const token = request.headers.get("Authorization");
    const secret = process.env.REGISTER_SECRET;

    if (!secret || token !== `Bearer ${secret}`) {
      return NextResponse.json({
        ok: false,
        error: "No autorizado"
      }, { status: 403 });
    }

    const { email, password, name } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({
        ok: false,
        error: "Faltan datos requeridos: email o password"
      }, { status: 400 });
    }

    const existingUser = await findUser(email);

    if (existingUser) {
      return NextResponse.json(
        { error: "El usuario ya existe." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      role: "superadmin",
    });

    return NextResponse.json({
      ok: true,
      message: "Superadmin creado exitosamente.",
      user: { email, role: "superadmin" },
    }, { status: 201 });
  } catch (error) {
    console.error("Error al crear superadmin:", error);

    return NextResponse.json({
      ok: false,
      error: "Ocurrió un error inesperado."
    }, { status: 500 });
  }
}
