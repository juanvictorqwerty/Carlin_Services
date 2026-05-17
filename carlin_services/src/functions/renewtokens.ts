import { admin } from "@/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/db";

import jwt from "jsonwebtoken";

export async function reNewTokens(token: string) {
    const payload = jwt.verify(token, "secret") as { id: string };
    const account = await db.select().from(admin).where(eq(admin.id, payload.id));
    if (account.length === 0) {
        return {
            error: "Invalid token",
        };
    }
    const newToken = jwt.sign({ id: account[0].id }, "secret", { expiresIn: "3d" });
    return {
        token: newToken,
    };
}