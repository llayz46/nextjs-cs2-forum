import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";
import "../globals.css";
import { Toaster } from "sonner";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default async function AuthLayout({ children }: Readonly<{ children: ReactNode }>) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (session?.user) {
        redirect("/");
    }

    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
                <Toaster />
            </body>
        </html>
    );
}
