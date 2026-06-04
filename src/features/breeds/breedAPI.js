export const fetchBreedsAPI = async () => {
    const response = await fetch(
        "https://dogapi.dog/api/v2/breeds"
    );

    if (!response.ok) {
        throw new Error("Failed to fetch breeds");
    }

    return response.json();
};