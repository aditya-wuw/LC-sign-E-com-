import pool from "@/lib/db"

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url)
        const _user = searchParams.get("_user")
        const Query = ('SELECT * FROM _carts JOIN items ON _carts.item_id = items.id WHERE user_id = $1')
        const value = [_user]
        const items = await pool.query(Query,value)
        return new Response(JSON.stringify({message : items.rows }),{status:200})
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({message : "Somthing went wrong while fetching data"}),{status:401})
    }
    
}