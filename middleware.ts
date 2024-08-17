import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import generateCspPolicy from 'nextjs/csp/generateCspPolicy';
import * as middlewares from 'nextjs/middlewares/index';

const cspPolicy = generateCspPolicy();

export function middleware(req: NextRequest) {
  const isPageRequest = req.headers.get('accept')?.includes('text/html');
  const start = Date.now();

  if (!isPageRequest) {
    return;
  }

  const accountResponse = middlewares.account(req);
  if (accountResponse) {
    return accountResponse;
  }

  const res = NextResponse.next();

  middlewares.colorTheme(req, res);

  // Apply locale middleware
  const finalResponse = middlewares.locale(req,res);

  const end = Date.now();

  finalResponse.headers.append('Content-Security-Policy', cspPolicy);
  finalResponse.headers.append('Server-Timing', `middleware;dur=${ end - start }`);
  finalResponse.headers.append('Docker-ID', process.env.HOSTNAME || '');

  return finalResponse;
}

/**
 * Configure which routes should pass through the Middleware.
 */
export const config = {
  matcher: [ '/', '/:notunderscore((?!_next).+)' ],
  // matcher: [
  //   '/((?!.*\\.|api\\/|node-api\\/).*)', // exclude all static + api + node-api routes
  // ],
};
