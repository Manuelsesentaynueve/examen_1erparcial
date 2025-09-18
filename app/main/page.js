'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { useGasto } from '@/app/context/GastoContext';
import { usePresupuesto } from '@/app/context/PresupuestoContext';

const ErrorMessage = ({ message, onClose }) => (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-red-600 text-white p-4 rounded-lg shadow-lg flex items-center gap-4 z-50 animate-fade-in-down">
        <span>{message}</span>
        <button onClick={onClose} className="text-white font-bold">&times;</button>
    </div>
);

const PresupuestoAlert = () => {
    const { getWarningMessage } = usePresupuesto();
    const alert = getWarningMessage();

    if (!alert) return null;

    return (
        <div className={`p-4 rounded-lg shadow-md text-white text-center font-bold mb-6 ${alert.color}`}>
            {alert.message}
        </div>
    );
};

const GastosTable = () => {
    const { gastos } = useGasto();

    return (
        <div className="w-full bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Gastos Registrados</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripci\u00F3n</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categor\u00EDa</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Editar</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {gastos.map((gasto) => (
                            <tr key={gasto.idgasto}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${gasto.monto}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{gasto.descripcion}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{gasto.categoria}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(gasto.fecha).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-yellow-600 hover:text-yellow-900 font-bold py-2 px-4 rounded-lg border border-yellow-600 transition duration-300 ease-in-out hover:bg-yellow-100">
                                        Editar
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-red-600 hover:text-red-900 font-bold py-2 px-4 rounded-lg border border-red-600 transition duration-300 ease-in-out hover:bg-red-100">
                                        Borrar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const GastoForm = () => {
    const { addGasto, categorias } = useGasto();
    const [monto, setMonto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState(categorias[0] || '');
    const [fecha, setFecha] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevoGasto = {
            monto: parseFloat(monto),
            descripcion,
            categoria,
            fecha,
        };
        addGasto(nuevoGasto);
        setMonto('');
        setDescripcion('');
        setFecha('');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Registrar Nuevo Gasto</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="number"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    placeholder="Monto"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    placeholder="Descripci\u00F3n"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {categorias.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out">
                    Guardar Gasto
                </button>
            </form>
        </div>
    );
};

const PresupuestoForm = () => {
    const { presupuesto, setPresupuesto } = usePresupuesto();
    const [nuevoPresupuesto, setNuevoPresupuesto] = useState('');

    const handleSetPresupuesto = (e) => {
        e.preventDefault();
        setPresupuesto(parseFloat(nuevoPresupuesto));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Presupuesto Mensual</h2>
            {presupuesto && (
                <p className="text-lg font-bold text-gray-800 mb-4">Presupuesto Establecido: Lps. {presupuesto.toLocaleString('es-HN', { minimumFractionDigits: 2 })}</p>
            )}
            <form onSubmit={handleSetPresupuesto} className="space-y-4">
                <input
                    type="number"
                    value={nuevoPresupuesto}
                    onChange={(e) => setNuevoPresupuesto(e.target.value)}
                    placeholder="Establecer presupuesto"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-green-700 transition duration-300 ease-in-out">
                    Establecer Presupuesto
                </button>
            </form>
        </div>
    );
};

export default function Dashboard() {
    const { isAuthenticated } = useAuth();
    const { showErrorMessage, errorMessage, closeError } = useGasto();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
            {showErrorMessage && <ErrorMessage message={errorMessage} onClose={closeError} />}
            <div className="w-full max-w-4xl">
                <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
                    Administrador de Gastos Personales
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <PresupuestoForm />
                    <GastoForm />
                </div>
                <PresupuestoAlert />
                <GastosTable />
            </div>
        </div>
    );
}