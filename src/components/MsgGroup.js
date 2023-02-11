import React,{useState,useEffect} from 'react'
import {BsSearch,BsThreeDotsVertical} from 'react-icons/bs';
import { getDatabase, ref,set, onValue,push, remove} from "firebase/database";
import { useSelector,useDispatch } from 'react-redux';
import { chatUserInfo } from '../slices/chatSlice';

const MsgGroup = () => {
  const db = getDatabase();
  let dispatch=useDispatch()
  let data=useSelector((state)=>state.userLoginInfo.userInfo)
  let [MsgGrouplist,setMsgGrouplist]=useState([])


  useEffect(()=>{
    const myGroupRef = ref(db, 'Group/');
    onValue(myGroupRef, (snapshot) => {
      let arr=[]
      snapshot.forEach((item)=>{
          arr.push({...item.val(),id:item.key})
      })
      setMsgGrouplist(arr)
    });
  },[])


  let handleActiveChat=(item)=>{
    console.log(item)
    dispatch(chatUserInfo({
      name:item.groupname,id:item.id,status:'group',
      adminid:item.adminid
    }))
  }
 
  return (
    <div className='mt-5 relative h-[300px] shadow-lg	w-full overflow-y-scroll p-5	'>


    <h2 className='font-poppins font-semibold text-xl mb-4'>Group List </h2>
    
    {MsgGrouplist.map((item)=>(
      <div onClick={()=>handleActiveChat(item)} className='flex  w-full items-center gap-x-4  py-3.5 border-b '>
      <div className='w-[70px] h-[70px] '>
        <img src="images/profile.png" alt="" />
      </div>
    <div className='w-[50%]'>
    <h2 className='font-poppins font-semibold text-xl'>{item.groupname}</h2>
    <h2 className='font-poppins font-normal text-red-500 text-sm'>{item.admin}</h2>
    <h2 className='font-poppins font-normal text-sm'>{item.grouptag}</h2>
    </div>
      <div >
      <button className='font-poppins font-semibold text-xl bg-primary p-2 text-white rounded-br-xl ml-5 drop-shadow-md	mt-3'>Msg</button>
      </div>
   
  </div>
    ))}
    </div>
  )
}

export default MsgGroup