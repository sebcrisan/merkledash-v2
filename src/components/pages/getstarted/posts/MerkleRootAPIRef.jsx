import React from 'react'

export const MerkleRootAPIRef = () => {
  return (
    <div className='apiRefContainer'>
        <div className="leftCol">
        <h3>Merkle Root</h3>
            <p>Use this to retrieve the computed Merkle Root of the data in your project.</p>
        </div>
        <div className="rightCol">
            <div className="snippetContainer">
                <div className="snippetHeader">
                    ENDPOINTS
                </div>
                <div className="snippetBody">
                    <code>GET</code><pre>/v1/:projectName/root/:key</pre>
                </div>
            </div>
            <div className="snippetContainer">
                <div className="snippetHeader">
                    RETURNS
                </div>
                <div className="snippetBody">
                    <code>200</code><pre>&#123;"root": string&#125;</pre>
                </div>
            </div>
        </div>
    </div>
  )
}
