function dateFormatter(args: string) {
    const date = new Date(args);
    const kun = String(date.getDate()).padStart(2, "0");
    const oy = String(date.getMonth() + 1).padStart(2, "0");
    const soat = String(date.getHours()).padStart(2, "0");
    const minut = String(date.getMinutes()).padStart(2.0);
    const yil = date.getFullYear();

    return `${kun}.${oy}.${yil}`;
}