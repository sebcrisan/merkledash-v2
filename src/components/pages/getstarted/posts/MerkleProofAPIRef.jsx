import React from 'react'
import "./merkleProofAPIRef.scss";

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
                    <code>GET</code><pre>https://merkle-api.onrender.com/v1/:projectName/proof/:address/:key</pre>
                </div>
            </div>
            <div className="snippetContainer">
                <div className="snippetHeader">
                    RETURNS
                </div>
                <div className="snippetBody">
                    <code>200</code><pre>&#123;"proof": string&#91;&#93;&#125;</pre>
                </div>
            </div>
        </div>
    </div>
  )
}
