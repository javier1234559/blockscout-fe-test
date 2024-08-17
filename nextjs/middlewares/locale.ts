import { NextRequest, NextResponse } from 'next/server'
 
const PUBLIC_FILE = /\.(.*)$/
 
export function localeMiddleWare(req: NextRequest , res: NextResponse) {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return res
  }
 
  if (req.nextUrl.locale === 'default') {
    const locale = req.cookies.get('NEXT_LOCALE')?.value || 'en'
 
    const newUrl = new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
    
    res = NextResponse.redirect(newUrl)
  }
  return res;
}