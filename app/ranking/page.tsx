import { RankingTable } from "@/components/ranking-table";

export default async function Ranking() {
    const res = await fetch(`${process.env.APP_URL}/api/valve/ranking`)

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

            <RankingTable standings={data.standings} />

            <p className="mt-1 text-right text-sm text-muted-foreground">Dernière mise à jour : {formattedDate}</p>
        </section>
    )
}
