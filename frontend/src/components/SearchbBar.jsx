import React from 'react'
import { IoSearch } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";



const SearchbBar = ({value,onChange,handleSearch,onClearSearch}) => {
  return (
    <div className='w-[450px] bg-slate-100 rounded-md px-3  items-center flex '>
        <input type="text"
        placeholder='Search Notes'
        value={value}
        onChange={onChange}
        className='bg-transparent w-full outline-none text-sm py-[11px]' />
        {value&&<IoMdClose className='text-slate-400 hover:text-black mr-2 size-6' onClick={onClearSearch}/>}

    <IoSearch className='text-slate-400 hover:text-black cursor-pointer size-6' onClick={handleSearch} />
    </div>

  )
}

export default SearchbBar