const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// --- DATABASE (The "Independent" Knowledge Base) ---
const TRUTH_DB = {
    "cancel": {
        isMisinfo: true,
        title: "False Claim Detected: Election Cancellation",
        fact: "One Nation One Election synchronizes schedules but DOES NOT cancel existing state assemblies prematurely. (Source: ECI Art. 172)",
        source: "Constitution of India"
    },
    "evm": {
        isMisinfo: true,
        title: "False Claim Detected: EVM Hacking",
        fact: "EVMs are standalone machines with no wireless connectivity. Remote hacking is technically impossible.",
        source: "ECI Technical Expert Committee"
    },
    "date": {
        isMisinfo: false,
        title: "Verified Information",
        fact: "The election schedule matches the official notification released by the Election Commission.",
        source: "Press Information Bureau (PIB)"
    }
};

// --- STATE MANAGEMENT (VEER & PARAKH) ---
let stats = { queries: 14050, blocked: 4200, pending: 5 };
let queue = [
    { id: 1, text: "Breaking: Supreme Court stays all election rallies indefinitely due to new virus strain...", severity: "HIGH", time: "2m ago" },
    { id: 2, text: "VVPAT slips matching fails in 20% booths across Uttar Pradesh...", severity: "MED", time: "12m ago" },
    { id: 3, text: "Election Commission advances polling date by 2 weeks in Maharashtra...", severity: "LOW", time: "45m ago" }
];

// --- ROUTES ---

// 1. VEER: Report Stats
app.get('/api/stats', (req, res) => res.json(stats));

// 2. PARAKH: Get Review Queue
app.get('/api/queue', (req, res) => res.json(queue));

// 3. PARAKH: Resolve Queue Item (Human Action)
app.post('/api/queue/:id/resolve', (req, res) => {
    const { id } = req.params;
    queue = queue.filter(item => item.id != id);
    if(req.body.action === 'approve') stats.blocked++;
    stats.pending--;
    res.json({ success: true });
});

// 4. VARTA: Citizen Verification Chatbot
app.post('/api/verify', (req, res) => {
    const { query } = req.body;
    const lower = query.toLowerCase();
    
    setTimeout(() => {
        stats.queries++;
        if (lower.includes("cancel") || lower.includes("stop")) return res.json(TRUTH_DB.cancel);
        if (lower.includes("hack") || lower.includes("evm")) return res.json(TRUTH_DB.evm);
        if (lower.includes("date") || lower.includes("when")) return res.json(TRUTH_DB.date);
        
        // Default safe response
        res.json({
            isMisinfo: false,
            title: "Context Missing",
            fact: "Please provide more specific details or a link for verification.",
            source: "S.A.M.V.A.D Automated System"
        });
    }, 1000); // 1s delay for realism
});

app.listen(5000, () => console.log("S.A.M.V.A.D Engine running on port 5000"));