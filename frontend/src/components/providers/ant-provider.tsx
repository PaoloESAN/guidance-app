'use client';

import { ConfigProvider } from 'antd';
import { theme } from 'antd';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const { darkAlgorithm, defaultAlgorithm } = theme;

export function AntProvider({ children }: { children: React.ReactNode }) {
    const { theme: currentTheme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <>{children}</>;
    }

    const isDark = currentTheme === 'dark' || (currentTheme === 'system' && systemTheme === 'dark');

    const antTheme = {
        token: {
            borderRadius: 12,
        },
        algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
    };

    return (
        <ConfigProvider theme={antTheme}>
            {children}
        </ConfigProvider>
    );
}
