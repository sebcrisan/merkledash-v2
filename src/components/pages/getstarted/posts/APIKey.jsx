import React from 'react'

export const APIKey = () => {
  return (
    <>
        <div className="leftCol">
          <ol>
            <li>
              To access our API, you'll need an API key. To get your API key, click on <b>Profile</b> at the sidebar on the left
            </li>
            <li>
              In the card, click <b>API Key</b>
            </li>
            <li>
              Enter your password in the password field.
            </li>
            <li>
              Your API key will be initially hidden. Click the <b>eye icon</b> on the right of the input field to <b>reveal your API key.</b> 
            </li>
            <li>
              You can now make use of the API. <b>Don't share your API key with anyone as they will be able to access your data!</b>
            </li>
          </ol>
        </div>
        <div className="rightCol">
        </div>
    </>
  )
}
