import * as crypto from 'crypto';
import {Transaction} from "./transaction";
import {Chain} from "./chain";

class Wallet {
    public publicKey: string; // for receiving money ::
    public privateKey: string; // for spending money ::

    constructor() {
        const keyPair = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {type: 'spki', format: 'pem'},
            privateKeyEncoding: {type: 'pkcs8', format: 'pem'}
        });

        this.privateKey = keyPair.privateKey;
        this.publicKey = keyPair.publicKey;
    }

    async sendMoney(amount: number, payeePublicKey: string) {
        try {
            const transaction: Transaction = new Transaction(amount, this.publicKey, payeePublicKey);
            const sign = crypto.createSign('SHA256');
            sign.update(transaction.toString()).end();
            const signature: Buffer = sign.sign(this.privateKey);
            return Chain.instance.addBlock(transaction, this.publicKey, signature);
        } catch (e) {
            console.log(e);
        }
    }
}

export {Wallet};
