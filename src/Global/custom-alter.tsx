import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../components/ui/alert-dialog";

type TAlertProps = {
    trigger: React.ReactNode;
    description: string;
    onConfirm: () => void;
};

const CustomAlertDialogConfirmation = ({
    trigger,
    description,
    onConfirm,
}: TAlertProps) => {

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
            <AlertDialogContent className="bg-white text-black sm:rounded-lg shadow-lg">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="border-primaryColor">Cancel</AlertDialogCancel>
                    <AlertDialogAction className='bg-primaryColor hover:bg-primaryColor' onClick={onConfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default CustomAlertDialogConfirmation;
