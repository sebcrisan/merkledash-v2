import React from 'react'

export const MerkleProof = () => {
  return (
    <>
        <div className="leftCol">
            <ol>
                <li>
                    In the sidebar, click on <b>Projects</b>
                </li>
                <li>
                    To view a project, click on <b>View</b> in the actions tab. You can also choose to delete projects by clicking the delete button.
                </li>
                <li>
                    You will be taken to the project page with the project data. To get the merkle proof of the project, first enter a value that you want the proof of in the input field.
                </li>
                <li>
                    Click on the <b>Get Proof</b> button. The proof will be displayed if it is found. By default, it will say no proof has been found. It will also say this if... no proof has been found.
                    <br></br><br></br><b>Note: Very large proofs may break the page, it is advised to use the API in this case &#128517;</b>
                </li>
            </ol>
        </div>
        <div className="rightCol">
        </div>
    </>
  )
}
