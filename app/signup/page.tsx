"use client";

import Link from "next/link";
import "../globals.css";
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Signup() {
    const searchParams = useSearchParams();
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [surname, setSurname] = React.useState('');
    const [dateOfBirth, setDateOfBirth] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [refCode, setRefCode] = React.useState('');
    const [error, setError] = React.useState("");
    const [isPending, startTransition] = React.useTransition();
    const router = useRouter();

    useEffect(() => {
        const email = searchParams.get('email');
        const refCode = searchParams.get('refCode');
        console.log('Query Param email:', email, refCode);

        if (email) setEmail(email);
        if (refCode) setRefCode(refCode);
    }, [searchParams]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        startTransition(async () => {
            const res = await axios({
                url: "http://localhost:3000/signup",
                method: "PUT",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                data: { 
                    email, 
                    name,
                    surname,
                    dateOfBirth,
                    password,
                    refCode: refCode ? +refCode : null
                },
            });
            if (res) {
                // Redirect after successful login
                console.log("Sign-in successful:", res.data);
                window.localStorage.setItem("email", email);
                router.push("/home");
            } else {
                setError("Invalid email or password");
            }
        });
    }

    return (
        <form onSubmit={handleSubmit} className="py-[80] px-[40]">
            <div className="mb-[25px]">
                <h2 className="text-center font-normal text-5xl mb-[15px]">My <strong>trendies</strong> Account</h2>
                <p className="text-center font-medium text-xl">Create an account to shop unique finds, chat with sellers, and bid smartly.</p>
            </div>
            <div className="text-center  m-[16px]">
                <div className="flex justify-between max-w-[350px] mx-auto min-h-[49px] px-[10px] border-b-[2px] border-[#242424]">
                    <input className="flex-[1] outline-0 text-left py-[15px]" name="email" type="email" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address" />
                    <div className="flex justify-center flex-col">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" className="w-[16px] h-[16px]">
                            <path stroke-linecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="text-center  m-[16px]">
                <div className="flex justify-between max-w-[350px] mx-auto min-h-[49px] px-[10px] border-b-[2px] border-[#242424]">
                    <input className="flex-[1] outline-0 text-left py-[15px]" name="name" type="text"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name" />
                    <div className="flex justify-center flex-col">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" className="w-[16px] h-[16px]">
                            <path stroke-linecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="text-center  m-[16px]">
                <div className="flex justify-between max-w-[350px] mx-auto min-h-[49px] px-[10px] border-b-[2px] border-[#242424]">
                    <input className="flex-[1] outline-0 text-left py-[15px]" name="surname" type="text"
                        onChange={(e) => setSurname(e.target.value)}
                        placeholder="Surname" />
                    <div className="flex justify-center flex-col">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" className="w-[16px] h-[16px]">
                            <path stroke-linecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </div>
                </div>
            </div>
            {/* <div className="text-center  m-[16px]">
                <div className="flex justify-between max-w-[350px] mx-auto min-h-[49px] px-[10px] border-b-[2px] border-[#242424]">
                    <input className="flex-[1] outline-0 text-left py-[15px]" name="email" type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Nickname" />
                    <div className="flex justify-center flex-col">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" className="w-[16px] h-[16px]">
                            <path stroke-linecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </div>
                </div>
            </div> */}
            <div className="text-center  m-[16px]">
                <div className="flex justify-between max-w-[350px] mx-auto min-h-[49px] px-[10px] border-b-[2px] border-[#242424]">
                    <input className="flex-[1] outline-0 text-left py-[15px]" name="dateOfBirth" type="text"
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        placeholder="Date Of Birth" />
                    <div className="flex justify-center flex-col">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" className="w-[16px] h-[16px]">
                            <path stroke-linecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="text-center  m-[16px]">
                <div className="flex justify-between max-w-[350px] mx-auto min-h-[49px] px-[10px] border-b-[2px] border-[#242424]">
                    <input className="flex-[1] outline-0 text-left py-[15px]" name="password" type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password" />
                    <div className="flex justify-center flex-col">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" className="w-[16px] h-[16px]">
                            <path stroke-linecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="text-center  m-[16px]">
                <div className="flex justify-between max-w-[350px] mx-auto min-h-[49px] px-[10px] border-b-[2px] border-[#242424]">
                    <input className="flex-[1] outline-0 text-left py-[15px]" name="confirm_password" type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
                    <div className="flex justify-center flex-col">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" className="w-[16px] h-[16px]">
                            <path stroke-linecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="text-center m-[16px]">
                <div className="flex justify-between max-w-[350px] mx-auto min-h-[49px] px-[10px] border-b-[2px] border-[#242424]">
                    <input className="flex-[1] outline-0 text-left py-[15px]" name="refCode" type="number" value={refCode}
                        onChange={(e) => setRefCode(e.target.value)}
                        placeholder="Referral Code" />
                    <div className="flex justify-center flex-col">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" className="w-[16px] h-[16px]">
                            <path stroke-linecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="text-center">
                {error && <p className="text-red-600 mb-2">{error}</p>}
                {/* <Link href="/home"> */}
                <button
                    type="submit"
                    disabled={isPending}
                    className="
                mt-[10px] px-[18px] py-[10px] w-[246px] h-[48px] bg-[#1C1C1C]
                text-white font-normal text-[16px] leading-[1.5] uppercase">SIGN UP</button>
                {/* </Link> */}
            </div>
        </form>
    );
}
