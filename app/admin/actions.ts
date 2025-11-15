"use server";

import { z } from "zod";
import { blogSchema } from "../utils/zodSchemas";
import axios from "axios";
import { parse } from "path";

export async function createJob(formData: FormData) {
    console.log("123")
    const email = formData.get("email");
    const refCode = formData.get("refCode") as string | null;

    const res = await axios.post('http://localhost:3000/send-invite', {
        email,
        refCode: refCode ? parseInt(refCode) : null
    });

    console.log("Response:", res);
}

export async function validateCreateJob(values: z.infer<typeof blogSchema>) {
    const result = blogSchema.safeParse(values);

    if (!result.success) {
        return {
            status: "error",
            message: result.error.message,
        };
    }

    //do your mutation here

    console.log(result.data.email, result.data.refCode);

    return {
        status: "success",
        message: "Job created successfully",
    };
}