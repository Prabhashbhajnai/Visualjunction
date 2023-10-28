import { ID } from "appwrite";

// types
import { INewUser } from "@/types";
import { account } from "./config";

export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.username,
            user.password,
            // user.name,
        );
    } catch (error) {
        console.log(error);
        return error
    }
}