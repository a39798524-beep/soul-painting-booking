import React, { useState, useEffect } from 'react';
import { Star, Moon, Sun, Palette, Sparkles, PawPrint, CheckCircle, ArrowRight, Upload, Clock, MapPin, Menu, X, Instagram, Facebook } from 'lucide-react';

/**
 * 靈魂畫家 - 互動式個人網站 (完整版)
 * 包含：互動星塵、關於女巫、黃金獵犬助理、服務價目表、預約結帳流程
 */

const SoulParticle = ({ x, y }) => {
  return (
    <div 
      className="pointer-events-none absolute rounded-full mix-blend-screen animate-ping"
      style={{
        left: x,
        top: y,
        width: Math.random() * 4 + 2 + 'px',
        height: Math.random() * 4 + 2 + 'px',
        backgroundColor: `hsl(${Math.random() * 60 + 200}, 100%, 70%)`,
        opacity: 0.8,
        animationDuration: '1s'
      }}
    />
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [particles, setParticles] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // 表單狀態
  const [formStep, setFormStep] = useState(1); // 1: 選擇服務 (在Services頁面), 2: 填寫資料
  const [selectedService, setSelectedService] = useState(null);
  const [isRushOrder, setIsRushOrder] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    dob: '', // 出生年月日 + 時間
    storeType: '7-11', // 7-11 or Family
    storeName: '',
    storeID: '',
    remarks: '',
  });

  // 服務項目資料
  const services = [
    { id: 1, title: "靈魂畫", price: 9999, desc: "根據面相與星座繪製一幅靈魂能量畫。" },
    { id: 2, title: "靈魂星圖", price: 26888, desc: "深度解析星盤，找出靈魂的使命與天賦。" },
    { id: 3, title: "龍繪 (2026龍魂覺醒)", price: 12888, desc: "穩固龍族力量，啟動守護結界。" },
    { id: 4, title: "靈魂畫實體課程", price: 3333, desc: "親自指導，感受色彩與能量的結合。" },
    { id: 5, title: "靈魂畫線上課程", price: 3333, desc: "遠距教學，隨時隨地開啟創作天賦。" },
    { id: 6, title: "三部曲靈魂畫", price: 26999, desc: "橫跨過去、現在、未來的系列能量畫作。" },
    { id: 7, title: "神聖藍圖 & 靈魂畫", price: 21888, desc: "解讀生命藍圖，搭配專屬療癒畫作。" },
    { id: 8, title: "團體戀人畫", price: 17999, desc: "繪製團體/伴侶間的能量流動與和諧。" },
    { id: 9, title: "地脈啟動儀式 & 空間能量畫", price: 38888, originalPrice: 68888, desc: "專為商業空間/場域設計，進行能量淨化與繪製。", isSpecial: true },
  ];

  // 處理滑鼠移動產生星塵效果
  const handleMouseMove = (e) => {
    if (Math.random() > 0.85) { 
      const newParticle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY + window.scrollY
      };
      setParticles(prev => [...prev.slice(-15), newParticle]);
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticle.id));
      }, 1000);
    }
  };

  const handleBookingClick = (service) => {
    setSelectedService(service);
    setActiveSection('booking');
    setFormStep(2); 
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const total = calculateTotal();
    const msg = `感謝您的預約！\n\n我們已收到 ${formData.name} 的資料。\n服務項目: ${selectedService?.title}\n總金額: ${total}\n取貨店鋪: ${formData.storeType} ${formData.storeName}\n\n(此為展示網站，實際運作時資料會傳送至您的後台)`;
    
    alert(msg);
    
    // 重置
    setActiveSection('home');
    setFormData({ name: '', phone: '', dob: '', storeType: '7-11', storeName: '', storeID: '', remarks: '' });
    setIsRushOrder(false);
    setSelectedService(null);
  };

  const calculateTotal = () => {
    let total = selectedService ? selectedService.price : 0;
    if (isRushOrder) total += 1000;
    return total.toLocaleString();
  };

  // 導覽列按鈕組件
  const NavButton = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => {
        setActiveSection(id);
        setIsMenuOpen(false);
        window.scrollTo(0,0);
      }}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
        activeSection === id 
        ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]' 
        : 'text-purple-200 hover:bg-white/10'
      }`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );

  const renderContent = () => {
    switch(activeSection) {
      case 'home':
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-fade-in px-4">
             <div className="relative">
                <div className="absolute inset-0 bg-purple-500 blur-[80px] opacity-20 rounded-full"></div>
                <h1 className="relative text-5xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 mb-4 drop-shadow-lg">
                  靈魂畫師
                </h1>
             </div>
             <p className="text-xl md:text-2xl text-purple-100 font-light tracking-widest max-w-2xl leading-relaxed">
                連結星辰與靈魂的色彩<br/>
                為您顯化無形的能量祝福
             </p>
             <button 
               onClick={() => setActiveSection('services')}
               className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-bold tracking-wider hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(147,51,234,0.4)]"
             >
               <span className="flex items-center gap-2">
                 開始您的靈魂旅程 <ArrowRight className="group-hover:translate-x-1 transition-transform" />
               </span>
             </button>
          </div>
        );

      case 'about':
        return (
          <div className="animate-fade-in space-y-8 max-w-3xl mx-auto px-4">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-purple-300/20 shadow-xl text-purple-50">
              <h2 className="text-3xl font-serif text-purple-200 mb-6 flex items-center gap-2">
                <Sun className="w-8 h-8 text-yellow-400" />
                關於靈魂畫師
              </h2>
              
              <div className="space-y-6 leading-relaxed font-light tracking-wide text-lg">
                <p>
                  我是一名台灣女巫，從小就遺傳父母的特殊體質，擁有靈視能力。在 2021 年，隨著前世記憶的覺醒，我發掘出更多潛藏的力量。
                </p>
                <p>
                  我的旅程豐富而多元，曾擔任解夢師、植物溝通、讀礦、塔羅占卜、巫術儀式、黑魔法儀式、盧恩符文及解咒師。在全盛時期，我一個月能承接超過 20 位靈魂的委託。
                </p>
                <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-500/30 italic">
                  <p>
                    如今，我依舊維持遠距離服務，但我不再進行干涉因果業力的儀式。
                    我選擇擅用自己的力量，透過連結他人的心靈，繪製出專屬的「靈魂圖」。
                  </p>
                </div>
                <p>
                  透過面相學的觀察與星盤的指引，我能感受到每個人獨特的能量場與靈魂色調。我的畫筆不只是描繪外表，而是將那份無形中的感覺、性格的深層流動，轉化為可見的藝術。
                </p>
                <p className="font-bold text-purple-200">
                  我會運用各種面向去畫出富含力量的祝福，顯化強力有效。
                  歡迎找我預約畫圖，我會篩選靈魂，喚醒更多潛在的人體奧秘。
                </p>
              </div>
            </div>
          </div>
        );
      
      case 'assistant':
        return (
          <div className="animate-fade-in space-y-8 max-w-2xl mx-auto px-4">
            <div className="bg-gradient-to-br from-orange-100/10 to-yellow-100/10 backdrop-blur-md p-8 rounded-2xl border border-yellow-300/20 shadow-xl">
              <h2 className="text-3xl font-serif text-yellow-200 mb-6 flex items-center gap-2">
                <PawPrint className="w-8 h-8 text-yellow-400" />
                工作室的小太陽
              </h2>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-48 h-48 bg-yellow-200/20 rounded-full flex items-center justify-center border-4 border-yellow-400/30 overflow-hidden relative group shrink-0 shadow-[0_0_30px_rgba(250,204,21,0.2)]">
                   <div className="absolute inset-0 bg-yellow-500/10 group-hover:bg-transparent transition-all duration-500"></div>
                   {/* 這裡可以使用 <img src="狗狗照片url" /> 替換 */}
                   <PawPrint size={80} className="text-yellow-200 animate-pulse" />
                </div>
                <div className="flex-1 space-y-4 text-purple-50">
                  <h3 className="text-2xl font-bold text-yellow-100">黃金獵犬助理</h3>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="bg-yellow-500/20 px-3 py-1 rounded-full text-yellow-200 border border-yellow-500/30">男生</span>
                    <span className="bg-yellow-500/20 px-3 py-1 rounded-full text-yellow-200 border border-yellow-500/30">10月20日生</span>
                    <span className="bg-yellow-500/20 px-3 py-1 rounded-full text-yellow-200 border border-yellow-500/30">療癒擔當</span>
                  </div>
                  <p className="leading-relaxed text-yellow-50/80">
                    他是工作室裡最溫暖的存在。雖然他不懂畫畫，但他懂得如何用熱情融化每一個進來的人。
                    在我作畫需要靈感沈澱時，他安靜的陪伴就是最好的穩定劑。
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'services':
        return (
          <div className="animate-fade-in max-w-6xl mx-auto px-4">
             <div className="text-center mb-10">
                <h2 className="text-3xl font-serif text-white mb-4">服務項目與價格</h2>
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg inline-block text-yellow-200 text-sm">
                   👉 預約須知：目前預約都需要等候排程。急件請告知，將另收 <b>$1,000 加急費用</b>
                </div>
             </div>

             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {services.map((service) => (
                 <div 
                    key={service.id}
                    className={`
                      relative p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 hover:-translate-y-2 cursor-pointer group flex flex-col justify-between
                      ${service.isSpecial 
                        ? 'bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-pink-500/30 shadow-[0_0_20px_rgba(236,72,153,0.2)]' 
                        : 'bg-white/5 border-white/10 hover:shadow-lg hover:shadow-cyan-500/20'
                      }
                    `}
                 >
                    <div>
                      {service.isSpecial && (
                        <div className="absolute top-0 right-0 bg-pink-500 text-white text-xs px-3 py-1 rounded-bl-xl rounded-tr-xl font-bold">
                          早鳥優惠
                        </div>
                      )}
                      <h3 className={`text-xl font-bold mb-2 ${service.isSpecial ? 'text-pink-200' : 'text-blue-100'}`}>
                        {service.title}
                      </h3>
                      <div className="mb-4">
                        {service.originalPrice && (
                          <span className="text-gray-400 line-through text-sm mr-2">NT${service.originalPrice.toLocaleString()}</span>
                        )}
                        <span className={`text-2xl font-bold ${service.isSpecial ? 'text-pink-400' : 'text-cyan-300'}`}>
                          NT${service.price.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm mb-6">{service.desc}</p>
                    </div>
                    
                    <button 
                      onClick={() => handleBookingClick(service)}
                      className={`w-full py-2 rounded-full font-medium transition-all flex items-center justify-center gap-2
                        ${service.isSpecial 
                          ? 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white' 
                          : 'bg-white/10 hover:bg-white/20 text-blue-100'
                        }
                      `}
                    >
                      預約此項目 <ArrowRight size={16} />
                    </button>
                 </div>
               ))}
             </div>
          </div>
        );

      case 'booking':
        return (
          <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-12">
             <div className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl">
                <div className="mb-6 pb-6 border-b border-white/10">
                   <button 
                     onClick={() => setActiveSection('services')}
                     className="text-sm text-purple-300 hover:text-white mb-2 flex items-center gap-1"
                   >
                     ← 返回服務列表
                   </button>
                   <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                     <Sparkles className="text-yellow-400" />
                     預約單：{selectedService?.title}
                   </h2>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* 基本資料 */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-purple-200 text-sm">您的姓名 / 暱稱</label>
                      <input 
                        required
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-black/20 border border-purple-500/30 rounded-lg p-3 text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none transition-colors"
                        placeholder="請輸入姓名"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-purple-200 text-sm">聯絡電話</label>
                      <input 
                        required
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-black/20 border border-purple-500/30 rounded-lg p-3 text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none transition-colors"
                        placeholder="09xx-xxx-xxx"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-purple-200 text-sm flex items-center gap-2">
                      <Clock size={16}/> 出生年月日與時間 (製作星盤/靈魂畫參考用)
                    </label>
                    <input 
                      required
                      type="text" 
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="w-full bg-black/20 border border-purple-500/30 rounded-lg p-3 text-white focus:border-purple-400 outline-none"
                      placeholder="例：1996/08/19 早上07:55"
                    />
                  </div>

                  {/* 物流資料 */}
                  <div className="space-y-4 pt-4 border-t border-white/10">
                     <h3 className="text-lg text-purple-100 font-semibold flex items-center gap-2">
                        <MapPin size={18} /> 收件店鋪資料 (7-11 / 全家)
                     </h3>
                     <div className="grid grid-cols-2 gap-4">
                        <select 
                          name="storeType"
                          value={formData.storeType}
                          onChange={handleInputChange}
                          className="bg-black/20 border border-purple-500/30 rounded-lg p-3 text-white outline-none"
                        >
                          <option value="7-11">7-11</option>
                          <option value="Family">全家 FamilyMart</option>
                        </select>
                        <input 
                          required
                          type="text" 
                          name="storeName"
                          value={formData.storeName}
                          onChange={handleInputChange}
                          className="bg-black/20 border border-purple-500/30 rounded-lg p-3 text-white outline-none"
                          placeholder="店鋪名稱 (例: 台南安平店)"
                        />
                     </div>
                     <input 
                        type="text" 
                        name="storeID"
                        value={formData.storeID}
                        onChange={handleInputChange}
                        className="w-full bg-black/20 border border-purple-500/30 rounded-lg p-3 text-white outline-none"
                        placeholder="店鋪代號 (若不確定可留空)"
                      />
                  </div>

                  {/* 照片上傳示意 (純前端展示) */}
                  <div className="space-y-2 pt-4">
                    <label className="text-purple-200 text-sm flex items-center gap-2">
                      <Upload size={16}/> 上傳照片 (面相參考)
                    </label>
                    <div className="border-2 border-dashed border-purple-500/30 rounded-lg p-8 text-center hover:bg-white/5 transition-colors cursor-pointer">
                       <p className="text-gray-400 text-sm">點擊選擇照片，或將照片拖曳至此</p>
                    </div>
                  </div>

                  {/* 備註與加急 */}
                  <div className="space-y-4 pt-4">
                     <label className="flex items-center gap-3 p-3 rounded-lg border border-purple-500/30 cursor-pointer hover:bg-white/5">
                        <input 
                          type="checkbox"
                          checked={isRushOrder}
                          onChange={(e) => setIsRushOrder(e.target.checked)}
                          className="w-5 h-5 accent-purple-500"
                        />
                        <span className="text-white">急件處理 (需加收 $1,000)</span>
                     </label>
                     
                     <textarea 
                       name="remarks"
                       value={formData.remarks}
                       onChange={handleInputChange}
                       rows="3"
                       className="w-full bg-black/20 border border-purple-500/30 rounded-lg p-3 text-white focus:border-purple-400 outline-none"
                       placeholder="有其他特殊需求請在此備註..."
                     />
                  </div>

                  {/* 結帳按鈕 */}
                  <div className="pt-6 border-t border-white/10 flex flex-col items-center gap-4">
                     <div className="text-center">
                        <p className="text-gray-400 text-sm">預估總金額</p>
                        <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500">
                          NT$ {calculateTotal()}
                        </p>
                     </div>
                     <button 
                       type="submit"
                       className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-bold text-lg shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] transition-all"
                     >
                       確認送出預約
                     </button>
                  </div>

                </form>
             </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  useEffect(() => {
    // 初始化一些粒子
    const initialParticles = Array.from({ length: 20 }).map(() => ({
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight
    }));
    // 這裡僅做展示，實際可能需要更複雜的動畫循環
  }, []);

  return (
    <div 
      className="min-h-screen bg-[#0f0c29] text-white overflow-hidden relative font-sans selection:bg-purple-500/30"
      onMouseMove={handleMouseMove}
    >
      {/* 動態背景層 */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] z-0"></div>
      <div className="fixed inset-0 opacity-30 z-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      
      {/* 粒子效果 */}
      {particles.map(p => (
        <SoulParticle key={p.id} x={p.x} y={p.y} />
      ))}

      {/* 導覽列 */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-black/20 border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div 
            className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 cursor-pointer flex items-center gap-2"
            onClick={() => setActiveSection('home')}
          >
            <Moon className="text-purple-300" fill="currentColor" size={20}/>
            Soul Painter
          </div>

          {/* 手機版選單按鈕 */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
             {isMenuOpen ? <X /> : <Menu />}
          </button>

          {/* 電腦版選單 */}
          <div className="hidden md:flex gap-2">
            <NavButton id="home" icon={Sparkles} label="首頁" />
            <NavButton id="about" icon={Sun} label="關於女巫" />
            <NavButton id="assistant" icon={PawPrint} label="狗助理" />
            <NavButton id="services" icon={Palette} label="服務價目" />
          </div>
        </div>

        {/* 手機版下拉選單 */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#1a163a] border-b border-white/10 p-4 flex flex-col gap-2 shadow-2xl animate-fade-in-down">
            <NavButton id="home" icon={Sparkles} label="首頁" />
            <NavButton id="about" icon={Sun} label="關於女巫" />
            <NavButton id="assistant" icon={PawPrint} label="狗助理" />
            <NavButton id="services" icon={Palette} label="服務價目" />
          </div>
        )}
      </nav>

      {/* 主要內容區 */}
      <main className="relative z-10 pt-28 pb-20 min-h-screen">
        {renderContent()}
      </main>

      {/* 頁尾 */}
      <footer className="relative z-10 bg-black/40 border-t border-white/5 py-8 text-center text-gray-400 text-sm">
        <div className="flex justify-center gap-6 mb-4">
          <a href="#" className="hover:text-purple-300 transition-colors"><Instagram /></a>
          <a href="#" className="hover:text-blue-300 transition-colors"><Facebook /></a>
        </div>
        <p>© 2025 Soul Painter. All rights reserved.</p>
        <p className="mt-2 text-xs opacity-50">Designed with Star Energy & Love</p>
      </footer>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
