import { StandingEntry } from "@/lib/types";
import { getValveRanking } from "@/lib/utils";
import Image from "next/image";

export default async function RankingTop5() {
    const data = await getValveRanking();

    return (
        <>
            {data.standings
                .slice(0, 5)
                .map((team: StandingEntry) => (
                    <div
                        key={team.standing}
                        className="flex gap-3 py-2 items-center not-last:border-b px-3 pointer-events-none"
                    >
                        <p className="w-3">{team.standing}.</p>
                        <div className="flex gap-3 items-center w-9 justify-center">
                            <div className="overflow-hidden h-9 flex justify-center items-center p-1 w-full">
                                {team.logo ? (
                                    <Image
                                        src={team.logo}
                                        width={64}
                                        height={64}
                                        alt={`Logo de l'équipe ${team.teamName}`}
                                    />
                                ) : (
                                    <span className="sm:text-base text-sm font-medium font-mono text-muted-foreground">
                                        ?
                                    </span>
                                )}
                            </div>
                        </div>
                        <p className="flex-1 col-span-2 overflow-hidden text-ellipsis whitespace-nowrap">
                            {team.teamName}
                        </p>
                        <p className="text-right font-semibold">
                            {team.points}
                        </p>
                    </div>
                ))}
        </>
    )
}