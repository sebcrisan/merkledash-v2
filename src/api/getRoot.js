import {MerkleTree} from "merkletreejs";
import keccak256 from "keccak256";

export const getRoot = (addresses) => {
    const leafNodes = addresses.map(addr => keccak256(addr.toLowerCase()));
    const merkleTree = new MerkleTree(leafNodes, keccak256, {sortPairs: true});
    const rootHash = merkleTree.getRoot().toString('hex');
    return rootHash;
}

