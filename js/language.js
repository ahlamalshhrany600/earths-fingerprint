// =================================
// 1. Website Languages
// =================================

let currentLanguage = "ar";

const websiteTranslations = {

    ar: {
        direction: "rtl",
        button: "EN",

        nav: [
            "الرئيسية",
            "استكشف",
            "الخريطة",
            "التحدي الجغرافي",
            "عن المشروع"
        ],

        heroEyebrow: "A WORLD OF GEOGRAPHIC PATTERNS",
        heroTitle: 'لكل مكان على الأرض<br><span>بصمة تحكي قصته.</span>',
        heroDescription:
            "اكتشف الأنماط والظواهر الجغرافية من منظور مختلف، واستكشف كيف ترسم الطبيعة ملامح كوكبنا.",
        heroButton: "ابدأ الاستكشاف",

        exploreEyebrow: "DISCOVER THE EARTH",
        exploreTitle: "استكشف الظواهر الجغرافية",
        exploreDescription:
            "اكتشف الأنماط الطبيعية والبشرية التي تميز سطح الأرض.",

        mapEyebrow: "EXPLORE THE WORLD",
        mapTitle: "اكتشف مواقع الظواهر حول العالم",
        mapDescription:
            "اختر موقعًا على الخريطة وتعرّف على بصمته الجغرافية.",

        quizEyebrow: "TEST YOUR GEOGRAPHIC KNOWLEDGE",
        quizTitle: "التحدي الجغرافي",
        quizDescription:
            "هل تستطيع التعرف على الظاهرة الجغرافية من شكلها؟",

        aboutEyebrow: "ABOUT THE PROJECT",
        aboutTitle: "عن Earth's Fingerprint",
        aboutDescription:
            "تجربة تفاعلية تجمع بين الجغرافيا والاستشعار عن بعد والخرائط الرقمية، لاستكشاف الأنماط التي تشكل كوكب الأرض.",

        footer: "استكشف • اكتشف • افهم"
    },

    en: {
        direction: "ltr",
        button: "AR",

        nav: [
            "Home",
            "Explore",
            "Interactive Map",
            "Geo Challenge",
            "About"
        ],

        heroEyebrow: "A WORLD OF GEOGRAPHIC PATTERNS",
        heroTitle: 'Every place on Earth<br><span>has a story to tell.</span>',
        heroDescription:
            "Discover geographic patterns and phenomena from a different perspective, and explore how nature shapes our planet.",
        heroButton: "Start Exploring",

        exploreEyebrow: "DISCOVER THE EARTH",
        exploreTitle: "Explore Geographic Phenomena",
        exploreDescription:
            "Discover the natural and human patterns that shape Earth's surface.",

        mapEyebrow: "EXPLORE THE WORLD",
        mapTitle: "Discover Phenomena Around the World",
        mapDescription:
            "Select a location on the map and discover its geographic fingerprint.",

        quizEyebrow: "TEST YOUR GEOGRAPHIC KNOWLEDGE",
        quizTitle: "Geo Challenge",
        quizDescription:
            "Can you identify a geographic phenomenon from its shape?",

        aboutEyebrow: "ABOUT THE PROJECT",
        aboutTitle: "About Earth's Fingerprint",
        aboutDescription:
            "An interactive experience combining geography, remote sensing, and digital mapping to explore the patterns that shape our planet.",

        footer: "Explore • Discover • Understand"
    }

};


// =================================
// 2. Helper Function
// =================================

function updateText(selector, text) {
    const element = document.querySelector(selector);

    if (element) {
        element.textContent = text;
    }
}


// =================================
// 3. Change Website Language
// =================================

function changeLanguage() {

    // Switch language
    currentLanguage = currentLanguage === "ar" ? "en" : "ar";

    const t = websiteTranslations[currentLanguage];

    // Update page language and direction
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = t.direction;

    // Update language button
    updateText("#lang-toggle", t.button);


    // Update navigation
    const navLinks = document.querySelectorAll(".main-nav a");

    navLinks.forEach(function(link, index) {
        if (t.nav[index]) {
            link.textContent = t.nav[index];
        }
    });


    // =================================
    // Hero Section
    // =================================

    updateText(".hero-content .eyebrow", t.heroEyebrow);

    const heroTitle = document.querySelector(".hero-content h1");

    if (heroTitle) {
        heroTitle.innerHTML = t.heroTitle;
    }

    updateText(".hero-description", t.heroDescription);
    updateText(".primary-button", t.heroButton);


    // =================================
    // Explore Section
    // =================================

    updateText("#explore .section-heading .eyebrow", t.exploreEyebrow);
    updateText("#explore .section-heading h2", t.exploreTitle);
    updateText("#explore .section-heading p:last-child", t.exploreDescription);


    // =================================
    // Map Section
    // =================================

    updateText("#map-section .section-heading .eyebrow", t.mapEyebrow);
    updateText("#map-section .section-heading h2", t.mapTitle);
    updateText("#map-section .section-heading p:last-child", t.mapDescription);


    // =================================
    // Quiz Section
    // =================================

    updateText("#challenge .section-heading .eyebrow", t.quizEyebrow);
    updateText("#challenge .section-heading h2", t.quizTitle);
    updateText("#challenge .section-heading p:last-child", t.quizDescription);


    // =================================
    // About Section
    // =================================

    updateText("#about .section-heading .eyebrow", t.aboutEyebrow);
    updateText("#about .section-heading h2", t.aboutTitle);
    updateText("#about .section-heading p:last-child", t.aboutDescription);


    // =================================
    // Footer
    // =================================

    updateText(".main-footer p:last-child", t.footer);


    // =================================
    // Update Dynamic Content
    // =================================

    if (typeof displayPhenomena === "function") {
        displayPhenomena();
    }

    if (typeof displayQuestion === "function") {
        displayQuestion();
    }

    if (typeof updateMapPopups === "function") {
    updateMapPopups();
}

}


// =================================
// 4. Language Button Event
// =================================

const languageButton = document.getElementById("lang-toggle");

if (languageButton) {
    languageButton.addEventListener("click", changeLanguage);
}