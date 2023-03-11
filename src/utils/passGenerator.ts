export default function createPass(length: number): string {
    let result: string = '';
    let characters: string = 'abcdfghijklmnñopqrstuvwxyz01234567890123456789';
    let charactersLength: number = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

