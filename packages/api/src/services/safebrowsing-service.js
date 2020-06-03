import {encode as base64Encode} from 'base62';
import fetch from 'node-fetch';
import {isURL} from 'validator';
import assert from 'assert';

import ShortLink from '../models/short-link';

const SAFE_BROWSING_API_KEY = process.env.SAFE_BROWSING_API_KEY;
assert(SAFE_BROWSING_API_KEY);

/**
 * @param {string} url
 */
export async function checkURL(url) {
  if (!isURL(url)) {
    throw new Error('Invalid URL provided');
  }

  if (url.indexOf('//nazr.in') > -1) {
    throw new Error('URL contains nazr.in can not to be shortened');
  }

  const safeCheck = await fetch(
    `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${SAFE_BROWSING_API_KEY}`,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: JSON.stringify({
        client: {clientId: 'nazr.in', clientVersion: '1.0.0'},
        threatInfo: {
          threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING'],
          platformTypes: ['ANY_PLATFORM'],
          threatEntryTypes: ['URL'],
          threatEntries: [{url}],
        },
      }),
    },
  ).then((res) => res.json());

  if (safeCheck.matches) {
    throw new Error('URL contains malicious content');
  }

  const shortLink = new ShortLink();
  await shortLink.save();
  shortLink.url = url;
  shortLink.base62 = base64Encode(shortLink.numerical_id);
  await shortLink.save();
  return shortLink;
}
