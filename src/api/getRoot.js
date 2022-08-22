const {MerkleTree} = require('merkletreejs');
const keccak256 = require('keccak256');

const getRoot = (addresses) => {
    const leafNodes = addresses.map(addr => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, {sortPairs: true});
    const rootHash = merkleTree.getRoot().toString('hex');
    return rootHash;
}

module.exports = getRoot;


