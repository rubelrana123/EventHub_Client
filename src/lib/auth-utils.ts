/**
 * Defines the available user roles in the application
 */

import { UserRole } from "@/types/user";

/**
 * Configuration for route protection
 * @property exact - Array of exact path matches
 * @property patterns - Array of regex patterns for dynamic route matching
 */
export type RouteConfig = {
    exact: string[],
    patterns: RegExp[],
}

/** Public routes that don't require authentication */
export const authRoutes = ["/login", "/register", "/forgot-password"];

/** Routes accessible by all authenticated users */
export const commonProtectedRoutes: RouteConfig = {
    exact: ["/my-profile", "/settings", "/reset-password", "change-password"],
    patterns: [],
}

/** Routes accessible only by HOST role */
export const hostProtectedRoutes: RouteConfig = {
    patterns: [/^\/host/],
    exact: [],
}

/** Routes accessible only by ADMIN role */
export const adminProtectedRoutes: RouteConfig = {
    patterns: [/^\/admin/],
    exact: [],
}

/** Routes accessible only by PARTICIPATOR role */
export const participatorProtectedRoutes: RouteConfig = {
    patterns: [/^\/dashboard/],
    exact: [],
}

/**
 * Checks if the given pathname is a public auth route
 */
export const isAuthRoute = (pathname: string) => {
    return authRoutes.some((route: string) => route === pathname);
}

/**
 * Determines if a pathname matches any route in the provided config
 * Checks both exact matches and regex pattern matches
 */
export const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
    if (routes.exact.includes(pathname)) {
        return true;
    }
    return routes.patterns.some((pattern: RegExp) => pattern.test(pathname))
}

/**
 * Returns which role owns/can access a given route
 * Returns null if route is public/unprotected
 */
export const getRouteOwner = (pathname: string): "ADMIN" | "HOST" | "PARTICIPATOR" | "COMMON" | null => {
    if (isRouteMatches(pathname, adminProtectedRoutes)) {
        return "ADMIN";
    }
    if (isRouteMatches(pathname, hostProtectedRoutes)) {
        return "HOST";
    }
    if (isRouteMatches(pathname, participatorProtectedRoutes)) {
        return "PARTICIPATOR";
    }
    if (isRouteMatches(pathname, commonProtectedRoutes)) {
        return "COMMON";
    }
    return null;
}

/**
 * Returns the default dashboard route for a given user role
 */
export const getDefaultDashboardRoute = (role: UserRole): string => {
    if (role === "ADMIN") {
        return "/admin/dashboard";
    }
    if (role === "HOST") {
        return "/host/dashboard";
    }
    if (role === "PARTICIPATOR") {
        return "/dashboard";
    }
    return "/";
}

/**
 * Validates if a user with the given role can redirect to the specified path
 * Returns true if the path is common, matches the user's role, or is public
 */
export const isValidRedirectForRole = (redirectPath: string, role: UserRole): boolean => {
    const routeOwner = getRouteOwner(redirectPath);

    if (routeOwner === null || routeOwner === "COMMON") {
        return true;
    }

    if (routeOwner === role) {
        return true;
    }

    return false;
}