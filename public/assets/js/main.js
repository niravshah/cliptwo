var app = angular.module('clipApp', ['clip-two']);
app.run(['$rootScope', '$state', '$stateParams', 'localStorageService', 'AuthenticationService',
    function($rootScope, $state, $stateParams, localStorageService, authService) {
        // Attach Fastclick for eliminating the 300ms delay between a physical tap and the firing of a click event on mobile browsers
        FastClick.attach(document.body);
        // Set some reference to access them from any scope
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        // GLOBAL APP SCOPE
        // set below basic information
        $rootScope.app = {
            name: 'Engage', // name of your project
            author: 'letsengage.co', // author's name or company name
            description: 'Passive Candidate Recruitment Pipelines', // brief description
            version: '1.0', // current version
            year: ((new Date()).getFullYear()), // automatic current year (for copyright information)
            isMobile: (function() { // true if the browser is a mobile device
                var check = false;
                if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    check = true;
                };
                return check;
            })(),
            layout: {
                isNavbarFixed: true, //true if you want to initialize the template with fixed header
                isSidebarFixed: true, // true if you want to initialize the template with fixed sidebar
                isSidebarClosed: false, // true if you want to initialize the template with closed sidebar
                isFooterFixed: false, // true if you want to initialize the template with fixed footer
                theme: 'theme-1', // indicate the theme chosen for your project
                logo: '/assets/images/logo.png', // relative path of the project logo
            }
        };
        /*$rootScope.user = {
            name: 'Peter',
            job: 'ng-Dev',
            picture: 'app/img/user/02.jpg'
        };*/
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
            var requireLogin = toState.data.requireLogin;
            if(requireLogin && typeof localStorageService.get('user.token') === 'undefined') {
                //TODO - Check for LinkedIn Sign In
                //TODO - If LinkedIn is signed in get LinkedIn id and get new token
                event.preventDefault();
                console.log('Login Required!', toState.name);
                return $state.go('login.signin', {
                    onwardsState: toState.name
                });
            } else {
                //TODO - Check if the Access Token is still valid.
                //TODO - If the Token is invalid - then try to check LinkedIn Sign In 
                //TODO - If LinkedIn is signed in, get LinkedIn id and get new token 
                //TODO - If LinkedIn is also not signed in, send to Signin Page
                //TODO - If the Token is valid check 'Data' is present
                if(requireLogin) {
                    var tokenValid = authService.validateToken(localStorageService.get('user.token'));
                    if(!tokenValid) {
                        return $state.go('login.signin', {
                            onwardsState: toState.name
                        });
                    }
                }            
                console.log('No Login Required!')
            }
        });
    }
]);
// translate config
app.config(['$translateProvider',
    function($translateProvider) {
        // prefix and suffix information  is required to specify a pattern
        // You can simply use the static-files loader with this pattern:
        $translateProvider.useStaticFilesLoader({
            prefix: '/assets/i18n/',
            suffix: '.json'
        });
        // Since you've now registered more then one translation table, angular-translate has to know which one to use.
        // This is where preferredLanguage(langKey) comes in.
        $translateProvider.preferredLanguage('en');
        // Store the language in the local storage
        $translateProvider.useLocalStorage();
    }
]);
// Angular-Loading-Bar
// configuration
app.config(['cfpLoadingBarProvider',
    function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeBar = true;
        cfpLoadingBarProvider.includeSpinner = false;
    }
]);