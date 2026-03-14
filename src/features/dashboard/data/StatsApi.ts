// src/features/dashboard/data/sources/StatsApi.ts

// استبدل الرقم التالي بالرقم الذي ظهر لك في ipconfig
const BASE_URL = 'http://192.168.1.38:3000/api'; 

export const fetchSocialStats = async () => {
  try {
    const response = await fetch(`${BASE_URL}/stats`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Connection Error:", error);
    throw error;
  }
};
export const syncData = async () => {
  const response = await fetch('http://192.168.1.38:3000/api/sync', {
    method: 'POST',
  });
  return await response.json();
};