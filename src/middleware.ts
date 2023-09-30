import { NextResponse } from 'next/server'
import {getSession } from 'next-auth/react'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = await getSession({req:request as any})
  console.info(session,'session')
  if (session) {
    NextResponse.next()
  } else {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher:['/editor']
}