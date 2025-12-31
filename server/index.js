'use strict';

const express = require('express');
const cors = require('cors');

console.log('🚀 index.js loaded');

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   SAFE ERROR LOGGING (DEV)
========================= */
process.on('uncaughtException', (err) => {
    console.error('❌ UNCAUGHT EXCEPTION:', err);
    // DO NOT EXIT in development
});

process.on('unhandledRejection', (reason) => {
    console.error('❌ UNHANDLED PROMISE REJECTION:', reason);
    // DO NOT EXIT in development
});

/* =========================
   DATA
========================= */
const TRUTH_DB = {
    cancel: {
        isMisinfo: true,
        title: "False Claim: Elections Cancelled",
        fact: "ONOE synchronizes schedules but DOES NOT cancel any existing state assembly prematurely. Tenure will be completed as per Article 172.",
        source: "Constitution of India (Art. 172)"
    },
    cost: {
        isMisinfo: true,
        title: "False Claim: ONOE is Expensive",
        fact: "The Law Commission report states ONOE will save the exchequer ₹4,500 Crores per cycle.",
        source: "Law Commission Report 2024"
    },
    evm: {
        isMisinfo: true,
        title: "False Claim: EVM Hacking",
        fact: "EVMs are standalone machines with no wireless connectivity.",
        source: "ECI Technical Expert Committee"
    },
    gps: {
        isMisinfo: true,
        title: "False Claim: GPS in EVMs",
        fact: "There is no GPS chip inside EVMs or VVPAT slips.",
        source: "PIB Fact Check Unit"
    },
    bluetooth: {
        isMisinfo: true,
        title: "False Claim: Bluetooth in EVM",
        fact: "EVMs do not contain Bluetooth modules.",
        source: "ECI Manual 2024"
    },
    nri: {
        isMisinfo: true,
        title: "False Claim: Online Voting for NRIs",
        fact: "NRIs cannot vote online.",
        source: "Representation of People Act, 1950"
    },
    ink: {
        isMisinfo: true,
        title: "False Claim: Erasable Ink",
        fact: "Indelible ink cannot be erased.",
        source: "Mysore Paints & Varnish Ltd"
    },
    aadhaar: {
        isMisinfo: false,
        title: "Clarification: Aadhaar Linking",
        fact: "Aadhaar linking is voluntary.",
        source: "ECI Notification"
    },
    delete: {
        isMisinfo: true,
        title: "False Claim: Mass Voter Deletion",
        fact: "Voter lists cannot be mass-deleted without due process.",
        source: "ECI Handbook for EROs"
    },
    default: {
        isMisinfo: false,
        title: "Context Required",
        fact: "Refer to eci.gov.in for official information.",
        source: "S.A.M.V.A.D System"
    }
};

let queue = [
    { 
        id: 101, 
        text: "Supreme Court stays all election rallies nationwide", 
        severity: "HIGH", 
        time: "5m ago",
        narrativeCount: 47,
        narrativeType: "Election Process Disruption",
        fullReport: {
            claim: "Supreme Court has stayed all election rallies nationwide due to COVID-19 concerns and law & order issues",
            source: "WhatsApp Forward + Facebook Groups",
            detectedAt: "2025-12-31T17:55:00Z",
            reach: "~50,000 users",
            platform: "WhatsApp, Facebook",
            aiConfidence: 98,
            reasoning: "No official SC order found. ECI has not issued any such notification. Official ECI website shows no rally restrictions. Supreme Court docket shows no such case filed.",
            recommendedAction: "Publish fact-check correction immediately",
            relatedLinks: ["https://eci.gov.in", "https://pib.gov.in", "https://sci.gov.in/cause-list"],
            proposedPublication: {
                title: "FACT-CHECK: No Supreme Court Order Staying Election Rallies",
                content: "A viral message claiming that the Supreme Court has stayed all election rallies nationwide is FALSE. The Election Commission of India has confirmed that no such order exists. Political rallies are proceeding as per the Model Code of Conduct guidelines. Citizens are advised to verify information from official ECI sources before sharing.",
                channels: ["ECI Website", "PIB Fact-Check", "Social Media Accounts"],
                expectedReach: "200,000+ users"
            }
        }
    },
    { 
        id: 102, 
        text: "Leaked video shows EVM vote tampering in polling booth", 
        severity: "HIGH", 
        time: "12m ago",
        narrativeCount: 89,
        narrativeType: "EVM Tampering",
        fullReport: {
            claim: "Leaked video shows EVM recording votes for Party A when voter presses Party B button during actual polling",
            source: "Twitter @ElectionWatch2025, Instagram Reels",
            detectedAt: "2025-12-31T17:48:00Z",
            reach: "~250,000 views",
            platform: "Twitter, Instagram, WhatsApp",
            aiConfidence: 97,
            reasoning: "Video is from 2019 Karnataka voter awareness drive, already debunked by PIB. The EVM shown is a demo unit (marked with red 'DEMO' sticker). Presiding officers confirmed it was part of educational campaign. Original debunk link attached.",
            recommendedAction: "Issue urgent multi-platform clarification with video comparison",
            relatedLinks: ["https://factcheck.pib.gov.in/evm-2019", "https://eci.gov.in/evm-demo"],
            proposedPublication: {
                title: "VIRAL VIDEO MISLEADING: Old Demo EVM Footage Shared as Recent Tampering",
                content: "A 2019 video from a voter awareness camp showing a demonstration EVM is being falsely circulated as evidence of vote tampering. The ECI confirms: 1) EVMs used in actual polling have NO internet connectivity, 2) This video shows a DEMO unit clearly marked for training, 3) The incident was debunked in 2019 itself. Please report such content.",
                channels: ["Twitter Threads", "Instagram Stories", "YouTube Shorts", "ECI Portal"],
                expectedReach: "500,000+ users"
            }
        }
    },
    { 
        id: 103, 
        text: "₹5000 fine mandatory for citizens who don't vote", 
        severity: "HIGH", 
        time: "28m ago",
        narrativeCount: 156,
        narrativeType: "Voter Rights Misinformation",
        fullReport: {
            claim: "Government has passed new law introducing ₹5000 fine for all citizens who don't cast their vote in elections",
            source: "Facebook Posts, WhatsApp Forwards, YouTube Videos",
            detectedAt: "2025-12-31T17:32:00Z",
            reach: "~180,000 shares",
            platform: "Facebook, WhatsApp, YouTube",
            aiConfidence: 96,
            reasoning: "No such law exists in India. Voting is a constitutional RIGHT, not a legal duty. Article 326 guarantees adult suffrage without compulsion. No bill has been introduced in Parliament regarding compulsory voting. This narrative appears to stem from misunderstanding of Australian system.",
            recommendedAction: "Large-scale educational campaign about voting rights",
            relatedLinks: ["https://eci.gov.in/voter-rights", "https://legislative.gov.in"],
            proposedPublication: {
                title: "CLARIFICATION: Voting is Your Right, Not Legal Obligation - No Fine for Not Voting",
                content: "Viral posts claiming a ₹5000 fine for not voting are COMPLETELY FALSE. The Election Commission clarifies: 1) Voting in India is a RIGHT under Article 326, not a duty, 2) No law mandates compulsory voting, 3) You cannot be fined or penalized for choosing not to vote, 4) Citizens are encouraged but not legally required to vote. Exercise your right freely!",
                channels: ["ECI Website Banner", "SMS Campaign", "Radio Spots", "Social Media"],
                expectedReach: "1,000,000+ users"
            }
        }
    },
    { 
        id: 104, 
        text: "ECI allowing online voting for NRIs through new portal", 
        severity: "MED", 
        time: "1h ago",
        narrativeCount: 34,
        narrativeType: "Voting Process Confusion",
        fullReport: {
            claim: "Election Commission has launched new online voting portal allowing NRIs to vote from anywhere in the world via mobile app",
            source: "Facebook Groups, Twitter",
            detectedAt: "2025-12-31T17:00:00Z",
            reach: "~45,000 users",
            platform: "Facebook, Twitter",
            aiConfidence: 94,
            reasoning: "NRIs cannot vote online. Representation of People Act 1950 requires physical presence at polling station. ECI has no plans for online voting. Only postal ballots available for armed forces, not NRIs.",
            recommendedAction: "Clarify actual NRI voting rules and procedures",
            relatedLinks: ["https://eci.gov.in/nri-voting"],
            proposedPublication: {
                title: "NRI Voting Rules: No Online Voting Available - Physical Presence Required",
                content: "Claims about online voting for NRIs are FALSE. Current rules: 1) NRIs must be physically present in their constituency to vote, 2) No postal ballot facility for NRIs, 3) No online/internet voting exists in India, 4) NRI voters need to register and travel to India. The ECI is exploring options but no implementation yet.",
                channels: ["ECI NRI Section", "Embassy Communications", "Social Media"],
                expectedReach: "100,000+ users"
            }
        }
    },
    { 
        id: 105, 
        text: "Bluetooth devices found hidden inside EVMs in warehouse raid", 
        severity: "HIGH", 
        time: "2h ago",
        narrativeCount: 203,
        narrativeType: "EVM Tampering",
        fullReport: {
            claim: "Police raid discovers Bluetooth modules hidden inside EVMs stored in government warehouse before elections",
            source: "Viral Video on YouTube, Facebook Shares",
            detectedAt: "2025-12-31T16:00:00Z",
            reach: "~320,000 views",
            platform: "YouTube, Facebook, WhatsApp",
            aiConfidence: 99,
            reasoning: "Completely fabricated claim. EVMs are standalone machines with NO wireless capability. ECI technical specs confirm no Bluetooth/WiFi hardware. Video shows unrelated electronic devices. ECI warehouse has 24/7 surveillance with no such incident reported.",
            recommendedAction: "Strong rebuttal with technical EVM specifications",
            relatedLinks: ["https://eci.gov.in/evm-technical", "https://pib.gov.in"],
            proposedPublication: {
                title: "FAKE NEWS ALERT: No Bluetooth in EVMs - Technical Impossibility",
                content: "Viral claims about Bluetooth in EVMs are TECHNICALLY IMPOSSIBLE. Facts: 1) EVMs have NO wireless components - physically impossible to add Bluetooth, 2) Machines are standalone with no connectivity, 3) Every EVM is checked by candidates' agents before polling, 4) No such warehouse incident occurred. Legal action initiated against misinformation spreaders.",
                channels: ["Press Conference", "Technical Document Release", "Multi-platform Campaign"],
                expectedReach: "800,000+ users"
            }
        }
    }
];

let resolvedIssues = [];

let stats = { queries: 24592, blocked: 8204, pending: queue.length };

// Regional threat data for heatmap
const regionalData = [
    { state: "Uttar Pradesh", lat: 26.8467, lng: 80.9462, threats: 342, severity: "HIGH" },
    { state: "Maharashtra", lat: 19.7515, lng: 75.7139, threats: 287, severity: "HIGH" },
    { state: "Bihar", lat: 25.0961, lng: 85.3131, threats: 198, severity: "MED" },
    { state: "West Bengal", lat: 22.9868, lng: 87.8550, threats: 156, severity: "MED" },
    { state: "Tamil Nadu", lat: 11.1271, lng: 78.6569, threats: 134, severity: "MED" },
    { state: "Karnataka", lat: 15.3173, lng: 75.7139, threats: 98, severity: "LOW" },
    { state: "Gujarat", lat: 22.2587, lng: 71.1924, threats: 87, severity: "LOW" },
    { state: "Rajasthan", lat: 27.0238, lng: 74.2179, threats: 76, severity: "LOW" }
];

// Time-series data for charts
const generateTimeSeriesData = () => {
    const now = new Date();
    const hourlyData = [];
    for (let i = 23; i >= 0; i--) {
        const time = new Date(now - i * 60 * 60 * 1000);
        hourlyData.push({
            time: time.toISOString(),
            label: `${time.getHours()}:00`,
            threats: Math.floor(Math.random() * 50) + 20,
            blocked: Math.floor(Math.random() * 30) + 10
        });
    }

    const dailyData = [];
    for (let i = 29; i >= 0; i--) {
        const date = new Date(now - i * 24 * 60 * 60 * 1000);
        dailyData.push({
            time: date.toISOString(),
            label: `${date.getDate()}/${date.getMonth() + 1}`,
            threats: Math.floor(Math.random() * 400) + 200,
            blocked: Math.floor(Math.random() * 250) + 100
        });
    }

    const monthlyData = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (let i = 11; i >= 0; i--) {
        const month = (now.getMonth() - i + 12) % 12;
        monthlyData.push({
            time: `2025-${String(month + 1).padStart(2, '0')}`,
            label: months[month],
            threats: Math.floor(Math.random() * 8000) + 4000,
            blocked: Math.floor(Math.random() * 5000) + 2000
        });
    }

    return { hourly: hourlyData, daily: dailyData, monthly: monthlyData };
};

// Malicious tweets data
const maliciousTweets = [
    {
        id: 't_001',
        author: '@MisInfoSpread',
        authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
        content: 'BREAKING: EVMs found with pre-loaded votes in warehouse! Election Commission hiding the truth! #EVMFraud #SaveDemocracy',
        timestamp: '2h ago',
        likes: 1243,
        retweets: 892,
        platform: 'twitter',
        severity: 'HIGH',
        verified: false,
        detectedIssue: 'False claim about EVM tampering',
        samvadResponse: {
            replied: true,
            reposted: true,
            repliedAt: '1h 45m ago',
            repostedAt: '1h 50m ago',
            officialAccount: '@ECI_FactCheck',
            replyEngagement: { likes: 3421, retweets: 2156 },
            repostEngagement: { likes: 5678, retweets: 3892 }
        }
    },
    {
        id: 't_002',
        author: '@FakeNewsDaily',
        authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user2',
        content: 'Government planning to cancel elections in 5 states. Inside sources confirm. Share before deleted! 🚨',
        timestamp: '4h ago',
        likes: 2891,
        retweets: 1567,
        platform: 'twitter',
        severity: 'HIGH',
        verified: false,
        detectedIssue: 'Misinformation about election cancellation',
        samvadResponse: {
            replied: true,
            reposted: true,
            repliedAt: '3h 30m ago',
            repostedAt: '3h 35m ago',
            officialAccount: '@PIB_FactCheck',
            replyEngagement: { likes: 8234, retweets: 5421 },
            repostEngagement: { likes: 12456, retweets: 8903 }
        }
    },
    {
        id: 't_003',
        author: '@ConfusedVoter',
        authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user3',
        content: 'My friend said you need Aadhaar to vote now? Is this true? Getting worried... #VoterID',
        timestamp: '6h ago',
        likes: 234,
        retweets: 89,
        platform: 'twitter',
        severity: 'MED',
        verified: false,
        detectedIssue: 'Confusion about Aadhaar linking requirement',
        samvadResponse: {
            replied: true,
            reposted: false,
            repliedAt: '5h 40m ago',
            officialAccount: '@ECI_FactCheck',
            replyEngagement: { likes: 892, retweets: 234 }
        }
    },
    {
        id: 't_004',
        author: '@PropagandaBot',
        authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user4',
        content: 'ONOE will cost 1 lakh crore to taxpayers! Law Commission report is fake! #ONOEScam',
        timestamp: '8h ago',
        likes: 567,
        retweets: 234,
        platform: 'twitter',
        severity: 'MED',
        verified: false,
        detectedIssue: 'False cost estimates for ONOE',
        samvadResponse: {
            replied: true,
            reposted: true,
            repliedAt: '7h 20m ago',
            repostedAt: '7h 25m ago',
            officialAccount: '@PIB_FactCheck',
            replyEngagement: { likes: 1567, retweets: 892 },
            repostEngagement: { likes: 2341, retweets: 1456 }
        }
    },
    {
        id: 't_005',
        author: '@ViralRumors',
        authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user5',
        content: 'NRIs can now vote online through new ECI portal! Finally convenience for overseas Indians! 🙌',
        timestamp: '10h ago',
        likes: 891,
        retweets: 456,
        platform: 'twitter',
        severity: 'MED',
        verified: false,
        detectedIssue: 'False claim about online voting for NRIs',
        samvadResponse: {
            replied: true,
            reposted: false,
            repliedAt: '9h 15m ago',
            officialAccount: '@ECI_FactCheck',
            replyEngagement: { likes: 1234, retweets: 567 }
        }
    }
];

/* =========================
   ROUTES
========================= */
app.get('/api/queue', (req, res) => {
    res.json(queue);
});

app.get('/api/resolved', (req, res) => {
    res.json(resolvedIssues);
});

app.post('/api/resolved/:id/revert', (req, res) => {
    const id = Number(req.params.id);
    const issue = resolvedIssues.find(item => item.id === id);
    
    if (issue) {
        // Remove from resolved
        resolvedIssues = resolvedIssues.filter(item => item.id !== id);
        
        // Remove resolution data and add back to queue
        delete issue.resolvedAt;
        delete issue.resolvedAction;
        delete issue.resolvedBy;
        
        queue.push(issue);
        stats.pending = queue.length;
        
        res.json({ success: true, stats });
    } else {
        res.status(404).json({ error: 'Issue not found' });
    }
});

app.get('/api/stats/timeseries', (req, res) => {
    const scale = req.query.scale || 'daily'; // hourly, daily, monthly
    const data = generateTimeSeriesData();
    res.json(data[scale] || data.daily);
});

app.get('/api/stats/regional', (req, res) => {
    res.json(regionalData);
});

app.get('/api/tweets', (req, res) => {
    const severity = req.query.severity; // HIGH, MED, LOW
    let filtered = maliciousTweets;
    
    if (severity) {
        filtered = maliciousTweets.filter(t => t.severity === severity.toUpperCase());
    }
    
    res.json(filtered);
});

app.post('/api/queue/:id/resolve', (req, res) => {
    const id = Number(req.params.id);
    const { action } = req.body || {};

    const issue = queue.find(item => item.id === id);
    if (issue) {
        // Add resolution metadata
        issue.resolvedAt = new Date().toISOString();
        issue.resolvedAction = action; // 'approve' or 'reject'
        issue.resolvedBy = 'Admin User'; // In production, use actual user
        
        // Move to resolved
        resolvedIssues.unshift(issue);
        
        // Remove from queue
        queue = queue.filter(item => item.id !== id);
        
        if (action === 'approve') stats.blocked++;
        stats.pending = queue.length;
    }

    res.json({ success: true, stats });
});

app.get('/api/stats', (req, res) => {
    stats.pending = queue.length;
    res.json(stats);
});

app.post('/api/verify', (req, res) => {
    const query = (req.body?.query || '').toLowerCase();
    stats.queries++;

    setTimeout(() => {
        if (query.includes('cancel') || query.includes('stop')) return res.json(TRUTH_DB.cancel);
        if (query.includes('cost') || query.includes('expensive')) return res.json(TRUTH_DB.cost);
        if (query.includes('gps') || query.includes('chip')) return res.json(TRUTH_DB.gps);
        if (query.includes('bluetooth') || query.includes('wifi')) return res.json(TRUTH_DB.bluetooth);
        if (query.includes('hack') || query.includes('evm')) return res.json(TRUTH_DB.evm);
        if (query.includes('nri') || query.includes('online')) return res.json(TRUTH_DB.nri);
        if (query.includes('ink')) return res.json(TRUTH_DB.ink);
        if (query.includes('aadhaar')) return res.json(TRUTH_DB.aadhaar);
        if (query.includes('delete')) return res.json(TRUTH_DB.delete);

        res.json(TRUTH_DB.default);
    }, 1500);
});

/* =========================
   SERVER STARTUP
========================= */
const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ S.A.M.V.A.D Engine running on http://localhost:${PORT}`);
    console.log(`📊 Available endpoints:`);
    console.log(`   - GET  /api/queue`);
    console.log(`   - POST /api/queue/:id/resolve`);
    console.log(`   - GET  /api/stats`);
    console.log(`   - POST /api/verify`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use. Please free the port or use a different one.`);
    } else {
        console.error('❌ Server error:', err);
    }
    process.exit(1);
});

// Keep the process alive
server.on('listening', () => {
    console.log(`🔄 Server is actively listening...`);
});

/* =========================
   GRACEFUL SHUTDOWN
========================= */
process.on('SIGINT', () => {
    console.log('\n🛑 SIGINT received. Shutting down gracefully...');
    server.close(() => {
        console.log('✅ Server closed. Port released.');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.log('\n🛑 SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('✅ Server closed. Port released.');
        process.exit(0);
    });
});
