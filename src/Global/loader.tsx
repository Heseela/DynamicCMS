import type { CSSProperties } from "react";
import { PulseLoader } from "react-spinners";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

type LoaderProps = {
    color?: string;
    size?: number;
};

function Loading({ color, size }: LoaderProps) {
    return (
        <div className="sweet-loading flex justify-center items-center min-h-screen">
            <PulseLoader
                color={color || "#213F9B"}
                loading={true}
                cssOverride={override}
                size={size || 10}
                margin={2}
            />
        </div>
    );
}
export default Loading;
