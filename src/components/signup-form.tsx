"use client";

import { useState } from "react";
import { toast } from "sonner";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
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
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Loader2, X } from "lucide-react";
import Image from "next/image";

export function SignupForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setImage(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Créer un compte</CardTitle>
                    <CardDescription>
                        Entrez vos informations ci-dessous pour créer votre
                        compte
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="pseudo">Pseudo</Label>
                            <Input
                                id="pseudo"
                                type="text"
                                placeholder="Pseudonyme"
                                required
                                onChange={(e) => {
                                    setPseudo(e.target.value);
                                }}
                                value={pseudo}
                            />
                        </div>
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
                            <Label htmlFor="password">Mot de passe</Label>
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
                        <div className="grid gap-2">
                            <Label htmlFor="passwordConfirmation">
                                Confirmer le mot de passe
                            </Label>
                            <Input
                                id="passwordConfirmation"
                                type="password"
                                required
                                autoComplete="new-password"
                                onChange={(e) => {
                                    setPasswordConfirmation(e.target.value);
                                }}
                                value={passwordConfirmation}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="image">
                                Photo de profil (optionnel)
                            </Label>

                            <div className="flex items-end gap-4">
                                {imagePreview && (
                                    <div className="relative w-16 h-16 rounded-sm overflow-hidden">
                                        <Image
                                            src={imagePreview}
                                            alt="Profile preview"
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                )}
                                <div className="flex items-center gap-2 w-full">
                                    <Input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="w-full"
                                    />
                                    {imagePreview && (
                                        <X
                                            className="cursor-pointer"
                                            onClick={() => {
                                                setImage(null);

                                                setImagePreview(null);
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                            onClick={async () => {
                                await signUp.email({
                                    email,
                                    password,
                                    name: pseudo,
                                    image: image
                                        ? await convertImageToBase64(image)
                                        : "",
                                    callbackURL: "/",
                                    fetchOptions: {
                                        onResponse: () => {
                                            setLoading(false);
                                        },
                                        onRequest: () => {
                                            setLoading(true);
                                        },
                                        onError: (ctx) => {
                                            toast.error(ctx.error.message);
                                        },
                                        onSuccess: async () => {
                                            router.push("/");
                                        },
                                    },
                                });
                            }}
                        >
                            {loading ? (
                                <Loader2 size={16} className="animate-spin" />
                            ) : (
                                "Créer un compte"
                            )}
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Déjà un compte ?{" "}
                        <Link
                            href="/login"
                            className="underline underline-offset-4"
                        >
                            Se connecter
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

async function convertImageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
