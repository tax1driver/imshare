'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router"
import { ReactNode } from "react";

interface ActiveLinkProps {
    children: ReactNode,
    className?: string,
    activeClassName?: string,
    href: string
};

export default function ActiveLink(props: ActiveLinkProps) {
    const pathname = usePathname();

    const className = (props.className + " " + ((pathname === props.href) ? props.activeClassName : "")).trim();

    return (
        <Link className={className} href={props.href}>
            {props.children}
        </Link>
    )
}