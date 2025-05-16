'use client'

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Connexion</CardTitle>
                    <CardDescription>
                        Entrez votre email ci-dessous pour vous connecter à
                        votre compte
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="mail@exemple.com"
                                    required
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    value={email}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">
                                        Mot de passe
                                    </Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Mot de passe oublié ?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    value={password}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={loading}
                                onClick={async () => {
                                    await signIn.email(
                                        {
                                            email,
                                            password,
                                            callbackURL: "/",
                                        },
                                        {
                                            onRequest: () => {
                                                setLoading(true);
                                            },
                                            onResponse: () => {
                                                setLoading(false);
                                            },
                                            onError: (ctx) => {
                                                toast.error(ctx.error.message);
                                            }
                                        }
                                    );
                                }}
                            >
                                {loading ? (
                                    <Loader2
                                        size={16}
                                        className="animate-spin"
                                    />
                                ) : (
                                    "Connexion"
                                )}
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Pas de compte ?{" "}
                            <Link
                                href="/signup"
                                className="underline underline-offset-4"
                            >
                                Créer un compte
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
