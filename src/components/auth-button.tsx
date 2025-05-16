"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export default function AuthButton() {
    const { data: session, isPending, error } = useSession();
    const router = useRouter();

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
        );
    }

    const handleSignOut = () => {
        signOut();
        toast.success("Vous êtes déconnecté");
        router.push("/login");
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    {session.user.image && (
                        <AvatarImage src={session.user.image} />
                    )}
                    <AvatarFallback>
                        {session.user.name?.charAt(0)}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    <p className="text-sm font-medium">{session.user.name}</p>
                    <p className="text-xs text-muted-foreground">
                        {session.user.email}
                    </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleSignOut}
                >
                    Déconnexion
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
