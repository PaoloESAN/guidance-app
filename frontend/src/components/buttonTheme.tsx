'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from 'antd';

export default function ButtonTheme() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button loading disabled />
        );
    }

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <Button
            onClick={toggleTheme}
            icon={theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            title={`Cambiar a ${theme === 'light' ? 'tema oscuro' : 'tema claro'}`}
        />
    );
}
