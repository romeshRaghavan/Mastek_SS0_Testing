////Test SetUp
//var authority = "https://login.windows.net/mastekgroup.onmicrosoft.com",
  //  redirectUri = "http://ESSMobile",
    //resourceUri = "https://MastekGroup.onmicrosoft.com/ESSCommonMicroServices", // web api uri        
    //clientId = "8619acfa-a9c7-4d8c-b909-52002c627748" //

//var registerUrl = "https://mysite.masteknet.com/ESSCommonTest/registeruser/"; //test
//var deregisterUrl = "https://mysite.masteknet.com/ESSCommonTest/deregisteruser/"; //test

var authority = 'https://login.microsoftonline.com/';
 var resourceUri = 'https://graph.windows.net/';
 var clientId = 'f97ffe70-98ab-4a54-8413-70dfa5339ed2';
 var redirectUri = 'https://expenzingmobileapp.com/';
  
//var tenantName = 'add1c500-a6d7-4dbd-b890-7f8cb6f7d861c';
////Test SetUp

////Live SetUp
//var authority = "https://login.windows.net/mastekgroup.onmicrosoft.com",
//    redirectUri = "http://MastServicesClient", //REDIRECT URIS  of Mast-Services Client
//    resourceUri = "https://MastekGroup.onmicrosoft.com/MastServices", // APP ID URI - Mast-Services APIs       
//    clientId = "e7ceed98-e37c-44ea-b697-c05fd137f2fb" //Client Id of Mast-Services Client

//var registerUrl = "https://api.masteknet.com/ESSCommonTest/registeruser/";
//var deregisterUrl = "https://api.masteknet.com/ESSCommonTest/deregisteruser/";
////Live SetUp

//
//var AppId = settings.getAppId();
//var VersionNumber = settings.getVersionNumber();
//var homepage = settings.getHomePage();

var auth = {

    //Sign in user
    signIn: function ()
    {
      alert("1");
        auth.authenticate(function (authresult) {

            localStorage.OauthToken = authresult.accessToken;
            //auth.registerUser(authresult.accessToken);
            redirectHome();

        });
    },
   
    //ADAL Authentication
    authenticate: function (authCompletedCallback) {
       alert("2");
        auth.context = new Microsoft.ADAL.AuthenticationContext(authority);
      alert("context: "+auth.context);
        auth.context.tokenCache.readItems().then(function (items) {
         
            if (items.length > 0) {
                authority = items[0].authority;
                auth.context = new Microsoft.ADAL.AuthenticationContext(authority);
            }
            // Attempt to authorize user silently
            auth.context.acquireTokenSilentAsync(resourceUri, clientId)
            .then(authCompletedCallback, function () {

                // We require user cridentials so triggers authentication dialog
                auth.context.acquireTokenAsync(resourceUri, clientId, redirectUri)
                .then(authCompletedCallback, function (err) {
                    auth.error("Failed to authenticate: " + err);
                });
            });
        });
    },

    //Redirect to App - Homepage
    redirectHome: function () {
        alert("222");
        //window.location.href = homepage;

    }
    


}
