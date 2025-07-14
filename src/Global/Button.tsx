import { MoveLeft, Plus } from "lucide-react";
import Loading from "./loader";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

type Props = {
    isLoading: boolean;
    title: string;
    showBackBtn?: boolean

};

const SubmitButton = ({ isLoading, title, showBackBtn = true }: Props) => {
    const navigate = useNavigate()
    const handleClick = () => {

        navigate(-1)
    }
    return (
        <div className="flex justify-between items-center space-x-4">

            {/* Go Back Button */}
            {

                showBackBtn && <Button
                    type="button"
                    variant="outline"
                    className="flex items-center gap-2 w-28"
                    // onClick={onGoBack}
                    onClick={handleClick}
                >
                    <MoveLeft className="w-4 h-4" />
                    <span className="text-sm">Go Back</span>
                </Button>
            }

            {/* Submit Button */}
            <Button
                type="submit"
                disabled={isLoading}
                className={`flex items-center gap-2 w-32 ${isLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
            >
                {isLoading ? (
                    <Loading color="white" size={8} />
                ) : (
                    <>
                        <Plus className="w-4 h-4" />
                        <span className="text-sm">{title ? title : "Add"}</span>
                    </>
                )}
            </Button>
        </div>
    );
};

export default SubmitButton;
