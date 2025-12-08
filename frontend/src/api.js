// import axios from "axios";

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || "https://e-commerce-backend-1yu8.onrender.com/api",
// });

// export default API; // ✅ This line is mandatory
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",  // 🔥 LOCAL BACKEND
});

export default API;
