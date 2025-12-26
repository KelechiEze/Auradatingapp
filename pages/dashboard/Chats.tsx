
import React, { useState, useEffect, useRef, useContext } from 'react';
import gsap from 'gsap';
import { 
  Search, MessageSquare, Plus, ArrowLeft, Phone, Video, Send, Mic, 
  MoreVertical, X, Sparkles, Camera, Archive, Trash, UserX, Calendar, 
  Music, Coffee, Moon, Stars, MapPin, ChevronRight, Clock, Heart, 
  Shield, Radio, Image as ImageIcon, FileText, Gift, Smile, Wind, 
  Wine, Tv, Gamepad2, Utensils, PhoneCall, Lock, Play, Pause, Trash2
} from 'lucide-react';
import { PremiumContext } from './DashboardLayout';

interface Message {
  id: number;
  text?: string;
  sender: 'me' | 'them';
  time: string;
  type?: 'text' | 'date_invite' | 'image' | 'voice_note';
  voiceDuration?: string;
  audioUrl?: string;
  dateDetails?: {
    type: string;
    setting: 'Indoor' | 'Outdoor';
    status: 'pending' | 'accepted' | 'declined';
    timestamp: number;
  };
}

const initialChats = [
  { id: 1, name: 'Ademilade', msg: 'The resonance is strong with this one!', time: '2m ago', unread: 2, online: true, img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200', activity: 'Listening to Burna Boy', status: 'Working on a new startup' },
  { id: 2, name: 'Elena', msg: 'Did you check the jazz collection?', time: '1h ago', unread: 0, online: true, img: 'https://images.unsplash.com/photo-1516589174184-c685266e430c?auto=format&fit=crop&q=80&w=200', activity: 'Chilling at the park', status: 'Reading "The Alchemist"' },
  { id: 3, name: 'Sarah', msg: 'I enjoyed our last call.', time: 'Yesterday', unread: 0, online: false, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', activity: 'In a meeting', status: 'Busy' },
];

const CallScreen = ({ type, chat, onClose }: { type: 'voice' | 'video', chat: any, onClose: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<any>(null);

  useEffect(() => {
    if (type === 'video' && navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(s => {
          setStream(s);
          if (videoRef.current) videoRef.current.srcObject = s;
        }).catch(err => console.error("Call access denied:", err));
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach((t: any) => t.stop());
      }
    };
  }, [type]);

  return (
    <div className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center p-8 animate-in fade-in duration-500">
      {type === 'video' ? (
         <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover opacity-60" />
      ) : (
         <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/20 to-black"></div>
      )}
      
      <div className="relative z-10 flex flex-col items-center gap-8 text-center">
         <div className="w-40 h-40 rounded-[60px] overflow-hidden border-4 border-yellow-400 shadow-2xl relative">
            <img src={chat.img} alt={chat.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-yellow-400/10 animate-pulse"></div>
         </div>
         <div className="space-y-2">
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase">{chat.name}</h2>
            <p className="text-yellow-400 font-black tracking-widest text-[10px] animate-pulse uppercase">
              Resonating {type} signal...
            </p>
         </div>

         <div className="flex items-center gap-8 mt-20">
            <button onClick={onClose} className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-2xl shadow-red-500/30">
               <Phone className="rotate-[135deg]" size={32} fill="currentColor" />
            </button>
            <div className="flex flex-col gap-4">
               <button className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white shadow-xl"><Mic size={24} /></button>
               {type === 'video' && <button className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white shadow-xl"><Camera size={24} /></button>}
            </div>
         </div>
      </div>
    </div>
  );
};

const ResonanceOverlay = ({ chat, onClose }: { chat: any, onClose: () => void }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power4.out' });
  }, []);

  return (
    <div className="fixed inset-0 z-[500] bg-black/90 backdrop-blur-3xl flex items-center justify-center p-6" onClick={onClose}>
      <div 
        ref={overlayRef} 
        className="w-full max-w-lg aspect-[9/16] relative rounded-[60px] overflow-hidden border-4 border-yellow-400 shadow-[0_0_80px_rgba(250,204,21,0.3)]"
        onClick={e => e.stopPropagation()}
      >
        <img src={chat.img} alt={chat.name} className="absolute inset-0 w-full h-full object-cover grayscale-[0.2]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        
        <button onClick={onClose} className="absolute top-10 right-10 p-4 bg-white/10 backdrop-blur-xl rounded-full text-white hover:bg-yellow-400 hover:text-black transition-all">
          <X size={24} />
        </button>

        <div className="absolute bottom-16 left-12 right-12 space-y-10">
           <div className="space-y-2">
              <div className="flex items-center gap-3">
                 <h2 className="text-5xl font-black text-white tracking-tighter">{chat.name}</h2>
                 <Shield className="text-yellow-400" size={28} fill="currentColor" />
              </div>
              <p className="text-yellow-400 font-black tracking-[0.5em] text-[10px] uppercase">Frequency Identified</p>
           </div>

           <div className="p-8 bg-white/10 backdrop-blur-2xl rounded-[40px] border border-white/20 space-y-8">
              <div className="space-y-3">
                 <span className="text-[10px] font-black uppercase tracking-widest text-white/40 italic">Projecting Presence</span>
                 <p className="text-2xl font-black text-white tracking-tight leading-none italic">"{chat.status || "Vibrating on high orbit"}"</p>
              </div>
              
              <div className="flex items-center gap-5 pt-4 border-t border-white/10">
                 <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center text-black shadow-lg">
                    <Music size={28} />
                 </div>
                 <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Listening to</span>
                    <p className="text-sm font-bold text-white leading-tight">{chat.activity || "The Universe"}</p>
                 </div>
              </div>
           </div>

           <button onClick={onClose} className="w-full bg-yellow-400 text-black py-7 rounded-3xl font-black text-[12px] uppercase tracking-[0.4em] shadow-xl shadow-yellow-400/20 active:scale-95 transition-all">
             Synchronize Session
           </button>
        </div>
      </div>
    </div>
  );
};

const ScheduleDateModal = ({ name, onConfirm, onClose }: { name: string, onConfirm: (type: string, setting: 'Indoor' | 'Outdoor') => void, onClose: () => void }) => {
  const [isOutdoor, setIsOutdoor] = useState(true);
  const [selectedOpt, setSelectedOpt] = useState('');
  const [customText, setCustomText] = useState('');

  const outdoorOptions = [
    { label: 'Stargazing', icon: Stars, desc: 'Quiet & Infinite' },
    { label: 'Rooftop Dinner', icon: Coffee, desc: 'City Lights' },
    { label: 'Beach Picnic', icon: Wind, desc: 'Wave Resonance' },
    { label: 'Sunset Hike', icon: MapPin, desc: 'Pure Adventure' }
  ];

  const indoorOptions = [
    { label: 'Wine Tasting', icon: Wine, desc: 'Classy Vibes' },
    { label: 'Movie Night', icon: Tv, desc: 'Shared Stories' },
    { label: 'Gaming Duo', icon: Gamepad2, desc: 'Digital Bonds' },
    { label: 'Home Cooking', icon: Utensils, desc: 'Intimate Flavors' }
  ];

  const activeOptions = isOutdoor ? outdoorOptions : indoorOptions;

  const handleFinish = () => {
    const finalType = customText.trim() || selectedOpt || (isOutdoor ? 'Outdoor Date' : 'Indoor Date');
    onConfirm(finalType, isOutdoor ? 'Outdoor' : 'Indoor');
  };

  return (
    <div className="fixed inset-0 z-[600] bg-black/80 backdrop-blur-2xl flex items-end md:items-center justify-center p-0 md:p-8">
      <div className="w-full max-w-lg bg-white dark:bg-black rounded-t-[60px] md:rounded-[60px] p-8 md:p-12 border-t md:border dark:border-white/10 border-black/5 shadow-2xl relative animate-in slide-in-from-bottom duration-500">
        <button onClick={onClose} className="absolute top-10 right-10 p-3 bg-black/5 dark:bg-white/5 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
          <X size={20} />
        </button>

        <div className="space-y-8">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-yellow-400 text-black rounded-3xl mx-auto flex items-center justify-center shadow-lg shadow-yellow-400/20 mb-4">
              <Calendar size={32} />
            </div>
            <h3 className="text-3xl font-black tracking-tighter uppercase leading-none">SCHEDULE RESONANCE.</h3>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-yellow-500">Curating for {name}</p>
          </div>

          <div className="space-y-6">
            <div className="flex bg-black/5 dark:bg-white/5 p-1.5 rounded-3xl border dark:border-white/5 border-black/5">
               <button onClick={() => { setIsOutdoor(true); setSelectedOpt(''); }} className={`flex-1 py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase transition-all ${isOutdoor ? 'bg-white dark:bg-black shadow-lg text-yellow-400' : 'opacity-40'}`}>Outdoor Orbit</button>
               <button onClick={() => { setIsOutdoor(false); setSelectedOpt(''); }} className={`flex-1 py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase transition-all ${!isOutdoor ? 'bg-white dark:bg-black shadow-lg text-yellow-400' : 'opacity-40'}`}>Indoor Sanctuary</button>
            </div>

            <div className="grid grid-cols-2 gap-4">
               {activeOptions.map((opt) => (
                 <button 
                  key={opt.label} 
                  onClick={() => { setSelectedOpt(opt.label); setCustomText(''); }}
                  className={`p-6 rounded-[32px] border text-left transition-all ${selectedOpt === opt.label ? 'border-yellow-400 bg-yellow-400/5 ring-4 ring-yellow-400/10' : 'border-black/5 dark:border-white/5 bg-slate-50 dark:bg-white/5'}`}
                 >
                    <opt.icon size={24} className={selectedOpt === opt.label ? 'text-yellow-400' : 'opacity-30'} />
                    <h4 className="mt-4 font-black text-xs uppercase tracking-widest">{opt.label}</h4>
                    <p className="text-[8px] opacity-40 font-bold uppercase tracking-widest mt-1">{opt.desc}</p>
                 </button>
               ))}
            </div>

            <div className="space-y-3">
               <label className="text-[10px] font-black uppercase tracking-widest opacity-30 ml-4 italic">Or write your custom intent...</label>
               <input 
                value={customText}
                onChange={e => { setCustomText(e.target.value); setSelectedOpt(''); }}
                placeholder="E.g. A romantic walk by the Lagos Marina" 
                className="w-full py-5 px-8 dark:bg-white/5 bg-slate-100 rounded-3xl outline-none focus:border-yellow-400 border-2 border-transparent font-bold" 
               />
            </div>
            
            <div className="p-6 bg-yellow-400/10 border border-yellow-400/20 rounded-[32px] flex items-center gap-4">
               <Clock className="text-yellow-400" size={24} />
               <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed opacity-70">Invitation expires in <span className="text-yellow-500 font-black">24 Hours</span> if not synchronized.</p>
            </div>

            <button 
              onClick={handleFinish}
              className="w-full bg-yellow-400 text-black py-6 rounded-3xl font-black text-xs uppercase tracking-[0.4em] shadow-xl shadow-yellow-400/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              PROPOSE RESONANCE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatRoom = ({ chat, onBack, onArchive, onDelete, onUnmatch }: { chat: typeof initialChats[0], onBack: () => void, onArchive: (id: number) => void, onDelete: (id: number) => void, onUnmatch: (id: number) => void }) => {
  const { isPremium, openUpgrade } = useContext(PremiumContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showResonanceView, setShowResonanceView] = useState(false);
  const [activeCall, setActiveCall] = useState<'voice' | 'video' | null>(null);
  
  // Voice Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [playingId, setPlayingId] = useState<number | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingIntervalRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      { id: 1, text: "Hey! I saw we matched on the 'Music' resonance.", sender: 'them', time: '10:02 AM', type: 'text' },
      { id: 2, text: "Your frequency resonates differently, I like that.", sender: 'them', time: '10:07 AM', type: 'text' },
      { 
        id: 3, 
        sender: 'them', 
        time: 'Yesterday', 
        type: 'date_invite', 
        dateDetails: { 
          type: 'Sunset Stargazing', 
          setting: 'Outdoor', 
          status: 'pending', 
          timestamp: Date.now() - 3600000 
        } 
      }
    ]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { 
      id: Date.now(), 
      text: input, 
      sender: 'me', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
      type: 'text' 
    }]);
    setInput('');
    setShowPlusMenu(false);
  };

  const handleConfirmDate = (type: string, setting: 'Indoor' | 'Outdoor') => {
    setMessages([...messages, { 
      id: Date.now(), 
      sender: 'me', 
      time: 'Just now', 
      type: 'date_invite', 
      dateDetails: { 
        type, 
        setting, 
        status: 'pending', 
        timestamp: Date.now()
      } 
    }]);
    setShowSchedule(false);
  };

  const handleDateResponse = (msgId: number, status: 'accepted' | 'declined') => {
    setMessages(prev => prev.map(m => m.id === msgId && m.dateDetails ? { ...m, dateDetails: { ...m.dateDetails, status } } : m));
  };

  const handleCall = (type: 'voice' | 'video') => {
    setActiveCall(type);
  };

  // REAL Voice Recording Logic
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Use window.MediaRecorder to avoid shadowing or constructor issues
      const recorder = new window.MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const duration = formatTime(recordingTime);

        setMessages(prev => [...prev, {
          id: Date.now(),
          sender: 'me',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'voice_note',
          voiceDuration: duration,
          audioUrl: audioUrl
        }]);
        
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setIsRecording(true);
      setIsPaused(false);
      setRecordingTime(0);
      
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Please allow microphone access to record voice messages.");
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
  };

  const stopRecordingAndSend = () => {
    if (mediaRecorderRef.current && (mediaRecorderRef.current.state === 'recording' || mediaRecorderRef.current.state === 'paused')) {
      mediaRecorderRef.current.stop();
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
      setIsRecording(false);
      setIsPaused(false);
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current) {
      // Temporarily nullify the onstop handler to avoid sending the discarded chunk
      mediaRecorderRef.current.onstop = () => {
        setIsRecording(false);
        setIsPaused(false);
        setRecordingTime(0);
        if (mediaRecorderRef.current?.stream) {
          mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
      };
      
      if (mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
    }
  };

  const handlePlayVoice = (id: number, url: string) => {
    if (playingId === id) {
      if (audioRef.current) {
        audioRef.current.pause();
        setPlayingId(null);
      }
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(url);
    audioRef.current = audio;
    audio.play();
    setPlayingId(id);

    audio.onended = () => {
      setPlayingId(null);
    };
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const emojis = ['❤️', '✨', '🌹', '🔥', '😂', '😍', '🍷', '🥂', '🌍'];

  return (
    <div className="absolute inset-0 bg-white dark:bg-black flex flex-col z-[100] animate-in slide-in-from-right duration-300">
      {activeCall && <CallScreen type={activeCall} chat={chat} onClose={() => setActiveCall(null)} />}
      {showSchedule && <ScheduleDateModal name={chat.name} onConfirm={handleConfirmDate} onClose={() => setShowSchedule(false)} />}
      {showResonanceView && <ResonanceOverlay chat={chat} onClose={() => setShowResonanceView(false)} />}
      
      {/* CHAT HEADER */}
      <header className="p-6 border-b dark:border-white/10 border-black/5 flex items-center justify-between bg-inherit/80 backdrop-blur-md relative z-50">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full"><ArrowLeft size={24} /></button>
          <div className="relative cursor-pointer group" onClick={() => setShowResonanceView(true)}>
            <img src={chat.img} alt={chat.name} className="w-12 h-12 rounded-xl object-cover group-hover:scale-105 transition-transform shadow-lg" />
            <div className="absolute -inset-1 bg-yellow-400/20 blur opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
          </div>
          <div className="cursor-pointer" onClick={() => setShowResonanceView(true)}>
            <h3 className="font-black text-lg tracking-tight leading-none group-hover:text-yellow-400 transition-colors">{chat.name}</h3>
            <div className="flex items-center gap-2 mt-1">
               <Music size={10} className="text-yellow-400" />
               <p className="text-[8px] font-black uppercase tracking-widest opacity-40 truncate max-w-[120px]">{chat.activity}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 relative">
           <button onClick={() => handleCall('voice')} className="p-3 text-yellow-400 hover:bg-yellow-400/10 rounded-2xl relative transition-all active:scale-95">
              <PhoneCall size={20} />
           </button>
           <button onClick={() => handleCall('video')} className="p-3 text-yellow-400 hover:bg-yellow-400/10 rounded-2xl relative transition-all active:scale-95">
              <Video size={20} />
           </button>
           <button onClick={() => setShowMenu(!showMenu)} className={`p-3 transition-all ${showMenu ? 'text-yellow-400' : 'opacity-40 hover:opacity-100'}`}><MoreVertical size={20} /></button>
           
           {showMenu && (
             <div className="absolute top-16 right-0 w-64 bg-white dark:bg-black border dark:border-white/10 border-black/5 rounded-[32px] shadow-2xl p-4 space-y-2 animate-in fade-in zoom-in-95 duration-200">
               <button onClick={() => { setShowSchedule(true); setShowMenu(false); }} className="w-full flex items-center gap-4 p-4 hover:bg-yellow-400 hover:text-black rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest">
                  <Calendar size={18} /> Propose Resonance
               </button>
               <button onClick={() => onArchive(chat.id)} className="w-full flex items-center gap-4 p-4 hover:bg-yellow-400 hover:text-black rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest">
                  <Archive size={18} /> Move to Archives
               </button>
               <button onClick={() => onUnmatch(chat.id)} className="w-full flex items-center gap-4 p-4 hover:bg-red-500 hover:text-white rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest">
                  <UserX size={18} /> Dissolve Aura
               </button>
             </div>
           )}
        </div>
      </header>

      {/* MESSAGES */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-50/50 dark:bg-black no-scrollbar scroll-smooth">
         {messages.map((m) => (
           <div key={m.id} className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              {m.type === 'text' && (
                <div className={`max-w-[80%] p-6 rounded-[32px] ${m.sender === 'me' ? 'bg-yellow-400 text-black rounded-tr-none shadow-xl shadow-yellow-400/10' : 'bg-white dark:bg-white/5 border dark:border-white/10 border-black/5 rounded-tl-none shadow-sm'}`}>
                   <p className="text-sm font-bold leading-relaxed">{m.text}</p>
                   <span className="text-[8px] font-black mt-3 block opacity-40 uppercase tracking-widest">{m.time}</span>
                </div>
              )}

              {m.type === 'voice_note' && (
                <div className={`max-w-[280px] w-full p-6 rounded-[40px] flex items-center gap-4 ${m.sender === 'me' ? 'bg-yellow-400 text-black shadow-xl' : 'bg-white dark:bg-white/5 border dark:border-white/10'}`}>
                   <button 
                    onClick={() => handlePlayVoice(m.id, m.audioUrl || '')}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${m.sender === 'me' ? 'bg-black text-yellow-400 shadow-lg' : 'bg-yellow-400 text-black shadow-lg'} ${playingId === m.id ? 'scale-110 rotate-12' : ''}`}
                   >
                      {playingId === m.id ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                   </button>
                   <div className="flex-1 space-y-2">
                      <div className="flex gap-0.5 items-end h-6">
                         {[1,3,2,4,3,2,1,2,4,5,3,2,1,3,4,2].map((h, i) => (
                            <div 
                              key={i} 
                              className={`flex-1 rounded-full transition-all duration-300 ${m.sender === 'me' ? 'bg-black/30' : 'bg-yellow-400/30'} ${playingId === m.id ? 'animate-pulse' : ''}`} 
                              style={{ height: `${playingId === m.id ? Math.random() * 80 + 20 : h * 20}%` }}
                            ></div>
                         ))}
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-60">
                         <span>{m.voiceDuration}</span>
                         <span>{m.time}</span>
                      </div>
                   </div>
                </div>
              )}

              {m.type === 'date_invite' && m.dateDetails && (
                <div className="w-full max-w-[340px] p-10 bg-black dark:bg-white text-white dark:text-black rounded-[50px] shadow-2xl space-y-8 relative overflow-hidden group border dark:border-white/10">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
                  
                  <div className="flex items-center justify-between relative z-10">
                    <div className="bg-yellow-400 p-4 rounded-3xl text-black shadow-xl ring-8 ring-yellow-400/10">
                      <Calendar size={24} />
                    </div>
                    {m.dateDetails.status === 'pending' && (Date.now() - m.dateDetails.timestamp > 86400000) ? (
                      <div className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full flex items-center gap-2">
                         <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                         <span className="text-[8px] font-black uppercase text-red-500 tracking-widest">Signal Expired</span>
                      </div>
                    ) : (
                      <span className="text-[9px] font-black uppercase opacity-40 tracking-[0.3em] italic">{m.dateDetails.status.toUpperCase()} SIGNAL</span>
                    )}
                  </div>

                  <div className="space-y-3 relative z-10">
                    <h4 className="text-3xl font-black tracking-tighter leading-none italic">"{m.dateDetails.type}"</h4>
                    <div className="flex items-center gap-2">
                       <MapPin size={12} className="text-yellow-400" />
                       <p className="text-[10px] opacity-60 font-black uppercase tracking-widest">{m.dateDetails.setting} Resonance</p>
                    </div>
                  </div>
                  
                  {m.dateDetails.status === 'pending' && m.sender === 'them' && (Date.now() - m.dateDetails.timestamp < 86400000) && (
                    <div className="flex gap-4 pt-2 relative z-10">
                      <button onClick={() => handleDateResponse(m.id, 'accepted')} className="flex-1 bg-yellow-400 text-black py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-yellow-400/20 hover:scale-105 active:scale-95 transition-all">Synchronize</button>
                      <button onClick={() => handleDateResponse(m.id, 'declined')} className="flex-1 bg-white/10 dark:bg-black/5 border border-white/10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">Dissolve</button>
                    </div>
                  )}

                  {m.dateDetails.status === 'accepted' && (
                    <div className="p-5 bg-green-500/10 border border-green-500/20 rounded-[30px] flex items-center justify-center gap-3 relative z-10">
                       <Heart size={16} className="text-green-500 animate-pulse" fill="currentColor" />
                       <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Frequencies Aligned</span>
                    </div>
                  )}
                  {m.dateDetails.status === 'declined' && (
                    <div className="p-5 bg-red-500/10 border border-red-500/20 rounded-[30px] flex items-center justify-center gap-3 relative z-10 opacity-60">
                       <X size={16} className="text-red-500" />
                       <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Aura Blocked</span>
                    </div>
                  )}
                </div>
              )}
           </div>
         ))}
      </div>

      {/* INPUT AREA */}
      <div className="p-6 md:p-10 border-t dark:border-white/10 border-black/5 space-y-6 bg-white dark:bg-black relative shadow-2xl">
         
         {/* ATTACHMENT MENU */}
         {showPlusMenu && !isRecording && (
           <div className="absolute bottom-full left-6 mb-4 w-72 bg-white dark:bg-black border dark:border-white/10 border-black/5 rounded-[40px] shadow-[0_30px_100px_rgba(0,0,0,0.4)] p-6 grid grid-cols-2 gap-4 animate-in slide-in-from-bottom duration-300">
              {[
                { label: 'Moments', icon: ImageIcon, color: 'bg-blue-500/10 text-blue-500' },
                { label: 'Frequency', icon: FileText, color: 'bg-green-500/10 text-green-500' },
                { label: 'Pulse Gift', icon: Gift, color: 'bg-purple-500/10 text-purple-500', premium: true },
                { label: 'Orbit Map', icon: MapPin, color: 'bg-red-500/10 text-red-500' }
              ].map(item => (
                <button 
                  key={item.label} 
                  onClick={() => item.premium && !isPremium ? openUpgrade() : null}
                  className="flex flex-col items-center gap-3 p-5 rounded-3xl hover:bg-yellow-400 hover:text-black transition-all group relative"
                >
                  <div className={`p-3 rounded-2xl ${item.color} group-hover:bg-black/10 group-hover:text-inherit`}>
                    <item.icon size={28} />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
                  {item.premium && !isPremium && <Lock size={12} className="absolute top-2 right-2 text-red-500" />}
                </button>
              ))}
           </div>
         )}

         {/* EMOJI BAR */}
         {!isRecording && (
           <div className="flex gap-5 overflow-x-auto no-scrollbar py-1">
              {emojis.map(e => (
                <button key={e} onClick={() => setInput(prev => prev + e)} className="text-2xl hover:scale-150 transition-transform duration-300 active:scale-95">{e}</button>
              ))}
              <div className="w-px h-6 bg-black/10 dark:bg-white/10 mx-2 self-center"></div>
              <Smile size={24} className="opacity-20 self-center" />
           </div>
         )}

         <div className="flex items-center gap-4">
            {!isRecording ? (
              <>
                <button onClick={() => setShowPlusMenu(!showPlusMenu)} className={`p-5 rounded-[24px] transition-all ${showPlusMenu ? 'bg-yellow-400 text-black shadow-xl' : 'bg-black/5 dark:bg-white/5 opacity-50 hover:opacity-100'}`}>
                  <Plus size={24} strokeWidth={3} />
                </button>
                <div className="flex-1 relative">
                   <input 
                     value={input}
                     onChange={e => setInput(e.target.value)}
                     onKeyPress={e => e.key === 'Enter' && handleSend()}
                     placeholder="Synchronize thoughts..." 
                     className="w-full py-6 px-8 dark:bg-white/5 bg-slate-100 rounded-[32px] outline-none font-bold placeholder:opacity-20 border-2 border-transparent focus:border-yellow-400 transition-all text-lg"
                   />
                </div>
                
                <button 
                  onClick={startRecording}
                  className="p-6 rounded-[24px] bg-black/5 dark:bg-white/5 text-yellow-400 hover:bg-yellow-400/10 transition-all active:scale-90"
                >
                  <Mic size={24} />
                </button>

                <button 
                 onClick={handleSend}
                 className={`p-6 rounded-[24px] transition-all ${input.trim() ? 'bg-yellow-400 text-black shadow-xl shadow-yellow-400/20 hover:scale-105' : 'bg-black/5 dark:bg-white/5 opacity-30 text-current'}`}
                >
                   <Send size={24} strokeWidth={3} />
                </button>
              </>
            ) : (
              /* RECORDING BAR UI */
              <div className="flex-1 flex items-center justify-between p-2 bg-black dark:bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[40px] animate-in slide-in-from-right duration-500">
                <button 
                  onClick={cancelRecording}
                  className="w-14 h-14 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shrink-0"
                >
                  <Trash2 size={24} />
                </button>
                
                <div className="flex items-center gap-4 px-4 overflow-hidden">
                   <div className="flex items-center gap-3 shrink-0">
                      <div className={`w-3 h-3 bg-red-500 rounded-full ${!isPaused ? 'animate-pulse' : 'opacity-50'} shadow-[0_0_15px_rgba(239,68,68,0.5)]`}></div>
                      <span className="text-xl font-black text-white dark:text-yellow-400 tabular-nums">{formatTime(recordingTime)}</span>
                   </div>

                   <div className="flex gap-1 items-center h-8 px-2 overflow-hidden">
                      {[1,3,2,4,3,2,4,5,2,3,4,2,1].map((h, i) => (
                        <div 
                          key={i} 
                          className={`w-1 bg-yellow-400/40 rounded-full ${!isPaused ? 'animate-pulse' : ''}`} 
                          style={{ height: `${h * 20}%`, animationDelay: `${i * 0.1}s` }}
                        ></div>
                      ))}
                   </div>
                </div>

                <div className="flex items-center gap-2 pr-2">
                  <button 
                    onClick={isPaused ? resumeRecording : pauseRecording}
                    className="w-12 h-12 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-all shrink-0"
                  >
                    {isPaused ? <Play size={20} fill="currentColor" /> : <Pause size={20} fill="currentColor" />}
                  </button>

                  <button 
                    onClick={stopRecordingAndSend}
                    className="w-14 h-14 bg-yellow-400 text-black rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-all shrink-0"
                  >
                    <Send size={24} strokeWidth={3} />
                  </button>
                </div>
              </div>
            )}
         </div>
      </div>
    </div>
  );
};

const Chats: React.FC = () => {
  const [activeChats, setActiveChats] = useState(initialChats);
  const [archivedChats, setArchivedChats] = useState<typeof initialChats>([]);
  const [selectedChat, setSelectedChat] = useState<typeof initialChats[0] | null>(null);
  const [view, setView] = useState<'active' | 'archived'>('active');
  const [myActivity, setMyActivity] = useState('Listening to Afro-Jazz');
  const [myStatus, setMyStatus] = useState('Dreaming big');
  const [showStatusEdit, setShowStatusEdit] = useState(false);

  const handleArchive = (id: number) => {
    const chat = activeChats.find(c => c.id === id);
    if (chat) {
      setActiveChats(activeChats.filter(c => c.id !== id));
      setArchivedChats([...archivedChats, chat]);
    }
    setSelectedChat(null);
  };

  const handleUnarchive = (id: number) => {
    const chat = archivedChats.find(c => c.id === id);
    if (chat) {
      setArchivedChats(archivedChats.filter(c => c.id !== id));
      setActiveChats([...activeChats, chat]);
    }
  };

  const handleDelete = (id: number) => {
    setActiveChats(activeChats.filter(c => c.id !== id));
    setArchivedChats(archivedChats.filter(c => c.id !== id));
    setSelectedChat(null);
  };

  const chatsToDisplay = view === 'active' ? activeChats : archivedChats;

  return (
    <div className="h-full flex flex-col relative bg-white dark:bg-black overflow-hidden">
      {selectedChat && <ChatRoom 
        chat={selectedChat} 
        onBack={() => setSelectedChat(null)} 
        onArchive={handleArchive}
        onDelete={handleDelete}
        onUnmatch={handleDelete}
      />}
      
      {showStatusEdit && (
        <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-xl flex items-center justify-center p-6">
           <div className="w-full max-m-md bg-white dark:bg-black rounded-[50px] p-12 border dark:border-white/10 border-black/5 shadow-2xl space-y-10 animate-in zoom-in-95 duration-400">
              <div className="space-y-3 text-center">
                 <h3 className="text-4xl font-black tracking-tighter uppercase leading-none">FREQUENCY STATUS.</h3>
                 <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Update your global signal</p>
              </div>
              <div className="space-y-6">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-30 ml-4">Current Aura</label>
                    <input value={myStatus} onChange={e => setMyStatus(e.target.value)} placeholder="Dreaming big..." className="w-full p-6 bg-slate-50 dark:bg-white/5 border-2 border-transparent focus:border-yellow-400 rounded-3xl outline-none font-bold text-lg" />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-30 ml-4">Vibrating To (Audio)</label>
                    <input value={myActivity} onChange={e => setMyActivity(e.target.value)} placeholder="Afro-Jazz vibes..." className="w-full p-6 bg-slate-50 dark:bg-white/5 border-2 border-transparent focus:border-yellow-400 rounded-3xl outline-none font-bold text-lg" />
                 </div>
              </div>
              <button onClick={() => setShowStatusEdit(false)} className="w-full bg-yellow-400 text-black py-6 rounded-3xl font-black text-[12px] uppercase tracking-[0.4em] shadow-xl shadow-yellow-400/20 transition-all hover:scale-105 active:scale-95">RECALIBRATE ORBIT</button>
           </div>
        </div>
      )}

      <div className="p-6 lg:p-12 space-y-10 overflow-y-auto no-scrollbar pb-32">
        <div className="flex items-center justify-between">
           <h2 className="text-5xl lg:text-8xl font-black tracking-tighter">CHATS.</h2>
           <div className="flex gap-4">
              <button 
                onClick={() => setView(view === 'active' ? 'archived' : 'active')}
                className={`p-4 rounded-2xl border-2 transition-all ${view === 'archived' ? 'bg-yellow-400 border-yellow-400 text-black shadow-lg shadow-yellow-400/20' : 'border-black/5 dark:border-white/10 opacity-40'}`}
              >
                <Archive size={28} />
              </button>
           </div>
        </div>

        <div className="flex gap-8 overflow-x-auto no-scrollbar pb-6 -mx-6 px-6">
           <div className="shrink-0 flex flex-col items-center gap-4 relative group">
              <div onClick={() => setShowStatusEdit(true)} className="w-24 h-24 rounded-[36px] overflow-hidden border-4 border-yellow-400 p-1.5 cursor-pointer hover:scale-110 transition-all shadow-2xl">
                 <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=100" alt="Me" className="w-full h-full object-cover rounded-[28px]" />
              </div>
              <div className="absolute -top-3 -right-3 bg-white dark:bg-black border-2 dark:border-white/10 border-black/5 p-3 rounded-2xl shadow-2xl max-w-[100px] animate-bounce">
                 <p className="text-[9px] font-black leading-tight italic truncate">"{myStatus}"</p>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest opacity-40">My Frequency</span>
           </div>

           {activeChats.map(c => (
             <div key={c.id} onClick={() => setSelectedChat(c)} className="shrink-0 flex flex-col items-center gap-4 cursor-pointer group relative">
                <div className="w-24 h-24 rounded-[36px] overflow-hidden border-4 border-transparent group-hover:border-yellow-400 p-1.5 transition-all">
                  <img src={c.img} alt={c.name} className="w-full h-full object-cover rounded-[28px]" />
                </div>
                {c.status && (
                  <div className="absolute -top-3 -right-3 bg-yellow-400 text-black border-2 border-white dark:border-black p-3 rounded-2xl shadow-2xl max-w-[100px]">
                    <p className="text-[9px] font-black leading-tight italic truncate">"{c.status}"</p>
                  </div>
                )}
                <span className="text-[10px] font-black uppercase tracking-widest">{c.name}</span>
             </div>
           ))}
        </div>
        
        <div className="grid grid-cols-1 gap-4">
           <div className="relative group">
              <Search className="absolute left-7 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:text-yellow-400 transition-colors" size={20} />
              <input placeholder={`Search ${view} resonances...`} className="w-full py-6 pl-16 pr-8 dark:bg-white/5 bg-slate-100 rounded-[35px] border-2 border-transparent focus:border-yellow-400 outline-none transition-all font-bold text-lg" />
           </div>
        </div>

        <div className="space-y-6">
          {chatsToDisplay.length === 0 ? (
            <div className="py-24 text-center space-y-6 opacity-20">
               <MessageSquare size={80} className="mx-auto" />
               <p className="font-black uppercase tracking-[0.5em] text-xs">No active global signals</p>
            </div>
          ) : (
            chatsToDisplay.map((c, i) => (
              <div key={i} onClick={() => setSelectedChat(c)} className="flex items-center gap-6 p-8 hover:bg-black/5 dark:hover:bg-white/5 rounded-[50px] border-2 border-transparent hover:border-black/5 dark:hover:border-white/5 transition-all cursor-pointer group relative">
                 <div className="relative shrink-0">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-[32px] overflow-hidden shadow-2xl group-hover:rotate-3 transition-transform">
                       <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
                    </div>
                    {c.online && <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 dark:border-black border-white rounded-full shadow-lg"></div>}
                 </div>
                 <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                       <h4 className="font-black text-2xl tracking-tight truncate group-hover:text-yellow-400 transition-colors">{c.name}</h4>
                       <span className="text-[10px] font-bold opacity-30">{c.time}</span>
                    </div>
                    <p className={`text-base lg:text-lg truncate ${c.unread > 0 ? 'font-black dark:text-white text-black' : 'opacity-40 font-medium'}`}>{c.msg}</p>
                 </div>
                 {c.unread > 0 && (
                   <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-[10px] font-black text-black shadow-xl shadow-yellow-400/20 border-4 border-white dark:border-black">
                      {c.unread}
                   </div>
                 )}
                 {view === 'archived' && (
                   <button onClick={(e) => { e.stopPropagation(); handleUnarchive(c.id); }} className="p-4 opacity-0 group-hover:opacity-100 bg-yellow-400 text-black rounded-3xl shadow-2xl transition-all">
                      <Plus size={24} />
                   </button>
                 )}
              </div>
            ))
          )}
        </div>
        
        <div className="pt-16 text-center opacity-10 flex flex-col items-center gap-4">
           <Radio size={40} className="animate-pulse" />
           <p className="text-[10px] font-black uppercase tracking-[0.5em]">Orbit Synchronization Complete</p>
        </div>
      </div>
    </div>
  );
};

export default Chats;
