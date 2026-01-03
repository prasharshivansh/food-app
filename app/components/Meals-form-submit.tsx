'use client';

import { useFormStatus } from "react-dom";


export default function MealsFormSubmit() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" className="discover-btn" disabled={pending as boolean}>
            {pending ? 'Submitting...' : 'Submit'}
        </button>
    );
}