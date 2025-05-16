"use client";

import { useSession, signOut } from "@/lib/auth-client";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function AuthButton() {
    const { data: session, isPending, error } = useSession();

    if (isPending) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error.message}</p>;

    if (!session?.user) {
        return (
            <Link 
                className={buttonVariants({ variant: "outline" })} 
                href="/login"
            >
                Se connecter
            </Link>
        )
    }

    return (
        <Link 
            className={buttonVariants({ variant: "outline" })} 
            href="/login"
            onClick={() => {
                signOut();
            }}
        >
            Déconnexion
        </Link>
    );
}
