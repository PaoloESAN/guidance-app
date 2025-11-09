'use client';
import { Button } from "antd";
import Link from "next/link";
import '@ant-design/v5-patch-for-react-19';
import Dropdown from "./dropdown";
export default function Inicio() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen min-w-max gap-8">
            <h1>Bienvenido a la página de inicio</h1>
            <Link href="/form">
                <Button type="primary" size="large">
                    Ir al formulario
                </Button>
            </Link>
            <Dropdown />
        </div>
    )
}
