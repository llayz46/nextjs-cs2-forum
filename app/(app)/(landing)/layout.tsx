import RankingTop5 from "@/components/ranking-top-5";
import { buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ReactNode, Suspense } from "react";

export default function Layout({
    children,
}: Readonly<{ children: ReactNode }>) {
    return (
        <>
            <Card className="shadow-xs rounded-lg p-0 max-w-xs w-full h-fit gap-0 font-sans">
                <CardHeader className="border-b !p-3">
                    <CardTitle>Classement Valve</CardTitle>
                </CardHeader>
                <CardContent className="!p-0">
                    <Suspense fallback={<div>Loading...</div>}>
                        <RankingTop5 />
                    </Suspense>
                </CardContent>
                <CardFooter className="border-t !p-0">
                    <Link
                        href="/ranking"
                        className={`${buttonVariants({
                            variant: "link",
                        })} mx-auto`}
                    >
                        Voir plus
                    </Link>
                </CardFooter>
            </Card>

            {children}

            <Card className="shadow-xs rounded-lg p-0 max-w-xs w-full h-fit gap-0 font-sans">
                <CardHeader className="border-b !p-3">
                    <CardTitle>Activité récente</CardTitle>
                </CardHeader>
                <CardContent className="!p-0">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <article
                            key={i}
                            className="flex gap-3 p-3.5 items-center not-last:border-b pointer-events-none"
                        >
                            <div className="flex overflow-hidden text-ellipsis flex-1 relative z-10">
                                <p className="line-clamp-1">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Article {i}
                                </p>
                            </div>
                            <div className="text-sm text-text-light z-10">
                                {i}
                            </div>
                        </article>
                    ))}
                </CardContent>
            </Card>
        </>
    );
}
