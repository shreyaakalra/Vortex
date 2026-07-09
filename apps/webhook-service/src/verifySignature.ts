// making this to verify if its truly the bank that's sending the webhook
import crypto from "crypto";

export function computeSignature(payload: string, secret:string) : string {
    return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

export function verifySignature(payload: string, receivedSignature: string, secret: string ): boolean{
    const expectedSignature = computeSignature(payload, secret);

    const expectedBuffer = Buffer.from(expectedSignature);
    const receivedBuffer = Buffer.from(receivedSignature);

    if(expectedBuffer.length !== receivedBuffer.length){
        return false;
    }

    return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
}

