'use client'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {StandingEntry} from "@/lib/types";
import {cn} from "@/lib/utils";
import {Minus} from "lucide-react";
import Image from "next/image";
import {Card} from "@/components/ui/card";
import {useState} from "react";
import {Button} from "@/components/ui/button";

export function RankingTable({ standings }: { standings: StandingEntry[] }) {
    const [standingsLimit, setStandingsLimit] = useState<number>(20);

    const filteredStandings = standings.filter((team: StandingEntry) => {
        return team.standing <= standingsLimit
    })

    const viewAll = () => {
        if (standingsLimit === 20) {
            setStandingsLimit(standings.length)
        } else {
            setStandingsLimit(20)
        }
    }

    return (
        <>
            <Card className="shadow-xs rounded-lg p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="font-medium *:p-4 *:text-muted-foreground">
                            <TableHead>Place</TableHead>
                            <TableHead>Points</TableHead>
                            <TableHead>Team</TableHead>
                            <TableHead className="hidden sm:table-cell">Joueurs</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredStandings.map((team: StandingEntry) => (
                            <TableRow key={team.standing} className="select-none *:p-4">
                                <TableCell className="font-semibold w-[7%] sm:text-base text-sm">{team.standing}.</TableCell>
                                <TableCell className="w-[15%]">
                                    <div className="flex flex-row items-center gap-3 font-semibold">
                                        <div className={cn("text-xs grid grid-cols-2 gap-1 items-center w-[27px] text-muted-foreground")}>
                                            <Minus className="w-3 h-3" />0
                                        </div>
                                        <p className="sm:text-base text-sm">{team.points}</p>
                                    </div>
                                </TableCell>
                                <TableCell className="sm:w-[30%] w-full">
                                    <div className="flex items-center sm:gap-5 gap-2">
                                        <div className="overflow-hidden sm:w-9 sm:h-9 h-8 w-8 flex justify-center items-center p-1">
                                            {team.logo ? (
                                                <Image src={team.logo} width={64} height={64} alt={`Logo de l'équipe ${team.teamName}`} />
                                            ) : (
                                                <span className="sm:text-base text-sm font-medium font-mono text-muted-foreground">?</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="sm:text-base text-sm">{team.teamName}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell w-full">
                                    <div className="h-full flex items-center">
                                        <p>{team.roster.map((player, i) => (
                                            `${player}${i < team.roster.length - 1 ? ', ' : ''}`
                                        ))}</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            <Button onClick={viewAll} variant="secondary" className="w-full mt-4 cursor-pointer">{standingsLimit === 20 ? 'Voir plus' : 'Voir moins'}</Button>
        </>
    )
}