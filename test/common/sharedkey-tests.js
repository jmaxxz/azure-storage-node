﻿// 
// Copyright (c) Microsoft and contributors.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// 
// See the License for the specific language governing permissions and
// limitations under the License.
// 

var assert = require('assert');

// Test includes
var testutil = require('../framework/util');

// Lib includes
var azure = testutil.libRequire('azure-storage');
var WebResource = azure.WebResource;
var Constants = azure.Constants;
var StorageServiceClientConstants = Constants.StorageServiceClientConstants;
var QueryStringConstants = Constants.QueryStringConstants;
var HeaderConstants = Constants.HeaderConstants;

var SharedKey = testutil.libRequire('common/signing/sharedkey');

var sharedkey;

describe('sharedkey-tests', function () {
  before(function (done) {
    sharedkey = new SharedKey(StorageServiceClientConstants.DEVSTORE_STORAGE_ACCOUNT, StorageServiceClientConstants.DEVSTORE_STORAGE_ACCESS_KEY, false);

    done();
  });

  it('SignRequest', function (done) {
    var webResource = WebResource.get('container');
    webResource.withQueryOption(QueryStringConstants.RESTYPE, 'container');
    webResource.withHeader(HeaderConstants.CONTENT_TYPE, '');
    webResource.withHeader(HeaderConstants.STORAGE_VERSION_HEADER, HeaderConstants.TARGET_STORAGE_VERSION);
    webResource.withHeader(HeaderConstants.DATE_HEADER, 'Fri, 23 Sep 2011 01:37:34 GMT');

    sharedkey.signRequest(webResource, function () {
      assert.equal(webResource.headers[HeaderConstants.AUTHORIZATION], 'SharedKey devstoreaccount1:/Nzbqsmrbb107sFMOfcMFuK2TdkGCUUY4TjPspfeCTc=');

      done();
    });
  });
});