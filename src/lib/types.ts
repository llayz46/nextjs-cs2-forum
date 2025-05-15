export interface RosterDetails {
    teamName: string;
    roster: string[];
    globalRank: number;
    region: string;
    regionalRank: number;
    finalRankValue: number;
    startingRankValue: number;
    headToHeadAdjustments: number;
    factors: Factors;
    matches: Match[];
    topTenWinnings: Winnings[];
}

export interface Factors {
    bountyOffered: number;
    bountyCollected: number;
    opponentNetwork: number;
    lanWins: number;
    average: number;
}

export interface Match {
    matchPlayed: number;
    matchId: number;
    date: string;
    opponent: string;
    result: string;
    roster: string[];
}

export interface Winnings {
    eventDate: string;
    ageWeight: number;
    prizeWinnings: string;
    scaledWinnings: string;
}

export interface StandingEntry {
    standing: number;
    points: number;
    teamName: string;
    roster: string[];
    logo?: string;
}

export interface Team {
    id: number;
    name: string;
    location: string;
    players: object[];
    slug: string;
    modified_at: string;
    acronym?: string;
    image_url?: string;
    current_videogame: {
        id: number;
        name: string;
        slug: string;
    }
}