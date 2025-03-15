import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { div } from 'three/tsl';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa"



function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)


  useEffect(() => {
    let todostring = localStorage.getItem('todos')
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem('todos'))
      settodos(todos)
    }
  }, [])


  const savelocal = () => {
    localStorage.setItem('todos', JSON.stringify(todos))

  }
  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id == id)
    settodo(t[0].todo)
    let newtodos = todos.filter(item => { return item.id !== id })

    settodos(newtodos)
    savelocal()
  }

  const handleDelete = (e, id) => {
    let confirmdel = window.confirm("Are you sure wanted to delete the listed todo")
    if (!confirmdel) return;
    console.log(`the id is ${id}`)
    let newtodos = todos.filter(item => { return item.id !== id })
    settodos(newtodos)
    savelocal()

  }
  const handleAdd = () => {
    if (!todo.trim()) {
      alert("Enter a valid todo")
      return
    }
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    console.log(todos)
    savelocal()
  }

  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => { return item.id == id })
    let newtodos = [...todos]
    newtodos[index].isCompleted = !newtodos[index].isCompleted
    settodos(newtodos)
    savelocal()
  }




  return (
    <>
      <Navbar />
      <div className="md:container mx-3 border md:mx-auto bg-[#a5e4e0] rounded-xl p-5 my-5 min-h-[80vh] md:w-[50%]">
        <h1 className="font-bold text-center text-2xl underline">Manage Your Todo at One Place </h1>
        <div className="addtodo my-5 flex flex-col gap-4 ">
          <h2 className='text-lg font-bold '>Add a Todo</h2>
          <div className="flex">
            <input onChange={handleChange} value={todo} className='bg-white w-full rounded-2xl px-5 py-1 border' type="text" />
            <button onClick={handleAdd} className='bg-violet-500 hover:bg-violet-600 transition-all duration-75 hover:scale-95 p-2 font-bold py-1 text-white rounded-full mx-2'>Save</button>
          </div>
        </div>
        <input onChange={toggleFinished} type="checkbox" className='mb-[22px]' checked={showFinished} />ShowFinished
        <hr className='w-3/4 mx-auto ' />
        <h2 className='font-bold text-lg'>Your Todo List</h2>
        <div className="todos"></div>
        {todos.length == 0 && <div className='m-5'>No todos to display</div>}
        {todos.map(item => {


          return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between md:w-full my-5 ">

            <div className='flex gap-5'>


              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full" >
              <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-500 hover:bg-violet-600 transition-all duration-200 hover:scale-110 p-2 font-bold py-1 text-white rounded-md mx-1'><FaEdit /></button>
              <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-500 hover:bg-violet-600 transition-all duration-200 hover:scale-110 p-2 font-bold py-1 text-white rounded-md mx-1'><MdDelete /></button>
            </div>
          </div>
        })}

      </div>

    </>
  )
}

export default App
