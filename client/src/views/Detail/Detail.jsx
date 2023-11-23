
import React, { useEffect } from "react";
import {useParams} from "react-router-dom"
//importar acciones de redux en caso de ser estado global
import { useDispatch, useSelector } from "react-redux";

export default function Detail(){


    const useProducts=()=>{

        const {id}=useParams();
        const dispatch=useDispatch();

        const {estadodetailproducto}=useSelector((state)=>state);


        useEffect(()=>{
            dispatch(action(id))
            .then(()=>console.log("exito"))
            .catch((err)=>{//acction que modifica estadodetailproducto
                console.log(err.message)
            })   
        },[id,dispatch]);

        return estadodetailproducto
        
    }

    return(
        <>
        
        
        </>
    )
}
