/* @flow */

import { noop } from '@krakenjs/belter';
import { FUNDING } from '@paypal/sdk-constants';
import { getVersionFromNodeModules } from '@krakenjs/grabthar'

import { getNativePopupMiddleware, getNativeFallbackMiddleware } from '../../server';
import { type SDKVersionManager } from '../../server/types'

import { mockReq, mockRes, graphQL, tracking } from './mock';

jest.setTimeout(300000);

const logger = {
    debug: noop,
    info:  noop,
    warn:  noop,
    error: noop,
    track: noop
};

// $FlowFixMe testing impl
const buttonsVersionManager: SDKVersionManager = {
    getLiveVersion: () => '5.0.100',
    getOrInstallSDK: async (...args) => await getVersionFromNodeModules(args),
}

test('should do a basic native popup render and succeed', async () => {
    const paypalNativePopupMiddleware = getNativePopupMiddleware({ graphQL, logger, tracking, fundingSource: FUNDING.PAYPAL, buttonsVersionManager });

    const req = mockReq({
        query: {
            parentDomain: 'foo.paypal.com'
        }
    });
    const res = mockRes();

    // $FlowFixMe
    await paypalNativePopupMiddleware(req, res);

    const status = res.getStatus();
    const contentType = res.getHeader('content-type');
    const html = res.getBody();

    if (status !== 200) {
        throw new Error(`Expected response status to be 200, got ${ status }`);
    }

    if (contentType !== 'text/html') {
        throw new Error(`Expected content type to be text/html, got ${ contentType || 'undefined' }`);
    }

    if (!html) {
        throw new Error(`Expected res to have a body`);
    }
});

test('should do a basic native popup render and fail with a non-paypal domain', async () => {
    const paypalNativePopupMiddleware = getNativePopupMiddleware({ graphQL, logger, tracking, fundingSource: FUNDING.PAYPAL, buttonsVersionManager });

    const req = mockReq({
        query: {
            parentDomain: 'haxpaypal.com'
        }
    });
    const res = mockRes();

    // $FlowFixMe
    await paypalNativePopupMiddleware(req, res);

    const status = res.getStatus();
    const contentType = res.getHeader('content-type');
    const html = res.getBody();

    if (status !== 400) {
        throw new Error(`Expected response status to be 400, got ${ status }`);
    }

    if (contentType !== 'text/plain') {
        throw new Error(`Expected content type to be text/plain, got ${ contentType || 'undefined' }`);
    }

    if (!html) {
        throw new Error(`Expected res to have a body`);
    }
});

test('should do a basic venmo popup render and succeed', async () => {
    const paypalNativePopupMiddleware = getNativePopupMiddleware({ graphQL, logger, tracking, fundingSource: FUNDING.VENMO, buttonsVersionManager });

    const req = mockReq({
        query: {
            parentDomain: 'foo.paypal.com'
        }
    });
    const res = mockRes();

    // $FlowFixMe
    await paypalNativePopupMiddleware(req, res);

    const status = res.getStatus();
    const contentType = res.getHeader('content-type');
    const html = res.getBody();

    if (status !== 200) {
        throw new Error(`Expected response status to be 200, got ${ status }`);
    }

    if (contentType !== 'text/html') {
        throw new Error(`Expected content type to be text/html, got ${ contentType || 'undefined' }`);
    }

    if (!html) {
        throw new Error(`Expected res to have a body`);
    }
});

test('should do a basic venmo popup render and fail with a non-paypal domain', async () => {
    const paypalNativePopupMiddleware = getNativePopupMiddleware({ graphQL, logger, tracking, fundingSource: FUNDING.VENMO, buttonsVersionManager });

    const req = mockReq({
        query: {
            parentDomain: 'haxpaypal.com'
        }
    });
    const res = mockRes();

    // $FlowFixMe
    await paypalNativePopupMiddleware(req, res);

    const status = res.getStatus();
    const contentType = res.getHeader('content-type');
    const html = res.getBody();

    if (status !== 400) {
        throw new Error(`Expected response status to be 400, got ${ status }`);
    }

    if (contentType !== 'text/plain') {
        throw new Error(`Expected content type to be text/plain, got ${ contentType || 'undefined' }`);
    }

    if (!html) {
        throw new Error(`Expected res to have a body`);
    }
});

test('should do a basic native fallback render and succeed', async () => {
    const paypalNativePopupMiddleware = getNativeFallbackMiddleware({ graphQL, logger, tracking, fundingSource: FUNDING.PAYPAL, buttonsVersionManager });

    const req = mockReq({
        query: {
            parentDomain: 'foo.paypal.com'
        }
    });
    const res = mockRes();

    // $FlowFixMe
    await paypalNativePopupMiddleware(req, res);

    const status = res.getStatus();
    const contentType = res.getHeader('content-type');
    const html = res.getBody();

    if (status !== 200) {
        throw new Error(`Expected response status to be 200, got ${ status }`);
    }

    if (contentType !== 'text/html') {
        throw new Error(`Expected content type to be text/html, got ${ contentType || 'undefined' }`);
    }

    if (!html) {
        throw new Error(`Expected res to have a body`);
    }
});

test('should do a basic venmo fallback render and succeed', async () => {
    const paypalNativePopupMiddleware = getNativeFallbackMiddleware({ graphQL, logger, tracking, fundingSource: FUNDING.VENMO, buttonsVersionManager });

    const req = mockReq({
        query: {
            parentDomain: 'foo.paypal.com'
        }
    });
    const res = mockRes();

    // $FlowFixMe
    await paypalNativePopupMiddleware(req, res);

    const status = res.getStatus();
    const contentType = res.getHeader('content-type');
    const html = res.getBody();

    if (status !== 200) {
        throw new Error(`Expected response status to be 200, got ${ status }`);
    }

    if (contentType !== 'text/html') {
        throw new Error(`Expected content type to be text/html, got ${ contentType || 'undefined' }`);
    }

    if (!html) {
        throw new Error(`Expected res to have a body`);
    }
});
