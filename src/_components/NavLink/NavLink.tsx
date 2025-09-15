'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import classNames from 'classnames';

interface NavLinkRenderProps {
  isActive: boolean;
  isExactActive: boolean;
}

export interface NavLinkProps extends Omit<React.ComponentProps<typeof Link>, 'children'> {
  // active path 직접 설정
  activePath?: string;
  children: React.ReactNode | (({ isActive, isExactActive }: NavLinkRenderProps) => React.ReactNode);
}

export default function NavLink({ activePath, children, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isActive = useMemo(() => {
    if (activePath) {
      // 루트 경로('/')에 대한 특별 처리
      if (activePath === '/' && pathname === '/') {
        return true;
      }

      const activePathParts = activePath.split('/').filter(Boolean);
      const pathnameParts = pathname.split('/').filter(Boolean);

      // 경로 길이가 다르면 false 반환
      if (activePathParts.length !== pathnameParts.length) {
        return false;
      }

      return activePathParts.every((part, index) => part === pathnameParts[index]);
    }

    let hrefPath: string;
    let hrefQuery: string | undefined;

    if (typeof props.href === 'string') {
      [hrefPath = '', hrefQuery] = props.href.split('?');

      // 루트 경로('/')에 대한 특별 처리
      if (hrefPath === '/' && pathname === '/') {
        return true;
      }
    } else if (props.href.pathname) {
      hrefPath = props.href.pathname;
      hrefQuery = props.href.query
        ? new URLSearchParams(props.href.query as Record<string, string>).toString()
        : undefined;

      // 루트 경로('/')에 대한 특별 처리
      if (hrefPath === '/' && pathname === '/') {
        return true;
      }
    } else {
      return false;
    }

    if (hrefPath === '/settlement/brandProfit') {
      const pathSegments = pathname.split('/');

      if (pathSegments[1] === 'settlement' && pathSegments[2] === 'brandProfit' && pathSegments[3] != null) {
        return true;
      }
    }

    const hrefParts = hrefPath.split('/').filter(Boolean);
    const pathnameParts = pathname.split('/').filter(Boolean);

    // 경로 길이가 다르면 false 반환
    if (hrefParts.length !== pathnameParts.length) {
      return false;
    }

    const isPathMatch = hrefParts.every((part, index) => part === pathnameParts[index]);

    if (hrefQuery) {
      return isPathMatch && searchParams.toString().startsWith(hrefQuery);
    } else {
      return isPathMatch;
    }
  }, [activePath, props.href, pathname, searchParams]);

  const isExactActive = useMemo(() => {
    if (typeof props.href === 'string') {
      return `${pathname}?${searchParams.toString()}` === props.href;
    }

    if (props.href.pathname && props.href.query) {
      const searchParamsFromHref =
        typeof props.href.query === 'string'
          ? props.href.query
          : new URLSearchParams(props.href.query as Record<string, string>).toString();
      const to = `${props.href.pathname}?${searchParamsFromHref}`;

      return `${pathname}?${searchParams.toString()}` === to;
    }

    return false;
  }, [props.href, pathname, searchParams]);

  return (
    <Link {...props} className={classNames([props.className, { active: isActive, 'exact-active': isExactActive }])}>
      {typeof children === 'function' ? children({ isActive, isExactActive }) : children}
    </Link>
  );
}
