import { RankingTable } from "@/components/ranking-table";
import { getValveRanking } from "@/lib/utils";

export default function Ranking() {
    const dataPromise = getValveRanking()

    return (
        <section className="max-w-5xl mx-auto font-sans">
            <h1 className="text-2xl font-medium">Le classement officiel Valve (VRS : Valve Ranking System)</h1>
            <h3 className="text-lg text-muted-foreground mt-2 mb-6">
                Ce classement est mis à jour mensuellement par Valve et
                reflète les performances récentes des équipes professionnelles de Counter-Strike selon leur système de
                points propriétaire.
            </h3>

            <RankingTable dataPromise={dataPromise} />
        </section>
    )
}
