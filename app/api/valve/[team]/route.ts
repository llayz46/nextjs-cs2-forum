import { NextResponse } from 'next/server'
import { parseRosterDetails } from '@/lib/valve'
import { RosterDetails } from "@/lib/types";

type CacheType = {
    [team: string]: {
        timestamp: number
        details: RosterDetails
        date: string
    }
}

type TeamFile = {
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

const cache: CacheType = {}
const CACHE_TTL = 60 * 5 * 1000

const GITHUB_API = `https://api.github.com/repos/ValveSoftware/counter-strike_regional_standings/contents/live/${new Date(Date.now()).getFullYear()}/details`

export async function GET(req: Request, { params }: { params: { team: string } }) {
    const { team } = params

    const cached = cache[team]
    const now = Date.now()

    if (cached && now - cached.timestamp < CACHE_TTL) {
        return NextResponse.json({ date: cached.date, ...cached.details })
    }

    try {
        const dirRes = await fetch(GITHUB_API)
        const dirs = await dirRes.json()

        const dateFolders = dirs
            .filter((d: TeamFile) => d.type === 'dir' && /^\d{4}_\d{2}_\d{2}$/.test(d.name))
            .map((d: TeamFile) => d.name)
            .sort()
            .reverse()

        if (dateFolders.length === 0) {
            return NextResponse.json({ error: 'Aucune date trouvée' }, { status: 404 })
        }

        let rawText: string | null = null
        let lastWorkingDate: string = ''

        const latestDate = dateFolders[0]

        const dirUrl = `${GITHUB_API}/${latestDate}`;
        const response = await fetch(dirUrl);
        const files = await response.json();

        const teamFile = files.find((file: TeamFile) => file.name.includes(team));

        const url = `https://raw.githubusercontent.com/ValveSoftware/counter-strike_regional_standings/refs/heads/main/${teamFile.path}`
        const res = await fetch(url)

        if (res.ok) {
            rawText = await res.text()
            lastWorkingDate = latestDate
        }

        if (!rawText) {
            return NextResponse.json({ error: 'Fichier introuvable pour cette équipe' }, { status: 404 })
        }

        const details = parseRosterDetails(rawText)

        cache[team] = {
            timestamp: now,
            details,
            date: lastWorkingDate,
        }

        return NextResponse.json({ date: lastWorkingDate, ...details })
    } catch (err: unknown) {
        if (err instanceof Error) {
            return NextResponse.json({ error: err.message }, { status: 500 })
        }

        console.error('An unexpected error occurred:', err);
    }
}
