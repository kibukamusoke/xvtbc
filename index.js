"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wallet_1 = require("./classes/wallet");
const chain_1 = require("./classes/chain");
const satoshi = new wallet_1.Wallet();
const bob = new wallet_1.Wallet();
const jhusdero = new wallet_1.Wallet();
const balam = new wallet_1.Wallet();
const sleep = async (ms) => new Promise(resolve => setTimeout(resolve, ms));
const run = async () => {
    let count = 100;
    try {
        while (true) {
            if (count < 1)
                return Promise.resolve();
            await satoshi.sendMoney(100, bob.publicKey);
            await sleep(5000);
            console.log(chain_1.Chain.instance);
            await bob.sendMoney(4, jhusdero.publicKey);
            await sleep(5000);
            console.log(chain_1.Chain.instance);
            await jhusdero.sendMoney(100, balam.publicKey);
            await sleep(5000);
            console.log(chain_1.Chain.instance);
            count--;
        }
    }
    catch (e) {
        console.log(e);
        return Promise.reject(e);
    }
};
run().then(console.info).catch(console.error);
