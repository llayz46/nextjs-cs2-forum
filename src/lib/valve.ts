import {Factors, Match, RosterDetails, StandingEntry, Winnings} from "@/lib/types"
import {encodeButKeepSpaces} from "@/lib/utils";

const EXCLUDED_NAMES = ["The MongolZ", "Aurora", "HEROIC", "Falcons", "BetBoom", "The Huns"]
const UNMODIFIED_NAMES = ['TheMongolz', 'Aurora Gaming', 'Heroic', 'Team Falcons', 'BetBoom Team', 'The Huns Esports']

/**
 * Parse le contenu brut Markdown (sans front-matter) en RosterDetails
 */
export function parseRosterDetails(raw: string): RosterDetails {
    function once(regex: RegExp, idx = 1, def = ''): string {
        const m = regex.exec(raw)
        return m?.[idx] ?? def
    }
    function onceNum(regex: RegExp, idx = 1): number {
        return parseFloat(once(regex, idx, '0'))
    }

    raw = raw.replace(/<br\s*\/?>/g, '\n')
    const teamName = once(/Team Name:\s*(.+)/)
    const roster = once(/Roster:\s*(.+)/).split(/,\s*/)
    const globalRank = parseInt(once(/Global Rank:\s*\[(\d+)]/), 10)
    const region = once(/Region:\s*\[(.+?)]/)
    const regionalRank = parseInt(once(/Regional Rank:\s*\[(\d+)]/), 10)
    const finalRankValue = onceNum(/Final Rank Value:\s*([\d.]+)/)
    const startingRankValue = onceNum(/Starting Rank Value.*?([\d.]+)/)
    const headToHeadAdjustments = onceNum(/Head To Head Adjustments.*?([\d.]+)/)

    const factors: Factors = {
        bountyOffered: onceNum(/Bounty Offered:\s*([\d.]+)/),
        bountyCollected: onceNum(/Bounty Collected:\s*([\d.]+)/),
        opponentNetwork: onceNum(/Opponent Network:\s*([\d.]+)/),
        lanWins: onceNum(/LAN Wins:\s*([\d.]+)/),
        average: onceNum(/average of these factors is\s*([\d.]+)/i),
    }

    const matches: Match[] = []
    const matchRe =
        /\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*([\d-]+)\s*\|\s*([^|]+?)\s*\|\s*([WL])\s*\|\s*([\d.]+)\s*\|\s*([\d.-]+|-) ?(?:\([\d.-]+\))?\s*\|\s*([\d.-]+|-) ?(?:\([\d.-]+\))?\s*\|\s*([\d.-]+|-) ?(?:\([\d.-]+\))?\s*\|\s*([\d.-]+|-) ?(?:\([\d.-]+\))?\s*\|\s*([\d.-]+|-)?\s*\|\s*([^|]+?)\s*\|/g
    let m: RegExpExecArray | null
    while ((m = matchRe.exec(raw))) {
        matches.push({
            matchPlayed: +m[1],
            matchId: +m[2],
            date: m[3],
            opponent: m[4].trim(),
            result: m[5] as 'W' | 'L',
            roster: m[12]?.trim().split(',').map(p => p.trim()).filter(Boolean) ?? []
        })
    }

    const topTenWinnings: Winnings[] = []
    const winRe = /\|\s*([\d-]+)\s*\|\s*([\d.]+)\s*\|\s*\$(.+?)\s*\|\s*\$(.+?)\s*\|/g
    let w: RegExpExecArray | null
    while ((w = winRe.exec(raw))) {
        topTenWinnings.push({
            eventDate: w[1],
            ageWeight: +w[2],
            prizeWinnings: w[3],
            scaledWinnings: w[4],
        })
    }

    return {
        teamName,
        roster,
        globalRank,
        region,
        regionalRank,
        finalRankValue,
        startingRankValue,
        headToHeadAdjustments,
        factors,
        matches,
        topTenWinnings,
    }
}

export async function parseStandings(raw: string): Promise<StandingEntry[]> {
    const teamsName = new Set<string>();

    const lines = raw.split('\n');

    const result: StandingEntry[] = [];

    for (const line of lines) {
        const match = line.match(/^\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|/);

        if (match) {
            const standing = parseInt(match[1], 10);
            const points = parseInt(match[2], 10);
            const teamName = match[3].trim();
            const roster = match[4].split(',').map(player => player.trim());

            teamsName.add(teamName);

            result.push({ standing, points, teamName, roster });
        }
    }

    const allTeamNames = new Set([
        ...Array.from(teamsName),
        ...UNMODIFIED_NAMES
    ]);

    const chunks = chunkArray(Array.from(allTeamNames), 20);

    const teamResponses = await Promise.all(
        chunks.map(chunk => fetchTeamsFromNames(new Set(chunk)))
    );

    const allTeams = teamResponses.flat();

    return result.map(entry => {
        let normalizedEntryTeamName = ''

        if (EXCLUDED_NAMES.includes(entry.teamName)) {
            const index = EXCLUDED_NAMES.indexOf(entry.teamName)
            if (index !== -1) {
                normalizedEntryTeamName = UNMODIFIED_NAMES[index]
            }
        } else {
            normalizedEntryTeamName = encodeButKeepSpaces(entry.teamName)
        }

        const match = allTeams.find(team =>
            encodeButKeepSpaces(team.name) === encodeButKeepSpaces(normalizedEntryTeamName)
        )

        return {
            ...entry,
            logo: match?.image_url ?? null
        };
    });
}

export async function fetchTeamsFromNames(teamsName: Set<string>) {
    const teamNamesArray = Array.from(teamsName)
    const encodedNames = teamNamesArray
        .filter(name => !EXCLUDED_NAMES.includes(name))
        .map(name => encodeButKeepSpaces(name))
        .join(',')

    const url = `https://api.pandascore.co/csgo/teams?filter[name]=${encodedNames}`

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${process.env.PANDASCORE_API_KEY}`
        }
    })

    if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`)
    }

    return await response.json()
}

function chunkArray(arr: string[], size: number): string[][] {
    const chunks = []

    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size))
    }

    return chunks
}
