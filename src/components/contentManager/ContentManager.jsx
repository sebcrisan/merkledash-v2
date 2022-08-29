import { Introduction } from '../pages/getstarted/posts/Introduction'
import { SigningUp } from '../pages/getstarted/posts/SigningUp'
import { Verifying } from '../pages/getstarted/posts/Verifying'
import { CreateProject } from '../pages/getstarted/posts/CreateProject'
import { MerkleRoot } from '../pages/getstarted/posts/MerkleRoot'
import { MerkleProof } from '../pages/getstarted/posts/MerkleProof'
import { APIReference } from '../pages/getstarted/posts/APIReference'
import {APIKey} from '../pages/getstarted/posts/APIKey'

export const hashMap = {
    "Introduction": <Introduction/>
    ,"Signing-Up": <SigningUp/>
    , "Verifying-Email": <Verifying/>
    , "Creating-a-Project": <CreateProject/>
    , "API-Key": <APIKey></APIKey>
    , "Get-the-Merkle-Root": <MerkleRoot/>
    , "Get-the-Merkle-Proof": <MerkleProof/>
    , "API-Reference": <APIReference/>
}
