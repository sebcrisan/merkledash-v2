import React from 'react'

export const CreateProject = () => {
  return (
    <>
        <div className="leftCol">
            <p>
                <ol>
                    <li>
                        In the sidebar, click <b>Projects</b>.
                    </li>
                    <li>
                        At the top right, click the <b>Add New</b> button.
                    </li>
                    <li>
                        Give your project a name.
                    </li>
                    <li>
                        Select the file from your machine that you wish to use for the project by clicking the <b>Choose File</b> button. Accepted files: <b>.txt, .json, .csv</b>
                    </li>
                    <li>
                        A preview of what the data will look like will be shown. For now, the parser is not very flexible until more people are using the project.
                        Your best bet would be to use a .txt file, but you're welcome to try the other file formats.
                        <ol type='a'>
                            <li>For <b>.txt</b> files: Every row should contain one value. For example,<br></br>
                                <code>
                                ae8fac2a5c08f85a7bd630cfc748e1d0
                                <br></br>
                                b94982b5e341f6c15edace6307fa5a50
                                <br></br>
                                0ea89bfae0e6b41881456f6a84a29ba0
                                </code>
                            </li>
                            <li>For <b>.json</b> files: Must have a data key with an array containing the data as value. For example,<br></br>
                                <code>
                                &#123;
                                    "data": &#91; ae8fac2a5c08f85a7bd630cfc748e1d0, b94982b5e341f6c15edace6307fa5a50, 0ea89bfae0e6b41881456f6a84a29ba0 &#93;
                                &#125;
                                </code>
                            </li>
                            <li>
                                For <b>.csv</b> files: The first line has to include the header&#40;s&#41;. The delimiter has to be a comma. All data has to be in the first column.
                                <br></br><br></br>
                                <b>Note: If you're using multiple headers, only the first column will be saved!</b>
                                <br></br><br></br>
                                For example,<br></br>
                                <code>
                                address<br></br>
                                ae8fac2a5c08f85a7bd630cfc748e1d0
                                <br></br>
                                b94982b5e341f6c15edace6307fa5a50
                                <br></br>
                                0ea89bfae0e6b41881456f6a84a29ba0
                                </code>
                            </li>
                        </ol>
                    </li>
                    <li>
                                Once your file has been selected and you have a project name, click the <b>Create Project</b> button to save your project.
                            </li>
                            <li>
                                You can then view your project by clicking <b>View Project</b> in the success message.
                            </li>
                </ol>
            </p>
        </div>
        <div className="rightCol">
            
        </div>
    </>
  )
}
