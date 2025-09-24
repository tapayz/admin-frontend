import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {

	// 미들웨어 임시 비활성화 - 모든 요청 통과
	return NextResponse.next();

  // 로그인이 필요없는 경로들
  const publicPaths = ['/signin', '/api/auth', '/payment'];
  const pathname = request.nextUrl.pathname;

  // public 경로는 미들웨어를 거치지 않음
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // 인증 토큰 확인 (현재는 쿠키에서 확인)
  const token = request.cookies.get('auth-token');

  // 토큰이 없으면 로그인 페이지로 리다이렉트
  if (!token) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // 로그인된 사용자가 루트 경로에 접근하면 dashboard로 리다이렉트
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico).*)'
	]
};