import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import LoadingButton from '../../form-component/loading-button';
import toast from 'react-hot-toast';

export default function NewPageButton() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function handleCreate() {
        if (isLoading) return;

        setIsLoading(true);
        
        try {
            const { slug } = await createNewPage();
            if (slug) {
                navigate(`/pages/${slug}`);
            }
        } catch (e) {
            console.error(e);
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <LoadingButton
            type="button"
            onClick={handleCreate}
            disabled={isLoading}
            isLoading={isLoading}
            loadingText='Creating...'
        >
            <Plus size={16} />
            <span className="ml-2">New Page</span>
        </LoadingButton>
    );
}

async function createNewPage() {
    const response = await fetch('/pages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    if (!response.ok) {
        throw new Error('Failed to create page');
    }
    
    return response.json();
}