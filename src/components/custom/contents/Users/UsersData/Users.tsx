import { ColumnDef } from "@tanstack/react-table";


export type Users = {
    id: number;
    name: string;
    email: string;
    image : string;
    dateCreation : Date;
}


export const columns : ColumnDef<Users>[] = [
    {
        accessorKey: "id",
        header: "ID Utilisateurs",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "id",
        header: "ID Produit",
    },
]