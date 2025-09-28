"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, Save, Upload, User, Bot, Wheat, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ProductData {
  productName: string;
  category: string;
  quantity: string;
  quality: string;
  price: string;
  harvestDate: string;
  location: string;
  organicCertified: string;
  description: string;
  storageConditions: string;
}

interface ConversationEntry {
  id: string;
  type: 'agent' | 'farmer';
  text: string;
  timestamp: Date;
  audioUrl?: string;
  field?: string;
}

const inquiry_QUESTIONS = [
  { field: 'productName', question: "नमस्ते! मैं आपकी उत्पाद सूची बनाने में मदद के लिए यहाँ हूँ। आज आप कौन सी फसल या उत्पाद बेचना चाहते हैं?" },
  { field: 'category', question: "बहुत बढ़िया! आप इस उत्पाद को किस श्रेणी में रखेंगे - क्या यह अनाज, सब्जियाँ, फल, या कुछ और है?" },
  { field: 'quantity', question: "आपके पास कितनी मात्रा उपलब्ध है? कृपया मात्रा और इकाई बताएं।" },
  { field: 'quality', question: "क्या आप अपने उत्पाद की गुणवत्ता का वर्णन कर सकते हैं? क्या यह प्रीमियम, मानक, या जैविक ग्रेड है?" },
  { field: 'price', question: "प्रति इकाई आप कितनी कीमत की अपेक्षा कर रहे हैं? आप अपनी पसंदीदा दर बता सकते हैं।" },
  { field: 'harvestDate', question: "यह उत्पाद कब काटा गया था? यह खरीदारों को ताजगी समझने में मदद करता है।" },
  { field: 'location', question: "आपका खेत कहाँ स्थित है? यह लॉजिस्टिक्स और डिलीवरी में मदद करता है।" },
  { field: 'organicCertified', question: "क्या आपके पास कोई जैविक प्रमाणन है या आप जैविक खेती के तरीकों का पालन करते हैं?" },
  { field: 'description', question: "क्या आप अपने उत्पाद के बारे में कोई अतिरिक्त विवरण दे सकते हैं जो खरीदारों को पता होना चाहिए?" },
  { field: 'storageConditions', question: "आप इस उत्पाद को उसकी गुणवत्ता बनाए रखने के लिए कैसे संग्रहीत कर रहे हैं?" }
];

export default function InquiryPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [conversation, setConversation] = useState<ConversationEntry[]>([]);
  const [productData, setProductData] = useState<ProductData>({
    productName: '',
    category: '',
    quantity: '',
    quality: '',
    price: '',
    harvestDate: '',
    location: '',
    organicCertified: '',
    description: '',
    storageConditions: ''
  });
  const [isinquiryComplete, setIsinquiryComplete] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [microphoneError, setMicrophoneError] = useState<string | null>(null);
  const [speechSupported, setSpeechSupported] = useState(true);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Initialize speech synthesis
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
    }

    // Initialize speech recognition
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as unknown as { webkitSpeechRecognition: typeof SpeechRecognition }).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      if (recognitionRef.current) {
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = Array.from(event.results)
            .map((result: SpeechRecognitionResult) => result[0])
            .map((result: SpeechRecognitionAlternative) => result.transcript)
            .join('');

          if (event.results[event.results.length - 1].isFinal) {
            handleFarmerResponse(transcript);
          }
        };

        recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Speech recognition error:', event.error);
          
          if (event.error === 'not-allowed') {
            setMicrophoneError('माइक्रोफोन पहुंच अस्वीकृत। कृपया माइक्रोफोन अनुमतियां दें और पृष्ठ को ताज़ा करें।');
          } else if (event.error === 'no-speech') {
            setMicrophoneError('कोई भाषण नहीं पहचाना गया। कृपया फिर से बोलने का प्रयास करें।');
          } else if (event.error === 'network') {
            setMicrophoneError('नेटवर्क त्रुटि। कृपया अपना इंटरनेट कनेक्शन जांचें।');
          } else {
            setMicrophoneError(`भाषण पहचान त्रुटि: ${event.error}`);
          }
          
          setIsListening(false);
        };
      }
    } else {
      setSpeechSupported(false);
      setMicrophoneError('इस ब्राउज़र में भाषण पहचान समर्थित नहीं है। कृपया Chrome या Edge का उपयोग करें।');
    }

    // Start with first question
    setTimeout(() => {
      askQuestion(0);
    }, 1000);

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const askQuestion = (questionIndex: number) => {
    if (questionIndex >= inquiry_QUESTIONS.length) {
      setIsinquiryComplete(true);
      speakText("धन्यवाद! मैंने आपके उत्पाद के बारे में सभी जानकारी एकत्र कर ली है। अब आप विवरणों की समीक्षा कर सकते हैं और सबमिट कर सकते हैं।");
      return;
    }

    const question = inquiry_QUESTIONS[questionIndex];
    const entry: ConversationEntry = {
      id: Date.now().toString(),
      type: 'agent',
      text: question.question,
      timestamp: new Date(),
      field: question.field
    };

    setConversation(prev => [...prev, entry]);
    speakText(question.question);
  };

  const speakText = (text: string) => {
    if (synthRef.current) {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        // Start listening after agent finishes speaking
        setTimeout(() => {
          startListening();
        }, 500);
      };
      
      synthRef.current.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening && speechSupported) {
      setMicrophoneError(null);
      setIsListening(true);
      
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
        setMicrophoneError('भाषण पहचान शुरू करने में विफल। कृपया पुनः प्रयास करें।');
        setIsListening(false);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      setIsListening(false);
      recognitionRef.current.stop();
    }
  };

  const handleFarmerResponse = (transcript: string) => {
    if (transcript.trim()) {
      const entry: ConversationEntry = {
        id: Date.now().toString(),
        type: 'farmer',
        text: transcript,
        timestamp: new Date()
      };

      setConversation(prev => [...prev, entry]);

      // Update product data
      const currentField = inquiry_QUESTIONS[currentQuestionIndex]?.field;
      if (currentField) {
        setProductData(prev => ({
          ...prev,
          [currentField]: transcript
        }));
      }

      stopListening();

      // Move to next question
      setTimeout(() => {
        const nextIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIndex);
        askQuestion(nextIndex);
      }, 1000);
    }
  };

  const handleUpload = async () => {
    setIsUploading(true);
    setUploadStatus('idle');

    try {
      // Simulate API call to upload product data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would make actual API call to your backend
      console.log('Uploading product data:', productData);
      
      setUploadStatus('success');
    } catch {
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  const progress = ((currentQuestionIndex) / inquiry_QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Wheat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">फार्म
                    बाज़ार AI पूछताछ</h1>
                <p className="text-gray-600">आवाज़-संचालित उत्पाद सूची सहायक</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className={isinquiryComplete ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                {isinquiryComplete ? "पूर्ण" : `प्रश्न ${currentQuestionIndex + 1}/${inquiry_QUESTIONS.length}`}
              </Badge>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>पूछताछ प्रगति</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversation Panel */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-blue-600" />
                  <span>AI पूछताछ सहायक</span>
                  {isSpeaking && (
                    <div className="flex items-center space-x-1 text-blue-600">
                      <Volume2 className="w-4 h-4" />
                      <span className="text-sm">बोल रहा है...</span>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                {/* Conversation History */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  {conversation.map((entry) => (
                    <div
                      key={entry.id}
                      className={`flex ${entry.type === 'farmer' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          entry.type === 'farmer'
                            ? 'bg-green-600 text-white'
                            : 'bg-white border shadow-sm'
                        }`}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          {entry.type === 'farmer' ? (
                            <User className="w-4 h-4" />
                          ) : (
                            <Bot className="w-4 h-4 text-blue-600" />
                          )}
                          <span className="text-xs opacity-75">
                            {entry.type === 'farmer' ? 'आप' : 'AI सहायक'}
                          </span>
                          <span className="text-xs opacity-50">
                            {entry.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm">{entry.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Voice Controls */}
                <div className="flex items-center justify-center space-x-4 p-4 bg-white border rounded-lg">
                  {microphoneError && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        {microphoneError}
                        {microphoneError.includes('denied') && (
                          <div className="mt-2 text-sm">
                            <p>माइक्रोफोन सक्षम करने के लिए:</p>
                            <ol className="list-decimal list-inside mt-1 space-y-1">
                            <li>अपने एड्रेस बार में 🔒 या 🛡️ आइकन पर क्लिक करें</li>
                            <li>&quot;माइक्रोफोन&quot; को &quot;अनुमति दें&quot; पर सेट करें</li>
                            <li>इस पृष्ठ को ताज़ा करें</li>
                            </ol>
                          </div>
                        )}
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <Button
                    variant={isListening ? "destructive" : "default"}
                    size="lg"
                    onClick={isListening ? stopListening : startListening}
                    disabled={isSpeaking || isinquiryComplete || !speechSupported}
                    className="flex items-center space-x-2"
                  >
                    {isListening ? (
                      <>
                        <MicOff className="w-5 h-5" />
                        <span>सुनना बंद करें</span>
                      </>
                    ) : (
                      <>
                        <Mic className="w-5 h-5" />
                        <span>{speechSupported ? 'बोलना शुरू करें' : 'भाषण समर्थित नहीं'}</span>
                      </>
                    )}
                  </Button>

                  {isListening && (
                    <div className="flex items-center space-x-2 text-red-600">
                      <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">सुन रहा है...</span>
                    </div>
                  )}

                  {isSpeaking && (
                    <div className="flex items-center space-x-2 text-blue-600">
                      <Volume2 className="w-4 h-4" />
                      <span className="text-sm font-medium">AI बोल रहा है...</span>
                    </div>
                  )}
                  
                  {!speechSupported && (
                    <div className="text-center text-sm text-gray-500">
                      <p>भाषण पहचान उपलब्ध नहीं है।</p>
                      <p>आवाज़ सुविधाओं के लिए कृपया Chrome या Edge ब्राउज़र का उपयोग करें।</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Data Panel */}
          <div className="space-y-6">
            {/* Current Data */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Save className="w-5 h-5 text-green-600" />
                  <span>उत्पाद जानकारी</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(productData).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-start">
                    <span className="text-sm font-medium text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="text-sm text-gray-900 text-right max-w-[60%]">
                      {value || (
                        <span className="text-gray-400 italic">लंबित...</span>
                      )}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upload Section */}
            {isinquiryComplete && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Upload className="w-5 h-5 text-blue-600" />
                    <span>उत्पाद सबमिट करें</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {uploadStatus === 'success' && (
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        उत्पाद सफलतापूर्वक मार्केटप्लेस में अपलोड हो गया!
                      </AlertDescription>
                    </Alert>
                  )}

                  {uploadStatus === 'error' && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        उत्पाद अपलोड करने में विफल। कृपया पुनः प्रयास करें।
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="w-full"
                    size="lg"
                  >
                    {isUploading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>अपलोड हो रहा है...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Upload className="w-4 h-4" />
                        <span>मार्केटप्लेस में अपलोड करें</span>
                      </div>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">यह कैसे काम करता है</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>AI आपके उत्पाद के बारे में प्रश्न पूछता है</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>अपने उत्तर स्वाभाविक रूप से बोलें</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span>डेटा कैप्चर और संरचित किया जाता है</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <span>समीक्षा करें और मार्केटप्लेस में अपलोड करें</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}