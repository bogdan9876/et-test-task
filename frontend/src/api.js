import axios from 'axios';

export const getFilteredMedicaments = async ({ title, minPrice, maxPrice, store }) => {
  try {
    const response = await axios.get('http://localhost:8080/api/medicaments', {
      params: {
        title: title || null,
        minPrice: minPrice || null,
        maxPrice: maxPrice || null,
        store: store || null
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getLampById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/medicaments/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching medicament details:', error);
     throw error;
  }
};