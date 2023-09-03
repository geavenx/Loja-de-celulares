"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from '@/app/components/loading';
import Footer from "@/app/components/footer";

export default function DashboardLayout({ children }) {
    const [isSuccess, setIsSuccess] = useState(false);

    const { push } = useRouter();

    useEffect(() => {
        (async () => {
            const { user, error } = await getUser();

            if (error) {
                push('/');
                return;
            }

            setIsSuccess(true);
        })();
    }, [push]);

    if (!isSuccess) {
        return (
            <div className="container mx-auto flex h-80 items-center justify-center flex-col">
                <Loading />
            </div>
        )
    }

    return (
        <main>
            {children}
        </main>
    )
}

async function getUser() {
    try {
        const { data } = await axios.get('api/auth/me');
        return {
            user: data,
            error: null,
        }
    } catch (err) {
        return {
            user: null,
            error: err.message,
        }
    }
}