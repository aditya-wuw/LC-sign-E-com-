import  pool  from "@/lib/db";
import { numIDGen } from "@/Utils/Utils";
export async function POST(req) {
    try {
        const item_details = await req.json();
        const query = (`
            INSERT INTO items (id,item_details) VALUES ($1,$2)
            `)
        const values = [numIDGen(),JSON.stringify(item_details)];
        await pool.query(query,values)
        return new Response(JSON.stringify({message : "Inserted"}),{status:200})  
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({message : "failed to insert"}),{status:400});
    }
}