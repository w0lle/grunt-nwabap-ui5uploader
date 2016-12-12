## 0.1.17 (2016-12-12)

### Fixes
- Error forwarding in case CSRF Token determination fails.

## 0.1.16 (2016-11-18)

### General
- Switched from JSHint to ESLint linting.
- Support for Node versions < 4.0.0 skipped.
- Logging changed to an "immediate" logging. Folder/File actions are displayed immediately instead of collecting them. 
- Slashes at the end of a defined server URL are ignored.

## 0.1.15 (2016-10-25)

### General
- Code simplification regarding sap-language parameter.

## 0.1.14 (2016-10-21)

### Fixes
- BSP container length check excludes customer specific namespaces.
- Deletion requests are fired with sap-language parameter.

## 0.1.13 (2016-09-30)

### General
- Readme update.

## 0.1.12 (2016-09-28)

### General
- Update dependency to Unirest 0.5.1

### Fixes
- Client parameter handling

## 0.1.11 (2016-09-27)

### General
- Added Travis CI support.

## 0.1.10 (2016-08-04)

### Fixes
- Crash caused by empty files fixed.

## 0.1.9 (2016-08-01)

### Features
- Option `options.conn.client` added to be able to specify a SAP client (in case no default client is maintained in system).

## 0.1.8 (2016-07-25)

### Features
- Option `options.ui5.calc_appindex` steers if the SAPUI5 application index is recalculated (program /UI5/APP_INDEX_CALCULATE). Thx to @olirogers for adding this feature.

## 0.1.7 (2016-06-17)

### Fixes
- Ensure ES 5.1 compatibility.

## 0.1.6 (2016-06-13)

### Fixes
- Namespace handling for file comparison.

## 0.1.5 (2016-06-13)

### Features
- Option `options.conn.useStrictSSL` steers if a strict SSL mode check has to be executed. In case of self signed certificates it can be set to `false` to allow an upload of files.

### Fixes
- Correct encoding of namespaces for file upload.

## 0.1.4 (2016-06-08)

### Features
- Option `options.ui5.language` introduced to be able to specify objects original language (e.g. for BSP Container).

## 0.1.3 (2016-04-01)

### General
- Readme update.

## 0.1.2 (2016-03-30)

### General
- Minor issues.

## 0.1.1 (2016-03-25)

### General
- Readme update.

## 0.1.0 (2016-03-25)

### General
- Initial release.