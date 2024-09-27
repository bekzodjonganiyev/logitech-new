const baseUrl = "https://api.logitech.uz/api/v1"

export async function fetcher(url: string, options: RequestInit = {}): Promise<any> {
    const response = await fetch(baseUrl + url, options);
    
    if (!response.ok) {
        // throw new Error(`An error occurred: ${response.statusText}`);
        console.error(`An error occurred: ${response.statusText}`);
        return null;
    }
    
    const data = await response.json();
    return data;
}
export async function fetcherWithType<T>(url: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(baseUrl + url, options);
    
    if (!response.ok) {
        // throw new Error(`An error occurred: ${response.statusText}`);
        console.error(`An error occurred: ${response.statusText}`);
        return null as T;
    }
    
    const data = await response.json();
    return data;
}
