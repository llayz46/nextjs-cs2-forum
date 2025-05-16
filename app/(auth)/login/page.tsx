import { LoginForm } from "@/components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Connexion",
    description: "Connexion à votre compte",
};

export default function Login() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-md">
                <LoginForm />
            </div>
        </div>
    );
}
