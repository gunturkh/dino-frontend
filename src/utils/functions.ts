import { Rank } from "./store"

export const rankRequalification = (rank: string) => {
    // console.log('rank', rank)
    switch (rank) {
        case 'Hunter':
            return 'N/A'
        case 'Predator':
            return '500'
        case 'Warrior':
            return '2000'
        case 'Knight':
            return '10000'
        case 'Dominator':
            return '20000'
        case 'Legendary':
            return '50000'
        default:
            return 'N/A'
    }
}

export const rankProgress = ({ rank }: { rank: Rank }) => {
    // console.log('rank', rank)
    switch (rank) {
        case 'Hunter':
            return '5000'
        case 'Predator':
            return '50000'
        case 'Warrior':
            return '250000'
        case 'Knight':
            return '500000'
        case 'Dominator':
            return '1000000'
        case 'Legendary':
            return '1000000'
        default:
            return 'N/A'
    }
}

export const requalificationRankProgress = ({ rank }: { rank: Rank }) => {
    // console.log('rank', rank)
    switch (rank) {
        case 'Hunter':
            return '500'
        case 'Predator':
            return '2000'
        case 'Warrior':
            return '10000'
        case 'Knight':
            return '20000'
        case 'Dominator':
            return '500000'
        case 'Legendary':
            return '500000'
        default:
            return 'N/A'
    }
}

export const maxRankValue = ({ group }: { group: number }) => {
    // console.log('rank', rank)
    if (group <= 5000) return '5000'
    if (group > 5000 && group <= 50000) return '50000'
    if (group > 50000 && group <= 250000) return '250000'
    if (group > 250000 && group <= 500000) return '500000'
    if (group > 500000 && group <= 1000000) return '1000000'
    if (group > 1000000 && group <= 1000000000000) return 'MAX'
}

export const rankLoaderBarProgress = (rank: string) => {
    // console.log('rank', rank)
    switch (rank) {
        case 'Hunter':
            return ['Hunter', 'Predator']
        case 'Predator':
            return ['Predator', 'Warrior']
        case 'Warrior':
            return ['Warrior', 'Knight']
        case 'Knight':
            return ['Knight', 'Dominator']
        case 'Dominator':
            return ['Dominator', 'Legendary']
        case 'Legendary':
            return ['Legendary', '-']
        default:
            return ['Hunter', 'Predator']
    }
}

export const eggType = (ticket: number) => {
    console.log('ticket', ticket)
    switch (ticket) {
        case 1:
            return "image/imgJurassicEggIcon.png"
        case 2:
            return "image/imgJurassicEggIcon2.png"
        case 4:
            return "image/imgJurassicEggIcon1.png"
        default:
            return "image/imgJurassicEggIcon.png"
    }
}