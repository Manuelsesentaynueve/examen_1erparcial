'use client';

import { AuthProvider } from './context/AuthContext';
import { PresupuestoProvider } from './context/PresupuestoContext';
import { GastoProvider } from './context/GastoContext';


export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Administrador de Gastos Personales</title>
                <script src="https://cdn.tailwindcss.com"></script>
            </head>
            <body className="font-sans">
                <AuthProvider>
                    <PresupuestoProvider>
                        <GastoProvider>
                            {children}
                        </GastoProvider>
                    </PresupuestoProvider>
                </AuthProvider>
            </body>
        </html>
    );
}