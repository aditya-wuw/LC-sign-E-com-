import pool from "@/lib/db";

export async function GET() {
    try{
        const query = `SELECT * FROM items`
        const res = await pool.query(query);
        return new Response(JSON.stringify({message : res.rows}),{status:200});
    }
    catch(err){
        console.log(err);
        return new Response(JSON.stringify({message : "server-side error"}),{status:400});
    }
}