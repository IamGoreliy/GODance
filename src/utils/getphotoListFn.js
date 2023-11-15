export const getphotoListFn = async (url) => {
    const response = await fetch(url);
    return response.json();
}

