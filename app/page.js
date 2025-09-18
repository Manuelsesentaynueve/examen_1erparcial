'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const RedirectToLogin = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/auth');
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>Redirigiendo a la pagina de inicio de sesion...</p>
        </div>
    );
};

export default RedirectToLogin;