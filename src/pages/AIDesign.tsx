
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { 
  analyzeRoomImage, 
  getDecorRecommendations,
  getAllDecorItems,
  Room,
  DecorItem,
  AIRecommendation
} from '@/services/aiService';
import PageHeader from '@/components/common/PageHeader';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Upload, 
  Image as ImageIcon, 
  X, 
  ArrowRight, 
  CheckCircle 
} from 'lucide-react';

const AIDesign = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [step, setStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [roomImage, setRoomImage] = useState<File | null>(null);
  const [roomImageUrl, setRoomImageUrl] = useState<string | null>(null);
  const [roomData, setRoomData] = useState<Room | null>(null);
  const [decorItems, setDecorItems] = useState<DecorItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<DecorItem | null>(null);
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null);
  
  const handleUploadClick = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in or create an account to use this feature.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.match('image.*')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload an image file (JPEG, PNG).",
        variant: "destructive",
      });
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }
    
    setRoomImage(file);
    setRoomImageUrl(URL.createObjectURL(file));
    
    // Simulate upload progress
    setIsUploading(true);
    
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    setIsUploading(false);
    setUploadProgress(0);
    setStep(2);
    
    // Now analyze the room image
    setAnalyzing(true);
    try {
      const result = await analyzeRoomImage(file);
      setRoomData(result);
      
      // Load decor items
      const items = await getAllDecorItems();
      setDecorItems(items);
      
    } catch (error) {
      console.error('Error analyzing room:', error);
      toast({
        title: "Analysis Failed",
        description: "We couldn't analyze your room image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAnalyzing(false);
    }
  };
  
  const handleClearImage = () => {
    setRoomImage(null);
    setRoomImageUrl(null);
    setRoomData(null);
    setStep(1);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleSelectItem = (item: DecorItem) => {
    setSelectedItem(item);
  };
  
  const handleGetRecommendation = async () => {
    if (!roomData || !selectedItem) return;
    
    setStep(3);
    setAnalyzing(true);
    
    try {
      const result = await getDecorRecommendations(roomData.id, selectedItem.id);
      setRecommendation(result);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      toast({
        title: "Recommendation Failed",
        description: "We couldn't generate recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAnalyzing(false);
    }
  };
  
  const handleReset = () => {
    setRoomImage(null);
    setRoomImageUrl(null);
    setRoomData(null);
    setSelectedItem(null);
    setRecommendation(null);
    setStep(1);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  return (
    <div className="min-h-screen">
      <PageHeader 
        title="AI Room Design Assistant"
        description="Upload a photo of your room and get personalized decor recommendations"
      />
      
      <div className="container mx-auto py-12 px-4">
        {/* Steps */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white mb-2 ${
                step >= 1 ? 'bg-accent' : 'bg-soft-beige'
              }`}>
                1
              </div>
              <span className="text-sm">Upload Room</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-accent' : 'bg-soft-beige'}`}></div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white mb-2 ${
                step >= 2 ? 'bg-accent' : 'bg-soft-beige'
              }`}>
                2
              </div>
              <span className="text-sm">Choose Item</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-accent' : 'bg-soft-beige'}`}></div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white mb-2 ${
                step >= 3 ? 'bg-accent' : 'bg-soft-beige'
              }`}>
                3
              </div>
              <span className="text-sm">Get Results</span>
            </div>
          </div>
        </div>
        
        {/* Step 1: Upload Room */}
        {step === 1 && (
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-serif font-semibold mb-6">Upload Your Room Photo</h3>
            
            <div className="border-2 border-dashed border-soft-beige rounded-lg p-8 text-center">
              <Input 
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              
              {!roomImageUrl ? (
                <div 
                  className="flex flex-col items-center justify-center cursor-pointer py-8"
                  onClick={handleUploadClick}
                >
                  <div className="bg-soft-beige rounded-full p-4 mb-4">
                    <Upload className="h-8 w-8 text-warm-gray" />
                  </div>
                  <h4 className="text-lg font-medium mb-2">Click to upload a photo</h4>
                  <p className="text-sm text-warm-gray mb-4">
                    JPG or PNG, max 5MB
                  </p>
                  <Button onClick={handleUploadClick}>
                    Choose File
                  </Button>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={roomImageUrl}
                    alt="Room preview"
                    className="max-h-80 mx-auto rounded-md"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-2 right-2 bg-white rounded-full"
                    onClick={handleClearImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            
            {isUploading && (
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
          </div>
        )}
        
        {/* Step 2: Choose Decor Item */}
        {step === 2 && roomData && (
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-serif font-semibold mb-6">Choose a Decor Item</h3>
            
            {analyzing ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-soft-beige border-t-accent mb-4"></div>
                <p className="text-lg">Analyzing your room...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <img
                      src={roomData.imageUrl}
                      alt="Your room"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    
                    <div className="mt-4">
                      <h4 className="text-lg font-medium mb-2">Room Analysis</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-warm-gray text-sm">Detected Style</Label>
                          <p className="font-medium">{roomData.style}</p>
                        </div>
                        <div>
                          <Label className="text-warm-gray text-sm">Room Type</Label>
                          <p className="font-medium">{roomData.type}</p>
                        </div>
                        <div>
                          <Label className="text-warm-gray text-sm">Room Size</Label>
                          <p className="font-medium">{roomData.size}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium mb-4">Select a decor item to check compatibility</h4>
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                      {decorItems.map(item => (
                        <div
                          key={item.id}
                          className={`flex items-start p-3 rounded-md border cursor-pointer transition-all ${
                            selectedItem?.id === item.id
                              ? 'border-accent bg-accent/5'
                              : 'border-soft-beige hover:border-accent/50'
                          }`}
                          onClick={() => handleSelectItem(item)}
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded mr-3"
                          />
                          <div className="flex-1">
                            <h5 className="font-medium">{item.name}</h5>
                            <p className="text-sm text-warm-gray line-clamp-1">
                              {item.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {item.styles.slice(0, 2).map(style => (
                                <span
                                  key={style}
                                  className="px-2 py-0.5 bg-soft-beige rounded-full text-xs"
                                >
                                  {style}
                                </span>
                              ))}
                              {item.styles.length > 2 && (
                                <span className="px-2 py-0.5 bg-soft-beige rounded-full text-xs">
                                  +{item.styles.length - 2}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={handleReset}>
                    Back
                  </Button>
                  <Button
                    onClick={handleGetRecommendation}
                    disabled={!selectedItem}
                    className="flex items-center"
                  >
                    Get Recommendation <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
        
        {/* Step 3: Results */}
        {step === 3 && roomData && selectedItem && (
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-serif font-semibold mb-6">Design Recommendation Results</h3>
            
            {analyzing ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-soft-beige border-t-accent mb-4"></div>
                <p className="text-lg">Generating recommendations...</p>
              </div>
            ) : recommendation && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="relative border border-soft-beige rounded-lg overflow-hidden">
                      <img
                        src={roomData.imageUrl}
                        alt="Your room"
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                        <div className="flex items-center">
                          <span className="font-medium mr-1">Match Score:</span>
                          <span 
                            className={`font-semibold ${
                              recommendation.matchScore >= 85 ? 'text-green-600' : 
                              recommendation.matchScore >= 70 ? 'text-yellow-600' : 
                              'text-red-600'
                            }`}
                          >
                            {recommendation.matchScore}%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-lg font-medium mb-3">Selected Item</h4>
                      <div className="flex items-start border border-soft-beige rounded-lg p-4">
                        <img
                          src={selectedItem.imageUrl}
                          alt={selectedItem.name}
                          className="w-24 h-24 object-cover rounded mr-4"
                        />
                        <div>
                          <h5 className="font-medium">{selectedItem.name}</h5>
                          <p className="text-sm text-warm-gray mt-1">
                            {selectedItem.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {selectedItem.styles.map(style => (
                              <span
                                key={style}
                                className="px-2 py-0.5 bg-soft-beige rounded-full text-xs"
                              >
                                {style}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-accent/10 rounded-lg p-6 mb-6">
                      <h4 className="text-lg font-medium mb-3">AI Analysis</h4>
                      <div className="mb-4">
                        <Label className="text-warm-gray text-sm">Recommended Placement</Label>
                        <p className="font-medium">{recommendation.recommendedPlacement}</p>
                      </div>
                      <div>
                        <Label className="text-warm-gray text-sm">Expert Opinion</Label>
                        <p className="mt-1">{recommendation.reasonForScore}</p>
                      </div>
                    </div>
                    
                    {recommendation.alternatives && recommendation.alternatives.length > 0 && (
                      <div>
                        <h4 className="text-lg font-medium mb-3">Alternative Suggestions</h4>
                        <div className="space-y-3">
                          {recommendation.alternatives.map(item => (
                            <div
                              key={item.id}
                              className="flex items-start p-3 rounded-md border border-soft-beige"
                            >
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded mr-3"
                              />
                              <div>
                                <h5 className="font-medium">{item.name}</h5>
                                <p className="text-sm text-warm-gray line-clamp-1">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <div className="space-x-3">
                    <Button variant="outline" onClick={handleReset}>
                      Try Another Room
                    </Button>
                    <Button>
                      Save Results
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIDesign;
