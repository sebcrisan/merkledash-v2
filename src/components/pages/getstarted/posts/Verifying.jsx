import React from 'react'
import verifyMsg from "../../../../assets/images/verifyMsg.png";
import verifySuccess from "../../../../assets/images/verifySuccess.png";
export const Verifying = () => {
  return (
    <>
        <div className="leftCol">
            <ol>
                <li>
                    When you are logged in, you are initially prompted with a verification message. Click <b>Verify</b>.
                </li>
                <li>
                    A verification email will be sent to the email address you provided to login with.
                </li>
                <li>
                    Check your email and click the verification link. 
                </li>
                <li>
                    Click the verification link. <b>Always verify that the domain of the link is equal to ours!</b> You should now be verified and you should be able to make use of the full functionality.
                </li>
            </ol>
        </div>
        <div className="rightCol">
            <img alt="verification message" title="verification message" src={verifyMsg} className="rightImg"></img>
            <img alt="verification success message" title="verification success message" src={verifySuccess} className="rightImg"></img>
        </div>
    </>
  )
}
