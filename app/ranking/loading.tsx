import {Card} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

export default function Loading() {
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
                        <TableRow className="opacity-0 select-none *:p-4">
                            <TableCell className="font-semibold w-[7%] sm:text-base text-sm"></TableCell>
                            <TableCell className="w-[15%]">
                            </TableCell>
                            <TableCell className="sm:w-[30%] w-full">
                            </TableCell>
                            <TableCell className="hidden sm:table-cell w-full">
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <div className="h-300"></div>
            </Card>

            <span className="mt-1 ml-auto rounded-md block h-5 w-54 bg-slate-50 animate-pulse"></span>
        </section>
    )
}