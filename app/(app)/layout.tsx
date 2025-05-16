import { buttonVariants } from "@/components/ui/button";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { ReactNode } from "react";
import "../globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <header className="flex items-center justify-between font-mono px-8 py-3 bg-black">
                    <Link href="/" className="text-slate-50 text-xl font-medium">CS2 Forum</Link>

                    <nav>
                        <ul className="flex gap-2 items-center **:text-slate-50">
                            <li>
                                <Link className={buttonVariants({ variant: "link" })} href="/">Actualités</Link>
                            </li>
                            <li>
                                <Link className={buttonVariants({ variant: "link" })} href="/">Forum</Link>
                            </li>
                            <li>
                                <Link className={buttonVariants({ variant: "link" })} href="/ranking">Classement Valve</Link>
                            </li>
                        </ul>
                    </nav>

                    <Link className={buttonVariants({ variant: "outline" })} href="/login">Se connecter</Link>
                </header>

                <main className="container mx-auto flex gap-6 my-8">
                    {children}
                </main>
            </body>
        </html>
    );
}
