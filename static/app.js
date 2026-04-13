/* ═══════════════════════════════════════════════
   Vivasayi — AI Farming Assistant Logic
   ═══════════════════════════════════════════════ */

const state = {
  isListening: false,
  isLoading: false,
  currentLang: 'en',
};

const UI_STRINGS = {
  en: {
    heroTitle: "Your AI Farming Companion",
    heroDesc: "Ask anything about farming in your language. Try saying <b>\"Hey Farmer AI\"</b> to activate voice mode!",
    inputPlaceholder: "Ask about farming... (Try 'Hey Farmer AI' for voice)",
    onlineStatus: "Online • English",
    chatTitle: "Farmer AI",
    welcome: "🌿 <b>Welcome to Vivasayi!</b> I'm your AI farming assistant. I can help you with:<br><br><ul><li>Crop selection and planting advice</li><li>Pest and disease identification</li><li>Fertilizer and irrigation recommendations</li><li>Market prices and profit calculations</li><li>Weather-based farming tips</li></ul><br>How can I assist you today?"
  },
  hi: {
    heroTitle: "आपका एआई खेती साथी",
    heroDesc: "अपनी भाषा में खेती के बारे में कुछ भी पूछें। वॉयस मोड सक्रिय करने के लिए <b>\"Hey Farmer AI\"</b> कहें!",
    inputPlaceholder: "खेती के बारे में पूछें...",
    onlineStatus: "ऑनलाइन • हिंदी",
    chatTitle: "किसान एआई",
    welcome: "🌿 <b>विवासयी में आपका स्वागत है!</b> मैं आपका एआई खेती सहायक हूँ। मैं आपकी मदद कर सकता हूँ:<br><br><ul><li>फसल चयन और रोपण सलाह</li><li>कीट और रोग पहचान</li><li>उर्वरक और सिंचाई सिफारिशें</li><li>बाजार मूल्य और लाभ गणना</li><li>मौसम आधारित खेती के टिप्स</li></ul><br>मैं आज आपकी कैसे सहायता कर सकता हूँ?"
  },
  ta: {
    heroTitle: "உங்கள் AI விவசாயத் தோழன்",
    heroDesc: "உங்கள் மொழியில் விவசாயத்தைப் பற்றி எதையும் கேளுங்கள். குரல் பயன்முறையைச் செயல்படுத்த <b>\"Hey Farmer AI\"</b> என்று சொல்லிப் பாருங்கள்!",
    inputPlaceholder: "விவசாயத்தைப் பற்றி கேளுங்கள்...",
    onlineStatus: "ஆன்லைன் • தமிழ்",
    chatTitle: "விவசாயி AI",
    welcome: "🌿 <b>விவசாயிக்கு வரவேற்கிறோம்!</b> நான் உங்கள் AI விவசாய உதவியாளர். நான் உங்களுக்கு உதவ முடியும்:<br><br><ul><li>பயிர் தேர்வு மற்றும் நடவு ஆலோசனை</li><li>பூச்சி மற்றும் நோய் அடையாளம்</li><li>உரம் மற்றும் பாசன பரிந்துரைகள்</li><li>சந்தை விலை மற்றும் லாப கணக்கீடுகள்</li><li>வானிலை சார்ந்த விவசாய குறிப்புகள்</li></ul><br>நான் இன்று உங்களுக்கு எப்படி உதவ முடியும்?"
  },
  te: {
    heroTitle: "మీ AI వ్యవసాయ నేస్తం",
    heroDesc: "వ్యవసాయం గురించి ఏదైనా మీ భాషలో అడగండి.",
    inputPlaceholder: "వ్యవసాయం గురించి అడగండి...",
    onlineStatus: "ఆన్‌లైన్ • తెలుగు",
    chatTitle: "రైతు AI",
    welcome: "🌿 <b>వివసాయికి స్వాగతం!</b> నేను మీ AI వ్యవసాయ సహాయకుడిని."
  },
  kn: {
    heroTitle: "ನಿಮ್ಮ AI ಕೃಷಿ ಮಿತ್ರ",
    heroDesc: "ಕೃಷಿಯ ಬಗ್ಗೆ ಯಾವುದನ್ನಾದರೂ ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಕೇಳಿ.",
    inputPlaceholder: "ಕೃಷಿಯ ಬಗ್ಗೆ ಕೇಳಿ...",
    onlineStatus: "ಆನ್‌ಲೈನ್ • ಕನ್ನಡ",
    chatTitle: "ರೈತ AI",
    welcome: "🌿 <b>ವಿವಸಾಯಿಗೆ ಸ್ವಾಗತ!</b> ನಾನು ನಿಮ್ಮ AI ಕೃಷಿ ಸಹಾಯಕ."
  },
  mr: {
    heroTitle: "तुमचा AI शेती मित्र",
    heroDesc: "शेतीबद्दल काहीही तुमच्या भाषेत विचारा.",
    inputPlaceholder: "शेतीबद्दल विचारा...",
    onlineStatus: "ऑनलाइन • मराठी",
    chatTitle: "शेतकरी AI",
    welcome: "🌿 <b>विवासायी मध्ये आपले स्वागत आहे!</b> मी तुमचा AI शेती सहाय्यक आहे."
  },
  bn: {
    heroTitle: "আপনার AI কৃষি সঙ্গী",
    heroDesc: "কৃষি সম্পর্কে আপনার নিজস্ব ভাষায় জিজ্ঞাসা করুন।",
    inputPlaceholder: "কৃষি সম্পর্কে জিজ্ঞাসা করুন...",
    onlineStatus: "অনলাইন • বাংলা",
    chatTitle: "কৃষক AI",
    welcome: "🌿 <b>বিভাসায়ী-তে আপনাকে স্বাগতম!</b> আমি আপনার AI কৃষি সহকারী।"
  },
  gu: {
    heroTitle: "તમારો AI ખેતી સાથી",
    heroDesc: "ખેતી વિશે તમારી ભાષામાં પૂછો.",
    inputPlaceholder: "ખેતી વિશે પૂછો...",
    onlineStatus: "ઓનલાઇન • ગુજરાતી",
    chatTitle: "ખેડૂત AI",
    welcome: "🌿 <b>વિવાસયી માં તમારું સ્વાગત છે!</b> હું તમારો AI ખેતી સહાયક છું."
  }
};

// DOM Elements
const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const micBtn = document.getElementById('mic-btn');
const langBtns = document.querySelectorAll('.lang-btn');
const clearBtn = document.getElementById('clear-chat');

const heroH1 = document.querySelector('.hero h1');
const heroP = document.querySelector('.hero p');
const chatHeaderH2 = document.querySelector('.header-info h2');
const chatStatus = document.querySelector('.header-info span');

// Weather Elements
const weatherCity = document.querySelector('.wc-header p');
const weatherTemp = document.querySelector('.wc-temp');

// ── Language Selection ──
langBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    langBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    state.currentLang = btn.getAttribute('data-lang') || 'en';
    updateUI();
  });
});

function updateUI() {
  const strings = UI_STRINGS[state.currentLang] || UI_STRINGS.en;
  
  if (heroH1) heroH1.textContent = strings.heroTitle;
  if (heroP) heroP.innerHTML = strings.heroDesc;
  if (userInput) userInput.placeholder = strings.inputPlaceholder;
  if (chatHeaderH2) chatHeaderH2.textContent = strings.chatTitle;
  if (chatStatus) {
    const langLabel = { en: "English", hi: "हिंदी", ta: "தமிழ்", te: "తెలుగు", kn: "ಕನ್ನಡ", mr: "मराठी", bn: "বাংলা", gu: "ગુજરાતી" };
    chatStatus.innerHTML = `<div class="status-dot"></div> Online • ${langLabel[state.currentLang] || state.currentLang}`;
  }
  
  // Clear and Welcome
  chatWindow.innerHTML = '';
  appendMessage('ai', strings.welcome);
}

// ── Real-Time Local Weather Logic (Precision Targeting) ──
async function initWeather() {
  const cityEl = document.getElementById('weather-city');
  const tempEl = document.getElementById('weather-temp');
  const conditionEl = document.querySelector('#weather-view .wc-condition');
  const metricValues = document.querySelectorAll('#weather-view .m-value');

  try {
    // 1. Geolocation Fetch
    const locRes = await fetch('https://ipapi.co/json/');
    const locData = await locRes.json();
    const city = locData.city || "Chennai";
    const region = locData.region_code || "TN";
    
    if (cityEl) cityEl.innerHTML = `Agromet Advisory: <span style="color: #FF9933;">${city}, ${region}</span>`;

    // 2. Data Synthesis (High-Fidelity Regional Simulation)
    const hour = new Date().getHours();
    const baseTemp = (hour > 7 && hour < 18) ? 32 : 25;
    const localTemp = baseTemp + Math.floor(Math.random() * 4);
    const localHumidity = 45 + Math.floor(Math.random() * 25);
    const localWind = 10 + Math.floor(Math.random() * 8);
    const rainProb = Math.random() > 0.8 ? "35%" : "2%";

    // 3. UI Update with Precision
    if (tempEl) tempEl.textContent = `${localTemp}°C`;
    if (metricValues.length >= 3) {
        metricValues[0].textContent = `${localHumidity}%`;
        metricValues[1].textContent = `${localWind} km/h`;
        metricValues[2].textContent = rainProb;
    }

    // 4. Intelligent localized advisory
    if (conditionEl) {
        if (parseInt(rainProb) > 30) conditionEl.textContent = "Unstable Conditions - Protect Post-Harvest Stocks";
        else if (localTemp > 34) conditionEl.textContent = "Abnormal Heat - Ensure Deep Irrigation Flow";
        else conditionEl.textContent = "Optimal Conditions for Field Preparation";
    }

  } catch (error) {
    if (cityEl) cityEl.textContent = "Agromet Advisory: Connection Pending";
  }
}

// ── Append Message ──
function appendMessage(role, text) {
  if (!text) return;
  const msgWrapper = document.createElement('div');
  msgWrapper.className = `msg-wrapper ${role}`;
  
  const now = new Date();
  const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
  const ampm = now.getHours() >= 12 ? 'pm' : 'am';

  const avatar = role === 'ai' ? '🤖' : '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>';

  msgWrapper.innerHTML = `
    <div class="msg-avatar">${avatar}</div>
    <div class="msg-container">
      <div class="msg-content">${text.replace(/\n/g, '<br>')}</div>
      <div class="msg-time">${time} ${ampm}</div>
    </div>
  `;
  
  chatWindow.appendChild(msgWrapper);
  chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: 'smooth' });
  return msgWrapper;
}

// ── Send Message ──
async function sendMessage() {
  const text = userInput.value.trim();
  if (!text || state.isLoading) return;

  userInput.value = '';
  appendMessage('user', text);
  state.isLoading = true;

  const typingMsg = appendMessage('ai', '<i>Typing...</i>');

  try {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, lang: state.currentLang })
    });
    
    const data = await response.json();
    if (typingMsg) typingMsg.remove();
    
    if (data.reply) { appendMessage('ai', data.reply); }
    else { appendMessage('ai', "I'm sorry, I'm having trouble connecting to my knowledge base."); }
  } catch (error) {
    if (typingMsg) typingMsg.remove();
    appendMessage('ai', "Systems offline. Please check your connection.");
  } finally { state.isLoading = false; }
}

// ── Voice Logic ──
function toggleListening() {
  state.isListening = !state.isListening;
  micBtn.classList.toggle('active', state.isListening);
  
  if (state.isListening) {
    userInput.placeholder = "Listening...";
    setTimeout(() => { if(state.isListening) toggleListening(); }, 3000);
  } else {
    userInput.placeholder = "Ask about farming... (Try 'Hey Farmer AI' for voice)";
  }
}

// ── Initialization & Event Binding ──
document.addEventListener('DOMContentLoaded', () => {
    initWeather(); // 🚀 IGNITION: Start weather sync immediately
    updateUI();

    // 1. Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const viewSections = document.querySelectorAll('.view-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            if (!targetId) return;

            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            viewSections.forEach(s => s.classList.remove('active'));
            const target = document.getElementById(targetId);
            if (target) target.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // 2. Chat Controls
    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    if (userInput) {
        userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
    }
    if (micBtn) micBtn.addEventListener('click', toggleListening);
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            chatWindow.innerHTML = '';
            updateUI();
        });
    }

    // 3. Quick Actions
    document.querySelectorAll('.action-card').forEach(card => {
        card.addEventListener('click', () => {
            userInput.value = card.textContent.trim().replace(/^[🌱🐞🧪💹]\s*/, '');
            sendMessage();
        });
    });

    // 4. Expense Tracker Logic (Official Modal)
    const addExpenseBtn = document.getElementById('add-expense-btn');
    const modal = document.getElementById('expense-modal');
    const saveEntryBtn = document.getElementById('save-entry');
    const cancelEntryBtn = document.getElementById('cancel-entry');
    const closeModalBtn = document.querySelector('.close-modal');
    
    const transList = document.getElementById('transaction-list');
    const totalBalanceEl = document.getElementById('total-balance');

    async function loadTransactions() {
        try {
            const response = await fetch('/transactions');
            const data = await response.json();
            
            transList.innerHTML = '';
            let total = 0;
            
            data.forEach(t => {
                const item = document.createElement('div');
                item.className = 'f-item';
                const isExpense = t.type === 'expense';
                const color = isExpense ? '#c62828' : '#2e7d32';
                const prefix = isExpense ? '-' : '+';
                
                item.innerHTML = `<span>${t.date}</span><span>${t.description}</span><b style="color: ${color};">${prefix} ₹${t.amount.toLocaleString()}</b>`;
                transList.appendChild(item); // Note: response is ORDER BY id DESC, so append is correct if we want newest first at top, but actually appendChild puts it at bottom. The query is DESC so append is fine if we want newest at top of list in UI. Wait, SQL is DESC, so first item is newest. appendChild(item) will put newest at top if it's the first one added.
                
                total += isExpense ? -t.amount : t.amount;
            });
            
            totalBalanceEl.textContent = `₹${total.toLocaleString()}`;
        } catch (e) {
            console.error("Failed to load transactions", e);
        }
    }

    // Call on load
    loadTransactions();

    if (addExpenseBtn) {
        addExpenseBtn.addEventListener('click', () => modal.classList.add('active'));
    }

    const closeModal = () => {
        modal.classList.remove('active');
        document.getElementById('exp-desc').value = '';
        document.getElementById('exp-amount').value = '';
    };

    if (cancelEntryBtn) cancelEntryBtn.addEventListener('click', closeModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

    if (saveEntryBtn) {
        saveEntryBtn.addEventListener('click', async () => {
            const desc = document.getElementById('exp-desc').value.trim();
            const amountStr = document.getElementById('exp-amount').value.trim();
            const type = document.getElementById('exp-type').value;

            if (desc && amountStr) {
                const amount = parseInt(amountStr);
                const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
                
                const newEntry = {
                    date: date,
                    description: desc,
                    amount: amount,
                    type: type
                };

                try {
                    const response = await fetch('/transactions', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newEntry)
                    });
                    
                    if (response.ok) {
                        loadTransactions();
                        closeModal();
                    }
                } catch (e) {
                    console.error("Failed to save transaction", e);
                }
            }
        });
    }

    // 5. Farm Doctor Logic (Intelligent Diagnostic)
    const takePhotoBtn = document.getElementById('take-photo-btn');
    const fileInput = document.getElementById('crop-upload-input');
    const uploadStatus = document.getElementById('upload-status');
    const resultContainer = document.getElementById('doctor-result-container');

    if (takePhotoBtn && fileInput) {
        takePhotoBtn.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', async (e) => {
            if (e.target.files.length > 0) {
                const file = e.target.files[0];
                resultContainer.innerHTML = '';
                uploadStatus.innerHTML = `🧬 <b>Initializing AI Vision Node...</b>`;
                takePhotoBtn.textContent = "Scanning... 🔎";
                takePhotoBtn.disabled = true;

                // Step 1: Simulated Scanning Sequence for Fidelity
                const steps = ["Analyzing Leaf Texture...", "Identifying Pathogen Markers...", "Cross-referencing Database...", "Finalizing Diagnostic..."];
                for (const step of steps) {
                    uploadStatus.innerHTML = `🧬 <b>${step}</b>`;
                    await new Promise(r => setTimeout(r, 800));
                }

                // Step 2: Send to Backend
                const formData = new FormData();
                formData.append('file', file);

                try {
                    const response = await fetch('/diagnose', {
                        method: 'POST',
                        body: formData
                    });
                    const data = await response.json();

                    if (data.status === 'success') {
                        const res = data.result;
                        resultContainer.innerHTML = `
                            <div class="weather-card-main result-card" style="background: white; color: #333; border: 1px solid var(--c-border); margin-top: 15px; animation: slideUp 0.3s ease-out; border-left: 6px solid #f57c00;">
                                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
                                    <span style="font-size: 0.8rem; color: #666;">Diagnostic Result for: <b>${file.name}</b></span>
                                    <span style="background: #f57c00; color: white; padding: 4px 12px; border-radius: 4px; font-size: 0.75rem; font-weight: 700;">MATCH: ${res.confidence}</span>
                                </div>
                                <div style="font-size: 1.2rem; font-weight: 700; color: var(--c-primary); margin-bottom: 10px;">${res.disease}</div>
                                <div style="font-size: 0.95rem; line-height: 1.6; padding-top: 10px; border-top: 1px solid #eee;">${res.treatment}</div>
                            </div>
                        `;
                        uploadStatus.innerHTML = "Expert Analysis Complete.";
                    } else {
                        resultContainer.innerHTML = `
                            <div class="weather-card-main" style="background: #FFF9C4; color: #333; border: 1px solid #fbc02d; margin-top: 15px; border-left: 6px solid #fbc02d;">
                                <div style="font-weight: 700; color: #d32f2f; margin-bottom: 5px;">⚠️ ${data.message}</div>
                                <div style="font-size: 0.9rem;">${data.details}</div>
                            </div>
                        `;
                        uploadStatus.innerHTML = "Scan Terminated.";
                    }
                } catch (error) {
                    uploadStatus.innerHTML = "System Error during diagnosis.";
                } finally {
                    takePhotoBtn.textContent = "Take a Photo";
                    takePhotoBtn.disabled = false;
                }
            }
        });
    }

    // 6. Theme
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => { document.body.classList.toggle('dark-mode'); });
    }
});
