import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const LanguageContext = createContext();

const translations = {
  en: {
    home: "Home",
    scanner: "Disease Scanner",
    weather: "Weather",
    history: "History",
    schemes: "Schemes",

    languageButton: "हिन्दी",

    heroBadge: "● AI Powered Crop Intelligence",
    heroTitle1: "Protect Your Crops",
    heroTitle2: "Before It's Too Late.",
    heroDescription:
      "Detect crop diseases instantly using artificial intelligence, understand disease severity and receive smart treatment recommendations directly from your device.",
    scanNow: "Scan Crop Now →",
    howWorks: "How It Works",

    diseaseDetection: "Disease Detection",
    farmerAssistance: "Farmer Assistance",
    regionalSupport: "Regional Support",

    scannerTag: "AI DISEASE SCANNER",
    diagnose: "Diagnose Your Crop",
    instantly: " Instantly",
    scannerDescription:
      "Upload a clear photograph of the affected leaf. Our AI engine will analyze symptoms and identify possible diseases.",

    uploadCrop: "Upload Crop Image",
    selectCrop: "Click here to select a crop image",
    chooseImage: "Choose Image",
    selectedImage: "Selected image",
    remove: "Remove",
    analyzing: "Analyzing Crop...",
    analyze: "✦ Analyze Crop Disease",

    clearPhoto: "Take a clear photo",
    clearPhotoDesc:
      "Capture the affected leaf in proper lighting.",

    aiAnalyze: "AI analyzes symptoms",
    aiAnalyzeDesc:
      "The image will be processed by our disease detection pipeline.",

    recommendations: "Get recommendations",
    recommendationsDesc:
      "Receive disease information, severity, weather intelligence and verified treatment protocols.",

    analysisComplete: "AI ANALYSIS COMPLETE",
    crop: "Crop",
    scientificName: "Scientific Name",
    confidence: "Confidence",

    severity: "SEVERITY",
    affectedArea: "AFFECTED AREA",
    cropHealth: "CROP HEALTH",
    outbreakRisk: "OUTBREAK RISK",

    severityDesc: "Current disease severity level.",
    affectedDesc: "Estimated crop area affected.",
    healthDesc: "Overall estimated crop health score.",
    riskDesc: "Current disease outbreak risk level.",

    pestDetection: "PEST DETECTION",
    pestDesc:
      "Additional pest activity detected during crop analysis.",

    possibleCause: "POSSIBLE CAUSE",
    diseaseAnalysis: "Disease Analysis",

    explainableAI: "EXPLAINABLE AI",
    whyDetected: "Why AI Detected This Disease",
    explainableDesc:
      "Visual explanation of the regions that influenced the AI prediction.",
    originalImage: "ORIGINAL IMAGE",
    heatmap: "AI HEATMAP / GRAD-CAM",
    aiExplanation: "AI EXPLANATION",
    influenced: "What influenced this prediction?",

    weatherIntelligence: "WEATHER INTELLIGENCE",
    fieldConditions: "Current Field Conditions",
    weatherDesc:
      "Environmental conditions considered during crop risk analysis.",

    temperature: "TEMPERATURE",
    humidity: "HUMIDITY",
    rainfall: "RAINFALL",
    windSpeed: "WIND SPEED",

    temperatureDesc: "Current field temperature",
    humidityDesc: "Relative humidity level",
    rainfallDesc: "Recent precipitation",
    windDesc: "Current wind conditions",

    verifiedProtocols: "VERIFIED PROTOCOLS",
    recommendedActions: "Recommended Actions",
    protocolDesc:
      "Action plan generated from verified crop protection protocols.",

    application: "APPLICATION / TIMING",
    safety: "Safety",
    source: "Source",

    scanAnother: "Scan Another Crop",
  },

  hi: {
    home: "होम",
    scanner: "रोग स्कैनर",
    weather: "मौसम",
    history: "इतिहास",
    schemes: "योजनाएँ",

    languageButton: "EN",

    heroBadge: "● AI आधारित फसल स्वास्थ्य प्रणाली",
    heroTitle1: "अपनी फसल को बचाएँ",
    heroTitle2: "बहुत देर होने से पहले।",
    heroDescription:
      "कृत्रिम बुद्धिमत्ता की मदद से फसल रोगों की तुरंत पहचान करें, रोग की गंभीरता समझें और उचित उपचार सुझाव प्राप्त करें।",
    scanNow: "फसल स्कैन करें →",
    howWorks: "यह कैसे काम करता है",

    diseaseDetection: "रोग पहचान",
    farmerAssistance: "किसान सहायता",
    regionalSupport: "क्षेत्रीय सहायता",

    scannerTag: "AI रोग स्कैनर",
    diagnose: "अपनी फसल की जाँच करें",
    instantly: " तुरंत",
    scannerDescription:
      "प्रभावित पत्ते की साफ तस्वीर अपलोड करें। हमारा AI लक्षणों का विश्लेषण करके संभावित रोग की पहचान करेगा।",

    uploadCrop: "फसल की तस्वीर अपलोड करें",
    selectCrop: "फसल की तस्वीर चुनने के लिए यहाँ क्लिक करें",
    chooseImage: "तस्वीर चुनें",
    selectedImage: "चुनी गई तस्वीर",
    remove: "हटाएँ",
    analyzing: "फसल का विश्लेषण हो रहा है...",
    analyze: "✦ फसल रोग का विश्लेषण करें",

    clearPhoto: "साफ तस्वीर लें",
    clearPhotoDesc:
      "प्रभावित पत्ते की अच्छी रोशनी में साफ तस्वीर लें।",

    aiAnalyze: "AI लक्षणों का विश्लेषण करता है",
    aiAnalyzeDesc:
      "तस्वीर को हमारी रोग पहचान प्रणाली द्वारा प्रोसेस किया जाएगा।",

    recommendations: "सुझाव प्राप्त करें",
    recommendationsDesc:
      "रोग, गंभीरता, मौसम और सत्यापित उपचार संबंधी सुझाव प्राप्त करें।",

    analysisComplete: "AI विश्लेषण पूर्ण",
    crop: "फसल",
    scientificName: "वैज्ञानिक नाम",
    confidence: "विश्वसनीयता",

    severity: "गंभीरता",
    affectedArea: "प्रभावित क्षेत्र",
    cropHealth: "फसल स्वास्थ्य",
    outbreakRisk: "प्रकोप जोखिम",

    severityDesc: "वर्तमान रोग की गंभीरता।",
    affectedDesc: "अनुमानित प्रभावित फसल क्षेत्र।",
    healthDesc: "फसल का अनुमानित स्वास्थ्य स्कोर।",
    riskDesc: "वर्तमान रोग प्रकोप का जोखिम।",

    pestDetection: "कीट पहचान",
    pestDesc:
      "फसल विश्लेषण के दौरान अतिरिक्त कीट गतिविधि पाई गई।",

    possibleCause: "संभावित कारण",
    diseaseAnalysis: "रोग विश्लेषण",

    explainableAI: "व्याख्यात्मक AI",
    whyDetected: "AI ने इस रोग की पहचान क्यों की",
    explainableDesc:
      "वे क्षेत्र देखें जिन्होंने AI के निर्णय को प्रभावित किया।",
    originalImage: "मूल तस्वीर",
    heatmap: "AI हीटमैप / GRAD-CAM",
    aiExplanation: "AI स्पष्टीकरण",
    influenced: "इस पहचान को किसने प्रभावित किया?",

    weatherIntelligence: "मौसम विश्लेषण",
    fieldConditions: "वर्तमान खेत की स्थिति",
    weatherDesc:
      "फसल जोखिम विश्लेषण में उपयोग की गई वर्तमान पर्यावरणीय परिस्थितियाँ।",

    temperature: "तापमान",
    humidity: "नमी",
    rainfall: "वर्षा",
    windSpeed: "हवा की गति",

    temperatureDesc: "वर्तमान खेत का तापमान",
    humidityDesc: "वर्तमान सापेक्ष नमी",
    rainfallDesc: "हाल की वर्षा",
    windDesc: "वर्तमान हवा की स्थिति",

    verifiedProtocols: "सत्यापित प्रोटोकॉल",
    recommendedActions: "सुझाए गए कदम",
    protocolDesc:
      "सत्यापित फसल सुरक्षा प्रोटोकॉल पर आधारित कार्य योजना।",

    application: "उपयोग / समय",
    safety: "सुरक्षा",
    source: "स्रोत",

    scanAnother: "दूसरी फसल स्कैन करें",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    localStorage.getItem("fasalLanguage") || "en"
  );

  useEffect(() => {
    localStorage.setItem(
      "fasalLanguage",
      language
    );

    document.documentElement.lang =
      language === "hi" ? "hi" : "en";
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((current) =>
      current === "en" ? "hi" : "en"
    );
  };

  const t = (key) => {
    return (
      translations[language]?.[key] ||
      translations.en[key] ||
      key
    );
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}