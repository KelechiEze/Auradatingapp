
import React, { useState, useEffect, useRef, useContext } from 'react';
import gsap from 'gsap';
import { 
  Search, MessageSquare, Plus, ArrowLeft, Phone, Video, Send, Mic, 
  MoreVertical, X, Sparkles, Camera, Archive, Trash, UserX, Calendar, 
  Music, MapPin, Heart, Shield, Image as ImageIcon, FileText, Gift, 
  Trash2, Play, Pause, Edit3, PhoneCall, Info, Briefcase, User, Clock, 
  CheckCircle, Navigation, RotateCcw, Check, Pin, Star, MicOff, CameraOff
} from 'lucide-react';
import { PremiumContext } from './DashboardLayout';

interface Message {
  id: number;
  text?: string;
  sender: 'me' | 'them';
  time: string;
  type?: 'text' | 'image' | 'voice_note' | 'location' | 'date_invite';
  audioUrl?: string;
  imageUrl?: string;
  voiceDuration?: string;
  dateDetails?: {
    date: string;
    time: string;
    locationType: 'Indoor' | 'Outdoor';
    status: 'pending' | 'accepted' | 'declined';
  };
}

interface ChatItem {
  id: number;
  name: string;
  msg: string;
  time: string;
  unread: number;
  online: boolean;
  img: string;
  activity?: string;
  status?: string;
  bio?: string;
  prompt?: string;
  location?: string;
  age?: number;
  role?: string;
  isPinned?: boolean;
  isArchived?: boolean;
}

const initialChats: ChatItem[] = [
  { id: 1, name: 'Ademilade', msg: 'The resonance is strong with this one!', time: '2m ago', unread: 2, online: true, img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200', activity: 'Listening to Burna Boy', status: 'Working on a new startup', bio: 'Building empires and seeking deep connections.', prompt: 'Consistency is my love language.', location: 'Lagos, Nigeria', age: 35, role: 'Entrepreneur' },
  { id: 2, name: 'Elena', msg: 'Did you check the jazz collection?', time: '1h ago', unread: 0, online: true, img: 'https://images.unsplash.com/photo-1516589174184-c685266e430c?auto=format&fit=crop&q=80&w=200', activity: 'Chilling at the park', status: 'Reading "The Alchemist"', bio: 'Lover of sunsets and old vinyl records.', prompt: 'Let’s talk about the stars.', location: 'Lisbon, Portugal', age: 28, role: 'Artist' },
  { id: 3, name: 'Sarah', msg: 'I enjoyed our last call.', time: 'Yesterday', unread: 0, online: false, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', activity: 'In a meeting', status: 'Busy', bio: 'UX designer exploring the world.', prompt: 'Kindness always wins.', location: 'London, UK', age: 26, role: 'Designer' },
];

const DateScheduleModal = ({ onClose, onSend }: { onClose: () => void, onSend: (details: any) => void }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [locationType, setLocationType] = useState<'Indoor' | 'Outdoor'>('Indoor');

  return (
    <div className="fixed inset-0 z-[3000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 animate-in zoom-in-95 duration-300">
      <div className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-[20px] p-8 space-y-6 border dark:border-white/10 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5"><X size={20} /></button>
        <div className="text-center space-y-2">
           <div className="w-12 h-12 bg-yellow-400 rounded-xl mx-auto flex items-center justify-center text-black shadow-lg"><Calendar size={24} /></div>
           <h3 className="text-2xl font-black tracking-tighter uppercase dark:text-white">Plan Resonance.</h3>
           <p className="text-[8px] font-black uppercase tracking-widest opacity-40 dark:text-white">Synchronize a physical connection</p>
        </div>

        <div className="space-y-4">
           <div className="space-y-1.5">
              <label className="text-[7px] font-black uppercase tracking-widest opacity-40 dark:text-white ml-2">Event Cycle (Date)</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-black/40 border dark:border-white/5 outline-none font-bold text-xs dark:text-white" />
           </div>
           <div className="space-y-1.5">
              <label className="text-[7px] font-black uppercase tracking-widest opacity-40 dark:text-white ml-2">Frequency Sync (Time)</label>
              <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full p-4 rounded-xl bg-slate-50 dark:bg-black/40 border dark:border-white/5 outline-none font-bold text-xs dark:text-white" />
           </div>
           <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setLocationType('Indoor')} className={`p-4 rounded-xl font-black text-[8px] uppercase tracking-widest transition-all ${locationType === 'Indoor' ? 'bg-yellow-400 text-black shadow-lg' : 'bg-slate-50 dark:bg-black/40 dark:text-white opacity-40'}`}>Indoor</button>
              <button onClick={() => setLocationType('Outdoor')} className={`p-4 rounded-xl font-black text-[8px] uppercase tracking-widest transition-all ${locationType === 'Outdoor' ? 'bg-yellow-400 text-black shadow-lg' : 'bg-slate-50 dark:bg-black/40 dark:text-white opacity-40'}`}>Outdoor</button>
           </div>
        </div>

        <button 
          onClick={() => date && time && onSend({ date, time, locationType, status: 'pending' })}
          className="w-full bg-yellow-400 text-black py-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-yellow-400/20 active:scale-95 transition-all"
        >
          Initialize Invitation
        </button>
      </div>
    </div>
  );
};

const CallScreen = ({ type, chat, onClose, onSwitchToVideo }: { type: 'voice' | 'video', chat: any, onClose: () => void, onSwitchToVideo: () => void }) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);

  useEffect(() => {
    if (type === 'video') {
      startCamera();
    } else {
      stopCamera();
    }

    return () => stopCamera();
  }, [type]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      streamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access error:", err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const toggleMic = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicMuted(!audioTrack.enabled);
      }
    }
  };

  const toggleCam = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsCamOff(!videoTrack.enabled);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-black flex flex-col items-center justify-center animate-in fade-in duration-500 overflow-hidden">
      {/* Background Layer: Remote User */}
      <div className="absolute inset-0 z-0">
        <img src={chat.img} alt={chat.name} className="w-full h-full object-cover blur-sm opacity-50 scale-110" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>
        {type === 'video' && (
           <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white/40">
              <Camera size={80} className="mb-4 opacity-20" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em]">Synchronizing Remote Feed...</p>
           </div>
        )}
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-16 px-6">
        
        {/* Caller Info (Top) */}
        <div className="flex flex-col items-center text-center gap-4">
          <div className={`w-28 h-28 rounded-3xl overflow-hidden border-4 border-yellow-400 shadow-2xl transition-all duration-700 ${type === 'video' ? 'opacity-0 scale-50' : 'opacity-100 scale-100 animate-pulse'}`}>
            <img src={chat.img} alt={chat.name} className="w-full h-full object-cover" />
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase">{chat.name}</h2>
            <p className="text-yellow-400 font-black tracking-widest text-[8px] uppercase animate-pulse">
              {type === 'video' ? 'Aura Visual Sync Active' : 'Connecting Voice Frequency...'}
            </p>
          </div>
        </div>

        {/* Local Video PIP (Bottom Right) */}
        <div className={`fixed bottom-24 right-6 w-32 h-44 md:w-48 md:h-64 bg-zinc-900 rounded-2xl border-2 border-yellow-400 overflow-hidden shadow-2xl transition-all duration-500 z-20 ${type === 'video' ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
           <video 
              ref={localVideoRef} 
              autoPlay 
              muted 
              playsInline 
              className="w-full h-full object-cover mirror"
           />
           {isCamOff && (
             <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
                <CameraOff size={24} className="text-white/20" />
             </div>
           )}
           <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/50 backdrop-blur-md rounded-md">
             <span className="text-[6px] font-black text-white uppercase tracking-widest">You</span>
           </div>
        </div>

        {/* Controls (Bottom) */}
        <div className="flex flex-col items-center gap-6 w-full max-w-sm">
          <div className="flex items-center justify-center gap-4 md:gap-8 w-full">
            <button 
              onClick={toggleMic}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isMicMuted ? 'bg-red-500 text-white' : 'bg-white/10 backdrop-blur-xl text-white border border-white/20 hover:bg-white/20'}`}
            >
              {isMicMuted ? <MicOff size={24} /> : <Mic size={24} />}
            </button>

            <button 
              onClick={onClose} 
              className="w-18 h-18 md:w-20 md:h-20 bg-red-500 rounded-full flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform shadow-2xl shadow-red-500/30"
            >
              <Phone className="rotate-[135deg]" size={32} fill="currentColor" />
            </button>

            {type === 'video' ? (
              <button 
                onClick={toggleCam}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isCamOff ? 'bg-red-500 text-white' : 'bg-white/10 backdrop-blur-xl text-white border border-white/20 hover:bg-white/20'}`}
              >
                {isCamOff ? <CameraOff size={24} /> : <Camera size={24} />}
              </button>
            ) : (
              <button 
                onClick={onSwitchToVideo}
                className="w-14 h-14 bg-yellow-400 text-black rounded-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-xl shadow-yellow-400/20"
              >
                <Video size={24} />
              </button>
            )}
          </div>
          
          {type === 'voice' && (
            <button 
              onClick={onSwitchToVideo}
              className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[8px] font-black text-white/40 uppercase tracking-[0.2em] hover:text-yellow-400 hover:border-yellow-400 transition-all"
            >
              Switch to Visual Link
            </button>
          )}
        </div>
      </div>
      
      <style>{`
        .mirror {
          transform: scaleX(-1);
        }
      `}</style>
    </div>
  );
};

const ResonanceOverlay = ({ chat, onClose }: { chat: any, onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-300 overflow-y-auto no-scrollbar">
      <div className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-[24px] overflow-hidden border dark:border-white/10 shadow-2xl relative">
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 z-20 w-12 h-12 bg-black/50 backdrop-blur-md rounded-xl text-white flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all"
        >
          <X size={24} />
        </button>
        <div className="aspect-[4/5] relative">
          <img src={chat.img} alt={chat.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h2 className="text-3xl font-black tracking-tighter uppercase mb-1">{chat.name}, {chat.age}</h2>
            <div className="flex items-center gap-2 text-yellow-400">
              <MapPin size={12} />
              <span className="text-[10px] font-black uppercase tracking-widest">{chat.location}</span>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-5">
          <div className="space-y-1">
             <span className="text-[8px] font-black uppercase tracking-widest opacity-40 dark:text-white">Narrative</span>
             <p className="text-sm font-medium italic dark:text-white/80">"{chat.bio || "Searching resonance..."}"</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
             <div className="p-4 bg-zinc-100 dark:bg-white/5 rounded-xl">
                <span className="text-[8px] font-black uppercase tracking-widest opacity-40 block mb-1 dark:text-white">Status</span>
                <p className="text-[10px] font-bold dark:text-white">{chat.status}</p>
             </div>
             <div className="p-4 bg-zinc-100 dark:bg-white/5 rounded-xl">
                <span className="text-[8px] font-black uppercase tracking-widest opacity-40 block mb-1 dark:text-white">Role</span>
                <p className="text-[10px] font-bold dark:text-white">{chat.role}</p>
             </div>
          </div>
          <div className="flex items-center gap-3 p-4 border dark:border-white/10 rounded-xl">
             <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center text-black shadow-lg shadow-yellow-400/20"><Music size={18} /></div>
             <div>
                <span className="text-[8px] font-black uppercase tracking-widest opacity-40 dark:text-white">Frequency Activity</span>
                <p className="text-xs font-bold dark:text-white">{chat.activity}</p>
             </div>
          </div>
          <div className="pt-2">
            <h5 className="text-[8px] font-black uppercase tracking-widest opacity-40 mb-2 dark:text-white">Resonance Trigger</h5>
            <p className="text-lg font-black tracking-tighter italic dark:text-white">"{chat.prompt}"</p>
          </div>
          
          <button 
            onClick={onClose}
            className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all active:scale-95"
          >
            Return to Cycle
          </button>
        </div>
      </div>
    </div>
  );
};

const ChatRoom = ({ chat, onBack, onDeleteMessage }: { chat: ChatItem, onBack: () => void, onDeleteMessage: (msgId: number) => void }) => {
  const { isPremium } = useContext(PremiumContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [activeCall, setActiveCall] = useState<'voice' | 'video' | null>(null);
  
  // Audio playback state for existing messages
  const [playingMsgId, setPlayingMsgId] = useState<number | null>(null);
  const [isMsgPaused, setIsMsgPaused] = useState(false);
  const msgAudioRef = useRef<HTMLAudioElement | null>(null);
  
  // Voice Recording Real Implementation State
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [audioPreview, setAudioPreview] = useState<string | null>(null);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string | null>(null);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  
  const [showDateModal, setShowDateModal] = useState(false);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMessages([
      { id: 1, text: `Hey! I saw we matched on the 'Music' resonance.`, sender: 'them', time: '10:02 AM', type: 'text' },
      { id: 2, text: "Your frequency resonates differently, I like that.", sender: 'them', time: '10:07 AM', type: 'text' }
    ]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = (type: Message['type'] = 'text', payload?: any) => {
    const newMessage: Message = {
      id: Date.now(),
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type
    };

    if (type === 'text') {
      if (!input.trim()) return;
      newMessage.text = input;
    } else if (type === 'voice_note') {
      newMessage.voiceDuration = payload.duration;
      newMessage.audioUrl = payload.audioUrl; 
    } else if (type === 'date_invite') {
      newMessage.dateDetails = payload;
    } else if (type === 'image') {
      newMessage.imageUrl = payload;
      newMessage.text = "Visual resonance shared.";
    } else if (type === 'location') {
      newMessage.text = payload;
    }

    setMessages([...messages, newMessage]);
    setInput('');
    setShowPlusMenu(false);
    setShowDateModal(false);
    setShowMenu(false);
    setAudioPreview(null);
    setAudioPreviewUrl(null);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioPreviewUrl(url);
        setAudioPreview("Recorded Resonance");
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setIsPaused(false);
      setRecordTime(0);
      timerRef.current = setInterval(() => {
        setRecordTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Microphone access denied:", err);
      alert("Please allow microphone access to record voice notes.");
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      clearInterval(timerRef.current);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      timerRef.current = setInterval(() => {
        setRecordTime(prev => prev + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      clearInterval(timerRef.current);
      setIsRecording(false);
      setIsPaused(false);
    }
  };

  const discardRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    clearInterval(timerRef.current);
    setIsRecording(false);
    setIsPaused(false);
    setRecordTime(0);
    setAudioPreview(null);
    setAudioPreviewUrl(null);
    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
      setIsPreviewPlaying(false);
    }
  };

  const togglePreviewPlay = () => {
    if (!audioPreviewUrl) return;
    if (!previewAudioRef.current) {
      previewAudioRef.current = new Audio(audioPreviewUrl);
      previewAudioRef.current.onended = () => setIsPreviewPlaying(false);
    }
    
    if (isPreviewPlaying) {
      previewAudioRef.current.pause();
    } else {
      previewAudioRef.current.play();
    }
    setIsPreviewPlaying(!isPreviewPlaying);
  };

  const removeMessage = (id: number) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  const handlePlusAction = (type: 'image' | 'file' | 'location') => {
    if (type === 'image') imageInputRef.current?.click();
    if (type === 'file') fileInputRef.current?.click();
    if (type === 'location') {
      navigator.geolocation.getCurrentPosition((pos) => {
        handleSend('location', `📍 Shared Location: https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`);
      });
    }
    setShowPlusMenu(false);
  };

  const handleDateResponse = (msgId: number, status: 'accepted' | 'declined') => {
    setMessages(prev => prev.map(m => {
      if (m.id === msgId && m.dateDetails) {
        return { ...m, dateDetails: { ...m.dateDetails, status } };
      }
      return m;
    }));
  };

  const toggleMsgAudio = (id: number, url?: string) => {
    if (!url) return;

    if (playingMsgId === id) {
      // Current audio toggling
      if (isMsgPaused) {
        msgAudioRef.current?.play();
        setIsMsgPaused(false);
      } else {
        msgAudioRef.current?.pause();
        setIsMsgPaused(true);
      }
    } else {
      // Playing a different audio or starting fresh
      if (msgAudioRef.current) {
        msgAudioRef.current.pause();
      }
      
      msgAudioRef.current = new Audio(url);
      msgAudioRef.current.onended = () => {
        setPlayingMsgId(null);
        setIsMsgPaused(false);
      };
      
      setPlayingMsgId(id);
      setIsMsgPaused(false);
      msgAudioRef.current.play();
    }
  };

  const MessageBubble: React.FC<{ m: Message }> = ({ m }) => {
    if (m.type === 'date_invite') {
      const isPending = m.dateDetails?.status === 'pending';
      const isAccepted = m.dateDetails?.status === 'accepted';
      const isDeclined = m.dateDetails?.status === 'declined';

      return (
        <div className={`flex group relative ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
           <div className={`w-[280px] bg-black dark:bg-zinc-800 text-white rounded-[24px] overflow-hidden shadow-2xl border ${isAccepted ? 'border-green-500/50' : 'border-yellow-400/30'}`}>
              <div className={`p-5 flex items-center justify-between ${isAccepted ? 'bg-green-500/10' : 'bg-gradient-to-br from-yellow-400/20 to-transparent'}`}>
                 <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-black shadow-lg ${isAccepted ? 'bg-green-500' : 'bg-yellow-400'}`}><Calendar size={20} /></div>
                    <div>
                       <h5 className="text-[10px] font-black uppercase tracking-tighter">Resonance Invitation</h5>
                       <p className="text-[6px] font-bold opacity-40 uppercase tracking-widest">
                         {isAccepted ? 'Synchronized Connection' : isDeclined ? 'Link Cancelled' : 'Aura Cycle Sync'}
                       </p>
                    </div>
                 </div>
                 {isAccepted ? <Check size={16} className="text-green-500" /> : <Sparkles size={16} className="text-yellow-400" />}
              </div>
              <div className="p-5 space-y-4">
                 <div className="flex items-center justify-between text-[11px] font-black">
                    <div className="flex items-center gap-2"><Clock size={14} className="text-yellow-400" /> {m.dateDetails?.date}</div>
                    <div className="flex items-center gap-2"><MapPin size={14} className="text-yellow-400" /> {m.dateDetails?.locationType}</div>
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-bold"><Navigation size={12} className="opacity-40" /> Time: {m.dateDetails?.time}</div>
                 
                 {m.sender === 'them' && isPending && (
                    <div className="grid grid-cols-2 gap-2 pt-2">
                       <button onClick={() => handleDateResponse(m.id, 'accepted')} className="py-3 rounded-lg bg-white text-black font-black text-[8px] uppercase tracking-widest hover:bg-yellow-400 transition-all">Accept</button>
                       <button onClick={() => handleDateResponse(m.id, 'declined')} className="py-3 rounded-lg bg-white/10 font-black text-[8px] uppercase tracking-widest">Decline</button>
                    </div>
                 )}
                 {m.sender === 'me' && isPending && (
                    <div className="text-[7px] font-black uppercase tracking-widest opacity-40 text-center py-2 italic">Invitation Synchronized • Pending Confirmation</div>
                 )}
                 {isAccepted && (
                   <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20 flex items-center justify-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></div>
                      <span className="text-[8px] font-black uppercase text-green-500">Node Synchronized - Meetup Confirmed</span>
                   </div>
                 )}
              </div>
           </div>
           <button onClick={() => removeMessage(m.id)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-lg"><Trash size={12} /></button>
        </div>
      );
    }

    if (m.type === 'voice_note') {
      const isThisPlaying = playingMsgId === m.id && !isMsgPaused;

      return (
        <div className={`flex group relative ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
          <div className={`p-3 rounded-[18px] flex items-center gap-4 min-w-[200px] shadow-sm ${m.sender === 'me' ? 'bg-yellow-400 text-black' : 'bg-white dark:bg-zinc-900 border dark:border-white/10 dark:text-white'}`}>
            <button onClick={() => toggleMsgAudio(m.id, m.audioUrl)} className={`w-10 h-10 rounded-full flex items-center justify-center ${m.sender === 'me' ? 'bg-black text-white' : 'bg-yellow-400 text-black'}`}>
               {isThisPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
            </button>
            <div className="flex-1 space-y-1">
               <div className="h-4 flex items-center gap-0.5">
                  {[...Array(12)].map((_, i) => <div key={i} className={`w-1 rounded-full ${m.sender === 'me' ? 'bg-black' : 'bg-yellow-400'}`} style={{ height: `${20 + Math.random() * 80}%` }} />)}
               </div>
               <span className="text-[7px] font-black uppercase tracking-widest opacity-40">{m.voiceDuration}</span>
            </div>
          </div>
          <button onClick={() => removeMessage(m.id)} className={`absolute -top-2 ${m.sender === 'me' ? '-left-2' : '-right-2'} w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-lg`}><Trash size={12} /></button>
        </div>
      );
    }

    if (m.type === 'image') {
      return (
        <div className={`flex group relative ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
           <div className={`max-w-[85%] p-1 rounded-[20px] shadow-lg overflow-hidden ${m.sender === 'me' ? 'bg-yellow-400' : 'bg-white dark:bg-zinc-900 border dark:border-white/10'}`}>
              <img src={m.imageUrl} alt="Shared Resonance" className="w-full h-auto rounded-[18px] object-cover max-h-[300px]" />
              <div className="px-3 py-1 flex justify-between items-center">
                 <span className="text-[6px] font-black opacity-40 uppercase tracking-widest">{m.time}</span>
              </div>
           </div>
           <button onClick={() => removeMessage(m.id)} className={`absolute -top-2 ${m.sender === 'me' ? '-left-2' : '-right-2'} w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-lg`}><Trash size={12} /></button>
        </div>
      );
    }

    return (
      <div className={`flex group relative ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
         <div className={`max-w-[85%] p-3 rounded-[14px] shadow-sm relative ${m.sender === 'me' ? 'bg-yellow-400 text-black rounded-tr-none' : 'bg-white dark:bg-zinc-900 border dark:border-white/10 rounded-tl-none dark:text-white'}`}>
            <p className="text-xs font-medium leading-relaxed">{m.text}</p>
            <span className="text-[6px] font-black mt-1.5 block opacity-40 uppercase tracking-widest">{m.time}</span>
         </div>
         <button onClick={() => removeMessage(m.id)} className={`absolute -top-2 ${m.sender === 'me' ? '-left-2' : '-right-2'} w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-lg`}><Trash size={12} /></button>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-black flex flex-col z-[200] animate-in slide-in-from-right duration-300">
      {showProfile && <ResonanceOverlay chat={chat} onClose={() => setShowProfile(false)} />}
      {activeCall && (
        <CallScreen 
          type={activeCall} 
          chat={chat} 
          onClose={() => setActiveCall(null)} 
          onSwitchToVideo={() => setActiveCall('video')}
        />
      )}
      {showDateModal && <DateScheduleModal onClose={() => setShowDateModal(false)} onSend={(details) => handleSend('date_invite', details)} />}
      
      <header className="px-4 py-3 border-b dark:border-white/10 flex items-center justify-between shrink-0 bg-inherit/90 backdrop-blur-xl z-[220] relative">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 -ml-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-full dark:text-white"><ArrowLeft size={18} /></button>
          <img onClick={() => setShowProfile(true)} src={chat.img} alt={chat.name} className="w-8 h-8 rounded-lg object-cover cursor-pointer hover:scale-105 transition-transform" />
          <div onClick={() => setShowProfile(true)} className="cursor-pointer">
            <h3 className="font-black text-xs tracking-tight dark:text-white">{chat.name}</h3>
            <p className="text-[7px] font-black uppercase tracking-widest opacity-40 dark:text-white">Active Resonance</p>
          </div>
        </div>
        <div className="flex items-center gap-1 relative">
           <button onClick={() => setActiveCall('voice')} className="p-2 text-yellow-400 hover:bg-yellow-400/10 rounded-xl transition-all"><PhoneCall size={16} /></button>
           <button onClick={() => setActiveCall('video')} className="p-2 text-yellow-400 hover:bg-yellow-400/10 rounded-xl transition-all"><Video size={16} /></button>
           <button onClick={() => setShowMenu(!showMenu)} className="p-2 dark:text-white/40 opacity-100 hover:opacity-100"><MoreVertical size={16} /></button>
           
           {showMenu && (
             <div className="absolute top-10 right-0 w-52 bg-white dark:bg-zinc-900 border dark:border-white/10 rounded-xl shadow-2xl p-2 z-[250] animate-in fade-in zoom-in-95 duration-200">
                <button onClick={() => { setShowProfile(true); setShowMenu(false); }} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-[10px] font-black uppercase tracking-widest dark:text-white"><User size={14} /> View Signal</button>
                <button onClick={() => { setShowDateModal(true); setShowMenu(false); }} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-400 hover:text-black text-[10px] font-black uppercase tracking-widest dark:text-white transition-all"><Calendar size={14} /> Schedule Resonance</button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-[10px] font-black uppercase tracking-widest dark:text-white"><Archive size={14} /> Archive Pulse</button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest"><Trash2 size={14} /> Dissolve Link</button>
             </div>
           )}
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar bg-slate-50/50 dark:bg-black">
         {messages.map((m) => <MessageBubble key={m.id} m={m} />)}
      </div>

      <div className="p-3 border-t dark:border-white/10 bg-white dark:bg-black safe-area-bottom">
         <div className="flex items-end gap-2 w-full max-w-4xl mx-auto overflow-hidden">
            {isRecording ? (
               <div className="flex-1 flex items-center justify-between bg-zinc-900 p-2 rounded-xl border border-red-500/20 shadow-xl overflow-hidden">
                  <div className="flex items-center gap-3 px-3 min-w-0">
                     <div className="w-2 h-2 bg-red-500 rounded-full animate-ping shrink-0"></div>
                     <span className="text-[9px] font-black uppercase tracking-widest text-white truncate">
                        {isPaused ? 'Paused Cycle' : 'Capturing Frequency'}: {recordTime}s
                     </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                     <button onClick={discardRecording} className="p-2.5 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all"><X size={14} /></button>
                     {isPaused ? (
                        <button onClick={resumeRecording} className="p-2.5 bg-yellow-400 text-black rounded-lg shadow-lg transition-all"><Play size={14} fill="currentColor" /></button>
                     ) : (
                        <button onClick={pauseRecording} className="p-2.5 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all"><Pause size={14} fill="currentColor" /></button>
                     )}
                     <button onClick={stopRecording} className="p-2.5 bg-red-500 text-white rounded-lg shadow-lg animate-pulse transition-all"><RotateCcw size={14} /></button>
                  </div>
               </div>
            ) : audioPreview ? (
               <div className="flex-1 flex items-center justify-between bg-zinc-900 p-2 rounded-xl border border-yellow-400/20 overflow-hidden">
                  <div className="flex items-center gap-3 px-3 min-w-0">
                     <button onClick={togglePreviewPlay} className="w-9 h-9 bg-yellow-400 rounded-lg flex items-center justify-center text-black shadow-lg shrink-0">
                        {isPreviewPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                     </button>
                     <span className="text-[9px] font-black uppercase tracking-widest text-white truncate">Review Resonance Pulse ({recordTime}s)</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                     <button onClick={discardRecording} className="p-2.5 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all"><Trash size={14} /></button>
                     <button onClick={() => handleSend('voice_note', { duration: `${recordTime}s`, audioUrl: audioPreviewUrl })} className="p-2.5 bg-yellow-400 text-black rounded-lg shadow-lg active:scale-95 transition-all"><Send size={16} strokeWidth={3} /></button>
                  </div>
               </div>
            ) : (
               <div className="flex-1 relative flex items-center bg-slate-100 dark:bg-zinc-900 rounded-xl p-1 border dark:border-white/5 focus-within:border-yellow-400 transition-all min-w-0">
                   <button onClick={() => setShowPlusMenu(!showPlusMenu)} className={`p-2 shrink-0 transition-all ${showPlusMenu ? 'text-yellow-400 rotate-45' : 'opacity-40'}`}><Plus size={18} /></button>
                   <textarea 
                     value={input}
                     onChange={e => setInput(e.target.value)}
                     placeholder="Sync message..." 
                     rows={1}
                     className="flex-1 py-2.5 px-1 bg-transparent outline-none font-bold text-[14px] md:text-xs resize-none max-h-32 min-h-[36px] dark:text-white min-w-0"
                     style={{ height: 'auto' }}
                     onInput={(e) => {
                       const t = e.target as HTMLTextAreaElement;
                       t.style.height = 'auto';
                       t.style.height = t.scrollHeight + 'px';
                     }}
                   />
                   <div className="flex items-center gap-1 pr-1 shrink-0">
                     <button onClick={startRecording} className="p-2 text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition-all"><Mic size={18} strokeWidth={3} /></button>
                     <button onClick={() => handleSend('text')} className="p-2 bg-yellow-400 text-black rounded-lg shadow-lg active:scale-95 transition-all"><Send size={18} strokeWidth={3} /></button>
                   </div>
               </div>
            )}
         </div>
      </div>

      <input 
        type="file" 
        ref={imageInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              handleSend('image', reader.result as string);
            };
            reader.readAsDataURL(file);
          }
        }} 
      />
      <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => handleSend('text', "📎 Shared a file signal")} />

      {showPlusMenu && (
        <div className="absolute bottom-16 left-4 mb-2 w-44 bg-white dark:bg-zinc-900 border dark:border-white/10 rounded-xl shadow-2xl p-2.5 grid grid-cols-2 gap-2 animate-in slide-in-from-bottom duration-200 z-[220]">
           <button onClick={() => handlePlusAction('image')} className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-yellow-400/10 transition-all group">
             <ImageIcon size={18} className="text-blue-500 group-hover:scale-110 transition-transform" />
             <span className="text-[7px] font-black uppercase tracking-widest dark:text-white">Moment</span>
           </button>
           <button onClick={() => !isPremium && alert('Elite access required')} className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-yellow-400/10 transition-all group">
             <Gift size={18} className="text-purple-500 group-hover:scale-110 transition-transform" />
             <span className="text-[7px] font-black uppercase tracking-widest dark:text-white">Pulse Gift</span>
           </button>
           <button onClick={() => handlePlusAction('location')} className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-yellow-400/10 transition-all group">
             <MapPin size={18} className="text-red-500 group-hover:scale-110 transition-transform" />
             <span className="text-[7px] font-black uppercase tracking-widest dark:text-white">Live Map</span>
           </button>
           <button onClick={() => handlePlusAction('file')} className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-yellow-400/10 transition-all group">
             <FileText size={18} className="text-green-500 group-hover:scale-110 transition-transform" />
             <span className="text-[7px] font-black uppercase tracking-widest dark:text-white">Document</span>
           </button>
        </div>
      )}
    </div>
  );
};

const Chats: React.FC = () => {
  const [activeChats, setActiveChats] = useState<ChatItem[]>(initialChats);
  const [selectedChat, setSelectedChat] = useState<ChatItem | null>(null);
  const [myStatus, setMyStatus] = useState("Vibrating on high resonance.");
  const [editingStatus, setEditingStatus] = useState(false);
  const [statusInput, setStatusInput] = useState(myStatus);
  const [showArchived, setShowArchived] = useState(false);
  const [contextMenuChat, setContextMenuChat] = useState<number | null>(null);

  const handleUpdateStatus = () => {
    setMyStatus(statusInput);
    setEditingStatus(false);
  };

  const togglePin = (id: number) => {
    setActiveChats(activeChats.map(c => c.id === id ? { ...c, isPinned: !c.isPinned } : c));
    setContextMenuChat(null);
  };

  const toggleArchive = (id: number) => {
    setActiveChats(activeChats.map(c => c.id === id ? { ...c, isArchived: !c.isArchived } : c));
    setContextMenuChat(null);
  };

  const deleteChat = (id: number) => {
    setActiveChats(activeChats.filter(c => c.id !== id));
    setContextMenuChat(null);
  };

  const displayedChats = activeChats
    .filter(c => showArchived ? c.isArchived : !c.isArchived)
    .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

  return (
    <div className="h-full flex flex-col bg-white dark:bg-black overflow-hidden max-w-4xl mx-auto border-x dark:border-white/5 relative">
      {selectedChat && <ChatRoom chat={selectedChat} onBack={() => setSelectedChat(null)} onDeleteMessage={() => {}} />}
      
      <div className="p-4 lg:p-8 space-y-6 overflow-y-auto no-scrollbar pb-24 h-full">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-3">
              <h2 className="text-2xl lg:text-4xl font-black tracking-tighter uppercase leading-none dark:text-white">
                {showArchived ? 'ARCHIVE.' : 'CHATS.'}<span className="text-yellow-400">.</span>
              </h2>
           </div>
           <div className="flex gap-2">
              <button onClick={() => setShowArchived(!showArchived)} className={`p-2.5 rounded-xl border transition-all ${showArchived ? 'bg-yellow-400 text-black border-yellow-400' : 'dark:border-white/10 opacity-40 hover:opacity-100 dark:text-white'}`}>
                {showArchived ? <X size={18} /> : <Archive size={18} />}
              </button>
           </div>
        </div>

        {!showArchived && (
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
             <div className="shrink-0 flex flex-col items-center gap-1.5 relative group">
                <div onClick={() => setEditingStatus(true)} className="w-14 h-14 rounded-xl overflow-hidden border-2 border-yellow-400 p-0.5 cursor-pointer hover:scale-105 transition-all relative shadow-lg shadow-yellow-400/10">
                   <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=100" alt="Me" className="w-full h-full object-cover rounded-lg" />
                   <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Edit3 size={14} className="text-white" />
                   </div>
                </div>
                <span className="text-[7px] font-black uppercase tracking-widest opacity-40 dark:text-white">My Cycle</span>
             </div>

             {activeChats.filter(c => !c.isArchived).map(c => (
               <div key={c.id} onClick={() => setSelectedChat(c)} className="shrink-0 flex flex-col items-center gap-1.5 cursor-pointer group">
                  <div className={`w-14 h-14 rounded-xl overflow-hidden border-2 ${c.isPinned ? 'border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.3)]' : 'border-transparent group-hover:border-yellow-400'} p-0.5 transition-all relative`}>
                    <img src={c.img} alt={c.name} className="w-full h-full object-cover rounded-lg" />
                    {c.online && <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 dark:border-black border-white"></div>}
                    {c.isPinned && <Star size={8} fill="#FACC15" className="absolute bottom-1 right-1 text-yellow-400" />}
                  </div>
                  <span className="text-[7px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 dark:text-white">{c.name}</span>
               </div>
             ))}
          </div>
        )}

        {editingStatus && (
          <div className="p-5 bg-yellow-400/5 border border-yellow-400/10 rounded-xl space-y-4 animate-in fade-in slide-in-from-top duration-300">
             <div className="flex items-center gap-2">
                <Sparkles size={12} className="text-yellow-400" />
                <span className="text-[8px] font-black uppercase tracking-widest opacity-40 dark:text-white">Update Resonance Status</span>
             </div>
             <input 
               autoFocus
               value={statusInput} 
               onChange={e => setStatusInput(e.target.value)} 
               className="w-full bg-transparent border-b border-yellow-400/30 outline-none text-[16px] md:text-xs font-bold py-2 dark:text-white placeholder:opacity-20" 
               placeholder="How is your frequency today?"
             />
             <div className="flex justify-end gap-3 pt-1">
               <button onClick={() => setEditingStatus(false)} className="text-[8px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity dark:text-white">Dismiss</button>
               <button onClick={handleUpdateStatus} className="bg-yellow-400 text-black px-4 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest shadow-lg shadow-yellow-400/10 active:scale-95 transition-all">Sync Status</button>
             </div>
          </div>
        )}

        {!showArchived && (
          <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5">
            <span className="text-[7px] font-black uppercase tracking-widest opacity-30 block mb-1 dark:text-white">Broadcast</span>
            <p className="text-[10px] font-bold italic dark:text-white/80">"{myStatus}"</p>
          </div>
        )}
        
        <div className="relative">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-20 dark:text-white" size={14} />
           <input placeholder="Search connections..." className="w-full py-4 pl-12 pr-6 dark:bg-zinc-900 bg-slate-100 rounded-xl outline-none border border-transparent focus:border-yellow-400 transition-all font-bold text-[16px] md:text-xs dark:text-white" />
        </div>

        <div className="space-y-4 pb-20">
          {displayedChats.map((c) => (
            <div 
              key={c.id} 
              onContextMenu={(e) => { e.preventDefault(); setContextMenuChat(c.id); }}
              onClick={() => contextMenuChat === c.id ? setContextMenuChat(null) : setSelectedChat(c)} 
              className={`flex items-center gap-4 p-4 hover:bg-black/5 dark:hover:bg-white/5 rounded-2xl transition-all cursor-pointer group border relative ${c.isPinned ? 'bg-yellow-400/5 border-yellow-400/20' : 'border-transparent'}`}
            >
               <div className="relative shrink-0">
                  <img src={c.img} alt={c.name} className="w-14 h-14 rounded-lg object-cover shadow-sm group-hover:scale-105 transition-transform" />
                  {c.online && <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 dark:border-black border-white rounded-full"></div>}
                  {c.isPinned && <div className="absolute -top-1 -right-1 p-1 bg-yellow-400 rounded-md text-black shadow-lg"><Pin size={8} fill="currentColor" /></div>}
               </div>
               <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                     <h4 className="font-black text-sm tracking-tight truncate dark:text-white">{c.name}</h4>
                     <span className="text-[7px] font-bold opacity-30 uppercase dark:text-white">{c.time}</span>
                  </div>
                  <p className={`text-[11px] truncate leading-tight ${c.unread > 0 ? 'font-black dark:text-white text-black' : 'opacity-40 dark:text-white/40'}`}>{c.msg}</p>
               </div>
               
               <div className="flex items-center gap-2 shrink-0">
                 {c.unread > 0 && (
                   <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-[9px] font-black text-black shadow-lg shadow-yellow-400/20 border-2 border-white dark:border-black">
                      {c.unread}
                   </div>
                 )}
                 <button 
                  onClick={(e) => { e.stopPropagation(); setContextMenuChat(contextMenuChat === c.id ? null : c.id); }} 
                  className="p-1.5 opacity-0 group-hover:opacity-100 transition-opacity dark:text-white"
                 >
                    <MoreVertical size={16} />
                 </button>
               </div>

               {/* Quick Action Context Menu */}
               {contextMenuChat === c.id && (
                 <div className="absolute right-4 top-14 w-40 bg-white dark:bg-zinc-900 border dark:border-white/10 rounded-xl shadow-2xl p-2 z-[300] animate-in zoom-in-95 duration-200">
                    <button onClick={(e) => { e.stopPropagation(); togglePin(c.id); }} className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-yellow-400 hover:text-black text-[10px] font-black uppercase tracking-widest dark:text-white">
                      <Pin size={14} className={c.isPinned ? 'fill-current' : ''} /> {c.isPinned ? 'Unpin' : 'Pin'}
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); toggleArchive(c.id); }} className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-[10px] font-black uppercase tracking-widest dark:text-white">
                      <Archive size={14} /> {c.isArchived ? 'Unarchive' : 'Archive'}
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); deleteChat(c.id); }} className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest">
                      <Trash2 size={14} /> Delete
                    </button>
                 </div>
               )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chats;
