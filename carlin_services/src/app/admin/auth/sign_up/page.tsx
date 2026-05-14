import AuthComponent from "@/components/auth";
import Link from "next/link";

export default function SignUpPage() {
    return (
        <main className="flex h-dvh items-center justify-center">
            <AuthComponent componentName="sign_up" />
        </main>
    );
}