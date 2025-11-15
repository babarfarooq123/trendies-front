"use client";

import React, { use, useEffect, useState } from "react";
import "../../globals.css";
import { io } from "socket.io-client";
import axios from "axios";

interface Params {
    id: string;
}

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {

    const unwrappedParams = React.use(params); // unwrap the Promise
    console.log("Product ID:", unwrappedParams);

    const [socket, setSocket] = useState<any>(null);
    const [userId, setUserId] = useState<any>(null);
    const [message, setMessage] = useState<any>("");
    const [bid, setBid] = useState<any>(0);
    const [bidList, setBidList] = useState<Array<any>>([]);
    const [declineBidCount, setDeclineBidCount] = useState<number>(0);
    const [acceptBidCount, setAcceptBidCount] = useState<number>(0);
    const [product, setProduct] = React.useState<any>({});

    async function getProducts() {
        try {
            // const res = await axios.get('http://localhost:3000/get-single-products', {
            const res = await axios.get('https://trendies-back-production.up.railway.app/get-single-products', {
                params: { id: unwrappedParams?.id }
            });
            if (res.data?.message == "Product retrieved successfully") {
                setProduct(res.data.products);
            }
        } catch (error) {
            console.error("Error fetching invites:", error);
        }
    }

    useEffect(() => {
        // const newSocket = io("http://localhost:3000");
        const newSocket = io("https://trendies-back-production.up.railway.app");
        setSocket(newSocket);

        getProducts();        
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on("connect", () => {
                console.log("Socket connected:", socket.id);
            });

            // if (userId == 1) {
            //     socket.on("2", (data: any) => {
            //         console.log(`Message from ${userId}:`, data);
            //     });
            // } else if (userId == 2) {
            //     socket.on("1", (data: any) => {
            //         console.log(`Message from ${userId}:`, data);
            //     });
            // }

            let email = window.localStorage.getItem("email");
            console.log("EMAILER: ", email, socket);
            
            socket.on(email, (data: any) => {
                console.log(`Message from ${userId}:`, data);
                setBidList(prevBidList => prevBidList.concat([data.content]))
            });

            socket.on("disconnect", () => {
                console.log("Socket disconnected");
            });
        }

        return () => {
            if (socket) {
                socket.off("connect");
                socket.off("disconnect");
            }
        };
    }, [socket]);

    // useEffect(() => {
    //     if (socket && userId) {
    //         if (userId == 1) {
    //             socket.on("2", (data: any) => {
    //                 console.log(`Message from ${data.content.userId}:`, bidList, data);
    //                 setBidList(prevBidList => prevBidList.concat([data.content]));
    //             });
    //         } else if (userId == 2) {
    //             socket.on("1", (data: any) => {
    //                 console.log(`Message from ${data.content.userId}:`, data);
    //                 setBidList(prevBidList => prevBidList.concat([data.content]));
    //             });
    //         }
    //     }
    // }, [userId]);
    console.log("Bid List:", bidList);

    return (
        <div className="py-[24px] px-[120px] gap-[8px] grid grid-cols-3">
            <div className="mt-8px p-[16px] border border-gray-200 rounded-lg shadow-sm w-full hover:bg-gray-100 cursor-pointer">
                <img
                    src={product.imageUrl ? product?.imageUrl : null}
                    alt={product?.name}
                    className="sm:w-[200px] sm:h-[200px] mx-auto"
                />
                <h4 className="mt-[8px]">{product?.name}</h4>
                <h4 className="mt-[8px] break-all">{product.email ? "@" + product.email.split("@")[0] : null}</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, alias!</p>
            </div>
            <div className="col-span-2 p-[16px]">
                <h4 className="mt-[8px]">Chat with product seller</h4>
                {/* <select onChange={(e) => {
                    setUserId(e.target.value);
                    // if (socket) {
                    //     if (e.target.value == "1")
                    //         socket.emit("2", `Hello ${e.target.value} joined`);
                    //     if (e.target.value == "2")
                    //         socket.emit("1", `Hello ${e.target.value} joined`);
                    // }
                }}>
                    <option value="1">User 1</option>
                    <option value="2">User 2</option>
                    <option value="3">User 3</option>
                </select> */}

                {
                    bidList && bidList.length > 0 && bidList.map((bidItem, index) => (
                        <div key={index} className="border-b py-[8px]">
                            <p><strong>User:</strong> {bidItem.senderEmail}</p> 
                            <p><strong>Message:</strong> {bidItem.message} -</p> 
                            <p><strong>Bid:</strong> {bidItem.amount}</p>
                            <p><strong>Product:</strong> {bidItem.name}</p>
                        </div>
                    ))
                }
                {
                    acceptBidCount == 1 || declineBidCount == 5 ?
                        null :
                        bidList && bidList.length > 0 ?
                            <div>
                                <button className="border px-[16px] py-[8px] mt-[8px] bg-green-500" onClick={() => {
                                    console.log("Message-btn:", message);

                                    // if (socket && userId) {
                                    //     console.log("Message-btn-00:", message);
                                    //     socket.emit(userId == 1 ? 2 : 1, {
                                    //         message: message,
                                    //         amount: bid,
                                    //         userId: userId,
                                    //     });
                                    //     setMessage("");
                                    // }

                                    setAcceptBidCount(prev => prev + 1);

                                }}>Accept</button>

                                <button className="border px-[16px] py-[8px] mt-[8px] bg-red-500" onClick={() => {
                                    console.log("Message-btn:", message);

                                    setDeclineBidCount(prev => prev + 1);

                                    // if (socket && userId) {
                                    //     console.log("Message-btn-00:", message);
                                    // socket.emit(userId == 1 ? 2 : 1, {
                                    //     message: message,
                                    //     amount: bid,
                                    //     userId: userId,
                                    // });
                                    // setMessage("");
                                    // }
                                }}>Decline</button>
                                <br />
                                <br />
                            </div> : null
                }

                {
                    acceptBidCount == 1 || declineBidCount == 5 ?
                        null :
                        <div>
                            <textarea className="border p-[8px]" rows={2} cols={50} onChange={(e) => {
                                console.log("Message:", e.target.value);
                                setMessage(e.target.value);
                            }} />
                            <br />
                            <input className="border p-[8px]" type="number" value={bid} onChange={(e) => {
                                setBid(e.target.value);
                            }} />
                            <br />
                            <button className="border px-[16px] py-[8px] mt-[8px]" onClick={() => {
                                console.log("Message-btn:", message);

                                let recieverEmail = product.email;
                                let senderEmail = window.localStorage.getItem("email");
                                if (socket && senderEmail && recieverEmail) {
                                    console.log("Message-btn-00:", message, bid);
                                    socket.emit('route-message-to-user', {
                                        message: message,
                                        amount: bid,
                                        senderEmail: senderEmail,
                                        recieverEmail: recieverEmail,
                                        ...product
                                    });
                                    setMessage("");
                                }
                            }}>Send</button>
                        </div>
                }


            </div>
        </div>
    );
}
