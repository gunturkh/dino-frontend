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

export const rankProgress = (rank: string) => {
    // console.log('rank', rank)
    switch (rank) {
        case 'Hunter':
            return '500'
        case 'Predator':
            return '5000'
        case 'Warrior':
            return '50000'
        case 'Knight':
            return '250000'
        case 'Dominator':
            return '500000'
        case 'Legendary':
            return '1000000'
        default:
            return 'N/A'
    }
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
            return "image/imgJurassicEggIcon1.png"
        case 4:
            return "image/imgJurassicEggIcon2.png"
        default:
            return "image/imgJurassicEggIcon.png"
    }
}