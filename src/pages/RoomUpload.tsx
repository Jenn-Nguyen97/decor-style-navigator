
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { analyzeRoomImage, getDecorRecommendations, DecorItem, AIRecommendation } from '@/services/aiService';
import PageHeader from '@/components/common/PageHeader';

const RoomUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [roomImage, setRoomImage] = useState<{ file: File; preview: string } | null>(null);
  const [selectedDecorItem, setSelectedDecorItem] = useState<DecorItem | null>(null);
  const [uploadedRoomId, setUploadedRoomId] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null);
  const [step, setStep] = useState<'upload' | 'select' | 'result'>('upload');
  const [decorItems, setDecorItems] = useState<DecorItem[]>([]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      
      const file = e.target.files[0];
      try {
        const preview = URL.createObjectURL(file);
        setRoomImage({ file, preview });
        
        // Process the room image with AI
        const roomData = await analyzeRoomImage(file);
        setUploadedRoomId(roomData.id);
        
        // Move to next step
        setStep('select');
        toast.success('Room image uploaded successfully!');
        
        // Get decor items
        const items = await import('@/services/aiService').then(
          module => module.getAllDecorItems()
        );
        setDecorItems(items);
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Failed to upload image. Please try again.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSelectItem = (item: DecorItem) => {
    setSelectedDecorItem(item);
  };

  const handleCheckCompatibility = async () => {
    if (!uploadedRoomId || !selectedDecorItem) return;
    
    try {
      const result = await getDecorRecommendations(uploadedRoomId, selectedDecorItem.id);
      setRecommendation(result);
      setStep('result');
    } catch (error) {
      console.error('Error getting recommendations:', error);
      toast.error('Failed to analyze compatibility. Please try again.');
    }
  };

  const handleReset = () => {
    setRoomImage(null);
    setSelectedDecorItem(null);
    setUploadedRoomId(null);
    setRecommendation(null);
    setStep('upload');
  };

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Upload Your Space"
        description="Get AI-powered decor recommendations for your room"
        backgroundImage="https://images.unsplash.com/photo-1616046229478-9901c5536a45"
      />
      
      <div className="container mx-auto py-12 px-4">
        <Card className="max-w-4xl mx-auto bg-white border-soft-beige">
          <CardHeader className="border-b border-soft-beige">
            <CardTitle className="text-2xl font-serif text-center">
              {step === 'upload' && "Upload a Photo of Your Room"}
              {step === 'select' && "Select a Decor Item"}
              {step === 'result' && "Your Compatibility Results"}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="pt-6">
            {step === 'upload' && (
              <div className="text-center">
                <div 
                  className="border-2 border-dashed border-soft-beige rounded-lg p-8 mb-6 cursor-pointer hover:bg-soft-beige/20 transition-colors"
                  onClick={() => document.getElementById('room-upload')?.click()}
                >
                  <Upload className="mx-auto h-12 w-12 text-warm-gray mb-4" />
                  <h3 className="text-lg font-serif mb-2">Upload Room Image</h3>
                  <p className="text-warm-gray mb-4">
                    Upload a photo of your room to get personalized decor recommendations
                  </p>
                  <p className="text-xs text-warm-gray">
                    Supports JPG or PNG files
                  </p>
                  <input
                    type="file"
                    id="room-upload"
                    accept="image/jpeg,image/png"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                </div>
                <p className="text-center text-warm-gray italic">
                  Our AI will analyze your room's style, colors, and layout to suggest the perfect decor pieces.
                </p>
              </div>
            )}
            
            {step === 'select' && roomImage && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-lg font-serif mb-4">Your Room</h3>
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <img 
                        src={roomImage.preview} 
                        alt="Your room" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-serif mb-4">Select a Decor Item</h3>
                    {decorItems.length === 0 ? (
                      <div className="h-full flex items-center justify-center">
                        <p>Loading decor items...</p>
                      </div>
                    ) : (
                      <div className="overflow-y-auto max-h-80 pr-2">
                        {decorItems.map(item => (
                          <div 
                            key={item.id}
                            className={`flex items-center p-3 rounded-md mb-2 cursor-pointer transition-all ${
                              selectedDecorItem?.id === item.id 
                                ? 'bg-accent/10 border border-accent' 
                                : 'hover:bg-soft-beige/50 border border-transparent'
                            }`}
                            onClick={() => handleSelectItem(item)}
                          >
                            <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden mr-3">
                              <img 
                                src={item.imageUrl} 
                                alt={item.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-xs text-warm-gray">
                                Style: {item.styles.join(', ')}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleReset}>
                    Back
                  </Button>
                  <Button 
                    onClick={handleCheckCompatibility} 
                    disabled={!selectedDecorItem}
                  >
                    Check Compatibility
                  </Button>
                </div>
              </div>
            )}
            
            {step === 'result' && recommendation && selectedDecorItem && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="aspect-video rounded-lg overflow-hidden mb-4">
                      <img 
                        src={roomImage?.preview} 
                        alt="Your room" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="bg-soft-beige/30 rounded-md p-4">
                      <h3 className="text-lg font-serif mb-2">Recommended Placement</h3>
                      <p className="text-warm-gray italic">"{recommendation.recommendedPlacement}"</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="mb-6">
                      <div className="flex items-start">
                        <div className="w-20 h-20 rounded-md overflow-hidden mr-4 flex-shrink-0">
                          <img 
                            src={selectedDecorItem.imageUrl} 
                            alt={selectedDecorItem.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-serif text-lg">{selectedDecorItem.name}</h3>
                          <div className="flex flex-wrap gap-1 my-2">
                            {selectedDecorItem.styles.map(style => (
                              <span 
                                key={style} 
                                className="px-2 py-1 bg-soft-beige rounded-full text-xs"
                              >
                                {style}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white border border-soft-beige rounded-lg p-4 mb-6">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-serif">Compatibility Score</h3>
                        <div className="text-xl font-bold text-accent">
                          {recommendation.matchScore}%
                        </div>
                      </div>
                      <div className="w-full bg-soft-beige rounded-full h-2.5 mb-4">
                        <div 
                          className="bg-accent h-2.5 rounded-full" 
                          style={{ width: `${recommendation.matchScore}%` }}
                        ></div>
                      </div>
                      <p className="text-warm-gray text-sm italic">
                        {recommendation.reasonForScore}
                      </p>
                    </div>
                    
                    {recommendation.alternatives && recommendation.alternatives.length > 0 && (
                      <div>
                        <h3 className="font-serif mb-3">Alternative Suggestions</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {recommendation.alternatives.map(alt => (
                            <div 
                              key={alt.id} 
                              className="border border-soft-beige rounded-md overflow-hidden card-hover"
                            >
                              <div className="h-32">
                                <img 
                                  src={alt.imageUrl} 
                                  alt={alt.name}
                                  className="w-full h-full object-cover" 
                                />
                              </div>
                              <div className="p-3">
                                <h4 className="text-sm font-medium line-clamp-1">{alt.name}</h4>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="w-full mt-2"
                                  asChild
                                >
                                  <Link to={`/decor/${alt.id}`}>View</Link>
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleReset}>
                    Start Over
                  </Button>
                  <Button asChild>
                    <Link to="/gallery">Browse More Items</Link>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RoomUpload;
