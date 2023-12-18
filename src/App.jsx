import { useState } from 'react'
import { getDatabase, ref, set,push,onValue } from "firebase/database";

function App() {
  const db = getDatabase();
  let [text,setText] = useState("")
  
  let handleForm = (e) =>{
    setText(e.target.value);
  }

  //write operation
  let handleAdd = () => {
    set(push(ref(db, "alltodo")),{
      todotext: text,
    })
  }

  // read operation
  const todoRef = ref(db, 'alltodo');
  onValue(todoRef, (snapshot) => {
    let arr = []
    snapshot.forEach((item)=>(
      arr.push(item.val())
    ))
    // console.log(snapshot.val());
    console.log(arr);
  });

  return (
    <>
    <div>
      <input onChange={handleForm} placeholder='enter your text'/>
      <button onClick={handleAdd}>Add</button>
    </div>
    <ul>
      <li>one</li>
      <li>two</li>
    </ul>
    </>
  )
}

export default App
