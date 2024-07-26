import { Client, Databases, Account } from "appwrite";

const client = new Client();
client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("66a3cc3d0002c8dd0b64"); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);
