import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='flex bg-[#44efe4] justify-around font-bold py-2 border'>
        <div className="logp">
          <span className="font-bold text-xl mx-9 text-black hover:cursor-pointer hover:scale-110  px-2 hover:bg-purple-400 transition-all duration-400 hover:rounded-lg">Itask</span>
        </div>
      <ul className='flex gap-8 mx-9'>
        <li className='hover:cursor-pointer hover:scale-110 hover:font-bold px-2 hover:bg-purple-400 transition-all duration-400 hover:rounded-lg'>Home</li>
        <li className='hover:cursor-pointer hover:scale-110 hover:font-bold px-2 hover:bg-purple-400 transition-all duration-400 hover:rounded-lg'>Task Todo</li>
       
      </ul>
      </nav>
    </div>
  )
}

export default Navbar
