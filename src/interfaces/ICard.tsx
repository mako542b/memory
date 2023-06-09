export interface ICard {
    position: number,
    state: 'closed' | 'opened' | 'matched' | 'closing',
    pairName: number,
    images: string[],
    matched: boolean,
    rnd: number,
    key: string,
}
