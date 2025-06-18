import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout
            title="Masuk ke Sistem Surat POLMED"
            description="Silakan masukkan email dan password Anda untuk masuk ke sistem."
        >
            <Head title="Login" />

            <form
                className="flex flex-col gap-8 bg-white/90 rounded-2xl shadow-xl p-8 border border-violet-100"
                onSubmit={submit}
            >
                <div className="flex flex-col items-center mb-4">
                    <div className="w-16 h-16 rounded-full border-4 border-violet-200 flex items-center justify-center text-violet-700 text-2xl font-bold bg-gradient-to-b from-violet-200 to-violet-400 shadow-inner select-none mb-2">
                        <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                            <rect x="4" y="10" width="24" height="14" rx="4" fill="#a78bfa" />
                            <rect x="8" y="14" width="16" height="4" rx="2" fill="#ede9fe" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-violet-800 mb-1">Sistem Surat POLMED</h2>
                    <p className="text-violet-500 text-sm">Login untuk melanjutkan</p>
                </div>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-violet-700 font-medium">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                            className="border-violet-300 focus:ring-2 focus:ring-violet-400"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password" className="text-violet-700 font-medium">Password</Label>
                            {canResetPassword && (
                                <TextLink href={route('password.request')} className="ml-auto text-sm text-violet-500 hover:underline" tabIndex={5}>
                                    Lupa password?
                                </TextLink>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Password"
                            className="border-violet-300 focus:ring-2 focus:ring-violet-400"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            tabIndex={3}
                        />
                        <Label htmlFor="remember" className="text-violet-700">Ingat saya</Label>
                    </div>

                    <Button
                        type="submit"
                        className="mt-4 w-full bg-gradient-to-r from-violet-600 to-violet-500 text-white font-bold rounded-xl hover:from-violet-700 hover:to-violet-600 transition"
                        tabIndex={4}
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                        Masuk
                    </Button>
                </div>

                <div className="text-center text-sm text-violet-400">
                    Belum punya akun?{' '}
                    <TextLink href={route('register')} tabIndex={5} className="text-violet-700 hover:underline">
                        Daftar
                    </TextLink>
                </div>
            </form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}