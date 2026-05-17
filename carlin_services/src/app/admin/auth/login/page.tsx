import AuthComponent from "@/components/auth";
import { db } from "@/db";
import { admin } from "@/db/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const handleSignIn = async (formData: FormData) => {
        "use server";
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
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
        const token = jwt.sign({ id: account[0].id }, process.env.SECRET_CODE!, { expiresIn: "3d" });
        redirect("/admin");
        return {
            token: token
        };
    };
    return (
        <main className="flex h-dvh items-center justify-center">
            <AuthComponent componentName="sign_in" onFormSubmit={handleSignIn} />
        </main>
    );
}
