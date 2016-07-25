/*
 * grunt-nwabap-ui5uploader
 * https://github.com/pfefferf/grunt-nwabap-ui5uploader
 *
 * Copyright (c) 2016 Florian Pfeffer
 * Licensed under the Apache-2.0 license.
 */

'use strict';

var FileStore = require('./lib/filestore.js');

module.exports = function (grunt) {

    grunt.registerMultiTask('nwabap_ui5uploader', 'UI5 source upload to SAP NetWeaver ABAP', function () {

        var done = this.async();

        var oOptions = this.options({
            resources: {}
        });

        if(!oOptions.ui5.language){
            oOptions.ui5.language = 'EN';
        }

        if(!oOptions.conn.hasOwnProperty('useStrictSSL')){
            oOptions.conn.useStrictSSL = true;
        }

        // checks
        if (!oOptions.resources || !oOptions.resources.cwd || !oOptions.resources.src) {
            grunt.fail.warn('"resources" option not (fully) specified.');
            done();
            return;
        }

        if (typeof oOptions.resources === 'object' && oOptions.resources instanceof Array) {
            grunt.fail.warn('"resources" option must not be an array.');
            done();
            return;
        }

        if (!oOptions.auth || !oOptions.auth.user || !oOptions.auth.pwd) {
            grunt.fail.warn('"auth" option not (fully) specified (check user name and password).');
            done();
            return;
        }

        if (!oOptions.ui5 || !oOptions.ui5.package || !oOptions.ui5.bspcontainer || !oOptions.ui5.bspcontainer_text) {
            grunt.fail.warn('"ui5" option not (fully) specified (check package, BSP container, BSP container text information).');
            done();
            return;
        }

        if (oOptions.ui5.package !== '$TMP' && !oOptions.ui5.transportno) {
            grunt.fail.warn('For packages <> "$TMP" a transport number is necessary.');
            done();
            return;
        }

        if (oOptions.ui5.bspcontainer.length > 15) {
            grunt.fail.warn('"ui5.bspcontainer" option must not be longer than 15 characters.');
            done();
            return;
        }

        // log options
        grunt.verbose.writeln('Options: ' + JSON.stringify(oOptions));

        // get file names
        var aFiles = [];

        grunt.file.expand({
            cwd: oOptions.resources.cwd,
            filter: 'isFile',
            dot: true
        }, oOptions.resources.src).forEach(function (sFile) {
            aFiles.push(sFile);
        });

        // log found files
        grunt.verbose.writeln('Files: ' + aFiles);

        var oFileStoreOptions = {
            conn: {
                server: oOptions.conn.server,
                useStrictSSL: oOptions.conn.useStrictSSL
            },
            auth: {
                user: oOptions.auth.user,
                pwd: oOptions.auth.pwd
            },
            ui5: {
                language: oOptions.ui5.language.toUpperCase(),
                transportno: oOptions.ui5.transportno,
                package: oOptions.ui5.package,
                bspcontainer: oOptions.ui5.bspcontainer,
                bspcontainer_text: oOptions.ui5.bspcontainer_text,
                calc_appindex: !!oOptions.ui5.calc_appindex
            }
        };

        var oFileStore = new FileStore(oFileStoreOptions);
        oFileStore.syncFiles(aFiles, oOptions.resources.cwd, function (oError, aArtifactsSync) {

            if (oError) {
                grunt.fail.warn(oError);
            }

            if (aArtifactsSync) {
                aArtifactsSync.forEach(function (oItem) {
                    grunt.log.writeln('NW ABAP UI5 Uploader action: ' + oItem.type + ' ' + oItem.id + ' ' + oItem.modif + 'd.');
                });
            }

            done();
        });
    });

};
