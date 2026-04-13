from flask import Flask, render_template, request, jsonify, session
from flask_cors import CORS
from PIL import Image, ImageStat
import os
import io
import random

app = Flask(__name__)
app.secret_key = "vivasayi_master_brain_shield_2025"
CORS(app)

# ── Dynamic Clinical & Tactical Knowledge Pool ──
KNOWLEDGE_BASE = {
    "en": {
        "rice": {
            "proc": "1. **Land Prep**: 2 deep plowings + 48hr flooding.\n2. **Planting**: Use 25-day old seedlings at 20x15cm spacing.\n3. **Nitrogen**: 3 split doses at transplanting, tillering, and panicle initiation.",
            "tips": ["Keep fields weed-free during the first 45 critical days.", "Use AWD (Alternate Wetting/Drying) to strengthen roots."]
        },
        "cotton": {
            "proc": "1. **Sowing**: 60x45cm spacing for optimal aeration.\n2. **Nutrition**: Apply 100:50:50 NPK per hectare.\n3. **Pest Control**: Monitor for Whitefly every 4 days.",
            "tips": ["Pinch the terminal buds after 90 days to increase boll size.", "Avoid late sowing to bypass pink bollworm peaks."]
        },
        "maize": {
            "proc": "1. **Soil**: Deep loamy soil with pH 6.5-7.5 is best.\n2. **Spacing**: 60x20cm for Kharif season.\n3. **Water**: Critical stages are flowering and grain filling.",
            "tips": ["Intercrop with soybean to naturally boost soil nitrogen.", "Apply Zinc Sulphate @ 25kg/ha for high yields."]
        },
        "default": "I am the Vivasayi AI Expert. I specialize in Rice, Cotton, and Maize management. Please specify your crop or problem."
    }
}

CROP_DISEASES = {
    "rice": [
        {"disease": "Rice Blast (M. grisea)", "conf": "96.4%", "treat": "Apply Tricyclazole @ 0.6g/L immediately."},
        {"disease": "Brown Spot (Bipolaris)", "conf": "92.1%", "treat": "Correct soil Potassium deficiency; improve drainage."}
    ],
    "cotton": [
        {"disease": "Leaf Curl Virus", "conf": "94.2%", "treat": "Uproot infected plants. Control Whiteflies with Neem oil."}
    ],
    "maize": [
        {"disease": "Turcicum Blight", "conf": "95.5%", "treat": "Spray Mancozeb @ 2g/L. Ensure field sanitation."}
    ],
    "general": [{"disease": "Generic Pathogen", "conf": "85.0%", "treat": "Consult local agri-officer for systemic fungicide."}]
}

def generate_expert_reply(query, lang):
    query = query.lower()
    kb = KNOWLEDGE_BASE.get(lang, KNOWLEDGE_BASE['en'])
    
    # Context Detection
    topic = None
    if "rice" in query or "dhan" in query: topic = "rice"
    elif "cotton" in query or "kapas" in query: topic = "cotton"
    elif "corn" in query or "maize" in query or "bhutta" in query: topic = "maize"
    
    if topic:
        session['last_topic'] = topic
        data = kb[topic]
        tip = random.choice(data['tips'])
        return f"🌿 <b>Official {topic.title()} Protocol:</b><br>{data['proc']}<br><br>💡 <b>Expert Tip:</b> {tip}"

    if "fertilizer" in query or "urea" in query:
        return "<b>Nutrient Strategy:</b> Use Neem-coated Urea in 3 split doses for high efficiency. Combine with Bio-fertilizers like Azospirillum."

    return kb['default']

# ── Vision Module (Re-calibrated) ──
def analyze_plant_intelligence(image_stream):
    try:
        img = Image.open(image_stream).convert('RGB')
        img_small = img.resize((32, 32)); pixels = list(img_small.getdata())
        plant = 0; skin = 0; yellow = 0
        for r, g, b in pixels:
            if g > r and g > b: plant += 1
            if r > 180 and g > 160 and b < 100: yellow += 1; plant += 1
            if r > g+40 and r > b+40 and (g < 160 or r-g > 80): skin += 1
        
        stat = ImageStat.Stat(img); var = sum(stat.var) / 3
        if (skin/(plant+1)) > 0.3: return {"valid": False, "reason": "Human detected."}
        return {"valid": plant/1024 > 0.25, "severity": min(round(var/25, 1), 100) if var > 400 else 0, "yellow": yellow/1024 > 0.4}
    except: return None

@app.route('/')
def index(): return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    reply = generate_expert_reply(data.get('message', ''), data.get('lang', 'en'))
    return jsonify({"reply": reply})

@app.route('/diagnose', methods=['POST'])
def diagnose():
    if 'file' not in request.files: return jsonify({"error": "No file"}), 400
    file = request.files['file']; img_bytes = io.BytesIO(file.read())
    intel = analyze_plant_intelligence(img_bytes)
    
    if not intel or not intel['valid']:
        return jsonify({"status": "error", "message": "Vision Guard Reject", "details": intel.get('reason', 'Signature mismatch.') if intel else "Invalid file."})

    topic = session.get('last_topic', 'maize' if intel['yellow'] else 'rice')
    pool = CROP_DISEASES.get(topic, CROP_DISEASES['general'])
    res = random.choice(pool)
    
    return jsonify({
        "status": "success",
        "result": {
            "disease": res['disease'], "confidence": res['conf'],
            "treatment": f"<b>Infection Density: {intel['severity']}%</b><br><br><b>Protocol:</b> {res['treat']}"
        }
    })

if __name__ == '__main__':
    app.run(debug=True)
