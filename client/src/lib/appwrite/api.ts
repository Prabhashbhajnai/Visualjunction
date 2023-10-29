import { ID } from "appwrite";

// types
import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";

export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.username,
            user.password,
        );

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name)

        const newUser = await saveUserToDB({
            accountIs: newAccount.$id,
            email: newAccount.email,
            name: newAccount.name,
            username: user.username,
            imageUrl: avatarUrl,
        })

        return newUser
    } catch (error) {
        console.log(error);
        return error
    }
}

export async function saveUserToDB(user: {
    accountIs: string;
    email: string,
    name: string,
    imageUrl: URL,
    username?: string,
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user
        )
    } catch (error) {
        console.log(error);
    }
}