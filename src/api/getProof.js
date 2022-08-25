import {MerkleTree} from "merkletreejs";
import keccak256 from "keccak256";

export const getProof = (input, addresses) => {
    const address = input.toLowerCase();
    const addressesLowerCase = addresses.map(addr => addr.toLowerCase());
    const leafNodes = addresses.map(addr => keccak256(addr.toLowerCase()));
    const merkleTree = new MerkleTree(leafNodes, keccak256, {sortPairs: true});
    let index = addressesLowerCase.indexOf(address);
    let hexProof = [];
        if (index > -1) {
            //if in whitelist, check if hashed address equals result of index in leaf nodes
            const claimingAccount = leafNodes[index];
            hexProof = merkleTree.getHexProof(claimingAccount);
        }
    return hexProof;
}

