import React from 'react';
import axios from "axios";
import { toast } from 'react-hot-toast';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:4000";

export const getCatalogaPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...");
  let result = [];

  try {
      const response = await axios.post(`${BASE_URL}/api/v1/category/getCategoryPageDetails`, { categoryId });
      console.log("Full Response Data:", response);

      if (!response?.data?.success) {
          throw new Error("Could not Fetch Category page data");
      }

      result = response?.data.data; // Only store the actual data
      console.log("Category response:", result);
  } catch (error) {
      console.error("Error fetching catalog page data:", error);
      toast.error(error.message);
      result = error.response?.data;
  } finally {
      toast.dismiss(toastId);
  }

  return result;
};
