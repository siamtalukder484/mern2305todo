import { useEffect, useState } from 'react'
import { getDatabase, ref, set,push,onValue,remove,update  } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const db = getDatabase();
  let [text,setText] = useState("")
  let [todo, setTodo] = useState([])
  let [togglebtn, setToggleBtn] = useState(false)
  let [todoid, setTodoId] = useState()

  let handleForm = (e) =>{
    setText(e.target.value);
  }

  //write operation
  let handleAdd = () => {
    set(push(ref(db, "alltodo")),{
      todotext: text,
    })
    setText("")
  }

// read operation
  useEffect(()=>{
    const todoRef = ref(db, 'alltodo');
    onValue(todoRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        arr.push({...item.val(),id:item.key})
      })
      setTodo(arr)
    });
  },[])

//delete operation
let handleDelete = (id) => {
  remove(ref(db,'alltodo/'+ id )).then(()=>(
    // console.log("delte done")
    toast('🦄 Khatam bye bye tata', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      })
  ))
}
// all delete
let handleAllDelete = () =>{
  remove(ref(db, 'alltodo')).then(()=>(
    console.log("all delete done")

  ))
}


//update operation

let handleUpdate = (item)=>{
  setTodoId(item.id)
  setText(item.todotext)
  setToggleBtn(true)
}
let handleEdit = () => {
  console.log(text);
  console.log(todoid);
  update(ref(db, 'alltodo/' + todoid),{
    todotext: text,
  }).then(()=>{
    setToggleBtn(false)
    setText("")
  })
}


  return (
    <>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
      <ToastContainer />
    <div>
      <input onChange={handleForm} value={text} placeholder='enter your text'/>
      {togglebtn 
        ?
        <button onClick={handleEdit}>Edit</button>
        :
        <button onClick={handleAdd}>Add</button>
      }
    </div>
    <div>
      <button onClick={handleAllDelete}>All Delete</button>
    </div>
    <ul>
      {
        todo.map((item,index)=>(
          <li 
            key={index}>{item.todotext}
            <button onClick={()=>handleDelete(item.id)}>Delete</button>
            <button onClick={()=>handleUpdate(item)}>Update</button>
          </li>
        ))
      }
    </ul>
    </>
  )
}

export default App
