console.log('Script.js is loading...');

// Initialize selectors later after DOM is loaded
let selectors = {};
let affirmationText, quoteText, selfCareText, generateButton, generatorCard, messageBlocks, modeToggle, modeLabel, modeIcon, selfieForm, selfieInput, selfiePreview, selfiePreviewImg, selfieSubmit, selfieResponse, selfieCompliment, clearSelfie, chatForm, chatInput, chatLog, chatSend, gameBoard, gameReset, gameMatches, gameFeedback, gameMessage, blastArena, blastStart, blastStop, blastScore, blastTimer, blastCombo, blastResults, blastResultsText, popStartBtn, popReplayBtn, popGameGrid, popGameOver, popTarget;
let currentTheme = 'light';
let selfieApiAvailable = true;
let chatApiAvailable = true;

const API_BASE = (() => {
    const origin = window.location.origin;

    if (origin.includes('localhost:5000') || origin.includes('127.0.0.1:5000')) {
        return '';
    }

    if (origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
        return 'http://localhost:5000';
    }

    if (origin.startsWith('file:')) {
        return 'http://localhost:5000';
    }

    return '';
})();

function withApiBase(path) {
    if (!path.startsWith('/')) return path;
    return API_BASE ? `${API_BASE}${path}` : path;
}

function initializeSelectors() {
    selectors = {
        affirmationText: document.getElementById('affirmationText'),
        quoteText: document.getElementById('quoteText'),
        selfCareText: document.getElementById('selfCareText'),
        generateButton: document.getElementById('generateButton'),
        generatorCard: document.querySelector('.generator-card'),
        messageBlocks: document.querySelectorAll('.message-block'),
        modeToggle: document.getElementById('modeToggle'),
        modeLabel: document.querySelector('#modeToggle .mode-label'),
        modeIcon: document.querySelector('#modeToggle .mode-icon'),
        selfieForm: document.getElementById('selfieForm'),
        selfieInput: document.getElementById('selfieInput'),
        selfiePreview: document.getElementById('selfiePreview'),
        selfiePreviewImg: document.getElementById('selfiePreviewImg'),
        selfieSubmit: document.getElementById('selfieSubmit'),
        selfieResponse: document.getElementById('selfieResponse'),
        selfieCompliment: document.getElementById('selfieCompliment'),
        clearSelfie: document.getElementById('clearSelfie'),
        chatForm: document.getElementById('chatForm'),
        chatInput: document.getElementById('chatInput'),
        chatLog: document.getElementById('chatLog'),
        chatSend: document.getElementById('chatSend'),
        gameBoard: document.getElementById('gameBoard'),
        gameReset: document.getElementById('gameReset'),
        gameMatches: document.getElementById('gameMatches'),
        gameFeedback: document.getElementById('gameFeedback'),
        gameMessage: document.getElementById('gameMessage'),
        blastArena: document.getElementById('blastArena'),
        blastStart: document.getElementById('blastStart'),
        blastStop: document.getElementById('blastStop'),
        blastScore: document.getElementById('blastScore'),
        blastTimer: document.getElementById('blastTimer'),
        blastCombo: document.getElementById('blastCombo'),
        blastResults: document.getElementById('blastResults'),
        blastResultsText: document.getElementById('blastResultsText'),
        popStartBtn: document.getElementById('popStartBtn'),
        popReplayBtn: document.getElementById('popReplayBtn'),
        popGameGrid: document.getElementById('popGameGrid'),
        popGameOver: document.getElementById('popGameOver'),
        popTarget: document.getElementById('popTarget'),
    };

    // Destructure selectors
    affirmationText = selectors.affirmationText;
    quoteText = selectors.quoteText;
    selfCareText = selectors.selfCareText;
    generateButton = selectors.generateButton;
    generatorCard = selectors.generatorCard;
    messageBlocks = selectors.messageBlocks;
    modeToggle = selectors.modeToggle;
    modeLabel = selectors.modeLabel;
    modeIcon = selectors.modeIcon;
    selfieForm = selectors.selfieForm;
    selfieInput = selectors.selfieInput;
    selfiePreview = selectors.selfiePreview;
    selfiePreviewImg = selectors.selfiePreviewImg;
    selfieSubmit = selectors.selfieSubmit;
    selfieResponse = selectors.selfieResponse;
    selfieCompliment = selectors.selfieCompliment;
    clearSelfie = selectors.clearSelfie;
    chatForm = selectors.chatForm;
    chatInput = selectors.chatInput;
    chatLog = selectors.chatLog;
    chatSend = selectors.chatSend;
    gameBoard = selectors.gameBoard;
    gameReset = selectors.gameReset;
    gameMatches = selectors.gameMatches;
    gameFeedback = selectors.gameFeedback;
    gameMessage = selectors.gameMessage;
    blastArena = selectors.blastArena;
    blastStart = selectors.blastStart;
    blastStop = selectors.blastStop;
    blastScore = selectors.blastScore;
    blastTimer = selectors.blastTimer;
    blastCombo = selectors.blastCombo;
    blastResults = selectors.blastResults;
    blastResultsText = selectors.blastResultsText;
    popStartBtn = selectors.popStartBtn;
    popReplayBtn = selectors.popReplayBtn;
    popGameGrid = selectors.popGameGrid;
    popGameOver = selectors.popGameOver;
    popTarget = selectors.popTarget;

    console.log('Selectors loaded successfully:');
    console.log('generateButton:', generateButton);
    console.log('modeToggle:', modeToggle);
    console.log('chatForm:', chatForm);
    console.log('chatSend:', chatSend);
    console.log('gameReset:', gameReset);
}

const affirmations = [
    "You are blooming in your own perfect timing.",
    "Your kindness leaves soft footprints everywhere you go.",
    "You are made of resilience and quiet stardust.",
    "Every moment is a fresh chance to choose joy.",
    "You bring warmth into every space you enter.",
    "Your light is contagious—keep shining.",
    "You are becoming the person you always hoped to be.",
    "You are worthy of rest, love, and gentle mornings.",
    "You have everything you need to begin again.",
    "You are a mosaic of your brightest moments."
];

const quotes = [
    "“The best way to predict the future is to create it.” — Peter Drucker",
    "“Keep your face always toward the sunshine, and shadows will fall behind you.” — Walt Whitman",
    "“Small steps still move you forward.”",
    "“You’re alive because the universe isn’t finished with you yet.”",
    "“Believe you can and you’re halfway there.” — Theodore Roosevelt",
    "“You are allowed to be both a masterpiece and a work in progress.”",
    "“Great things are done by a series of small things brought together.” — Vincent Van Gogh",
    "“No storm, not even the one in your life, can last forever.”",
    "“Do something today your future self will thank you for.”",
    "“You are capable of radiating sunshine from the inside out.”"
];

const selfCareSuggestions = [
    "Take three mindful breaths and let your shoulders soften.",
    "Pour yourself a glass of water and savor each sip.",
    "Step outside and feel the air on your skin for a minute.",
    "Stretch your arms toward the sky and smile gently.",
    "Write down one thing you're proud of today.",
    "Queue up a favorite song and let yourself dance a little.",
    "Send a kind message to someone you cherish.",
    "Light a candle or diffuse a scent that calms you.",
    "Take a slow walk around the room and notice five beautiful things.",
    "Set a two-minute timer, close your eyes, and rest your mind."
];

const THEMES = {
    light: { label: 'Light', icon: '☀️', next: 'dark' },
    dark: { label: 'Dark', icon: '🌙', next: 'light' },
};

const complimentDescriptors = [
    'soft confidence in your gaze',
    'steady courage resting on your shoulders',
    'spark of curiosity lighting up your eyes',
    'gentle brilliance in the way you hold yourself',
    'warm kindness woven through your smile',
    'quiet resilience shining through the stillness',
    'bright spirit anchoring the whole frame',
    'playful spark waiting just beneath the surface',
    'bold calm that makes everyone feel safer',
    'creative fire humming in the background',
    'patient hope flickering in your expression',
    'deep empathy written across your features',
    'joyful bravery that refuses to dim',
    'soft glow that feels like golden hour light',
    'grounded wisdom resting in your posture',
    'refreshing sincerity that can’t be faked',
    'limitless potential etched into your stare',
    'untamed wonder softening the entire moment',
    'thoughtful grace that steadies the scene',
    'earnest warmth lifting the corners of the room',
    'magnetic optimism peeking through your shoulders',
    'sparkling humor ready to burst into laughter',
    'fearless honesty that makes you unforgettable',
    'soulful glow reminding everyone to breathe',
    'gentle determination woven into every line',
    'adventurous energy eager to explore what’s next',
    'bright sincerity lighting up the background',
    'compassionate steadiness wrapped around you',
    'soft joy resting peacefully on your face',
    'quiet victory that says you’ve come far',
];

const complimentMoods = [
    'feels like a sunrise warming the room',
    'reminds me of a deep breath after a breakthrough',
    'radiates a calm that invites others to exhale',
    'shimmers like the first stars appearing at dusk',
    'makes the moment feel tender and brave at once',
    'carries the rhythm of someone who keeps choosing hope',
    'spreads joy the way music spills through open windows',
    'makes the space feel anchored and safe',
    'glows like city lights after rain',
    'cascades like laughter shared with trusted friends',
    'whispers of the stories you’ve grown through',
    'wraps the scene in gentle encouragement',
    'signals to everyone that kindness is welcome here',
    'feels like a quiet celebration meant just for you',
    'mirrors the courage of someone who keeps trying',
    'echoes with the promise of bright days ahead',
    'makes the backdrop feel instantly softer',
    'holds the steady glow of a candle you can count on',
    'suggests you’ve turned challenges into poetry',
    'feels like a calm anthem playing under everything else',
];

const complimentHighlights = [
    'It tells me you keep choosing yourself even on complicated days.',
    'It hints that you’re quietly rewriting old narratives.',
    'It says you make people feel seen without even trying.',
    'It reminds me you’ve done hard healing and kept your softness.',
    'It shows you’ve turned lessons into wisdom that shines outward.',
    'It proves that your light isn’t about perfection—it’s about presence.',
    'It suggests you’re the friend who remembers the little details.',
    'It lets me know you’ve walked through storms and still plant flowers.',
    'It reveals you’re someone who leads with heart first.',
    'It whispers that you’re the safe place others run toward.',
    'It tells a story of bravery that doesn’t need to shout.',
    'It shows how fiercely you care, even when it’s tiring.',
    'It reflects all the compassion you pour into the world.',
    'It proves you’re equal parts softness and strength.',
    'It highlights the artistry you bring to everyday moments.',
    'It promises that your presence makes ordinary spaces glow.',
    'It reveals a person who keeps choosing kindness at full volume.',
    'It hints that your joy is contagious even on low-energy days.',
    'It celebrates all the growth you never stopped working toward.',
    'It marks you as someone whose authenticity is magnetic.',
];

const complimentActions = [
    'press play on a song that feels like this moment and let it loop',
    'write a quick note about today so you can remember this spark later',
    'treat yourself to a comfort drink and sip it slowly',
    'step outside and let the night air mirror your calm',
    'text someone you trust and share the smallest victory from today',
    'save a little voice memo describing what feels good right now',
    'stretch your shoulders, roll your wrists, and keep that energy moving',
    'take three photos just for yourself and tuck them away for rainy days',
    'queue a playlist that matches your mood and let it soundtrack the evening',
    'take five deep breaths, thanking your body for carrying you',
    'light a candle or dim the lights to honor the softness you’re radiating',
    'pull on your coziest layer and sit with how proud you are of yourself',
    'jot down one thing that felt brave about showing up today',
    'plan a tiny treat for tomorrow as a promise to keep this feeling alive',
    'share a selfie with someone who always roots for you',
    'sit by a window and let the outside world reflect your glow back to you',
    'stand in front of a mirror and say out loud what you love about yourself',
    'set a gentle timer for rest and let your mind wander kindly',
    'capture a slow-motion video of your smile for future you',
    'open your journal and draw how this moment makes you feel',
    'wrap yourself in a blanket and celebrate the comfort you deserve',
    'schedule something playful for later this week as a gift to your spirit',
    'pause for a gratitude list—three tiny things that feel like glitter today',
    'place a sticky note somewhere with a reminder of this exact glow',
    'let yourself daydream about the version of you who already believes this',
];

const chatOpeners = [
    'I’m really glad you shared that.',
    'Thank you for trusting me with that thought.',
    'That sounds like a lot to carry.',
    'It makes sense you’re feeling that way.',
    'I’m right here with you as you sort through this.',
    'You’re speaking up, and that matters so much.',
    'The way you described that tells me it’s important to you.',
    'You deserve a place to lay this down for a minute.',
    'I can hear the heart behind what you’re saying.',
    'Your honesty is powerful—thank you for letting me in.',
];

const chatSupports = [
    'Maybe take a short pause and breathe in for four counts, out for six.',
    'Would jotting your thoughts in a journal help untangle them a bit?',
    'How about stepping away from the screen and stretching for a minute?',
    'Is there a friend you could text just to say hello right now?',
    'You deserve gentleness—perhaps a warm drink or soft music could help.',
    'Consider listing three small wins from today—no matter how tiny.',
    'Try closing your eyes and noticing five sounds around you.',
    'Could you offer yourself the words you’d give a friend in this moment?',
    'Maybe step outside and feel the air on your skin to ground yourself.',
    'Would organizing your thoughts into “now” vs “later” help create space?',
    'Try placing a hand over your heart and naming what it needs tenderly.',
    'Consider scheduling a break, even a small one, to reset your nervous system.',
    'Keep a note open and capture any spiraling thoughts so they’re not spinning.',
    'If you can, move your body for sixty seconds—shake out the static.',
    'Maybe choose a color or object in the room and describe it in detail to anchor yourself.',
];

const chatClosers = [
    'If things feel heavy, please reach out to someone you trust.',
    'Remember you’re allowed to ask for help whenever you need it.',
    'If safety feels uncertain, consider contacting a local professional line.',
    'You’re not alone—lean on your support network whenever you can.',
    'Take all the time you need; you matter more than any to-do list.',
    'You deserve steady support in real life too—please seek it.',
    'Keep breathing; you don’t have to rush the next step.',
    'Let someone know how you’re doing after this—connection helps.',
    'Be gentle with yourself tonight; you’ve done something brave.',
    'If the weight lingers, consider talking with a licensed professional.',
];

const gameEmojis = ['😊', '🌟', '💖', '🎨', '🦋', '🌈', '🎵', '🍀'];
const gameMessages = [
    "You're on a roll—keep matching!",
    "Fantastic match! You're a happiness champion!",
    "Yes! Another match unlocked—you're amazing!",
    "Perfect! Your joy energy is unstoppable!",
    "Brilliant! You're crushing it!",
    "Wonderful match! You deserve this happiness!",
];

let gameState = {
    tiles: [],
    flipped: [],
    matched: [],
    matches: 0,
    canFlip: true,
};

let tapGameState = {
    points: 0,
    highScore: localStorage.getItem("joy-tapper-high-score") ? parseInt(localStorage.getItem("joy-tapper-high-score")) : 0,
    milestones: [10, 25, 50, 100, 200, 500],
    achievedMilestones: [],
};

const blastGameEmojis = ["😊", "🎉", "⭐", "💖", "🌈", "🎨", "🦋", "✨", "🎵", "🌟"];

let blastGameState = {
    score: 0,
    combo: 0,
    timeLeft: 30,
    isGameActive: false,
    gameTimer: null,
    spawnRate: 900,
    emojisOnScreen: 0,
    startTime: 0,
    currentSpawnInterval: null,
};

const wheelRewards = [
    "🎉 You won 50 happiness points! Feeling amazing!",
    "⭐ Bonus: Extra joy unlocked! You're a star!",
    "💖 Love boost activated! Pure bliss achieved!",
    "🌈 Rainbow moment unlocked! Life is beautiful!",
    "✨ Magic happened! You're shining bright!",
    "🎊 Grand prize! Ultimate happiness granted!",
];

const runnerObstacleEmojis = ["🪨", "🌵", "💣", "🔥", "⚡"];

let runnerGameState = {
    score: 0,
    highScore: localStorage.getItem("runner-high-score") ? parseInt(localStorage.getItem("runner-high-score")) : 0,
    playerX: 50,
    isGameActive: false,
    gameSpeed: 5,
    spawnRate: 1200,
    currentSpawnInterval: null,
    gameFrame: 0,
};

const keysPressed = {};

const tapMilestoneMessages = {
    10: "🎉 You've earned 10 happiness points! You're getting warmed up!",
    25: "✨ 25 points! You're radiating joy!",
    50: "🌟 50 points! You're a happiness machine!",
    100: "💫 100 points! Absolutely unstoppable!",
    200: "🔥 200 points! You're a joy champion!",
    500: "👑 500 points! You're the ultimate happiness harvester!",
};

const lastMessages = { affirmation: '', quote: '', selfCare: '' };
const chatHistory = [];

function buildSelfieCompliment() {
    const descriptor = randomItem(complimentDescriptors);
    const mood = randomItem(complimentMoods);
    const highlight = randomItem(complimentHighlights);
    const action = randomItem(complimentActions);
    return `There's this ${descriptor}, and the whole moment ${mood}. ${highlight} Right now, take a moment to ${action}.`;
}

function buildChatReply(message) {
    const lowerMsg = message.toLowerCase();
    
    // Helper function to build personalized responses
    function buildPersonalResponse(emotionType) {
        const responses = {
            sad: {
                opening: [
                    `I hear that you're feeling sad, and that matters.`,
                    `It sounds like you're going through something difficult right now.`,
                    `Thank you for trusting me with what you're feeling.`,
                    `Your sadness is valid and real.`
                ],
                exploration: [
                    `When did this sadness start? Sometimes understanding the timeline helps us understand ourselves better.`,
                    `Is this about a specific situation, or has it been building for a while?`,
                    `What's the hardest part of what you're experiencing right now?`,
                    `If you could change one thing about this situation, what would it be?`
                ],
                support: [
                    `Remember that this feeling is temporary, even though it doesn't feel that way. You've survived every difficult moment before this.`,
                    `Please be incredibly gentle with yourself right now. You deserve kindness, especially from yourself.`,
                    `Is there someone in your life who could sit with you in this? Sometimes just being witnessed helps.`,
                    `What would bring you even the smallest moment of comfort today?`
                ]
            },
            anxious: {
                opening: [
                    `I can sense the anxiety in what you're sharing.`,
                    `It sounds like worry is taking up a lot of space in your mind right now.`,
                    `Anxiety can feel overwhelming, and I'm glad you're talking about it.`,
                    `Your nervousness makes sense given what you're facing.`
                ],
                exploration: [
                    `What's the main thing your anxiety is telling you right now?`,
                    `Is this anxiety about something that might happen, or something that's happening now?`,
                    `When you close your eyes and breathe, can you identify what's the actual threat vs. what your mind is imagining?`,
                    `What would it feel like if things actually turned out okay?`
                ],
                support: [
                    `Let's ground you in this moment: name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste. This brings you back to now.`,
                    `Your thoughts aren't facts. Anxiety whispers "what if" but you've handled hard things before.`,
                    `Try box breathing: in for 4, hold for 4, out for 4, hold for 4. Your nervous system will shift.`,
                    `What's one thing that's within your control that you could do right now?`
                ]
            },
            angry: {
                opening: [
                    `I hear the frustration in your words.`,
                    `Your anger is telling you that something matters deeply to you.`,
                    `It sounds like you've reached a breaking point, and that's information worth listening to.`,
                    `What you're feeling right now is valid and important.`
                ],
                exploration: [
                    `What's the actual root of this anger? Often what we're mad about isn't what we're really upset about.`,
                    `Is this one incident or have you been holding this in for a while?`,
                    `Who or what specifically triggered this? What happened right before?`,
                    `If you could say exactly what you're thinking without filtering, what would that be?`
                ],
                support: [
                    `Before you respond, channel this energy somewhere safe: a run, a workout, writing, screaming into a pillow. Get it out.`,
                    `You have the power to choose your response, not just react. What would your wisest self do?`,
                    `Anger is fire—the question is whether you'll use it to burn things down or light the way forward.`,
                    `What boundary needs to be set, or what conversation needs to happen?`
                ]
            },
            tired: {
                opening: [
                    `It sounds like exhaustion is catching up with you.`,
                    `Your body and mind are asking for rest, and that's important.`,
                    `Burnout is real, and I'm glad you're acknowledging it.`,
                    `Fatigue this deep is your system's way of saying "I need help."`
                ],
                exploration: [
                    `When's the last time you had real, guilt-free rest?`,
                    `What's the main thing draining your energy right now?`,
                    `If you could drop one responsibility tomorrow, what would bring the most relief?`,
                    `Is this tiredness physical, emotional, mental, or all three?`
                ],
                support: [
                    `Rest isn't a luxury—it's maintenance. You can't function without it, just like a car needs fuel.`,
                    `What would genuine rest look like for you? A day off? An earlier bedtime? Help with tasks?`,
                    `You're allowed to lower expectations temporarily. You're not failing—you're being wise.`,
                    `Can you commit to just 30 minutes of rest today with zero guilt? Start there.`
                ]
            },
            hopeful: {
                opening: [
                    `This energy you're radiating is beautiful!`,
                    `I can feel the positivity in what you're sharing.`,
                    `Your happiness is contagious, and I love it.`,
                    `This feeling you have right now—it's real and it's yours.`
                ],
                exploration: [
                    `What's making you feel this way right now? I want to understand.`,
                    `How long have you been feeling this lightness?`,
                    `What's one specific thing that's contributing to this good feeling?`,
                    `Who could you share this joy with today?`
                ],
                support: [
                    `Savor this. Really feel it. These moments are golden—don't let them pass without appreciation.`,
                    `This is who you are at your best. Remember this on harder days.`,
                    `Your happiness isn't naive—it's powerful. Keep nurturing it.`,
                    `Can you do something today that amplifies this feeling? Share it, celebrate it, create with it?`
                ]
            },
            confused: {
                opening: [
                    `I can sense the confusion you're working through.`,
                    `It sounds like you're trying to figure something out.`,
                    `Uncertainty is uncomfortable, and I understand why you're struggling.`,
                    `Being lost can actually be the beginning of finding your way.`
                ],
                exploration: [
                    `What's the core confusion here? What's the main question you're trying to answer?`,
                    `What do you know FOR SURE about this situation?`,
                    `If you had to make a decision by tomorrow, what would your gut say?`,
                    `What information or conversation would help you find clarity?`
                ],
                support: [
                    `Start with what you know. Build from solid ground. The rest will come into focus.`,
                    `Sometimes clarity comes from action, not thinking. What's one small step you could take?`,
                    `Journal it out without filtering. Write all the confusion, all the questions. Often patterns emerge.`,
                    `You don't need all the answers right now. Just the next right thing.`
                ]
            },
            lonely: {
                opening: [
                    `Loneliness is a signal that your heart is reaching for connection.`,
                    `It sounds like you're feeling disconnected right now.`,
                    `I'm glad you're telling me how you feel. That takes courage.`,
                    `Isolation can make loneliness feel even deeper, and I want to help.`
                ],
                exploration: [
                    `When did you start feeling this way? Has something changed?`,
                    `Is it that you don't have people, or that you feel misunderstood by the people around you?`,
                    `Who's one person you could reach out to, even in a small way?`,
                    `What kind of connection are you craving right now?`
                ],
                support: [
                    `Connection starts with one message, one call, one person. What's one tiny action you could take?`,
                    `You matter. People want to know you. Start with someone—anyone.`,
                    `Sometimes community comes from being vulnerable first. You don't have to do this alone.`,
                    `Reach out today. Not tomorrow—today. A text, a call, showing up somewhere. One small action.`
                ]
            },
            overwhelmed: {
                opening: [
                    `It sounds like you're carrying too much right now.`,
                    `Overwhelm means something needs to change immediately.`,
                    `I can feel how much is weighing on you.`,
                    `This feeling is your system's alarm—we need to lighten your load.`
                ],
                exploration: [
                    `If you had to identify the ONE most urgent thing, what would it be?`,
                    `What could come off your plate RIGHT NOW—not eventually, but today?`,
                    `Who can you ask for help? This isn't about doing more; it's about doing less.`,
                    `What's one thing you could lower your standards on or delegate?`
                ],
                support: [
                    `Focus only on the next 2 hours. Don't think about the rest. Just: what's the next right thing?`,
                    `You can't do it all. You're not supposed to. What's the most important 20% you need to do?`,
                    `Perfectionism is your enemy right now. Good enough is enough.`,
                    `Take something off today. Give yourself permission to not do it all. That's wisdom, not failure.`
                ]
            }
        };
        
        if (responses[emotionType]) {
            const opening = responses[emotionType].opening[Math.floor(Math.random() * responses[emotionType].opening.length)];
            const exploration = responses[emotionType].exploration[Math.floor(Math.random() * responses[emotionType].exploration.length)];
            const support = responses[emotionType].support[Math.floor(Math.random() * responses[emotionType].support.length)];
            return `${opening} ${exploration} ${support}`;
        }
    }
    
    // Emotion detection with keywords
    const emotionKeywords = {
        sad: ['sad', 'down', 'depressed', 'unhappy', 'miserable', 'hurt', 'crying', 'cry', 'heartbroken'],
        anxious: ['anxious', 'worried', 'nervous', 'stressed', 'panic', 'scared', 'afraid', 'fear', 'what if'],
        angry: ['angry', 'mad', 'frustrated', 'irritated', 'furious', 'rage', 'hate', 'upset', 'agitated'],
        tired: ['tired', 'exhausted', 'drained', 'burnt out', 'burnout', 'fatigue', 'sleepy', 'worn out'],
        hopeful: ['good', 'happy', 'excited', 'grateful', 'thankful', 'blessed', 'amazing', 'wonderful', 'love', 'proud'],
        confused: ['confused', 'lost', 'uncertain', 'don\'t know', 'unclear', 'mixed up', 'stuck', 'not sure'],
        lonely: ['alone', 'lonely', 'isolated', 'nobody', 'no one understands', 'disconnected'],
        overwhelmed: ['overwhelmed', 'too much', 'too many', 'everything', 'falling apart', 'drowning']
    };
    
    // Find the dominant emotion
    for (const emotion in emotionKeywords) {
        if (emotionKeywords[emotion].some(keyword => lowerMsg.includes(keyword))) {
            return buildPersonalResponse(emotion);
        }
    }
    
    // Topic-based personalized responses
    const topicResponses = {
        work: [
            `I hear that work is on your mind. Tell me more—what's the situation? Is it about a specific project, a relationship with your boss, or the workload itself? Understanding the core issue helps us find solutions.`,
            `Work challenges often feel bigger than they are when we're in the middle of them. What's happening that feels hard? And more importantly: what matters to you about this? The outcome, the recognition, the purpose? That helps me understand what you really need.`,
            `Career matters, but your wellbeing matters more. What would change if you adjusted your approach to work? What would help you feel more balanced? Let's talk about what's truly within your control here.`
        ],
        relationships: [
            `Relationships are where we're most vulnerable, which makes them important. What's going on? Is this about someone specific, or about connection in general? I'm here to listen.`,
            `The people in our lives shape our experience. What's happening that brought this up for you? Are you celebrating something, navigating conflict, or processing a loss? Tell me more.`,
            `Connection is complex and beautiful and sometimes painful. What does your heart need right now in this relationship? Let's explore that together.`
        ],
        health: [
            `Your health matters—physical and mental. What's going on with you? Is it about sleep, movement, nutrition, or something emotional? Your body's trying to tell you something.`,
            `When you mention health, I want to understand what's really bothering you. Are you not feeling well physically, struggling emotionally, or both? What would help?`,
            `Taking care of yourself is taking care of your whole life. What's one area of your health that needs attention right now? Let's start there.`
        ],
        growth: [
            `The fact that you're thinking about growth shows real self-awareness. What are you trying to improve or change? What's driving this desire? Understanding your why helps me support your how.`,
            `Personal development is beautiful work. What's the area you're focusing on? And what would success look like for you? Let's build this vision together.`,
            `Growth isn't linear, and that's okay. What's one step you're considering? What excites you about it, and what scares you?`
        ]
    };
    
    // Check for topics
    for (const topic in topicResponses) {
        const keywords = {
            work: ['work', 'job', 'boss', 'career', 'office', 'project', 'deadline'],
            relationships: ['friend', 'family', 'partner', 'relationship', 'love', 'breakup', 'dating'],
            health: ['health', 'sick', 'illness', 'exercise', 'eat', 'sleep', 'body'],
            growth: ['learn', 'grow', 'improve', 'change', 'better', 'progress', 'goal']
        };
        
        if (keywords[topic] && keywords[topic].some(keyword => lowerMsg.includes(keyword))) {
            return topicResponses[topic][Math.floor(Math.random() * topicResponses[topic].length)];
        }
    }
    
    // Personalized default responses
    const defaultResponses = [
        `You've shared something with me, and I want to understand it better. Can you tell me more? What's really on your mind right now? 💙`,
        `I'm listening, and I want to help. What you said matters. What else is there? What's the fuller picture of what you're experiencing?`,
        `Thank you for opening up. I notice you shared that with me, and I take that seriously. What would help you right now? Understanding, ideas, or just being heard? 🌟`,
        `You're here, you're talking, and that's good. But I sense there's more beneath the surface. What's the deeper thing you're working through?`,
        `I appreciate your trust in sharing this with me. Help me understand your situation better. What's driving what you just said? What do you need most? 💚`
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

function randomItem(list, lastValue) {
    if (list.length === 1) return list[0];
    let item = list[Math.floor(Math.random() * list.length)];
    while (item === lastValue) {
        item = list[Math.floor(Math.random() * list.length)];
    }
    return item;
}

function updateBlock(element, text) {
    const block = element.closest('.message-block');
    block.classList.add('is-updating');

    setTimeout(() => {
        element.textContent = text;
        block.classList.remove('is-updating');
        block.classList.add('is-visible');

        setTimeout(() => {
            block.classList.remove('is-visible');
        }, 600);
    }, 220);
}

function revealMessages() {
    generatorCard.classList.add('is-revealed');
    generatorCard.classList.remove('is-cooling');

    const affirmation = randomItem(affirmations, lastMessages.affirmation);
    const quote = randomItem(quotes, lastMessages.quote);
    const selfCare = randomItem(selfCareSuggestions, lastMessages.selfCare);

    lastMessages.affirmation = affirmation;
    lastMessages.quote = quote;
    lastMessages.selfCare = selfCare;

    updateBlock(affirmationText, affirmation);
    updateBlock(quoteText, quote);
    updateBlock(selfCareText, selfCare);
}

function handleButtonPress() {
    console.log('Make Me Happy button clicked!');
    generateButton.classList.add('is-pressed');
    revealMessages();

    setTimeout(() => {
        generateButton.classList.remove('is-pressed');
        generatorCard.classList.add('is-cooling');
    }, 420);
}

function setTheme(theme) {
    const resolvedTheme = THEMES[theme] ? theme : 'light';
    currentTheme = resolvedTheme;
    document.body.dataset.theme = resolvedTheme;
    const { label, icon, next } = THEMES[resolvedTheme];
    modeLabel.textContent = label;
    modeIcon.textContent = icon;
    modeToggle.setAttribute('aria-label', `Switch to ${THEMES[next].label.toLowerCase()} mode`);
}

function toggleTheme() {
    console.log('Toggle theme clicked!', 'Current theme:', currentTheme);
    const nextTheme = THEMES[currentTheme].next;
    setTheme(nextTheme);
    try {
        localStorage.setItem('daily-happiness-theme', nextTheme);
    } catch (error) {
        /* ignore */
    }
}

function restoreThemePreference() {
    try {
        const storedTheme = localStorage.getItem('daily-happiness-theme');
        if (storedTheme && THEMES[storedTheme]) {
            setTheme(storedTheme);
            return;
        }
    } catch (error) {
        /* ignore */
    }
    setTheme(currentTheme);
}

function initCardAnimations() {
    generatorCard.classList.add('is-revealed');
    messageBlocks.forEach((block) => block.classList.add('is-visible'));

    setTimeout(() => {
        messageBlocks.forEach((block) => block.classList.remove('is-visible'));
    }, 800);
}

function setElementState(element, state) {
    if (!element) return;
    if (state === 'loading') {
        element.disabled = true;
        element.classList.add('is-loading');
    } else {
        element.disabled = false;
        element.classList.remove('is-loading');
    }
}

function resetSelfiePreview() {
    selfiePreview.hidden = true;
    selfiePreviewImg.src = '';
    selfieInput.value = '';
    selfieSubmit.disabled = true;
}

function showSelfiePreview(file) {
    if (!file) {
        resetSelfiePreview();
        return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        selfiePreviewImg.src = event.target.result;
        selfiePreview.hidden = false;
        selfieSubmit.disabled = false;
    };
    reader.readAsDataURL(file);
}

function handleSelfieChange(event) {
    const [file] = event.target.files;
    if (!file) {
        resetSelfiePreview();
        return;
    }

    if (!file.type.startsWith('image/')) {
        selfieResponse.hidden = false;
        selfieResponse.classList.add('is-error');
        selfieCompliment.textContent = 'That file type is not supported. Please choose an image.';
        resetSelfiePreview();
        return;
    }

    selfieResponse.hidden = true;
    selfieResponse.classList.remove('is-error');
    showSelfiePreview(file);
}

async function submitSelfie(event) {
    console.log('Selfie form submitted!');
    event.preventDefault();

    const [file] = selfieInput.files || [];
    if (!file) {
        console.log('No file selected');
        return;
    }

    setElementState(selfieSubmit, 'loading');
    selfieResponse.hidden = false;
    selfieResponse.classList.remove('is-error');
    selfieCompliment.textContent = 'Crafting a heartfelt compliment just for you…';

    const deliverLocalCompliment = () => {
        const compliment = buildSelfieCompliment();
        selfieResponse.hidden = false;
        selfieResponse.classList.remove('is-error');
        selfieCompliment.textContent = compliment;
    };

    if (!selfieApiAvailable) {
        deliverLocalCompliment();
        setElementState(selfieSubmit, 'idle');
        return;
    }

    try {
        const formData = new FormData();
        formData.append('image', file);

        console.log('Sending selfie to /api/selfie-compliment');
        const response = await fetch(withApiBase('/api/selfie-compliment'), {
            method: 'POST',
            body: formData,
        });

        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error('Failed to get compliment');
        }

        const data = await response.json();
        console.log('API response:', data);
        selfieApiAvailable = true;
        const remoteCompliment = (data.compliment || '').trim();
        if (remoteCompliment) {
            const enrichedCompliment = `${remoteCompliment} ${randomItem(complimentHighlights)}`;
            selfieCompliment.textContent = enrichedCompliment;
        } else {
            deliverLocalCompliment();
        }
    } catch (error) {
        console.error('Selfie error:', error);
        selfieApiAvailable = false;
        deliverLocalCompliment();
    } finally {
        setElementState(selfieSubmit, 'idle');
    }
}

function appendChatBubble(text, role = 'bot') {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${role}`;
    bubble.textContent = text;
    chatLog.appendChild(bubble);
    chatLog.scrollTop = chatLog.scrollHeight;
}

function appendSystemMessage(text) {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble system';
    bubble.textContent = text;
    chatLog.appendChild(bubble);
    chatLog.scrollTop = chatLog.scrollHeight;
    return bubble;
}

async function submitChat(event) {
    console.log('Chat form submitted!');
    event.preventDefault();
    const message = chatInput.value.trim();
    if (message.length < 2) {
        console.log('Message too short');
        return;
    }

    chatInput.value = '';
    appendChatBubble(message, 'user');
    chatHistory.push({ role: 'user', content: message });

    setElementState(chatSend, 'loading');
    const thinkingBubble = appendSystemMessage('Gathering a thoughtful response…');

    const respondWithFallback = () => {
        const fallbackReply = buildChatReply(message);
        if (thinkingBubble.parentElement) {
            thinkingBubble.remove();
        }
        chatHistory.push({ role: 'assistant', content: fallbackReply });
        appendChatBubble(fallbackReply, 'bot');
    };

    if (!chatApiAvailable) {
        respondWithFallback();
        setElementState(chatSend, 'idle');
        return;
    }

    try {
        console.log('Sending message to /api/support-chat:', message);
        const response = await fetch(withApiBase('/api/support-chat'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                history: chatHistory.slice(0, -1),
            }),
        });

        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error('Failed to get response');
        }

        const data = await response.json();
        console.log('API response:', data);
        chatApiAvailable = true;
        const reply = data.reply || buildChatReply(message);
        
        if (thinkingBubble.parentElement) {
            thinkingBubble.remove();
        }
        
        chatHistory.push({ role: 'assistant', content: reply });
        appendChatBubble(reply, 'bot');
    } catch (error) {
        console.error('Chat error:', error);
        chatApiAvailable = false;
        respondWithFallback();
    } finally {
        setElementState(chatSend, 'idle');
    }
}

function initChatLog() {
    appendSystemMessage('Your gentle support companion is ready. Type a thought to begin.');
}

function initGame() {
    gameState = {
        tiles: [],
        flipped: [],
        matched: [],
        matches: 0,
        canFlip: true,
    };

    gameBoard.innerHTML = '';
    gameFeedback.hidden = true;
    gameMatches.textContent = '0';

    const shuffled = [...gameEmojis, ...gameEmojis].sort(() => Math.random() - 0.5);

    shuffled.forEach((emoji, index) => {
        const tile = document.createElement('button');
        tile.className = 'game-card-tile';
        tile.dataset.emoji = emoji;
        tile.dataset.index = index;
        tile.textContent = '?';
        tile.type = 'button';
        gameBoard.appendChild(tile);
        gameState.tiles.push({ emoji, index, flipped: false });
    });
}

function handleGameTileClick(event) {
    const tile = event.target.closest('.game-card-tile');
    if (!tile || !gameState.canFlip || gameState.flipped.length >= 2) return;

    const index = parseInt(tile.dataset.index);
    if (gameState.flipped.includes(index) || gameState.matched.includes(index)) return;

    tile.classList.add('flipped');
    tile.textContent = tile.dataset.emoji;
    gameState.flipped.push(index);

    if (gameState.flipped.length === 2) {
        gameState.canFlip = false;
        checkGameMatch();
    }
}

function checkGameMatch() {
    const [idx1, idx2] = gameState.flipped;
    const emoji1 = gameState.tiles[idx1].emoji;
    const emoji2 = gameState.tiles[idx2].emoji;

    const isMatch = emoji1 === emoji2;

    setTimeout(() => {
        const tiles = gameBoard.querySelectorAll('.game-card-tile');

        if (isMatch) {
            gameState.matched.push(idx1, idx2);
            gameState.matches++;
            gameMatches.textContent = gameState.matches;

            tiles[idx1].classList.add('matched');
            tiles[idx2].classList.add('matched');

            gameFeedback.hidden = false;
            gameFeedback.classList.add('celebration');
            gameMessage.textContent = randomItem(gameMessages);

            if (gameState.matches === gameEmojis.length) {
                setTimeout(() => {
                    gameMessage.textContent = "🎉 You matched all pairs! You're a joy master! Play again?";
                }, 600);
            }
        } else {
            tiles[idx1].classList.remove('flipped');
            tiles[idx2].classList.remove('flipped');
            tiles[idx1].textContent = '?';
            tiles[idx2].textContent = '?';
        }

        gameState.flipped = [];
        gameState.canFlip = true;
    }, 600);
}

function handleTapClick() {
    tapGameState.points++;
    tapPoints.textContent = tapGameState.points;

    tapButton.style.animation = 'none';
    setTimeout(() => {
        tapButton.style.animation = 'tapPulse 300ms ease';
    }, 10);

    const achievableMilestone = tapGameState.milestones.find(
        (milestone) => tapGameState.points === milestone && !tapGameState.achievedMilestones.includes(milestone)
    );

    if (achievableMilestone) {
        tapGameState.achievedMilestones.push(achievableMilestone);
        tapMilestone.hidden = false;
        tapMilestoneText.textContent = tapMilestoneMessages[achievableMilestone];

        setTimeout(() => {
            tapMilestone.hidden = true;
        }, 3000);
    }
}

function resetTapGame() {
    if (tapGameState.points > tapGameState.highScore) {
        tapGameState.highScore = tapGameState.points;
        localStorage.setItem("joy-tapper-high-score", tapGameState.highScore);
        tapHighScore.textContent = tapGameState.highScore;
    }

    tapGameState.points = 0;
    tapGameState.achievedMilestones = [];
    tapPoints.textContent = "0";
    tapMilestone.hidden = true;
}

function spawnBlastEmoji() {
    if (!blastGameState.isGameActive) return;

    const emoji = randomItem(blastGameEmojis);
    const popup = document.createElement("button");
    popup.className = "blast-emoji-popup";
    popup.textContent = emoji;
    popup.type = "button";
    popup.setAttribute("aria-label", "Click emoji");

    const randomX = Math.random() * (blastArena.offsetWidth - 60);
    const randomY = Math.random() * (blastArena.offsetHeight - 60);
    popup.style.left = randomX + "px";
    popup.style.top = randomY + "px";

    blastArena.appendChild(popup);
    blastGameState.emojisOnScreen++;

    popup.addEventListener("click", (e) => {
        e.stopPropagation();
        handleBlastClick(popup);
    });

    setTimeout(() => {
        if (popup.parentElement && !popup.classList.contains("clicked")) {
            popup.classList.add("disappeared");
            setTimeout(() => {
                if (popup.parentElement) {
                    popup.remove();
                    blastGameState.emojisOnScreen--;
                }
                blastGameState.combo = 0;
                blastCombo.textContent = "0x";
            }, 300);
        }
    }, 1200);
}

function handleBlastClick(popup) {
    if (popup.classList.contains("clicked")) return;

    popup.classList.add("clicked");
    blastGameState.emojisOnScreen--;

    blastGameState.combo++;
    blastGameState.score += 10 * blastGameState.combo;
    blastScore.textContent = blastGameState.score;
    blastCombo.textContent = blastGameState.combo + "x";

    setTimeout(() => {
        if (popup.parentElement) {
            popup.remove();
        }
    }, 300);
}

function startBlastGame() {
    blastGameState = {
        score: 0,
        combo: 0,
        timeLeft: 30,
        isGameActive: true,
        gameTimer: null,
        spawnRate: 900,
        emojisOnScreen: 0,
        startTime: Date.now(),
        currentSpawnInterval: null,
    };

    blastArena.innerHTML = "";
    blastScore.textContent = "0";
    blastCombo.textContent = "0x";
    blastTimer.textContent = "30";
    blastResults.hidden = true;
    blastStart.hidden = true;
    blastStop.hidden = false;
    blastStart.disabled = true;
    blastStop.disabled = false;

    const spawnEmoji = () => {
        if (!blastGameState.isGameActive) return;

        spawnBlastEmoji();

        const elapsedSeconds = (Date.now() - blastGameState.startTime) / 1000;
        const newSpawnRate = Math.max(300, 900 - elapsedSeconds * 20);

        clearTimeout(blastGameState.currentSpawnInterval);
        blastGameState.currentSpawnInterval = setTimeout(spawnEmoji, newSpawnRate);
    };

    spawnEmoji();

    blastGameState.gameTimer = setInterval(() => {
        blastGameState.timeLeft--;
        blastTimer.textContent = blastGameState.timeLeft;

        if (blastGameState.timeLeft <= 0) {
            stopBlastGame();
        }
    }, 1000);
}

function stopBlastGame() {
    blastGameState.isGameActive = false;

    if (blastGameState.gameTimer) {
        clearInterval(blastGameState.gameTimer);
    }

    if (blastGameState.currentSpawnInterval) {
        clearTimeout(blastGameState.currentSpawnInterval);
    }

    blastStart.hidden = false;
    blastStop.hidden = true;
    blastStart.disabled = false;
    blastStop.disabled = true;

    blastResults.hidden = false;
    const finalCombo = blastGameState.combo > 0 ? ` (${blastGameState.combo}x combo!)` : "";
    blastResultsText.textContent = `Game Over! Final Score: ${blastGameState.score} points${finalCombo} 🎊`;
}

function handleWheelSpin() {
    wheelSpinBtn.disabled = true;
    wheelResult.hidden = true;

    const finalRotation = Math.random() * 360 + 1080;
    spinWheel.style.setProperty("--final-rotation", finalRotation + "deg");
    spinWheel.classList.add("spinning");

    setTimeout(() => {
        spinWheel.classList.remove("spinning");
        const normalizedRotation = finalRotation % 360;
        const segmentIndex = Math.floor(normalizedRotation / 60);
        const reward = wheelRewards[segmentIndex];

        wheelResult.hidden = false;
        wheelResultText.textContent = reward;
        wheelSpinBtn.disabled = false;
    }, 4000);
}

// Emoji Pop Frenzy Game
const popEmojis = ['🌟', '💫', '✨', '🎈', '🎊', '🎉', '🌈', '🦋', '🐝', '🌺', '🌸', '🌼'];

let popGameState = {
    score: 0,
    timeLeft: 30,
    highScore: localStorage.getItem('popHighScore') ? parseInt(localStorage.getItem('popHighScore')) : 0,
    isGameActive: false,
    timerInterval: null,
    bubbles: [],
    targetEmoji: null
};

function displayPopHighScore() {
    const highScoreElements = document.querySelectorAll('.pop-stats .pop-value');
    if (highScoreElements[3]) {
        highScoreElements[3].textContent = popGameState.highScore;
    }
}

function setTargetEmoji() {
    popGameState.targetEmoji = popEmojis[Math.floor(Math.random() * popEmojis.length)];
    if (popTarget) {
        popTarget.textContent = popGameState.targetEmoji;
    }
}

function startPopGame() {
    popGameState.score = 0;
    popGameState.timeLeft = 30;
    popGameState.isGameActive = true;
    
    const scoreElements = document.querySelectorAll('.pop-stats .pop-value');
    if (scoreElements[0]) scoreElements[0].textContent = '0';
    if (scoreElements[2]) scoreElements[2].textContent = '30';
    if (popGameOver) popGameOver.hidden = true;
    
    popStartBtn.hidden = true;
    popReplayBtn.hidden = true;
    
    popGameGrid.innerHTML = '';
    popGameState.bubbles = [];
    
    // Set initial target emoji
    setTargetEmoji();
    
    // Create initial bubbles
    for (let i = 0; i < 16; i++) {
        createPopBubble();
    }
    
    // Start timer
    popGameState.timerInterval = setInterval(() => {
        popGameState.timeLeft--;
        const timerElement = document.querySelectorAll('.pop-stats .pop-value')[2];
        if (timerElement) {
            timerElement.textContent = popGameState.timeLeft;
        }
        
        if (popGameState.timeLeft <= 0) {
            endPopGame();
        }
    }, 1000);
}

function createPopBubble() {
    if (!popGameState.isGameActive) return;
    
    const emoji = popEmojis[Math.floor(Math.random() * popEmojis.length)];
    const bubbleBtn = document.createElement('button');
    bubbleBtn.className = 'pop-emoji';
    bubbleBtn.textContent = emoji;
    bubbleBtn.type = 'button';
    
    bubbleBtn.addEventListener('click', () => handlePopClick(bubbleBtn));
    
    popGameGrid.appendChild(bubbleBtn);
    popGameState.bubbles.push(bubbleBtn);
    
    // Auto-remove bubble after 3 seconds if not clicked
    const removeTimeout = setTimeout(() => {
        if (bubbleBtn.parentNode === popGameGrid) {
            bubbleBtn.remove();
            popGameState.bubbles = popGameState.bubbles.filter(b => b !== bubbleBtn);
            if (popGameState.isGameActive) {
                createPopBubble();
            }
        }
    }, 3000);
    
    bubbleBtn.dataset.timeout = removeTimeout;
}

function handlePopClick(bubbleBtn) {
    if (!popGameState.isGameActive) return;
    
    // Clear the auto-remove timeout
    if (bubbleBtn.dataset.timeout) {
        clearTimeout(parseInt(bubbleBtn.dataset.timeout));
    }
    
    // Only score if clicking the target emoji
    if (bubbleBtn.textContent === popGameState.targetEmoji) {
        popGameState.score++;
        const scoreElement = document.querySelectorAll('.pop-stats .pop-value')[0];
        if (scoreElement) {
            scoreElement.textContent = popGameState.score;
        }
    }
    
    bubbleBtn.remove();
    popGameState.bubbles = popGameState.bubbles.filter(b => b !== bubbleBtn);
    
    // Create new bubble to maintain grid
    if (popGameState.isGameActive) {
        createPopBubble();
    }
}

function endPopGame() {
    popGameState.isGameActive = false;
    clearInterval(popGameState.timerInterval);
    
    // Save high score
    if (popGameState.score > popGameState.highScore) {
        popGameState.highScore = popGameState.score;
        localStorage.setItem('popHighScore', popGameState.highScore);
        displayPopHighScore();
    }
    
    // Show game over message
    if (popGameOver) {
        popGameOver.hidden = false;
        popGameOver.innerHTML = `<p>🎉 Game Over! Final Score: <strong>${popGameState.score}</strong></p>`;
    }
    
    popStartBtn.hidden = true;
    popReplayBtn.hidden = false;
    
    // Clear remaining bubbles
    popGameState.bubbles.forEach(bubble => {
        if (bubble.dataset.timeout) {
            clearTimeout(parseInt(bubble.dataset.timeout));
        }
        bubble.remove();
    });
    popGameState.bubbles = [];
}

function initEventListeners() {
    console.log('Initializing event listeners...');
    console.log('generateButton:', generateButton);
    console.log('modeToggle:', modeToggle);
    console.log('chatForm:', chatForm);
    console.log('gameReset:', gameReset);
    
    if (!generateButton) {
        console.error('ERROR: generateButton not found!');
    } else {
        generateButton.addEventListener('click', handleButtonPress);
        console.log('Added click listener to generateButton');
    }
    
    if (!modeToggle) {
        console.error('ERROR: modeToggle not found!');
    } else {
        modeToggle.addEventListener('click', toggleTheme);
        console.log('Added click listener to modeToggle');
    }

    document.addEventListener('keydown', (event) => {
        if (event.key.toLowerCase() === 'h') {
            handleButtonPress();
        }
        keysPressed[event.key.toLowerCase()] = true;
    });

    document.addEventListener('keyup', (event) => {
        keysPressed[event.key.toLowerCase()] = false;
    });

    if (selfieInput) {
        selfieInput.addEventListener('change', handleSelfieChange);
    }

    if (selfieForm) {
        selfieForm.addEventListener('submit', submitSelfie);
    }

    if (clearSelfie) {
        clearSelfie.addEventListener('click', () => {
            resetSelfiePreview();
            selfieResponse.hidden = true;
        });
    }

    if (chatForm) {
        chatForm.addEventListener('submit', submitChat);
    }

    if (gameReset) {
        gameReset.addEventListener('click', initGame);
    }

    if (gameBoard) {
        gameBoard.addEventListener('click', handleGameTileClick);
    }

    if (blastStart) {
        blastStart.addEventListener('click', startBlastGame);
    }

    if (blastStop) {
        blastStop.addEventListener('click', stopBlastGame);
    }

    if (popStartBtn) {
        popStartBtn.addEventListener('click', startPopGame);
    }

    if (popReplayBtn) {
        popReplayBtn.addEventListener('click', startPopGame);
    }
    
    console.log('Event listeners initialized successfully!');
}

function initApp() {
    initializeSelectors();  // Initialize selectors first
    restoreThemePreference();
    initCardAnimations();
    initChatLog();
    initGame();
    displayPopHighScore();
    initEventListeners();
}

// Ensure script.js is loaded after the DOM is fully parsed
if (document.readyState === 'loading') {
    // DOM is still loading
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    // DOM is already loaded
    initApp();
}
