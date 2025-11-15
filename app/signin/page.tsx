"use client";

import Link from "next/link";
import "../globals.css";
import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      const res = await axios({
        url: "http://localhost:3000/signin",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: new URLSearchParams({ email, password }).toString(),
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
                        placeholder="Email address" onChange={(e) => setEmail(e.target.value)} />
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
                    <input className="flex-[1] outline-0 text-left py-[15px]" name="password" type="password" value={password}
                        placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
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
                text-white font-normal text-[16px] leading-[1.5] uppercase">
                    {isPending ? "Signing in..." : "SIGN IN"}
                </button>
                {/* </Link> */}
            </div>
        </form>
    );
}
