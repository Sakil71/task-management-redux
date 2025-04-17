import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId,
    measurementId: import.meta.env.VITE_measurementId
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;


// apiKey: "AIzaSyCY0PGr-EiqFteZ4X8qsBgXZYNeCW4RoQw",
//     authDomain: "task-managment-65a86.firebaseapp.com",
//         projectId: "task-managment-65a86",
//             storageBucket: "task-managment-65a86.firebasestorage.app",
//                 messagingSenderId: "448322752617",
//                     appId: "1:448322752617:web:6570dc92717c68eb0652f8",
//                         measurementId: "G-XLWP3GW5K3"