# Deployment Guide

Quick guide to deploy both tools for your Goldbridge internship application.

## 🚀 Quick Deploy

### Security Deposit Compliance Dashboard

**Deploy to Vercel (Recommended - Free):**

```bash
cd security-deposit-checker

# Install dependencies
npm install

# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

**Alternative: Deploy to Netlify:**

```bash
cd security-deposit-checker
npm install
npm run build

# Drag and drop the '.next' or 'out' folder to netlify.com
```

---

### Vendor Deal Aggregator

**Deploy to Render (Recommended - Free):**

1. Push your code to GitHub
2. Go to [render.com](https://render.com)
3. Create a new "Web Service"
4. Connect your GitHub repo
5. Configure:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python app.py`
   - **Environment**: Python 3.11
   - **Root Directory**: `vendor-deal-monitor`

**Alternative: Deploy to Railway:**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
cd vendor-deal-monitor
railway up
```

---

## 📧 Cold Email Template

```
Subject: Built 2 Demo Tools for Goldbridge | SWE Intern Application

Hi [Name / Goldbridge Team],

I'm excited about Goldbridge's mission to optimize real estate financial operations. After researching your platform, I built two demo tools aligned with your product vision:

1. Security Deposit Compliance Dashboard
   • Multi-state law checker + automated checklists
   • Live Demo: [your-vercel-link]

2. Vendor Deal Aggregator
   • Tracks Home Depot, Lowe's, Grainger deals
   • ROI calculator with Goldbridge's 5% cashback integration
   • Live Demo: [your-render-link]

GitHub: [your-repo-link]

These demonstrate my full-stack skills (React/Next.js, Python/Flask) and understanding of property owner pain points. I'd love to discuss contributing to Goldbridge's growth.

Are you available for a brief call?

Best,
[Your Name]
[LinkedIn] | [Email] | [Portfolio]
```

---

## 🎥 Demo Video Script (30-60 seconds)

**Security Deposit Checker:**
1. "This tool helps property owners stay compliant with security deposit laws"
2. Select California → Show requirements
3. "Auto-generated compliance checklist with all state requirements"

**Vendor Deal Monitor:**
1. "Aggregates deals from major property supply vendors"
2. Filter by category → Show plumbing deals
3. "ROI calculator shows total savings including Goldbridge's 5% cashback"

Record with [Loom](https://loom.com) - it's free!

---

## 🔧 Pre-Deployment Checklist

### For Security Deposit Checker:
- [ ] Run `npm install` successfully
- [ ] Test locally with `npm run dev`
- [ ] Build works: `npm run build`
- [ ] No TypeScript errors
- [ ] All states display correctly

### For Vendor Deal Monitor:
- [ ] Create virtual environment: `python -m venv venv`
- [ ] Install dependencies: `pip install -r requirements.txt`
- [ ] Test locally: `python app.py`
- [ ] Visit http://localhost:5000 - all deals show
- [ ] API endpoints work (try /api/deals)

### For GitHub:
- [ ] Create new public repository
- [ ] Add both projects
- [ ] Write good commit messages
- [ ] Add screenshots to READMEs
- [ ] Check all links work

---

## 📸 Screenshots to Include

Take screenshots of:
1. **Security Deposit Checker**: State selected with full compliance details
2. **Vendor Deal Monitor**: Deals grid showing all three vendors
3. **ROI Calculation**: Highlighting Goldbridge cashback

Add to your repo and READMEs!

---

## 💡 Pro Tips

1. **Deploy on Tuesday-Thursday morning**: Best response rates
2. **Keep email under 120 words**: Busy founders appreciate brevity
3. **Include live links**: Don't make them clone and run locally
4. **Add "View on GitHub" buttons**: In your deployed apps
5. **Follow up after 5-7 days**: If no response
6. **Personalize**: Mention a specific Goldbridge feature you researched

---

## 🚨 Common Issues & Fixes

**Next.js Build Fails:**
```bash
rm -rf .next node_modules
npm install
npm run build
```

**Python Import Errors:**
```bash
# Make sure you're in the venv
source venv/bin/activate  # Mac/Linux
# or
venv\Scripts\activate  # Windows

pip install -r requirements.txt
```

**Vercel Deployment Issues:**
- Make sure `package.json` is in the project root
- Check Node version in Vercel settings (use 18 or 20)

**Render Deployment Issues:**
- Set correct root directory in Render dashboard
- Check Python version (use 3.11)
- Verify `requirements.txt` is in the correct location

---

Good luck! You've got this 🚀
