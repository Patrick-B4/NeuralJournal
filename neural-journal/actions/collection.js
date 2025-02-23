"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { request } from "@arcjet/next";
import aj from "@/lib/arcjet";
import { db } from "@/lib/prisma";

export async function createCollection(data){
    try {
        const{ userId } = await auth();
        if(!userId) throw new Error("Unauthorized");

        // ArcJet Rate Limiting
        const req = await request()

        const decision = await aj.protect(req, {
            userId,
            requested: 1,
        });

        if(decision.isDenied()) {
            if(decision.reason.isRateLimit()) {
                const {remaining, reset} = decision.reason;
                console.error({
                    code: "RATE_LIMIT_EXCEEDED",
                    details: {
                        remaining, 
                        resetInSeconds: reset,
                    },
                });

                throw new Error("Too many requests. Please try again later.");
            }

            throw new Error("Request Blocked");
        }

        const user = await db.user.findUnique({
            where: {clerkUserID: userId},
        });

        if(!user) {
            throw new Error("User not found");
        }

        const collection = await db.collection.create({
            data: {
                name: data.name,
                description: data.description,
                userId: user.id,
            },
        });

        revalidatePath('/dashboard');
        return collection;

    } catch (error) {
        throw new Error(error.message)
    }
}

// export async function getCollections(){
//     try {
//         const{ userId } = await auth();
//         if(!userId) throw new Error("Unauthorized");

//         const user = await db.user.findUnique({
//             where: {clerkUserID: userId},
//         });

//         if(!user) {
//             throw new Error("User not found");
//         }

//         const collections = await db.collection.findMany({
//             where: {
//                 userId: user.id,
//             },
//             orderBy: {createdAt: "desc"},
//         });

//         return collections;

//     } catch (error) {
//         throw new Error(error.message)
//     }
// }

export async function getCollections() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
  
    const user = await db.user.findUnique({
      where: { clerkUserID: userId },
    });
  
    if (!user) {
      throw new Error("User not found");
    }
  
    const collections = await db.collection.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
  
    return collections;
  }