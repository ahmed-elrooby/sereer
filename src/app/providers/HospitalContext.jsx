"use client"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { createContext, useState } from 'react'
import api from '../lib/api.js'
import toast from 'react-hot-toast'
export const Hospital = createContext()
const HospitalContext = ({children}) => {
    const [loadding,setLoadding]=useState(false)
    // ======================= حضانات ======================
    const handleAddIncuUnit = async(values) => {
        try {
            setLoadding(true)
        const {data}=await api.post("/units",values)
        return data
        } catch (error) {
            throw error
        }finally {
            setLoadding(false)
        }
    }
    const [openAddIncu,setOpenAddIncu]=useState(false)
    const incuQuery=useQueryClient()
    const handleAddIncuMutation=useMutation({
        mutationKey:["addIncu"],
        mutationFn:handleAddIncuUnit,
        onSuccess:(data)=>{
            toast.success(data?.message || "تم اضافة وحدة بنجاح")
            incuQuery.invalidateQueries(["units"])
            setOpenAddIncu(false)
        },
        onError:(error)=>{
            toast.error(error?.response?.data?.message || "حدث خطاء")
        }
    })
    const handleAddIncuUnitSubmit = (values) => {
        handleAddIncuMutation.mutate(values)
    }
    // ============ GET ALL UNITS ===============
    const getUnits = async () => {
        try {
            const { data } = await api.get("/units");
            return data;
        } catch (error) {
            throw error;
        }
    }

    const { data: units } = useQuery({
        queryKey: ["units"],
        queryFn: getUnits,
    });
    // ================= EDIT UNIT ================
    const handleEditUnit = async ({id, values}) => {
        try {
            setLoadding(true)
            const {data}=await api.put(`/units/${id}`,values)
            return data
        } catch (error) {
            throw error
        }finally {
            setLoadding(false)
        }
        
    }
    const [openEditUnit,setOpenEditUnit]=useState(false)
    const handleEditUnitMutation=useMutation({
        mutationKey:["editUnit"],
        mutationFn:handleEditUnit,
        onSuccess:(data)=>{
            toast.success(data?.message || "تم تعديل وحدة بنجاح")
            incuQuery.invalidateQueries(["units"])
            setOpenEditUnit(false)
        },
        onError:(error)=>{
            toast.error(error?.response?.data?.message || "حدث خطاء")
        }
    })
    const handleEditUnitSubmit = ({id,values}) => {
        handleEditUnitMutation.mutate({id,values})
    }
    // ==================== DELETE UNIT ================
    const handleDeleteUnit = async (id) => {
        try {
            setLoadding(true)
            const {data}=await api.delete(`/units/${id}`)
            return data
        } catch (error) {
            throw error
        }finally {
            setLoadding(false)
        }
    }
    const [openDeleteUnit,setOpenDeleteUnit]=useState(false)
    const handleDeleteUnitMutation=useMutation({
        mutationKey:["deleteUnit"],
        mutationFn:handleDeleteUnit,
        onSuccess:(data)=>{
            toast.success(data?.message || "تم حذف وحدة بنجاح")
            incuQuery.invalidateQueries(["units"])
            setOpenDeleteUnit(false)
        },
        onError:(error)=>{
            toast.error(error?.response?.data?.message || "حدث خطاء")
        }
    })
    const handleDeleteUnitSubmit = (id) => {
        handleDeleteUnitMutation.mutate(id)
    }
  return <Hospital.Provider value={{handleAddIncuUnitSubmit,openAddIncu,setOpenAddIncu,loadding,units,
  handleEditUnitSubmit,openEditUnit,setOpenEditUnit,handleDeleteUnitSubmit,openDeleteUnit,setOpenDeleteUnit
  }}>
    {children}
  </Hospital.Provider>
}

export default HospitalContext
