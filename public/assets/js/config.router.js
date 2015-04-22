'use strict';
/**
 * Config for the router
 */
app.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'JS_REQUIRES', '$httpProvider', 'jwtInterceptorProvider', 'localStorageServiceProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, jsRequires, httpProvider, jwtInterceptorProvider, localStorageServiceProvider, $locationProvider) {
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
        app.value = $provide.value;
        // LAZY MODULES
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: jsRequires.modules
        });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        //Local Storage Prefix
        localStorageServiceProvider.setPrefix('engage');
        //Insert a JWT request for all API Requests
        jwtInterceptorProvider.tokenGetter = ['localStorageService',
            function($localStorageService) {
                return $localStorageService.get('user.token');
            }
        ];
        httpProvider.interceptors.push('jwtInterceptor');
        // APPLICATION ROUTES
        // -----------------------------------
        // For any unmatched url, redirect to /app/dashboard
        $urlRouterProvider.otherwise("/app/dashboard");
        //
        // Set up the states
        $stateProvider.state('app', {
            url: "/app",
            templateUrl: "/assets/views/app.html",
            resolve: loadSequence('loginCtrl', 'modernizr', 'moment', 'angularMoment', 'uiSwitch', 'perfect-scrollbar-plugin', 'perfect_scrollbar', 'toaster', 'ngAside', 'vAccordion', 'sweet-alert', 'chartjs', 'tc.chartjs', 'oitozero.ngSweetAlert', 'chatCtrl'),
            abstract: true,
            data: {
                requireLogin: false // this property will apply to all children of 'app'
            }
        }).state('app.dashboard', {
            url: "/dashboard",
            templateUrl: "/assets/views/dashboard.html",
            resolve: loadSequence('jquery-sparkline', 'sparkline', 'dashboardCtrl'),
            title: 'Dashboard',
            ncyBreadcrumb: {
                label: 'Dashboard'
            }
        }).state('app.pipeline', {
            url: "/pipeline",
            templateUrl: "/assets/views/pipeline.html",
            title: 'Pipeline',
            resolve: loadSequence('pipelineCtrl', 'ngTagsInput', 'ngTable', 'pipelineDetailsCtrl'),
            ncyBreadcrumb: {
                label: 'Pipeline'
            },
            data: {
                requireLogin: true // this property will apply to all children of 'app'
            }
        }).state('app.pipeline.new', {
            url: "/new",
            templateUrl: "assets/views/pipeline_new.html",
            title: 'New Pipeline',
            ncyBreadcrumb: {
                label: 'New Pipeline'
            }
        }).state('app.pipeline.details', {
            url: "/:id",
            templateUrl: "assets/views/pipeline_details.html",
            title: 'Pipeline Details',
            controller: function($scope, $stateParams) {
                for(var pip in $scope.pipelines) {
                    if($scope.pipelines[pip].id == $stateParams.id) {
                        $scope.pipe = $scope.pipelines[pip];
                    }
                }
            },
            ncyBreadcrumb: {
                label: 'Pipeline Details'
            }
        }).state('app.pipeline.details.add', {
            url: "/add",
            templateUrl: "assets/views/pipeline_add.html",
            title: 'Add Prospect',
            ncyBreadcrumb: {
                label: 'Add Prospect'
            }
        }).state('app.content', {
            url: "/content",
            templateUrl: "assets/views/content.html",
            title: 'Content',
            resolve: loadSequence('contentCtrl'),
            ncyBreadcrumb: {
                label: 'Pipeline'
            }
        }).state('app.pages', {
            url: '/pages',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'Pages',
            ncyBreadcrumb: {
                label: 'Pages'
            }
        }).state('app.pages.user', {
            url: '/user',
            templateUrl: "/assets/views/pages_user_profile.html",
            title: 'User Profile',
            ncyBreadcrumb: {
                label: 'User Profile'
            },
            resolve: loadSequence('flow', 'userCtrl')
        }).state('app.pages.invoice', {
            url: '/invoice',
            templateUrl: "assets/views/pages_invoice.html",
            title: 'Invoice',
            ncyBreadcrumb: {
                label: 'Invoice'
            }
        }).state('app.pages.timeline', {
            url: '/timeline',
            templateUrl: "assets/views/pages_timeline.html",
            title: 'Timeline',
            ncyBreadcrumb: {
                label: 'Timeline'
            },
            resolve: loadSequence('ngMap')
        }).state('app.pages.calendar', {
            url: '/calendar',
            templateUrl: "assets/views/pages_calendar.html",
            title: 'Calendar',
            ncyBreadcrumb: {
                label: 'Calendar'
            },
            resolve: loadSequence('moment', 'mwl.calendar', 'calendarCtrl')
        }).state('app.pages.messages', {
            url: '/messages',
            templateUrl: "assets/views/pages_messages.html",
            resolve: loadSequence('truncate', 'htmlToPlaintext', 'inboxCtrl')
        }).state('app.pages.messages.inbox', {
            url: '/inbox/:inboxID',
            templateUrl: "assets/views/pages_inbox.html",
            controller: 'ViewMessageCrtl'
        }).state('app.pages.blank', {
            url: '/blank',
            templateUrl: "assets/views/pages_blank_page.html",
            ncyBreadcrumb: {
                label: 'Starter Page'
            }
        })
        //Erorr Routes
        .state('error', {
            url: '/error',
            template: '<div ui-view class="fade-in-up"></div>'
        }).state('error.404', {
            url: '/404',
            templateUrl: "/assets/views/utility_404.html",
        }).state('error.500', {
            url: '/500',
            templateUrl: "/assets/views/utility_500.html",
        })
        // Login routes
        .state('login', {
            url: '/login',
            template: '<div ui-view class="fade-in-right-big smooth"></div>',
            abstract: true,
            data: {
                requireLogin: false // this property will apply to all children of 'app'
            }
        }).state('login.signin', {
            url: '/signin',
            templateUrl: "/assets/views/login_login.html",
            controller: 'loginInterceptCtrl',
            resolve: loadSequence('loginInterceptCtrl'),
            params: {
                onwardsState: 'app.dashboard'
            }
        }).state('login.forgot', {
            url: '/forgot',
            templateUrl: "/assets/views/login_forgot.html"
        }).state('login.registration', {
            url: '/registration',
            templateUrl: "/assets/views/login_registration.html"
        }).state('login.lockscreen', {
            url: '/lock',
            templateUrl: "/assets/views/login_lock_screen.html"
        });
        // Generates a resolve object previously configured in constant.JS_REQUIRES (config.constant.js)

        function loadSequence() {
            var _args = arguments;
            return {
                deps: ['$ocLazyLoad', '$q',
                    function($ocLL, $q) {
                        var promise = $q.when(1);
                        for(var i = 0, len = _args.length; i < len; i++) {
                            promise = promiseThen(_args[i]);
                        }
                        return promise;

                        function promiseThen(_arg) {
                            if(typeof _arg == 'function') return promise.then(_arg);
                            else return promise.then(function() {
                                var nowLoad = requiredData(_arg);
                                if(!nowLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                                return $ocLL.load(nowLoad);
                            });
                        }

                        function requiredData(name) {
                            if(jsRequires.modules)
                                for(var m in jsRequires.modules)
                                    if(jsRequires.modules[m].name && jsRequires.modules[m].name === name) return jsRequires.modules[m];
                            return jsRequires.scripts && jsRequires.scripts[name];
                        }
                    }
                ]
            };
        }
    }
]);