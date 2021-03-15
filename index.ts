import * as crypto from 'crypto';
import * as transaction from './classes/transaction';
import {Wallet} from "./classes/wallet";
import {Chain} from "./classes/chain";

const satoshi = new Wallet();
const bob = new Wallet();
const jhusdero = new Wallet();
const balam = new Wallet();

const sleep = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const run = async () => {
    let count = 100;
    try {
        while (true) {
            if (count < 1)
                return Promise.resolve();

            await satoshi.sendMoney(100, bob.publicKey);
            await sleep(5000);
            console.log(Chain.instance);
            await bob.sendMoney(4, jhusdero.publicKey);
            await sleep(5000);
            console.log(Chain.instance);
            await jhusdero.sendMoney(100, balam.publicKey);
            await sleep(5000);
            console.log(Chain.instance);
            count--;
        }

    } catch (e) {
        console.log(e);
        return Promise.reject(e);
    }

}


run().then(console.info).catch(console.error);



