export const uploadPhotoFn = async (formData) => {
    const response = await fetch('http://localhost:3001/addPhotoTest', {
        method: 'POST',
        body: formData,
    });
    return await response.json();
}