"use client"

import AuthComponent from "@/components/auth";
import { db } from "@/db";
import { admin } from "@/db/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export async function LoginPage() {
    const handleSignIn = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;
        const account = await db.select().from(admin).where(eq(admin.email, email));
        if (account.length === 0) {
            return {
                error: "Account does not exist",
            };
        }
        const isPasswordValid = await bcrypt.compare(password, account[0].password);
        if (!isPasswordValid) {
            return {
                error: "Invalid password",
            };
        }
        const token = jwt.sign({ id: account[0].id }, "secret", { expiresIn: "3d" });

        return {
            token: token,
        };
    };
    return (
        <main className="flex h-dvh items-center justify-center">
            <AuthComponent componentName="sign_in" onFormSubmit={handleSignIn} />
        </main>
    );
}
