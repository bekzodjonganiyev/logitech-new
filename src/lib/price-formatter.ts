export function priceFormatter(price: number, isUzs: boolean): string {
    const uzs = Math.round(price/1000)*1000
    return new Intl.NumberFormat("uz-UZ", { style: "decimal" })
        .format(isUzs ? uzs : price)
        .replace(/\,/g, " ");
}
    
  