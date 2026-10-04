"use client";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { createContext, useState } from 'react'
import api from '../lib/api.js';
import toast from 'react-hot-toast';

export const admin =createContext()
const AdminContext = ({children}) => {
  const [loading, setLoading] = useState(false);
    const getFacility = async () => {
        try {
          const { data } = await api.get("/facilities");
          return data;
        } catch (error) {
            throw error;
        }
      };
      const { data: facility } = useQuery({
        queryKey: ["facility"],
        queryFn: getFacility,
      });
    // ================= ADD FACILITY  =============
    const handleAddFacility = async (values) => {
        try {
          setLoading(true);
          const { data } = await api.post("/facilities", values);
          return data;
        } catch (error) {
            throw error;
        }finally {
          setLoading(false);
        }
      };
      const [openAddFacility, setOpenAddFacility] = useState(false);
      const facilityQuery =useQueryClient()
      const handleAddFacilityMutation = useMutation({
        mutationKey: ["addFacility"],
        mutationFn: handleAddFacility,
        onSuccess: (data) => {
          toast.success(data?.message || "تم اضافة المركز بنجاح");
          facilityQuery.invalidateQueries(["facility"]);
          setOpenAddFacility(false);

        },onError: (error) => {
          toast.error(error?.response?.data?.message || "حدث خطأ أثناء اضافة المركز");
        }
      });
      const handleAddFacilitySubmit = (values) => {
        handleAddFacilityMutation.mutate(values);
      }

// ========================= DELETE FACILITY  =============
const handleDeleteFacility = async (id) => {
  try {
    setLoading(true);
    const { data } = await api.delete(`/facilities/${id}`);
    return data;
  } catch (error) {
    throw error;
  } finally {
    setLoading(false);
  }
};
const [openDeteFacility, setOpenDeleteFacility] = useState(false);
const handleDeleteFacilityMutation = useMutation({
  mutationKey: ["deleteFacility"],
  mutationFn: handleDeleteFacility,
  onSuccess: (data) => {
    toast.success(data?.message || "تم حذف المركز بنجاح");
    facilityQuery.invalidateQueries(["facility"]);
    setOpenDeleteFacility(false);
  },
  onError: (error) => {
    toast.error(error?.response?.data?.message || "حدث خطأ أثناء حذف المركز");
  },
});
const handleDeleteFacilitySubmit = (id) => {
  handleDeleteFacilityMutation.mutate(id);
}
// ========================= CHANGE STATUS FACILITY  =============
const handleChangeStatusFacility = async (id, isActive) => {
  try {
    setLoading(true);

    const { data } = await api.patch(
      `/facilities/${id}/status`,
      {
        isActive,
      }
    );

    return data;
  } catch (error) {
    throw error;
  } finally {
    setLoading(false);
  }
};
const [openChangeStatusFacility, setOpenChangeStatusFacility] = useState(false);
const handleChangeStatusFacilityMutation = useMutation({
  mutationKey: ["changeStatusFacility"],

  mutationFn: ({ id, isActive }) =>
    handleChangeStatusFacility(id, isActive),

  onSuccess: (data) => {
    toast.success(
      data?.message || "تم تغيير حالة المركز بنجاح"
    );

    facilityQuery.invalidateQueries({
      queryKey: ["facility"],
    });

    setOpenChangeStatusFacility(false);
  },

  onError: (error) => {
    toast.error(
      error?.response?.data?.message ||
        "حدث خطأ أثناء تغيير حالة المركز"
    );
  },
});
const handleChangeStatusFacilitySubmit = (id, isActive) => {
  handleChangeStatusFacilityMutation.mutate({
    id,
    isActive,
  });
};
// =========================== EDIT FACILITY ================
const handleUpdateFacility = async ({id, values}) => {
  try{
    setLoading(true);
    const { data } = await api.put(`/facilities/${id}`, values);
    return data;
  }catch(error){
    throw error;
  }finally{
    setLoading(false);
  }
  
}
const [openEditFacility, setOpenEditFacility] = useState(false);
const handleUpdateFacilityMutation = useMutation({
  mutationKey: ["updateFacility"],
  mutationFn: handleUpdateFacility,
  onSuccess: (data) => {
    toast.success(data?.message || "تم تعديل المركز بنجاح");
    facilityQuery.invalidateQueries(["facility"]);
    setOpenEditFacility(false);
  },
  onError: (error) => {
    toast.error(error?.response?.data?.message || "حدث خطاء اثناء تعديل المركز");
  },
})
const handleUpdateFacilitySubmit = ({id, values}) => {
  handleUpdateFacilityMutation.mutate({id, values});
}
  return <admin.Provider value={{ facility, openAddFacility,
    setOpenDeleteFacility, openDeteFacility, handleDeleteFacilitySubmit,
     setOpenAddFacility, handleAddFacilitySubmit,loading,
     handleChangeStatusFacilitySubmit, openChangeStatusFacility, setOpenChangeStatusFacility
     ,handleUpdateFacilitySubmit, openEditFacility, setOpenEditFacility}}>

    {children}
  </admin.Provider>
   
}

export default AdminContext
