import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation data
const translations = {
  en: {
    // Navigation
    home: 'Home',
    login: 'Login',
    register: 'Register',
    dashboard: 'Dashboard',
    logout: 'Logout',
    profile: 'Profile',
    
    // Home Page
    heroTitle: 'Human-Centered Logistics for Delhi\'s Industrial Hubs',
    heroSubtitle: 'Powered by MKSS Foundation',
    startTracking: 'Start Tracking Your Deliveries',
    featuresTitle: 'Our Features',
    realTimeTracking: 'Real-Time Tracking',
    sharedLogistics: 'Shared Logistics Access',
    inclusiveUI: 'Inclusive UI for MSMEs',
    testimonials: 'Testimonials',
    
    // Auth
    email: 'Email',
    phone: 'Phone Number',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    name: 'Full Name',
    role: 'Role',
    language: 'Language',
    loginTitle: 'Login to MKSS Logistics',
    registerTitle: 'Join MKSS Logistics Network',
    
    // Roles
    msme: 'MSME',
    driver: 'Driver',
    warehouse: 'Warehouse Admin',
    
    // Dashboard
    welcome: 'Welcome to MKSS Logistics Hub',
    activeDeliveries: 'Active Deliveries',
    requestPickup: 'Request Pickup',
    trackOnMap: 'Track on Map',
    todaysDeliveries: 'Today\'s Assigned Deliveries',
    optimizedRoute: 'Optimized Route Map',
    shiftSummary: 'Shift Summary',
    currentInventory: 'Current Inventory',
    scheduling: 'Inbound/Outbound Scheduling',
    analytics: 'Inventory Analytics',
    
    // Status
    inTransit: 'In Transit',
    delivered: 'Delivered',
    delayed: 'Delayed',
    pending: 'Pending',
    
    // Common
    destination: 'Destination',
    driverName: 'Driver Name',
    eta: 'ETA',
    status: 'Status',
    pickupLocation: 'Pickup Location',
    cargoWeight: 'Cargo Weight',
    preferredTime: 'Preferred Time',
    transportType: 'Transport Type',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    loading: 'Loading...',
    
    // Transport Types
    twoWheeler: '2-Wheeler',
    tempo: 'Tempo',
    truck: 'Truck',
    
    // Route Optimization
    routeOptimization: 'Route Optimization',
    aiPoweredPlanning: 'AI-Powered Ethical Route Planning',
    source: 'Source',
    cargoType: 'Cargo Type',
    timeConstraints: 'Time Constraints',
    optimizedPath: 'Optimized Path',
    fuelEstimate: 'Fuel Estimate',
    avoidanceZones: 'Avoidance Zones',
    
    // Inventory
    inventoryManagement: 'Inventory Management',
    itemName: 'Item Name',
    quantity: 'Quantity',
    locationCode: 'Location Code',
    arrivalDate: 'Arrival Date',
    stockAlerts: 'Stock Alerts',
    stockMovements: 'Stock Movements'
  },
  
  hi: {
    // Navigation
    home: 'होम',
    login: 'लॉगिन',
    register: 'रजिस्टर',
    dashboard: 'डैशबोर्ड',
    logout: 'लॉगआउट',
    profile: 'प्रोफाइल',
    
    // Home Page
    heroTitle: 'दिल्ली के औद्योगिक केंद्रों के लिए मानव-केंद्रित लॉजिस्टिक्स',
    heroSubtitle: 'MKSS फाउंडेशन द्वारा संचालित',
    startTracking: 'अपनी डिलीवरी ट्रैक करना शुरू करें',
    featuresTitle: 'हमारी विशेषताएं',
    realTimeTracking: 'रियल-टाइम ट्रैकिंग',
    sharedLogistics: 'साझा लॉजिस्टिक्स एक्सेस',
    inclusiveUI: 'MSMEs के लिए समावेशी UI',
    testimonials: 'प्रशंसापत्र',
    
    // Auth
    email: 'ईमेल',
    phone: 'फोन नंबर',
    password: 'पासवर्ड',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    name: 'पूरा नाम',
    role: 'भूमिका',
    language: 'भाषा',
    loginTitle: 'MKSS लॉजिस्टिक्स में लॉगिन करें',
    registerTitle: 'MKSS लॉजिस्टिक्स नेटवर्क में शामिल हों',
    
    // Roles
    msme: 'MSME',
    driver: 'ड्राइवर',
    warehouse: 'वेयरहाउस एडमिन',
    
    // Dashboard
    welcome: 'MKSS लॉजिस्टिक्स हब में आपका स्वागत है',
    activeDeliveries: 'सक्रिय डिलीवरी',
    requestPickup: 'पिकअप का अनुरोध',
    trackOnMap: 'मैप पर ट्रैक करें',
    todaysDeliveries: 'आज की निर्धारित डिलीवरी',
    optimizedRoute: 'अनुकूलित रूट मैप',
    shiftSummary: 'शिफ्ट सारांश',
    currentInventory: 'वर्तमान इन्वेंटरी',
    scheduling: 'इनबाउंड/आउटबाउंड शेड्यूलिंग',
    analytics: 'इन्वेंटरी एनालिटिक्स',
    
    // Status
    inTransit: 'ट्रांजिट में',
    delivered: 'डिलीवर किया गया',
    delayed: 'देरी',
    pending: 'लंबित',
    
    // Common
    destination: 'गंतव्य',
    driverName: 'ड्राइवर का नाम',
    eta: 'ETA',
    status: 'स्थिति',
    pickupLocation: 'पिकअप स्थान',
    cargoWeight: 'कार्गो वजन',
    preferredTime: 'पसंदीदा समय',
    transportType: 'परिवहन प्रकार',
    submit: 'जमा करें',
    cancel: 'रद्द करें',
    save: 'सेव करें',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    view: 'देखें',
    loading: 'लोड हो रहा है...',
    
    // Transport Types
    twoWheeler: '2-व्हीलर',
    tempo: 'टेम्पो',
    truck: 'ट्रक',
    
    // Route Optimization
    routeOptimization: 'रूट अनुकूलन',
    aiPoweredPlanning: 'AI-संचालित नैतिक रूट योजना',
    source: 'स्रोत',
    cargoType: 'कार्गो प्रकार',
    timeConstraints: 'समय की बाधाएं',
    optimizedPath: 'अनुकूलित पथ',
    fuelEstimate: 'ईंधन अनुमान',
    avoidanceZones: 'परिहार क्षेत्र',
    
    // Inventory
    inventoryManagement: 'इन्वेंटरी प्रबंधन',
    itemName: 'आइटम का नाम',
    quantity: 'मात्रा',
    locationCode: 'स्थान कोड',
    arrivalDate: 'आगमन की तारीख',
    stockAlerts: 'स्टॉक अलर्ट',
    stockMovements: 'स्टॉक मूवमेंट'
  },
  
  pa: {
    // Navigation
    home: 'ਘਰ',
    login: 'ਲਾਗਇਨ',
    register: 'ਰਜਿਸਟਰ',
    dashboard: 'ਡੈਸ਼ਬੋਰਡ',
    logout: 'ਲਾਗਆਉਟ',
    profile: 'ਪ੍ਰੋਫਾਈਲ',
    
    // Home Page
    heroTitle: 'ਦਿੱਲੀ ਦੇ ਉਦਯੋਗਿਕ ਕੇਂਦਰਾਂ ਲਈ ਮਨੁੱਖੀ-ਕੇਂਦਰਿਤ ਲਾਜਿਸਟਿਕਸ',
    heroSubtitle: 'MKSS ਫਾਊਂਡੇਸ਼ਨ ਦੁਆਰਾ ਸੰਚਾਲਿਤ',
    startTracking: 'ਆਪਣੀ ਡਿਲੀਵਰੀ ਟਰੈਕ ਕਰਨਾ ਸ਼ੁਰੂ ਕਰੋ',
    featuresTitle: 'ਸਾਡੀਆਂ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ',
    realTimeTracking: 'ਰੀਅਲ-ਟਾਈਮ ਟਰੈਕਿੰਗ',
    sharedLogistics: 'ਸਾਂਝਾ ਲਾਜਿਸਟਿਕਸ ਪਹੁੰਚ',
    inclusiveUI: 'MSMEs ਲਈ ਸਮਾਵੇਸ਼ੀ UI',
    testimonials: 'ਪ੍ਰਸ਼ੰਸਾ ਪੱਤਰ',
    
    // Auth
    email: 'ਈਮੇਲ',
    phone: 'ਫੋਨ ਨੰਬਰ',
    password: 'ਪਾਸਵਰਡ',
    confirmPassword: 'ਪਾਸਵਰਡ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ',
    name: 'ਪੂਰਾ ਨਾਮ',
    role: 'ਭੂਮਿਕਾ',
    language: 'ਭਾਸ਼ਾ',
    loginTitle: 'MKSS ਲਾਜਿਸਟਿਕਸ ਵਿੱਚ ਲਾਗਇਨ ਕਰੋ',
    registerTitle: 'MKSS ਲਾਜਿਸਟਿਕਸ ਨੈੱਟਵਰਕ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ',
    
    // Roles
    msme: 'MSME',
    driver: 'ਡਰਾਈਵਰ',
    warehouse: 'ਵੇਅਰਹਾਊਸ ਐਡਮਿਨ',
    
    // Dashboard
    welcome: 'MKSS ਲਾਜਿਸਟਿਕਸ ਹੱਬ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ',
    activeDeliveries: 'ਸਰਗਰਮ ਡਿਲੀਵਰੀਆਂ',
    requestPickup: 'ਪਿਕਅੱਪ ਦੀ ਬੇਨਤੀ',
    trackOnMap: 'ਨਕਸ਼ੇ ਤੇ ਟਰੈਕ ਕਰੋ',
    todaysDeliveries: 'ਅੱਜ ਦੀਆਂ ਨਿਰਧਾਰਿਤ ਡਿਲੀਵਰੀਆਂ',
    optimizedRoute: 'ਅਨੁਕੂਲਿਤ ਰੂਟ ਨਕਸ਼ਾ',
    shiftSummary: 'ਸ਼ਿਫਟ ਸਾਰਾਂਸ਼',
    currentInventory: 'ਮੌਜੂਦਾ ਇਨਵੈਂਟਰੀ',
    scheduling: 'ਇਨਬਾਊਂਡ/ਆਊਟਬਾਊਂਡ ਸ਼ੈਡਿਊਲਿੰਗ',
    analytics: 'ਇਨਵੈਂਟਰੀ ਐਨਾਲਿਟਿਕਸ',
    
    // Status
    inTransit: 'ਟਰਾਂਜ਼ਿਟ ਵਿੱਚ',
    delivered: 'ਡਿਲੀਵਰ ਕੀਤਾ ਗਿਆ',
    delayed: 'ਦੇਰੀ',
    pending: 'ਲੰਬਿਤ',
    
    // Common
    destination: 'ਮੰਜ਼ਿਲ',
    driverName: 'ਡਰਾਈਵਰ ਦਾ ਨਾਮ',
    eta: 'ETA',
    status: 'ਸਥਿਤੀ',
    pickupLocation: 'ਪਿਕਅੱਪ ਸਥਾਨ',
    cargoWeight: 'ਕਾਰਗੋ ਭਾਰ',
    preferredTime: 'ਤਰਜੀਹੀ ਸਮਾਂ',
    transportType: 'ਆਵਾਜਾਈ ਦੀ ਕਿਸਮ',
    submit: 'ਜਮ੍ਹਾਂ ਕਰੋ',
    cancel: 'ਰੱਦ ਕਰੋ',
    save: 'ਸੇਵ ਕਰੋ',
    edit: 'ਸੰਪਾਦਿਤ ਕਰੋ',
    delete: 'ਮਿਟਾਓ',
    view: 'ਦੇਖੋ',
    loading: 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
    
    // Transport Types
    twoWheeler: '2-ਵ੍ਹੀਲਰ',
    tempo: 'ਟੈਂਪੋ',
    truck: 'ਟਰੱਕ',
    
    // Route Optimization
    routeOptimization: 'ਰੂਟ ਅਨੁਕੂਲਨ',
    aiPoweredPlanning: 'AI-ਸੰਚਾਲਿਤ ਨੈਤਿਕ ਰੂਟ ਯੋਜਨਾ',
    source: 'ਸਰੋਤ',
    cargoType: 'ਕਾਰਗੋ ਕਿਸਮ',
    timeConstraints: 'ਸਮੇਂ ਦੀਆਂ ਰੁਕਾਵਟਾਂ',
    optimizedPath: 'ਅਨੁਕੂਲਿਤ ਮਾਰਗ',
    fuelEstimate: 'ਬਾਲਣ ਅਨੁਮਾਨ',
    avoidanceZones: 'ਬਚਾਅ ਖੇਤਰ',
    
    // Inventory
    inventoryManagement: 'ਇਨਵੈਂਟਰੀ ਪ੍ਰਬੰਧਨ',
    itemName: 'ਆਈਟਮ ਦਾ ਨਾਮ',
    quantity: 'ਮਾਤਰਾ',
    locationCode: 'ਸਥਾਨ ਕੋਡ',
    arrivalDate: 'ਆਗਮਨ ਦੀ ਤਾਰੀਖ',
    stockAlerts: 'ਸਟਾਕ ਅਲਰਟ',
    stockMovements: 'ਸਟਾਕ ਮੂਵਮੈਂਟ'
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', currentLanguage);
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const changeLanguage = (language) => {
    if (translations[language]) {
      setCurrentLanguage(language);
    }
  };

  const t = (key) => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key;
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    availableLanguages: [
      { code: 'en', name: 'English' },
      { code: 'hi', name: 'हिंदी' },
      { code: 'pa', name: 'ਪੰਜਾਬੀ' }
    ]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};