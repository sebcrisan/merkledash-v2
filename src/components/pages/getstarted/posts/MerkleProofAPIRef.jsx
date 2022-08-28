import React from 'react'

export const MerkleProofAPIRef = () => {
  return (
    <div className='apiRefContainer'>
        <div className="leftCol">
        <h3>Merkle Proof</h3>
            <p>Use this to retrieve the computed Merkle Proof of the data in your project.</p>
        </div>
        <div className="rightCol">
            <div className="snippetContainer">
                <div className="snippetHeader">
                    ENDPOINTS
                </div>
                <div className="snippetBody">
                    <code>GET</code><pre>/v1/:projectName/proof/:address/:key</pre>
                </div>
            </div>
        </div>
    </div>
  )
}
