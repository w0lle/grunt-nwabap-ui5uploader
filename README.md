# grunt-nwabap-ui5uploader

'grunt-nwabap-ui5uploader' is a Grunt plugin which allows a developer to upload SAPUI5/OpenUI5 sources into a SAP NetWeaver ABAP system as part of the Grunt task chain. The behavior is (or should be) the same than it is known from the SAP Web IDE app deployment option "Deploy to SAPUI5 ABAP Repository" or from the "SAPUI5 ABAP Repository Team Provider" available for Eclipse via the "UI Development Toolkit for HTML5".
The plugin allows a developer to deploy the sources to a SAP NetWeaver ABAP system by a Grunt task using a different IDE than Eclipse or SAP Web IDE (for instance WebStorm). The main benefit is to integrate the deployment process into a Continuous Integration environment, in which for instance a Jenkins server executes several build steps and finally deploys the sources to a SAP NetWeaver ABAP system if all previous build steps are ok.  


## Getting Started

## Installation and Pre-Conditions

### Grunt
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you are familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-nwabap-ui5uploader --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-nwabap-ui5uploader');
```


### ABAP Development Tool Services
The ABAP Development Tool Services have to be activated on the SAP NetWeaver ABAP System (transaction SICF, path /sap/bc/adt).
The user used for uploading the sources needs to have the authorization to use the ADT Services and to create/modify BSP applications.
The plugin is tested with NW 7.40 and NW 7.50 systems.

## Task "nwabap_ui5uploader"

### Overview
In your project's Gruntfile, add a section named `nwabap_ui5uploader` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  nwabap_ui5uploader: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  }
});
```

### Options

#### options.conn.server
Type: `String`

Defines SAP NetWeaver ABAP server (for instance 'http://myserver:8000').

#### options.auth.user
Type: `String`

Defines the user which is used for access to the SAP NetWeaver ABAP server. It is not recommended to store the user in the Grunt file. It should be passed as argument.

#### options.auth.pwd
Type: `String`

Defines the users password for access to the SAP NetWeaver ABAP server. It is not recommended to store the password in the Grunt file. It should be passed as argument. Do also not store the password as not masked value in a CI server environment. Use plugins to create masked variables (for instance the 'Mask Passwords Plugin' for Jenkins).

#### options.ui5.package
Type: `String`

Defines the development package in which the BSP container for the UI5 sources is available or should be created.

#### options.ui5.bspcontainer
Type: `String`

Defines the name of the BSP container used for the storage of the UI5 sources.

#### options.ui5.bspcontainer_text
Type: `String`

Defines the description of the BSP container.

#### options.ui5.transportno
Type: `String`
Optional in case options.ui5.package is set to '$TMP'.

Defines the transport number which logs the changes. For the transport number it would also make sense to pass it via an argument.

#### options.resources.cwd
Type: `String`

Defines the base folder which contains the sources (for instance 'build'). It should be avoided to use everything from the ``webapp`` folder, because some directories in it should not be packaged and uploaded into a BSP application. To create a build, use another grunt task to copy the relevant files to the ``build`` folder. In addition for instance you can use the [openui5_preload] (https://github.com/SAP/grunt-openui5#openui5_preload) task from the ``grunt-openui5`` plugin to create a component preload file.

#### options.resources.src
Type: `String` or `array of String` 

Defines files for upload.

### Usage Examples

#### Upload to '$TMP' package

```js
var sUser = grunt.option('user');
var sPwd = grunt.option('pwd');

grunt.initConfig({
  nwabap_ui5uploader: {
    options: {
      conn: {
        server: 'http://myserver:8000',
      },
      auth: {
        user: sUser,
        pwd: sPwd
      }
    },
    upload_build: {
      options: {
        ui5: {
           package: '$TMP',
           bspcontainer: 'ZZ_UI5_LOCAL',
           bspcontainer_text: 'UI5 upload local objects'
        },
        resources: {
          cwd: 'build-folder',
          src: '**/*.*'
        }
      }
    }
  }
});
```

#### Upload to a transport tracked package

```js
var sUser = grunt.option('user');
var sPwd = grunt.option('pwd');

grunt.initConfig({
  nwabap_ui5uploader: {
    options: {
      conn: {
        server: 'http://myserver:8000',
      },
      auth: {
        user: sUser,
        pwd: sPwd
      }
    },
    upload_build: {
      options: {
        ui5: {
           package: 'ZZ_UI5_REPO',
           bspcontainer: 'ZZ_UI5_TRACKED',
           bspcontainer_text: 'UI5 upload',
           transportno: 'DEVK900000'
        },
        resources: {
          cwd: 'build-folder',
          src: '**/*.*'
        }
      }
    }
  }
});
```

#### Upload to different servers

```js
var sUser = grunt.option('user');
var sPwd = grunt.option('pwd');

grunt.initConfig({
  nwabap_ui5uploader: {
    upload_build_740: {
      options: {
        conn: {
          server: 'http://myserver740:8000',
        },
        auth: {
          user: sUser,
          pwd: sPwd
        },      
        ui5: {
           package: 'ZZ_UI5_REPO',
           bspcontainer: 'ZZ_UI5_TRACKED',
           bspcontainer_text: 'UI5 upload',
           transportno: 'DEVK900000'
        },
        resources: {
          cwd: 'build-folder',
          src: '**/*.*'
        }
      }
    },
    upload_build_750: {
      options: {
        conn: {
          server: 'http://myserver750:8000',
        },
        auth: {
          user: sUser,
          pwd: sPwd
        },      
        ui5: {
           package: 'ZZ_UI5_REPO',
           bspcontainer: 'ZZ_UI5_TRACKED',
           bspcontainer_text: 'UI5 upload',
           transportno: 'DEVK900000'
        },
        resources: {
          cwd: 'build-folder',
          src: '**/*.*'
        }
      }
    }    
  }
});
```

## Release History

[CHANGELOG.md](CHANGELOG.md)

## License

[Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)
