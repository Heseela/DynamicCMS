import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useCustomSearchParams() {
    const navigate = useNavigate();
    const location = useLocation();

    // Parse current search params
    const searchParams = useMemo(() => {
        const params = new URLSearchParams(location.search);
        return params;
    }, [location.search]);

    // Create query string helper
    const createQueryString = useCallback(
        (name: string, value: string | undefined | null) => {
            const params = new URLSearchParams(location.search);

            if (value) {
                params.set(name, value);
            } else {
                params.delete(name);
            }

            return params.toString();
        },
        [location.search]
    );

    // Update search params
    function setSearchParams(name: string, value: string | undefined | null) {
        const params = createQueryString(name, value);
        navigate(
            params.length > 0
                ? `${location.pathname}?${params}`
                : location.pathname,
            { replace: true }
        );
    }

    return { searchParams, setSearchParams };
}