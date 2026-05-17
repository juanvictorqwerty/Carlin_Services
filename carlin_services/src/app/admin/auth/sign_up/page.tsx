import AuthComponent from "@/components/auth";
import { db } from "@/db";
import { admin } from "@/db/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

export default async function SignUpPage() {
    const handleSignUp = async (formData: FormData) => {
        "use server";
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const secretCode = formData.get("secret_code") as string;
        if (secretCode !== process.env.SECRET_CODE) {
            return {
                error: "Invalid secret code",
            };
        }
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