'use client';

import { createContext, useState, useContext } from 'react';

const PresupuestoContext = createContext();

export const PresupuestoProvider = ({ children }) => {
    const [presupuesto, setPresupuesto] = useState(null);
    const [gastoTotal, setGastoTotal] = useState(0);

    const getWarningMessage = () => {
        if (presupuesto && gastoTotal >= presupuesto) {
            return {
                message: 'Has superado el l\u00EDmite del presupuesto, debes ajustar gastos',
                color: 'bg-red-500'
            };
        }
        if (presupuesto && gastoTotal >= presupuesto * 0.8) {
            return {
                message: '¡Advertencia! Has alcanzado el 80% del presupuesto.',
                color: 'bg-yellow-500'
            };
        }
        return null;
    };

    return (
        <PresupuestoContext.Provider value={{ presupuesto, setPresupuesto, gastoTotal, setGastoTotal, getWarningMessage }}>
            {children}
        </PresupuestoContext.Provider>
    );
};

export const usePresupuesto = () => useContext(PresupuestoContext);