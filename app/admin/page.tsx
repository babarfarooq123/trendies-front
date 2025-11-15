"use client";

import Link from "next/link";
import "../globals.css";
import { useSearchParams } from 'next/navigation';
import React, { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createJob } from "./actions";
import axios from "axios";

const schema = z.object({ name: z.string().min(1, "Name is required!") });


export default function Admin() {
    const [email, setEmail] = React.useState('');
    const [refCode, setRefCode] = React.useState('');
    // const form = useForm({
    //     defaultValues: {
    //         email: '',
    //         referral_code: 0
    //     }
    // });
    const [userInvities, setUserInvities] = React.useState<Array<any>>([]);
    const [error, setError] = React.useState("");
    const [isPending, startTransition] = React.useTransition();

    async function getUserInvities() {
        try {
            // const res = await axios.get('http://localhost:3000/get-invities');
            const res = await axios.get('https://trendies-back-production.up.railway.app/get-invities');
            if (res.data?.message == "Users retrieved successfully") {
                setUserInvities(res.data.users);
            }
        } catch (error) {
            console.error("Error fetching invites:", error);
        }
    }

    useEffect(() => {
        getUserInvities();
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        startTransition(async () => {
            // const email = formData.get("email");
            // const refCode = formData.get("refCode") as string | null;

            // const res = await axios.post('http://localhost:3000/send-invite', {
            const res = await axios.post('https://trendies-back-production.up.railway.app/send-invite', {
                email,
                refCode: refCode ? parseInt(refCode) : null
            });

            console.log("Response:", res);
            if (res) {
                // Redirect after successful login
                console.log("Sign-in successful:", res.data);
                getUserInvities();
                // window.localStorage.setItem("email", email);
            } else {
                setError("Invalid email or password");
            }
        });
    }

    console.log("Users: ", userInvities);


    return (
        <>
            <form onSubmit={handleSubmit} className="py-[80] px-[40]">
                <div className="mb-[25px]">
                    <h2 className="text-center font-normal text-5xl mb-[15px]">My <strong>trendies</strong> Account</h2>
                    <p className="text-center font-medium text-xl">Create an account to shop unique finds, chat with sellers, and bid smartly.</p>
                </div>
                <div className="text-center  m-[16px]">
                    <div className="flex justify-between max-w-[350px] mx-auto min-h-[49px] px-[10px] border-b-[2px] border-[#242424]">
                        <input className="flex-[1] outline-0 text-left py-[15px]" name="email" type="email" onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder="Email address" />
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
                        <input className="flex-[1] outline-0 text-left py-[15px]" name="refCode" type="number" onChange={(e) => setRefCode(e.target.value)}
                            value={refCode}
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
                    {/* {errors?.name && <p>{errors.name.message}</p>} */}
                    {/* <Link href="/home"> */}
                    <button type="submit" className="
                mt-[10px] px-[18px] py-[10px] w-[246px] h-[48px] bg-[#1C1C1C]
                text-white font-normal text-[16px] leading-[1.5] uppercase">SEND INVITE</button>
                    {/* </Link> */}
                </div>
            </form>

            <table className="w-full border-collapse border border-gray-400 mb-[16px]">
                <thead>
                    <tr>
                        <th className="p-[12px] border-b border-gray-300 text-left">User ID</th>
                        <th className="p-[12px] border-b border-gray-300 text-left">Email</th>
                        <th className="p-[12px] border-b border-gray-300 text-left">Referral Code</th>
                        <th className="p-[12px] border-b border-gray-300 text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userInvities && userInvities.length > 0 ?
                            userInvities.map((user, index) => (
                                <tr key={index} className="p-[16px] border-b border-gray-300">
                                    <td className="p-[12px] border-b border-gray-300">{user.id}</td>
                                    <td className="p-[12px] border-b border-gray-300">{user.email}</td>
                                    <td className="p-[12px] border-b border-gray-300">{user.refCode}</td>
                                    <td className="p-[12px] border-b border-gray-300">{user.status == 2 ? "Pending" : user.status == 1 ? "Active" : "Inactive"}</td>
                                </tr>
                            )) : <p>No users found.</p>
                    }
                </tbody>
            </table>

        </>
    );
}
