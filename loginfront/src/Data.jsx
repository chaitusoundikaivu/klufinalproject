import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import './Data.css'
import {useTable,useSortBy,usePagination} from "react-table";
import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Data =()=> {

 
//  to acess student table header
  const columns=React.useMemo(()=>[
    {Header:"StudentId",accessor:"studentId"},
    {Header:"Name",accessor:"name"},
    {Header:"Major",accessor:"major"},
    {Header:"Email",accessor:"email"},
    {Header: "Edit", id:"Edit",accessor:"Edit",
      Cell:props=>(
        <button className='editBtn' onClick={()=>handleUpdate(props.cell.row.original)}>Edit</button>
      )
    },
    {Header: "Delete", id:"Delete",accessor:"Delete",
      Cell:props=>(
        <button className='deleteBtn' onClick={(notifyde)=>handleDelete(props.cell.row.original)}>Delete</button>
        
      )
      
    }
    
  ],[]);

  const notifyde = () => toast("Wow so easy!");
  // const to update the data
  const handleUpdate=(student)=>{
    setStudentData(student);
    openPopup();
  }

  // const to delete the data when clicked on delete button
  const handleDelete=async(std)=>{
    const isConfirmed=window.confirm("Are you sure you want to delete?");
    if(isConfirmed){
      await axios.delete(`http://localhost:8086/students/${std.studentId}`).then((res)=>{
        setStudentData(res.data);
    });
    window.location.reload();
  }
}



  //inorder to get that student we need one more conts
  const [students,setStudents]=useState([]);

  //to post data from popup

    const[studentData,setStudentData]=useState({name:"",major:"",email:""});




  //to access student table body data
  const data=React.useMemo(()=> students,[]);

  //const for global filter
  // const {pageIndex}=state;  

  // let us create out table const
  const {getTableProps,getTableBodyProps,headerGroups,page,prepareRow,state,pageIndex,pageCount,nextPage,previousPage,gotoPage,canNextPage,canPreviousPage}=useTable({columns,data:students,initialState:{pageSize:5}},useSortBy,usePagination);

  

  //to retive the data from databse API
  const getStudents=()=>{
    axios.get("http://localhost:8086/students").then((res)=>{
      console.log(res.data);
      setStudents(res.data);
    });
  }

  // handSubmit event toadd student when addStudent button is clicked
  const handleSubmit=async(e)=>{
    e.preventDefault();
    await axios.post("http://localhost:8086/students",studentData).then((res)=>{
      console.log(res.data);
      
    });
    
    handleClose();
  }

  
  //setData method impelmentation
  const setData=(e)=>{
    setStudentData({...studentData,[e.target.name]:e.target.value});
    
  }

  // call the getStudentsmethods created above
  React.useEffect(()=>{
    getStudents();
  },[]);
  
  //const to add popup when we click on add button
  const[isModalOpen,setIsModalOpen]=useState(false);

  //const for openPopup for adding record
   const openPopup=()=>{
    setIsModalOpen(true); //to open popup
   }

   //const to close the popup in the X mark
   const handleClose=()=>{
    setIsModalOpen(false); //to close popup
    setStudentData({name:"",major:"",email:""});
    getStudents();
   }
  return (
    <>
     <div class='container'>
      <h3>Registration Application on  ReactJs + SpringBoot With all Databases by Gogineni Krishna Chaitanya</h3>
      <div class='searchbox'>
        <input className='inputsearch'  type="search" name="searchinput" id="searchinput" placeholder="searchstudent"/>
        <button className='addbtn' onClick={openPopup} >Add</button>
      </div>

      {/* code to display popup menu */}
      {isModalOpen && <div className='addeditPopup'>
        <span className='closeBtn' onClick={handleClose}>&times;</span>
        <h4>Student Details</h4>

        {/* to add details using popup */}
        <div className='popupdiv'>
          <label htmlFor="name">Name</label><br></br>
          <input className='popupinput' value={studentData.name} onChange={setData}  type="text" name="name" id="name" />
        </div>

        <div className='popupdiv'>
          <label htmlFor="namemajor">Major</label><br></br>
          <input className='popupinput'  value={studentData.major} onChange={setData} type="text" name="major" id="major" />
        </div>

        <div className='popupdiv'>
          <label htmlFor="email">Email</label><br></br>
          <input className='popupinput' value={studentData.email} onChange={setData} type="text" name="email" id="email" />
        </div>

       

        <br></br>

        <button className='addStudent' onClick={handleSubmit}>{studentData.studentId? "UpdateStudent" : "AddStudent" }</button>


        </div>
        
        }




      {/* now let us see how to access data from the above consts defiend for header and body */}
      <table className='table' {...getTableProps()}>  
        
        <thead>
          {headerGroups.map((hg)=>(
            <tr {...hg.getHeaderGroupProps()} key={hg.id}>
              {hg.headers.map((column)=>(
                <th {...column.getHeaderProps(column.getSortByToggleProps())} key={column.id}>{column.render("Header")}
                {column.isSorted && <span>{column.isSortedDesc? "⬆️":" ⬇️"}</span>}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        
        
        
        {/* to get the table body property values */}
        <tbody {...getTableBodyProps()}>
          {page.map((row)=>{
            prepareRow(row);
            return(<tr {...row.getRowProps()} key={row.id}>
              {row.cells.map((cell)=>(
                <td {...cell.getCellProps()} key={cell.id}>{cell.render("Cell")}</td>
              ))}
            </tr>)
          })}

          
        </tbody>
      </table>

          {/* this div is for pagination buttons */}
          <div className='paginationdiv'>
            <button disabled = {!canPreviousPage} className='paginationBtn' onClick={()=>gotoPage(0)}>First</button>
            <button disabled = {!canPreviousPage} className='paginationBtn' onClick={previousPage}>Prev</button>
            {/* we need add span to show pageindex and pagecount */}
            <span className='indx'>{pageIndex} of {pageCount}</span>
            <button disabled={!canNextPage} className='paginationBtn' onClick={nextPage}>Next</button>
            <button disabled={!canNextPage} className='paginationBtn' onClick={()=>gotoPage(pageCount-1)}>Last</button>
          </div>




     </div>
    </>
  )
}

export default Data
