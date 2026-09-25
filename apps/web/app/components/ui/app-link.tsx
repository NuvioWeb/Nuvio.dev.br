import {
  Link,
  NavLink,
  type LinkProps,
  type NavLinkProps,
} from "react-router";

/** Link with View Transitions enabled by default (page enter/exit). */
export function AppLink({ viewTransition = true, ...props }: LinkProps) {
  return <Link viewTransition={viewTransition} {...props} />;
}

export function AppNavLink({
  viewTransition = true,
  ...props
}: NavLinkProps) {
  return <NavLink viewTransition={viewTransition} {...props} />;
}
