"use client";
import { useQuery } from '@tanstack/react-query';
import React, { createContext } from 'react'
import api from '../lib/api.js';

export const admin =createContext()
const AdminContext = ({children}) => {
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
    
  return <admin.Provider value={{ facility }}>

    {children}
  </admin.Provider>
   
}

export default AdminContext
