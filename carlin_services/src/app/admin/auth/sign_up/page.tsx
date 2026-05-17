import AuthComponent from "@/components/auth";
import { db } from "@/db";
import { admin } from "@/db/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

export async function SignUpPage() {
    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;
        const isAccountExist = await db.select().from(admin).where(eq(admin.email, email));
        if (isAccountExist.length > 0) {
            return {
                error: "Account already exists",
            };
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.insert(admin).values({
            email: email,
            password: hashedPassword,
        });
    };
    return (
        <main className="flex h-dvh items-center justify-center">
            <AuthComponent componentName="sign_up" onFormSubmit={handleSignUp} />
        </main>
    );
}