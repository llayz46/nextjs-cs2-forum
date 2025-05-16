import { SignupForm } from "@/components/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Inscription",
    description: "Inscription à votre compte",
};

export default function Signup() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-md">
                <SignupForm />
            </div>
        </div>
    );
}
