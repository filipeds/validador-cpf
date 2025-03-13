import React, { useState } from "react";
import "./style/validadorCPF.css";

const ValidadorCPF = () => {
    const [cpf, setCpf] = useState('');
    const [resultado, setResultado] = useState('');

    const validarCPF = (cpf) => {
        cpf = cpf.replace(/[^\d]+/g, ''); 
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.substring(i, i + 1)) * (10 - i);
        }

        let resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;

        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.substring(i, i + 1)) * (11 - i);
        }

        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;

        return resto === parseInt(cpf.substring(10, 11));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validarCPF(cpf);
        setResultado(isValid ? '✅ CPF Válido' : '❌ CPF Inválido');
    };

    return (
        <div className="container">
            <h2>Validador de CPF</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    placeholder="Digite seu CPF"
                />
                <button type="submit">Validar CPF</button>
            </form>
            {resultado && <p>{resultado}</p>}
        </div>
    );
};

export default ValidadorCPF;
