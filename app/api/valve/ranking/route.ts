import { NextResponse } from 'next/server'
import { parseStandings } from "@/lib/valve";

type Standings = {
    name: string
    path: string
    sha: string
    size: number
    url: string
    html_url: string
    git_url: string
    download_url: string
    type: string
    _links: {
        self: string
        git: string
        html: string
    }
}

const GITHUB_API = `https://api.github.com/repos/ValveSoftware/counter-strike_regional_standings/contents/live/${new Date(Date.now()).getFullYear()}`

export async function GET() {
    try {
        const dirRes = await fetch(GITHUB_API)
        const dirs = await dirRes.json()

        const standingsFilesSorted = dirs
            .filter((d: Standings) => d.type === 'file' && /^standings_global_\d{4}_\d{2}_\d{2}\.md$/.test(d.name))
            .map((d: Standings) => d.name)
            .sort()
            .reverse()

        if (standingsFilesSorted.length === 0) {
            return NextResponse.json({ error: 'Aucune date trouvée' }, { status: 404 })
        }

        let rawText: string | null = null
        let lastWorkingDate: string = ''

        const fileName = standingsFilesSorted[0]

        const dirUrl = `${GITHUB_API}/${fileName}`;
        const response = await fetch(dirUrl);
        const file = await response.json();

        const url = `https://raw.githubusercontent.com/ValveSoftware/counter-strike_regional_standings/refs/heads/main/${file.path}`
        const res = await fetch(url)

        if (res.ok) {
            rawText = await res.text()
            lastWorkingDate = file.name.match(/\d{4}_\d{2}_\d{2}/)[0]
        }

        if (!rawText) {
            return NextResponse.json({ error: 'Données introuvable...' }, { status: 404 })
        }

        const details = parseStandings(rawText)

        return NextResponse.json({ date: lastWorkingDate, standings: details })
    } catch (err: unknown) {
        if (err instanceof Error) {
            return NextResponse.json({ error: err.message }, { status: 500 })
        }

        console.error('An unexpected error occurred:', err);
    }
}