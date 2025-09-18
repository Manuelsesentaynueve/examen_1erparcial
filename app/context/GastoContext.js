'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import { usePresupuesto } from './PresupuestoContext';

const GastoContext = createContext();

export const GastoProvider = ({ children }) => {
    const { setGastoTotal } = usePresupuesto();
    const [gastos, setGastos] = useState([]);
    const [categorias] = useState(['Comida', 'Transporte', 'Entretenimiento', 'Ropa']);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchGastos = async () => {
        try {
            const res = await fetch('http://localhost:5000/gasto');
            const data = await res.json();
            setGastos(data);
            const total = data.reduce((sum, gasto) => sum + parseFloat(gasto.monto), 0);
            setGastoTotal(total);
        } catch (error) {
            setErrorMessage('Error al cargar gastos. Aseg\u00FArate de que el backend est\u00E9 corriendo.');
            setShowErrorMessage(true);
            console.error('Error fetching gastos:', error);
        }
    };

    const addGasto = async (newGasto) => {
        try {
            const res = await fetch('http://localhost:5000/gasto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newGasto),
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Error al agregar el gasto');
            }
            fetchGastos();
        } catch (error) {
            setErrorMessage(`Error al agregar gasto: ${error.message}`);
            setShowErrorMessage(true);
            console.error('Error adding gasto:', error);
        }
    };

    useEffect(() => {
        fetchGastos();
    }, []);

    const closeError = () => {
        setShowErrorMessage(false);
    };

    return (
        <GastoContext.Provider value={{ gastos, addGasto, categorias, fetchGastos, showErrorMessage, errorMessage, closeError }}>
            {children}
        </GastoContext.Provider>
    );
};

export const useGasto = () => useContext(GastoContext);