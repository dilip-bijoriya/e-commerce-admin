export function getBase64FromImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            resolve(reader.result?.toString() || '')
        };
        reader.onerror = function (error) {
            reject(error);
        };
    });
}

export async function getBase64FromImages(files: File[]) {
    const arr: string[] = [];
    for (let file of files) {
        const img = await getBase64FromImage(file).catch(e => undefined);
        if (img) {
            arr.push(img);
        }
    }
    return arr;
}