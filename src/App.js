
import { useState, useEffect, useRef } from 'react';
import './App.css';
import NavBar from './components/NavBar';
// import { MdEdit } from "react-icons/md";
// import { MdDelete } from "react-icons/md";
// import Cards from './components/Cards';
// import card from './components/Cards';

// We can use uuid for generating the unique id for element. using npm install

function App() {
  const [count, setcount] = useState(()=>{
    const sv = localStorage.getItem('value');
    return sv ? parseInt(sv,10) : 0;
  })
  const [todo, setTodo] = useState("")


  const iscom = useRef(0)
  const [showcom, setshowcom] = useState(false)


  // for loading the todos if there is store in local store
  const [todos, settodos] = useState(()=>{
    let tos = localStorage.getItem("todos")
    if(tos){
      let to = JSON.parse(tos)
      return to
    }
    else{
      return []
    }
  })

  // used to load the todo at the start
  // useEffect(() => {
  //   let tos = localStorage.getItem("todos")
  //   if(tos){
  //     let to = JSON.parse(tos)
  //     settodos(to)
  //   }

  //   // after loading the data we will clear the the stroage
  //   localStorage.clear();
  //   }, [])

  
  // used to keep track of the count in the local storage
  useEffect(() => {
    localStorage.setItem('value',count.toString());
  }, [count])


  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }, [todos])
 
  // used to keep track of the todos in the local storage

  // const savecount = ()=>{
  //   localStorage.setItem("count",count.toString())
  // }


  const togglefinished = (e)=>{
    console.log("hellle")
    setshowcom(!showcom)

  }



  // function after deleting an element
  const handledelete = (e,id)=>{
    let arr = [...todos]
    arr = arr.filter(item=>{
      return item.id!==id
    })
    settodos(arr)
  }
  
  // function to handle after the edit
  const handleEdit = (e,id)=>{
    // console.log(todos)
    // console.log(id)
    let index = todos.findIndex(item=>{
      return item.id == id
    })
    // console.log(index)
    let temp = todos[index].todo
    let arr = todos.filter(item=>{
      return item.id !== id
    })
    settodos(arr)
    setTodo(temp) 
  }

  // function to handle the count and save
  const updatecount = ()=>{
    const num = count+1;
    setcount(num);
    localStorage.setItem('value',num.toString());
  }

  // handle after the adding an element
  const handleAdd = ()=>{
    // console.log(todo)
    if(todo !== ""){
    settodos([...todos,{id:count,todo,isCompleted:false}])
    setTodo("")
    updatecount()}
    // setcount(count+1)
    // console.log(count)
    // savecount()
  }

  // to handle change
  const handlechange = (e)=>{
    setTodo(e.target.value)
  }

  // for check box
  const handlecheck = (e)=>{
    // console.log(e)
    let num = e.target.name;
    let index = todos.findIndex(item=>{
        return item.id == num
    })
    let arr = [...todos]
    // let tf = todos.id.filter(num)
    // for (let index = 0; index < arr.length; index++) {
    //   if(num == arr[index].id){
    //     arr[index].isCompleted = !(arr[index].isCompleted);
    //     break;
    //   }
      
    // }
    // console.log(num)
    arr[index].isCompleted = !arr[index].isCompleted
    settodos(arr)
    // console.log(todos)
  }

  

  return (
    <div className="App">

      {/* Creating Todo App using React */}
      <NavBar/>

      <div className="cont">
        <div className="add-todo">
          <h3>Add new Todo</h3>

          {/* this is for input from user */}
          <div className="inp">
            <input onChange={handlechange} value={todo} type="text" placeholder='Enter YOur Todo Here'/>
            <button onClick={handleAdd}>Add</button>
          </div>
        </div>
        <h3>Your Todo</h3>
        <div className="filter">
          <h4>Completed Todo :</h4>
          <input onChange={togglefinished} type="checkbox" checked={showcom} name="" id="" />
        </div>
        <div className="todos">

          {/* this is for showing all the todo from user */}
          {todos.length === 0 && <div style={{margin:"10px"}}> NO Todos Display</div>}
          {todos.map(item=>{
            
            return (showcom || !item.isCompleted) && <div key={item.id} className="todo">

              {/* this is for check box */}
              <div className="left">
                <input name = {item.id} onChange={handlecheck} checked = {item.isCompleted} type="checkbox" id="" />
                <p className={item.isCompleted ? "line" :"" }>{item.todo}</p>
              </div>

            {/* this is button */}
            <div className="btn">
              <button onClick={(e)=>{handleEdit(e,item.id)}}>Edit</button>
              <button onClick={(e)=>{handledelete(e,item.id)}}>Delete</button>
            </div>
          </div>
          })}
          
        </div>
      </div>


    </div>
  );
}

export default App;
