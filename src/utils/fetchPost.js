export const fetchPost = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    const test = await response.json();
    if (!response.ok) {
        throw new Error (test)
    }
    return test;
}