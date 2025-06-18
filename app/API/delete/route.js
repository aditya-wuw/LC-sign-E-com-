import pool from "@/lib/db";

export async function DELETE(req) {
    try {
        const { id } = await req.json();
        const query = `DELETE FROM items WHERE id = $1`;
        await pool.query(query,[id]);
        return new Response(JSON.stringify({message : "deleted"}),{status:200})
        
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({message : "failed to delete"}),{status:400})
    }
}