import React, { useState, useEffect, useRef } from 'react';
import { Upload, X, Loader2, Lock, Unlock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Media {
  id: number;
  filename: string;
  type: string;
  uploaded_at: string;
}

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<'images' | 'videos'>('images');
  const [mediaItems, setMediaItems] = useState<Media[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [selectedImage, setSelectedImage] = useState<Media | null>(null);
  const [announcementText, setAnnouncementText] = useState('');
  const [isSavingAnnouncement, setIsSavingAnnouncement] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = async () => {
    try {
      const response = await fetch('/api/media');
      if (response.ok) {
        const data = await response.json();
        setMediaItems(data);
      }
    } catch (error) {
      console.error('Failed to fetch media:', error);
    }
  };

  useEffect(() => {
    fetchMedia();
    fetch('/api/announcement')
      .then(res => res.json())
      .then(data => setAnnouncementText(data.text))
      .catch(console.error);
  }, []);

  const handleAdminLogin = async () => {
    if (isAdmin) {
      setIsAdmin(false);
      setAdminPassword('');
      return;
    }
    const password = window.prompt("Enter admin password to access uploads:");
    if (!password) return;

    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      if (response.ok) {
        setIsAdmin(true);
        setAdminPassword(password);
      } else {
        alert('Incorrect password!');
      }
    } catch (error) {
      alert('Verification failed');
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    if (!isAdmin || !adminPassword) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('media', e.target.files[0]);
    formData.append('password', adminPassword);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        await fetchMedia();
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Upload failed');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSaveAnnouncement = async () => {
    if (!isAdmin || !adminPassword) return;
    setIsSavingAnnouncement(true);
    try {
      const response = await fetch('/api/announcement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword, text: announcementText })
      });
      if (response.ok) {
        alert('Announcement updated successfully! Refresh the page to see changes.');
      } else {
        alert('Failed to update announcement.');
      }
    } catch (error) {
      alert('Error updating announcement.');
    } finally {
      setIsSavingAnnouncement(false);
    }
  };

  const images = mediaItems.filter(m => m.type === 'image');
  const videos = mediaItems.filter(m => m.type === 'video');

  return (
    <>
      <section id="gallery" className="py-16 lg:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h2 className="text-xs font-bold text-medical-teal uppercase tracking-[0.3em] mb-3 font-sans">Visual Progress</h2>
              <h3 className="text-3xl lg:text-4xl font-display font-bold text-medical-blue">Clinical Gallery</h3>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={handleAdminLogin}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-colors ${isAdmin ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-slate-100 text-gray-500 hover:bg-slate-200'}`}
              >
                {isAdmin ? <Unlock size={16} /> : <Lock size={16} />}
                {isAdmin ? 'Lock' : 'Admin Access'}
              </button>

              {isAdmin && (
                <>
                  <input 
                    type="file" 
                    accept="image/*,video/*" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleUpload}
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="flex items-center gap-2 bg-medical-teal text-white px-6 py-2 rounded-full font-bold shadow-lg hover:bg-medical-teal/90 transition-colors disabled:opacity-50 text-sm"
                  >
                    {isUploading ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                    {isUploading ? 'Uploading...' : 'Upload'}
                  </button>
                </>
              )}
            </div>
          </div>

          {isAdmin && (
            <div className="mb-10 bg-slate-50 p-6 rounded-2xl border border-medical-teal/20">
              <h4 className="font-bold text-medical-blue mb-3">Announcement Banner</h4>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="text" 
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  placeholder="Enter announcement text (leave blank to hide)"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-medical-teal text-sm"
                />
                <button 
                  onClick={handleSaveAnnouncement}
                  disabled={isSavingAnnouncement}
                  className="bg-medical-blue text-white px-6 py-2 rounded-lg font-bold text-sm shadow-md hover:bg-medical-blue-dark transition-colors whitespace-nowrap disabled:opacity-50"
                >
                  {isSavingAnnouncement ? 'Saving...' : 'Save Banner'}
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-center md:justify-start gap-4 mb-8">
            <button 
              onClick={() => setActiveTab('images')}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-colors ${activeTab === 'images' ? 'bg-medical-blue text-white' : 'bg-slate-100 text-gray-500 hover:bg-slate-200'}`}
            >
              Images ({images.length})
            </button>
            <button 
              onClick={() => setActiveTab('videos')}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-colors ${activeTab === 'videos' ? 'bg-medical-blue text-white' : 'bg-slate-100 text-gray-500 hover:bg-slate-200'}`}
            >
              Videos ({videos.length})
            </button>
          </div>

          {activeTab === 'images' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.length === 0 ? (
                <div className="col-span-full text-center py-10 text-gray-400 font-medium">No images uploaded yet.</div>
              ) : (
                images.map((img) => (
                  <div 
                    key={img.id} 
                    onClick={() => setSelectedImage(img)}
                    className="aspect-square rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all group cursor-pointer bg-slate-50 relative"
                  >
                    <img src={`/uploads/${img.filename}`} alt={img.filename} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 font-bold transition-opacity">View</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                      <p className="text-white text-xs truncate">{new Date(img.uploaded_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'videos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.length === 0 ? (
                <div className="col-span-full text-center py-10 text-gray-400 font-medium">No videos uploaded yet.</div>
              ) : (
                videos.map((vid) => (
                  <div key={vid.id} className="aspect-video rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-black">
                    <video src={`/uploads/${vid.filename}`} controls className="w-full h-full object-contain" />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      {/* Image Fullscreen Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors bg-black/50 p-2 rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={`/uploads/${selectedImage.filename}`}
              alt={selectedImage.filename}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
