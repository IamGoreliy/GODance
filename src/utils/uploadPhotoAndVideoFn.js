export const uploadPhotoAndVideoFn = async (url, formData) => {
    const response = await fetch(url, {
        method: 'POST',
        body: formData,
    });
    return await response.json();
}