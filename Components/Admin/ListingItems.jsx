import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import ItemForm from "./itemForm";
import axios from "axios";
import { ClipLoader } from "react-spinners";
const ListingItems = ({}) => {
  const [list,setlist] = useState([]);
  useEffect(()=>{
    async function fetchdata(){
      const res = await axios.get('/API/Show/')
      setlist(res.data.message);
    }
    fetchdata();
  },[])
  
  const [def,setdef] = useState({});
  const [OpenForm,setOpenForm] = useState(false);
  const [isloading,setloading] = useState(false)

  const  handleDelete = async (index,id) =>{
    const deleted = list.filter((_,i)=>i!== index);
    await axios.delete('/API/delete',{ data:{ id }});
    setlist(deleted);
  }

  const handleEdit = async (index,item) =>{
    setlist(list.filter((_,i)=>i!== index));
    await axios.delete('/API/delete',{ data:{ id:item.id }});
    setOpenForm(true)
    setdef({
      Item_name: item.item_details?.Item_name,
      Price: item.item_details?.Price,
      Item_desc: item.item_details?.Item_desc
    })
  }
  return (
    <>
    { !isloading ? <div>
      {OpenForm && <div className="w-full flex justify-center"><ItemForm setloading={setloading}  setOpenForm={setOpenForm} setlist={setlist} defaultval={def} setdef={setdef}/></div>}
      <div className="md:mx-[20%] mx-5 mt-5">
        <div className="flex justify-end mb-5">
          <button onClick={()=>setOpenForm(true)} className="cursor-pointer  hover:bg-amber-400 transtion-bg duration-200 p-2 md:p-3 rounded-2xl border-1">
            Add new item
          </button>
        </div>
        <div>
          { list.length !== 0 && 
          <table className="text-center border-2">
            <thead>
              <tr className="border-2 text-center">
                <th className="w-[10%] p-2">id</th>
                <th className="w-[70%] p-2">item_details</th>
                <th className="w-[40%] p-2">Price</th>
                <th className="w-[10%] p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item,i)=>(<tr key={i}>
                <td  className="md:p-3" >{item?.id}</td>
                <td  className="md:p-3" >{item.item_details?.Item_name}</td>
                <td  className="md:p-3">₹ {item.item_details?.Price}</td>
                <td className="md:p-3 relative bottom-2">  
                <FaEdit className="absolute left-2 cursor-pointer scale-100 hover:scale-125 transition-scale duration-200" onClick={()=>handleEdit(i,item)} />
                <MdDeleteForever className="absolute left-8 scale-125 cursor-pointer hover:scale-150 transition-scale duration-200" onClick={()=>handleDelete(i,item?.id)}/></td>
              </tr>))} 
            </tbody>
          </table> }
        </div>
      </div>
    </div> : <div className="flex w-full h-screen justify-center items-center"><ClipLoader /></div>
    } 
    </>
  );
};

export default ListingItems;
