export type APIHouseListed = {
    id: number,
    address: string,
    homeowner: string,
    price: number
    photoURL: string
}

export type GetHouses = {
    houses: APIHouseListed[]
}