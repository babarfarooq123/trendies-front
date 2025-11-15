"use client";

import Link from "next/link";
import "../globals.css";
import React, { useEffect } from "react";
import axios from "axios";

export default function Home() {
    const prodArr: Array<{ imageUrl: string; id: number, name: string }> = [
        {
            imageUrl: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSKNyXEf7TaJuJbWFnSLs86KXrvr1tbikob9v_nPn-m5StwvJaPgVGDKGeOHYFW8uOPmR95xd9GNGjgmFy_Bz7p88AoG3FSHHWHs7Pz9AOHanoW1t3-PGz8NA",
            id: 1,
            name: "Freezer",
        },
        {
            imageUrl: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSKNyXEf7TaJuJbWFnSLs86KXrvr1tbikob9v_nPn-m5StwvJaPgVGDKGeOHYFW8uOPmR95xd9GNGjgmFy_Bz7p88AoG3FSHHWHs7Pz9AOHanoW1t3-PGz8NA",
            id: 2,
            name: "Freezer",
        },
        {
            imageUrl: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSKNyXEf7TaJuJbWFnSLs86KXrvr1tbikob9v_nPn-m5StwvJaPgVGDKGeOHYFW8uOPmR95xd9GNGjgmFy_Bz7p88AoG3FSHHWHs7Pz9AOHanoW1t3-PGz8NA",
            id: 3,
            name: "Freezer",
        },
        {
            imageUrl: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSKNyXEf7TaJuJbWFnSLs86KXrvr1tbikob9v_nPn-m5StwvJaPgVGDKGeOHYFW8uOPmR95xd9GNGjgmFy_Bz7p88AoG3FSHHWHs7Pz9AOHanoW1t3-PGz8NA",
            id: 4,
            name: "Freezer",
        },
        {
            imageUrl: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSKNyXEf7TaJuJbWFnSLs86KXrvr1tbikob9v_nPn-m5StwvJaPgVGDKGeOHYFW8uOPmR95xd9GNGjgmFy_Bz7p88AoG3FSHHWHs7Pz9AOHanoW1t3-PGz8NA",
            id: 5,
            name: "Freezer",
        },
        {
            imageUrl: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSKNyXEf7TaJuJbWFnSLs86KXrvr1tbikob9v_nPn-m5StwvJaPgVGDKGeOHYFW8uOPmR95xd9GNGjgmFy_Bz7p88AoG3FSHHWHs7Pz9AOHanoW1t3-PGz8NA",
            id: 6,
            name: "Freezer",
        },
    ];
    const [products, setProducts] = React.useState<Array<any>>([]);

    async function getProducts() {
        try {
            // const res = await axios.get('http://localhost:3000/get-products', {
            const res = await axios.get('https://trendies-back-production.up.railway.app/get-products', {
                params: { email: window.localStorage.getItem("email") }
            });
            if (res.data?.message == "Products retrieved successfully") {
                setProducts(res.data.products);
            }
        } catch (error) {
            console.error("Error fetching invites:", error);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="py-[24px] px-[120px] gap-[8px] grid grid-cols-3">
            {
                products.map((prod) => (
                    <Link key={prod.id} href={`/home/${prod.id}`}>
                        <div key={prod.id} className="mt-8px p-[16px] border border-gray-200 rounded-lg shadow-sm w-full hover:bg-gray-100 cursor-pointer">
                            <img
                                src={prod.imageUrl}
                                alt={prod.name}
                                className="sm:w-[200px] sm:h-[200px] mx-auto"
                            />
                            <h4 className="mt-[8px]">{prod.name}</h4>
                            <h4 className="mt-[8px] break-all">{prod.email ? "@" + prod.email.split("@")[0] : null}</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, alias!</p>
                        </div>
                    </Link>
                ))
            }
        </div>
    );
}
