import { NextResponse } from 'next/server';

const privatePages = ['/', '/playlist', '/library']

export default function middleware(req) {
  if (privatePages.find(p => p === req.nextUrl.pathname)) {
    const token = req.cookies.get('SPOTIFY_ACCESS_TOKEN')?.value
    
    if (!token) {
      const url = req.nextUrl.clone()
      url.pathname = '/signin'
      return NextResponse.rewrite(url)
    }
  }
}