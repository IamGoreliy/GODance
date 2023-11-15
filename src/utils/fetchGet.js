export const fetchGet = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data);
    }
    return data;
}