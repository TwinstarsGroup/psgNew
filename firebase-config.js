// Firebase Configuration
// Replace these with your actual Firebase project configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_AUTH_DOMAIN_HERE",
    databaseURL: "YOUR_DATABASE_URL_HERE",
    projectId: "YOUR_PROJECT_ID_HERE",
    storageBucket: "YOUR_STORAGE_BUCKET_HERE",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID_HERE",
    appId: "YOUR_APP_ID_HERE"
};

// Initialize Firebase
try {
    if (typeof firebase !== 'undefined') {
        firebase.initializeApp(firebaseConfig);
        console.log("Firebase initialized successfully");
    } else {
        console.warn("Firebase SDK not loaded. Using local storage for demo mode.");
    }
} catch (error) {
    console.error("Firebase initialization error:", error);
}

// Get a reference to the database service
let database;
if (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length) {
    database = firebase.database();
}
