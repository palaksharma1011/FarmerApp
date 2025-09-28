// "use client";
// import React, { useState, useRef, useEffect } from 'react';
// import { Mic, MicOff, Camera, CheckCircle, User, Package, MapPin, DollarSign, Phone, Volume2, Leaf, Star, Clock, Award, Truck } from 'lucide-react';

// const FarmerMarketplace = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [responses, setResponses] = useState<Record<string, string>>({});
//   const [productImages, setProductImages] = useState<string[]>([]);
//   const [isListening, setIsListening] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [products, setProducts] = useState<Array<{id: string, name: string, price: number, image: string}>>([]);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const questions = [
//     {
//       id: 'farmer_name',
//       text: "नमस्ते किसान जी! आपका AI सहायक आपका स्वागत करता है। कृपया अपना नाम बताएं।",
//       english: "Hello Farmer! Your AI assistant welcomes you. Please tell me your name.",
//       icon: User,
//       placeholder: "किसान का नाम / Farmer Name",
//       hint: "उदाहरण: राम कुमार, सीता देवी"
//     },
//     {
//       id: 'product_name',
//       text: "बहुत बढ़िया! अब बताएं आप कौन सा फसल या उत्पाद बेचना चाहते हैं?",
//       english: "Great! Now tell me which crop or product you want to sell?",
//       icon: Package,
//       placeholder: "उत्पाद का नाम / Product Name",
//       hint: "जैसे: गेहूं, चावल, आलू, टमाटर, प्याज"
//     },
//     {
//       id: 'quantity',
//       text: "अच्छा! आपके पास कितनी मात्रा है? किलो या क्विंटल में बताएं।",
//       english: "Good! How much quantity do you have? Tell in kilos or quintals.",
//       icon: Award,
//       placeholder: "मात्रा / Quantity",
//       hint: "उदाहरण: 100 किलो, 5 क्विंटल"
//     },
//     {
//       id: 'price',
//       text: "बहुत अच्छा! आप प्रति किलो या क्विंटल कितनी कीमत चाहते हैं?",
//       english: "Very good! What price do you want per kilo or quintal?",
//       icon: DollarSign,
//       placeholder: "कीमत / Price",
//       hint: "जैसे: ₹50 प्रति किलो, ₹2000 प्रति क्विंटल"
//     },
//     {
//       id: 'quality',
//       text: "आपके उत्पाद की गुणवत्ता कैसी है? क्या यह ऑर्गेनिक है?",
//       english: "What is the quality of your product? Is it organic?",
//       icon: Star,
//       placeholder: "गुणवत्ता / Quality",
//       hint: "जैसे: उच्च गुणवत्ता, ऑर्गेनिक, प्रीमियम"
//     },
//     {
//       id: 'location',
//       text: "आप कहाँ से हैं? अपना गाँव, तहसील और जिला बताएं।",
//       english: "Where are you from? Tell your village, tehsil and district.",
//       icon: MapPin,
//       placeholder: "पूरा पता / Complete Address",
//       hint: "जैसे: राजपुर गाँव, सदर तहसील, मेरठ जिला"
//     },
//     {
//       id: 'harvest_time',
//       text: "फसल कब तैयार हुई है? या कब तक तैयार होगी?",
//       english: "When was the crop harvested? Or when will it be ready?",
//       icon: Clock,
//       placeholder: "समय / Time",
//       hint: "जैसे: अभी तैयार है, 15 दिन में तैयार होगी"
//     },
//     {
//       id: 'transport',
//       text: "क्या आप उत्पाद की डिलीवरी कर सकते हैं? या खरीदार को लेने आना होगा?",
//       english: "Can you deliver the product? Or does the buyer need to collect?",
//       icon: Truck,
//       placeholder: "डिलीवरी / Delivery",
//       hint: "जैसे: 10 किमी तक डिलीवरी, खुद लेकर जाना होगा"
//     },
//     {
//       id: 'contact',
//       text: "अंत में, खरीदार आपसे कैसे संपर्क करें? अपना मोबाइल नंबर दें।",
//       english: "Finally, how can buyers contact you? Give your mobile number.",
//       icon: Phone,
//       placeholder: "संपर्क नंबर / Contact Number",
//       hint: "जैसे: 9876543210"
//     }
//   ];

//   const sampleProducts = [
//     {
//       id: 1,
//       farmer_name: "राम सिंह",
//       product_name: "बासमती चावल",
//       quantity: "5 क्विंटल",
//       price: "₹4500 प्रति क्विंटल",
//       location: "मुजफ्फरनगर, उत्तर प्रदेश",
//       quality: "प्रीमियम ऑर्गेनिक",
//       contact: "9876543210"
//     },
//     {
//       id: 2,
//       farmer_name: "सुनीता देवी",
//       product_name: "आलू",
//       quantity: "200 किलो",
//       price: "₹25 प्रति किलो",
//       location: "आगरा, उत्तर प्रदेश",
//       quality: "ताजा और उच्च गुणवत्ता",
//       contact: "8765432109"
//     }
//   ];

//   const currentQuestion = questions[currentStep];

//   const speakQuestion = () => {
//     setIsPlaying(true);
//     const speechDuration = currentQuestion.text.length * 80 + 1000;
//     setTimeout(() => setIsPlaying(false), speechDuration);
//   };

//   const simulateVoiceRecognition = (questionId: string) => {
//     const sampleResponses = {
//       farmer_name: ["राम कुमार", "सुनीता देवी", "मोहन सिंह", "गीता प्रसाद"],
//       product_name: ["गेहूं", "चावल", "आलू", "टमाटर", "प्याज", "गन्ना"],
//       quantity: ["100 किलो", "5 क्विंटल", "200 किलो", "3 क्विंटल"],
//       price: ["₹30 प्रति किलो", "₹2500 प्रति क्विंटल", "₹45 प्रति किलो"],
//       quality: ["उच्च गुणवत्ता", "ऑर्गेनिक", "प्रीमियम", "ताजा"],
//       location: ["मेरठ, उत्तर प्रदेश", "पंजाब", "हरियाणा", "राजस्थान"],
//       harvest_time: ["अभी तैयार है", "10 दिन में तैयार होगी", "हाल ही में तैयार हुई"],
//       transport: ["10 किमी तक डिलीवरी", "खुद लेकर जाना होगा", "50 किमी तक पहुंचा सकते हैं"],
//       contact: ["9876543210", "8765432109", "7654321098"]
//     };
    
//     const randomResponse = sampleResponses[questionId as keyof typeof sampleResponses] && sampleResponses[questionId as keyof typeof sampleResponses][Math.floor(Math.random() * sampleResponses[questionId as keyof typeof sampleResponses].length)];
//     return randomResponse || "उत्तर दर्ज किया गया";
//   };

//   const handleNext = () => {
//     if (currentStep < questions.length - 1) {
//       setCurrentStep(currentStep + 1);
//       setTimeout(() => speakQuestion(), 500);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//       setTimeout(() => speakQuestion(), 500);
//     }
//   };

//   const toggleRecording = () => {
//     if (!isRecording) {
//       setIsRecording(true);
//       setIsListening(true);
//       setTimeout(() => {
//         setIsRecording(false);
//         setIsListening(false);
//         const response = simulateVoiceRecognition(currentQuestion.id);
//         setResponses(prev => ({
//           ...prev,
//           [currentQuestion.id]: response
//         }));
//       }, 2000 + Math.random() * 2000);
//     }
//   };

//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(event.target.files || []);
//     files.forEach(file => {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         if (e.target?.result) {
//           setProductImages(prev => [...prev, e.target!.result as string]);
//         }
//       };
//       reader.readAsDataURL(file as Blob);
//     });
//   };

//   const generateProductImage = (productName: string) => {
//     const productEmojis = {
//       'गेहूं': '🌾', 
//       'चावल': '🌾', 
//       'आलू': '🥔', 
//       'टमाटर': '🍅', 
//       'प्याज': '🧅', 
//       'गन्ना': '🎋', 
//       'default': '🌱'
//     };
//     const emoji = productEmojis[productName as keyof typeof productEmojis] || productEmojis['default'];
//     const svgContent = `
//       <svg width="200" height="150" xmlns="http://www.w3.org/2000/svg">
//         <rect width="100%" height="100%" fill="#f0f9ff"/>
//         <text x="50%" y="50%" font-family="Arial" font-size="48" text-anchor="middle" dy=".3em">${emoji}</text>
//         <text x="50%" y="80%" font-family="Arial" font-size="16" fill="#374151" text-anchor="middle" dy=".3em">${productName}</text>
//       </svg>
//     `;
//     return `data:image/svg+xml;base64,${btoa(svgContent)}`;
//   };

//   const submitProduct = () => {
//     const newProduct = {
//       id: Date.now(),
//       ...responses,
//       images: productImages.length > 0 ? productImages : [generateProductImage(responses.product_name || 'default')],
//       timestamp: new Date().toLocaleDateString('hi-IN')
//     };

//     setProducts(prev => [newProduct, ...prev]);
//     setShowSuccess(true);
    
//     setTimeout(() => {
//       setCurrentStep(0);
//       setResponses({});
//       setProductImages([]);
//       setShowSuccess(false);
//     }, 3000);
//   };

//   const isFormComplete = Object.keys(responses).length === questions.length;

//   useEffect(() => {
//     setTimeout(() => speakQuestion(), 1000);
//     setProducts(sampleProducts);
//   }, []);

//   if (showSuccess) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md">
//           <div className="text-6xl mb-6">🎉</div>
//           <h2 className="text-3xl font-bold text-green-600 mb-4">सफल!</h2>
//           <p className="text-xl text-gray-700 mb-2">आपका उत्पाद सफलतापूर्वक जोड़ा गया!</p>
//           <p className="text-lg text-gray-600">Product successfully added!</p>
//           <div className="mt-6">
//             <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const IconComponent = currentQuestion.icon;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
//       {/* Header */}
//       <div className="bg-white shadow-lg">
//         <div className="max-w-6xl mx-auto px-4 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <div className="bg-green-100 p-3 rounded-full">
//                 <Leaf className="w-8 h-8 text-green-600" />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold text-green-700">किसान डिजिटल बाज़ार</h1>
//                 <p className="text-gray-600">Farmबाज़ार</p>
//               </div>
//             </div>
//             <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg">
//               <span className="text-sm font-semibold">🤖 AI सहायक सक्रिय</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto p-4">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Main Form Section */}
//           <div className="lg:col-span-2">
//             {/* Progress Bar */}
//             <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
//               <div className="flex justify-between items-center mb-4">
//                 <span className="text-lg font-semibold text-gray-700">
//                   प्रगति: {currentStep + 1}/{questions.length}
//                 </span>
//                 <span className="text-sm text-gray-500">
//                   {Math.round(((currentStep + 1) / questions.length) * 100)}% पूर्ण
//                 </span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-3">
//                 <div 
//                   className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
//                   style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
//                 ></div>
//               </div>
//             </div>

//             {/* Question Card */}
//             <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
//               <div className="text-center mb-8">
//                 <div className="flex justify-center mb-6">
//                   <div className="bg-gradient-to-br from-green-100 to-blue-100 p-6 rounded-full">
//                     <IconComponent className="w-8 h-8 text-green-600" />
//                   </div>
//                 </div>
                
//                 <div className="flex items-center justify-center gap-4 mb-6">
//                   <button
//                     onClick={speakQuestion}
//                     className={`text-white p-4 rounded-full transition-all transform ${
//                       isPlaying 
//                         ? 'bg-blue-400 scale-105 animate-pulse' 
//                         : 'bg-blue-500 hover:bg-blue-600 hover:scale-105'
//                     }`}
//                     disabled={isPlaying}
//                   >
//                     <Volume2 className="w-6 h-6" />
//                   </button>
//                   {isPlaying && (
//                     <div className="text-blue-500 font-semibold animate-pulse">
//                       🔊 बोल रहा है...
//                     </div>
//                   )}
//                 </div>

//                 <h2 className="text-2xl font-bold text-gray-800 mb-3">
//                   {currentQuestion.text}
//                 </h2>
//                 <p className="text-lg text-gray-600 mb-4">
//                   {currentQuestion.english}
//                 </p>
//                 <p className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
//                   💡 {currentQuestion.hint}
//                 </p>
//               </div>

//               {/* Voice Recording */}
//               <div className="text-center mb-8">
//                 <button
//                   onClick={toggleRecording}
//                   disabled={isListening}
//                   className={`w-32 h-32 rounded-full text-white text-lg font-bold transition-all transform shadow-lg ${
//                     isRecording || isListening
//                       ? 'bg-red-500 scale-110 animate-pulse' 
//                       : 'bg-green-500 hover:bg-green-600 hover:scale-105'
//                   }`}
//                 >
//                   {isRecording || isListening ? (
//                     <div className="flex flex-col items-center">
//                       <MicOff className="w-12 h-12 mb-1" />
//                       <span className="text-sm">सुन रहा है...</span>
//                     </div>
//                   ) : (
//                     <div className="flex flex-col items-center">
//                       <Mic className="w-12 h-12 mb-1" />
//                       <span className="text-sm">बोलें</span>
//                     </div>
//                   )}
//                 </button>
                
//                 {isListening && (
//                   <div className="mt-4">
//                     <div className="flex justify-center space-x-1">
//                       {[1,2,3,4,5].map(i => (
//                         <div 
//                           key={i} 
//                           className="w-2 h-8 bg-green-400 rounded animate-pulse" 
//                           style={{animationDelay: `${i * 0.1}s`}}
//                         ></div>
//                       ))}
//                     </div>
//                     <p className="text-green-600 font-semibold mt-2">🎤 आपकी आवाज़ सुन रहा हूँ...</p>
//                   </div>
//                 )}
//               </div>

//               {/* Response Display */}
//                 <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-300 rounded-xl p-6 mb-6">
//                   <div className="flex items-center mb-3">
//                     <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
//                     <span className="text-green-800 font-semibold text-lg">
//                       आपका जवाब मिल गया!
//                     </span>
//                   </div>
//                   <div className="bg-white rounded-lg p-4 shadow-sm">
//                     <p className="text-gray-800 font-medium text-lg">
//                       {responses[currentQuestion.id] || "उत्तर दर्ज नहीं किया गया"}
//                     </p>
//                   </div>
//                 </div>

//               {/* Image Upload */}
//               {currentStep === 1 && (
//                 <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50">
//                   <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                   <p className="text-xl text-gray-600 mb-4">
//                     🖼️ उत्पाद की तस्वीर जोड़ें (वैकल्पिक)
//                   </p>
//                   <p className="text-gray-500 mb-6">Add product photos (Optional)</p>
//                   <input
//                     type="file"
//                     ref={fileInputRef}
//                     onChange={handleImageUpload}
//                     accept="image/*"
//                     multiple
//                     className="hidden"
//                   />
//                   <button
//                     onClick={() => fileInputRef.current?.click()}
//                     className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold transform hover:scale-105 transition-all"
//                   >
//                     📷 तस्वीर चुनें
//                   </button>
                  
//                   {productImages.length > 0 && (
//                     <div className="flex flex-wrap gap-4 mt-6 justify-center">
//                       {productImages.map((img, idx) => (
//                         <img 
//                           key={idx} 
//                           src={img} 
//                           alt={`Product ${idx + 1}`} 
//                           className="w-24 h-24 object-cover rounded-xl border-2 border-gray-200 shadow-sm" 
//                         />
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Navigation */}
//             <div className="flex justify-between">
//               <button
//                 onClick={handlePrevious}
//                 disabled={currentStep === 0}
//                 className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl text-lg font-semibold transform hover:scale-105 transition-all"
//               >
//                 ← पिछला
//               </button>
              
//               {currentStep === questions.length - 1 ? (
//                 <button
//                   onClick={submitProduct}
//                   className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl text-lg font-semibold transform hover:scale-105 transition-all shadow-lg"
//                 >
//                   ✅ जमा करें
//                 </button>
//               ) : (
//                 <button
//                   onClick={handleNext}
//                   className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl text-lg font-semibold transform hover:scale-105 transition-all"
//                 >
//                   अगला →
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="lg:col-span-1">
//             {/* Product Summary */}
//             {Object.keys(responses).length > 0 && (
//               <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
//                 <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
//                   <Package className="w-6 h-6 mr-2 text-green-600" />
//                   आपकी जानकारी
//                 </h3>
//                 <div className="space-y-3">
//                   {questions.slice(0, currentStep + 1).map(question => {
//                     const QuestionIcon = question.icon;
//                     return (
//                       <div key={question.id} className="bg-gray-50 p-4 rounded-lg">
//                         <div className="flex items-center mb-2">
//                           <div className="mr-3">
//                             <QuestionIcon className="w-5 h-5 text-gray-600" />
//                           </div>
//                           <span className="font-medium text-gray-700 text-sm">
//                             {question.placeholder}
//                           </span>
//                         </div>
//                           <p className="text-green-600 font-medium bg-green-50 p-2 rounded">
//                             ✓ {responses[question.id] || "उत्तर दर्ज नहीं किया गया"}
//                           </p>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Recent Products */}
//             <div className="bg-white rounded-2xl shadow-xl p-6">
//               <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
//                 <Package className="w-6 h-6 mr-2 text-blue-600" />
//                 हाल के उत्पाद
//               </h3>
//               <div className="space-y-4">
//                 {products.slice(0, 3).map(product => (
//                   <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-all">
//                     <div className="flex items-start space-x-3">
//                       <div className="w-16 h-12 bg-green-100 rounded flex items-center justify-center">
//                         <Package className="w-6 h-6 text-green-600" />
//                       </div>
//                       <div className="flex-1">
//                         <h4 className="font-semibold text-gray-800 text-sm">
//                           {product.product_name}
//                         </h4>
//                         <p className="text-xs text-gray-600">{product.farmer_name}</p>
//                         <p className="text-xs text-green-600 font-medium">{product.price}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Help Section */}
//         <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6">
//           <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
//             💡 सहायता / Help Guide
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <h4 className="font-semibold text-blue-700 mb-2">हिंदी निर्देश:</h4>
//               <ul className="text-blue-700 space-y-1 text-sm">
//                 <li>🔊 नीले बटन से सवाल सुनें</li>
//                 <li>🎤 हरे बटन दबाकर बोलें</li>
//                 <li>📸 उत्पाद की तस्वीर जोड़ें</li>
//                 <li>➡️ हर सवाल का जवाब दें</li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold text-blue-700 mb-2">English Instructions:</h4>
//               <ul className="text-blue-700 space-y-1 text-sm">
//                 <li>🔊 Press blue button to hear question</li>
//                 <li>🎤 Press green button to speak</li>
//                 <li>📸 Add product photos</li>
//                 <li>➡️ Answer each question to proceed</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FarmerMarketplace;