import React, { useState } from "react";
import Home from "./Home";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Button } from "@mui/material";

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({})
  const [sub, setSub] = useState();


  
  const handleClick = () => {
    var manifest = chrome.runtime.getManifest();

    var clientId = encodeURIComponent(manifest.oauth2.client_id);
    var scopes = encodeURIComponent('openid');
    var redirectUri = encodeURIComponent(`https://bacepobpbmbcebihpgkjkpclkclaigjg.chromiumapp.org`);
    console.log("ClientId", clientId)
    var url = 'https://accounts.google.com/o/oauth2/v2/auth' + 
              '?client_id=' + clientId + 
              '&response_type=id_token' + 
              '&access_type=offline' + 
              '&nonce=testnonce' + 
              '&redirect_uri=' + redirectUri + 
              '&scope=' + scopes;
    console.log("URL to Oauth", url)
    chrome.identity.launchWebAuthFlow(
        {
            'url': url, 
            'interactive':true
        }, 
        function(redirectedTo) {
            if (chrome.runtime.lastError) {
                // Example: Authorization page could not be loaded.
                console.log(chrome.runtime.lastError.message);
            }
            else {
                var response = redirectedTo.split('#', 2)[1];
                console.log("OAuth Response",response);
                var credentialResponse = jwtDecode(response)
                console.log("credential Response", credentialResponse, credentialResponse.sub)
                setSub(credentialResponse.sub)
                setLoggedIn(true);
            }
        }
    );
  }

  if (loggedIn) {
    return <Home user={sub} />;
  }
  
  return (
    <>
      {/* <GoogleLogin
        onSuccess={(credentialResponse) => {
          var credentialResponse = jwtDecode(credentialResponse.credential)
          console.log(credentialResponse);
          setUser(credentialResponse)
          setLoggedIn(true);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      ; */}
      <Button onClick={handleClick}>Sign In Using Google</Button>
    </>
  );
};

export default Login;
