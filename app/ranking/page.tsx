import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { Minus } from "lucide-react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button";
import {StandingEntry} from "@/lib/types";

const teamRankingsData = [
    {
        id: 1,
        rank: 1,
        name: "Phoenix Flames",
        points: 2450,
        pointsChange: 150,
        players: ["Alex Johnson", "Maria Garcia", "James Wilson", "Sarah Chen", "David Kim"],
    },
    {
        id: 2,
        rank: 2,
        name: "Stellar Knights",
        points: 2340,
        pointsChange: 80,
        players: ["Emma Davis", "Michael Brown", "Sophia Martinez", "Daniel Lee", "Olivia Taylor"],
    },
    {
        id: 3,
        rank: 3,
        name: "Thunder Wolves",
        points: 2210,
        pointsChange: -30,
        players: ["William Clark", "Isabella Lopez", "Ethan Wright", "Ava Patel", "Noah Rodriguez"],
    },
    {
        id: 4,
        rank: 4,
        name: "Royal Eagles",
        points: 2150,
        pointsChange: 0,
        players: ["Charlotte Adams", "Benjamin Moore", "Amelia Scott", "Lucas Nguyen", "Mia Jackson"],
    },
    {
        id: 5,
        rank: 5,
        name: "Crimson Dragons",
        points: 2080,
        pointsChange: -45,
        players: ["Henry White", "Lily Thompson", "Jacob Harris", "Sofia Sanchez", "Matthew Lewis"],
    },
    {
        id: 6,
        rank: 6,
        name: "Arctic Foxes",
        points: 1950,
        pointsChange: 65,
        players: ["Abigail Turner", "Sebastian Hall", "Ella Mitchell", "Gabriel Young", "Scarlett Allen"],
    },
    {
        id: 7,
        rank: 7,
        name: "Emerald Titans",
        points: 1820,
        pointsChange: -20,
        players: ["Andrew Carter", "Zoe Phillips", "Samuel Baker", "Chloe Rivera", "Joseph Reed"],
    },
    {
        id: 8,
        rank: 8,
        name: "Shadow Panthers",
        points: 1760,
        pointsChange: 40,
        players: ["Victoria Gray", "Nathan Cooper", "Audrey Foster", "Leo Murphy", "Grace Kelly"],
    },
]

export default async function Ranking() {
    const res = await fetch('http://localhost:3000/api/valve/ranking')

    if (!res.ok) console.log("res c'est pas ok")

    const data = await res.json()

    const formattedDate = new Date(data.date.replace(/_/g, "-")).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    return (
        <section className="my-8 max-w-250 mx-auto font-sans">
            <h1 className="text-2xl font-medium">Le classement officiel Valve (VRS : Valve Ranking System)</h1>
            <h3 className="text-lg text-muted-foreground mt-2 mb-6">
                Ce classement est mis à jour mensuellement par Valve et
                reflète les performances récentes des équipes professionnelles de Counter-Strike selon leur système de
                points propriétaire.
            </h3>

            <Card className="shadow-xs rounded-lg p-0 overflow-hidden">
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
                        {data.standings.slice(0, 20).map((team: StandingEntry) => (
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
                                            <img
                                                alt="Vitality"
                                                className="w-full"
                                                src="https://cdn.pandascore.co/images/team/image/3455/team_vitalitylogo_square.png"
                                            />
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

            <Button variant="secondary" className="w-full mt-4 cursor-pointer">Voir plus</Button>

            <p className="mt-1 text-right text-sm text-muted-foreground">Dernière mise à jour : {formattedDate}</p>
        </section>
    )
}
