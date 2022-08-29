import React from 'react'
import { MerkleProofAPIRef } from './MerkleProofAPIRef'
import { MerkleRootAPIRef } from './MerkleRootAPIRef'
export const APIReference = () => {
  return (
    <div>
        <MerkleRootAPIRef></MerkleRootAPIRef>
        <MerkleProofAPIRef></MerkleProofAPIRef>
    </div>
  )
}
