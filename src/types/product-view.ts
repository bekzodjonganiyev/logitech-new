export type ParametrsAndActionsType = {
    className?: string,
    infoList?: {name: string, value: string}[],
    addToFavourite?: Function,
    addToCompare?: Function,
    addToCart?: Function,
    buyOneClick?: Function,
}

export type TitleAndColorsType = {
    className?: string,
    colors: {name: string, value: string}[]
}