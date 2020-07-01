import {IncomingMessage, OutgoingMessage} from 'http';

import jwt from 'jsonwebtoken';
import getPem from 'rsa-pem-from-mod-exp';


const pem = getPem(
  // Public key info for a client.
  // http://localhost:8080/auth/realms/master/protocol/openid-connect/certs

  // n
  'tLZi2-yk9Sp85wSEuCCb0R4NPwWO0F12RJnOQkaPmAOpJ-B73L-R3PbV-jygIBnhdhboufuVuraY8qSL38BO1-GnLH_cqUG3mCmvKgQ3zn0up5qa1oI4B2Qw4TBWBRSqVYnozJCBf7XiwMZLlTMVNb1byN1Hq8rrLRipEQSPaNO0skdmKa4x39IbLL9pS1ZSfj-Ng_UF1YYnaBxanODtUsmn7Z0pbLVJf_c9fQKjV0Lg1b6xNVCX_W58S1wc0kZSIaGMExW8SKtStXtOQ4U_idyr4K9Hio5iGj5wNyNLTkVRYfgF8EovDwlIQAgNXOvG07dE-CZRtSAMf7NLpKMHUQ',

  // e
  'AQAB'
);

/**
 * @param {IncomingMessage} req
 * @param {OutgoingMessage} res
 * @param {Function} next
 */
export function verifyToken(req, res, next) {
  const token = (req.headers.authorization || '').replace(/^Bearer /, '');

  // Verify the token using public key of the client.
  // Each client has a unique keypair with a keyid. The above used key is hard coded,
  // but the actual keyid can be extracted from a parsed JWT token (parsedToken.header.keyid).
  jwt.verify(token, pem, (err, data) => {
    if (err) {
      return res.status(401).send(err);
    }

    req.tokenData = data;
    next();
  });
};

/**
 * @param {IncomingMessage} req
 * @param {OutgoingMessage} res
 * @param {Function} next
 */
export function protectAdmin(req, res, next) {
  if (!req.tokenData.realm_access.roles.includes('admin')) {
    return res.sendStatus(403);
  }

  next();
};
