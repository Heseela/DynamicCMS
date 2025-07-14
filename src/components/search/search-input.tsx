import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";

type Props = {
    label?: string;
    placeholder?: string;
    searchKey?: string;
    className?: {
        container?: string;
        input?: string;
    };
    showIcon?: boolean;
};

export default function SearchInput({
    label,
    placeholder,
    searchKey = "q",
    className,
    showIcon = true,
}: Props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState<string>(
        searchParams.get(searchKey) || ""
    );

    useEffect(() => {
        const handler = setTimeout(() => {
            const newSearchParams = new URLSearchParams(searchParams);
            if (searchTerm.trim()) {
                newSearchParams.set(searchKey, searchTerm.trim());
            } else {
                newSearchParams.delete(searchKey);
            }
            setSearchParams(newSearchParams);
        }, 500);

        return () => clearTimeout(handler);
    }, [searchTerm, searchKey]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return !!label ? (
        <div className={`space-y-2 ${className?.container || ""}`}>
            <Label htmlFor="search">{label ?? "Search"}</Label>
            <section className="relative flex items-center w-full">
                {showIcon && (
                    <Search
                        className="absolute left-3 text-muted-foreground"
                        size={16}
                    />
                )}
                <Input
                    type="search"
                    placeholder={placeholder ?? "Search..."}
                    value={searchTerm}
                    onChange={handleInputChange}
                    className={`min-w-[300px] py-2 ${
                        showIcon ? "!pl-9" : ""
                    } ${className?.input || ""}`}
                />
            </section>
        </div>
    ) : (
        <section
            className={`relative flex items-center ${className?.container || ""}`}
        >
            {showIcon && (
                <Search
                    className="absolute left-3 text-muted-foreground"
                    size={16}
                />
            )}
            <Input
                type="search"
                placeholder={placeholder ?? "Search..."}
                value={searchTerm}
                onChange={handleInputChange}
                className={`min-w-[300px] py-2 ${
                    showIcon ? "!pl-9" : ""
                } ${className?.input || ""}`}
            />
        </section>
    );
}

// Simple Label component if you don't have one
function Label({
    htmlFor,
    children,
}: {
    htmlFor: string;
    children: React.ReactNode;
}) {
    return (
        <label
            htmlFor={htmlFor}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
            {children}
        </label>
    );
}

// Simple Input component if you don't have one
function Input({
    type,
    placeholder,
    value,
    onChange,
    className,
}: {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        />
    );
}