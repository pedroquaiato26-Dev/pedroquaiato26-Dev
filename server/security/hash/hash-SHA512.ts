import crypto from 'crypto';

export function createHashSHA256(password: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex'); 
}

