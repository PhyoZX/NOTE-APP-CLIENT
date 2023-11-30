import { useEffect, useState } from "react";
import Note from "../components/Note";
import { RotatingLines } from "react-loader-spinner";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Index = () =>{
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const getNotes = async(pageNum) =>{
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API}/notes?page=${pageNum}`);
        const {notes, totalNotes, totalPages} = await response.json();
        setTotalPages(totalPages);
        setNotes(notes);
        setLoading(false);
};

    useEffect(()=>{
        getNotes(currentPage);
    },[currentPage]);

    const handlePre = () =>{
        if(currentPage > 1){
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNext = () =>{
        if(currentPage < totalPages){
            setCurrentPage(currentPage + 1);
        }
    }

    const customAlert = (message, error = false) =>{
        if(error){
            toast.error(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }else{
            toast.success(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
      
    }

    return (
        <section className=" flex gap-6 px-10 mt-10 flex-wrap">
           {!loading && notes.length > 0 ? (
            <>
            {notes.map((note) => (
            <Note key={note._id} note={note} getNotes={getNotes} customAlert={customAlert} />
          ))}
          <div className=" w-full flex justify-center gap-3 ">
            {
                currentPage > 1 && (<button type="button" className=" text-white font-medium bg-teal-600 px-3 py-1" onClick={handlePre}>Previous Page</button>)

            }
            {
                currentPage < totalPages &&  (<button type="button" className=" text-white font-medium bg-teal-600 px-3 py-1" onClick={handleNext}>Next Page</button>)

            }
          </div>
          </>
          ) : (
            <div className=" flex justify-center items-center w-full">
                <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={loading}
                />
                {!loading && notes.length === 0 && <p>No Notes...</p>}
            </div>
           )}
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
        </section>
    );
};

export default Index;