// =================================
// 1. Display Geographic Phenomena
// =================================

function displayPhenomena() {

    const container = document.getElementById("phenomena-container");

    if (!container || !Array.isArray(phenomenaLocations)) {
        console.error("Phenomena container or data not found.");
        return;
    }

    const isArabic = currentLanguage === "ar";

    container.innerHTML = "";

    phenomenaLocations.forEach(function(phenomenon) {

        const card = document.createElement("article");
        card.className = "phenomenon-card";

        const name = isArabic
            ? phenomenon.name
            : phenomenon.englishName;

        const secondaryName = isArabic
            ? phenomenon.englishName
            : phenomenon.name;

        const location = isArabic
            ? phenomenon.location
            : phenomenon.englishLocation;

        const description = isArabic
            ? phenomenon.description
            : phenomenon.englishDescription;

        const label = isArabic
            ? "ظاهرة جغرافية"
            : "GEOGRAPHIC PHENOMENON";

        const exploreButton = isArabic
            ? "استكشف الموقع ←"
            : "Explore Location →";

        card.innerHTML = `

            <div class="phenomenon-visual">

                ${phenomenon.imageInfo
                    ? `<img
                        src="${phenomenon.imageInfo.image}"
                        alt="${phenomenon.imageInfo.title}"
                        class="phenomenon-image"
                        onclick="openImageModal(${phenomenon.id})"
                        style="cursor: pointer;">`
                    : ""}

                <span class="phenomenon-number">
                    ${String(phenomenon.id).padStart(2, "0")}
                </span>

                <span class="phenomenon-label">
                    ${label}
                </span>

            </div>

            <div class="phenomenon-card-content">

                <h3>${name}</h3>

                <p class="english-name">
                    ${secondaryName}
                </p>

                <p class="phenomenon-location">
                    <span>⌖</span> ${location}
                </p>

                <p>${description}</p>

                <button
                    class="explore-button"
                    onclick="focusOnPhenomenon(${phenomenon.id})">

                    ${exploreButton}

                </button>

            </div>

        `;

        container.appendChild(card);

    });

}


// =================================
// 2. Open Image Details Modal
// =================================

function openImageModal(id) {

    const phenomenon = phenomenaLocations.find(
        item => Number(item.id) === Number(id)
    );

    if (!phenomenon || !phenomenon.imageInfo) {
        console.error("Image information not found.");
        return;
    }

    const info = phenomenon.imageInfo;
    const isArabic = currentLanguage === "ar";

    const modal = document.getElementById("image-modal");
    const modalImage = document.getElementById("modal-image");
    const modalTitle = document.getElementById("modal-title");
    const modalMetadata = document.getElementById("modal-metadata");
    const modalSource = document.getElementById("modal-source");

    if (!modal || !modalImage || !modalTitle || !modalMetadata || !modalSource) {
        console.error("Image modal elements not found.");
        return;
    }

    // Set image information

    modalImage.src = info.image;

    modalImage.alt = isArabic
        ? info.title
        : info.englishTitle;

    modalTitle.textContent = isArabic
        ? info.title
        : info.englishTitle;


    // =================================
    // Organize Image Metadata
    // =================================

    const metadataSections = [

        {
            title: isArabic
                ? "المعلومات المكانية"
                : "SPATIAL INFORMATION",

            items: [
                {
                    label: isArabic ? "الموقع" : "Location",
                    value: isArabic
                        ? phenomenon.location
                        : phenomenon.englishLocation
                },
                {
    label: isArabic ? "الإحداثيات" : "Coordinates",
    value: `
        <button
            class="copy-coordinates"
            onclick="copyCoordinates('${info.latitude}, ${info.longitude}')"
            title="${isArabic ? "نسخ الإحداثيات" : "Copy coordinates"}">

            ${info.latitude}, ${info.longitude}
            <span>⧉</span>

        </button>
    `
}
            ]
        },

        {
            title: isArabic
                ? "معلومات الالتقاط"
                : "IMAGE ACQUISITION",

            items: [
                {
                    label: isArabic ? "تاريخ الالتقاط" : "Capture Date",
                    value: info.capturedDate
                },
                {
                    label: isArabic ? "المنصة" : "Platform",
                    value: info.platform
                },
                {
                    label: isArabic ? "الكاميرا" : "Camera",
                    value: info.camera
                },
                {
                    label: isArabic ? "البعد البؤري" : "Focal Length",
                    value: info.focalLength
                }
            ]
        },

        {
            title: isArabic
                ? "تعريف الصورة"
                : "IMAGE IDENTIFICATION",

            items: [
                {
                    label: isArabic ? "رقم الصورة" : "Photo ID",
                    value: info.photoId
                },
                {
                    label: isArabic ? "نوع الصورة" : "Image Type",
                    value: isArabic
                        ? info.imageType
                        : info.englishImageType
                },
                {
                    label: isArabic ? "المصدر" : "Source",
                    value: info.source
                }
            ]
        }

    ];


    // Display metadata sections

    modalMetadata.innerHTML = metadataSections.map(section => `

        <div class="metadata-section">

            <h3>${section.title}</h3>

            ${section.items.map(item => `

                <div class="metadata-item">

                    <span>${item.label}</span>

                    <strong>${item.value}</strong>

                </div>

            `).join("")}

        </div>

    `).join("");


    // Set source link

    modalSource.href = info.sourceUrl;

    modalSource.textContent = isArabic
        ? "عرض المصدر الأصلي ↗️"
        : "View Original Source ↗️";


    // Update modal heading

    const eyebrow = modal.querySelector(".eyebrow");

    if (eyebrow) {
        eyebrow.textContent = isArabic
            ? "تفاصيل الصورة"
            : "IMAGE DETAILS";
    }

    // Show modal

    modal.classList.add("active");

}


// =================================
// 3. Close Image Details Modal
// =================================

function closeImageModal() {

    const modal = document.getElementById("image-modal");

    if (modal) {
        modal.classList.remove("active");
    }

}


// =================================
// 4. Focus on Map Location
// =================================

function focusOnPhenomenon(id) {

    const phenomenon = phenomenaLocations.find(
        item => Number(item.id) === Number(id)
    );

    if (!phenomenon) {
        console.error("Phenomenon not found:", id);
        return;
    }

    if (
        typeof map === "undefined" ||
        typeof L === "undefined" ||
        typeof phenomenonMarkers === "undefined"
    ) {
        console.error("Map or markers are not initialized.");
        return;
    }

    // Find selected marker

    const markerItem = phenomenonMarkers.find(
        item => Number(item.phenomenon.id) === Number(id)
    );

    if (!markerItem) {
        console.error("Marker not found:", id);
        return;
    }

    // Highlight selected marker

    setSelectedPhenomenon(id);

    // Find map element

    const mapElement = document.getElementById("world-map");

    if (!mapElement) {
        console.error("Map element not found.");
        return;
    }

    // Scroll to map section

    const mapSection = mapElement.closest("section") || mapElement;

    mapSection.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    // Move to selected location

    setTimeout(function() {

        map.invalidateSize();

        const target = L.latLng(phenomenon.coordinates);

        const alreadyAtTarget =
            map.getZoom() === 10 &&
            map.getCenter().equals(target);

        if (alreadyAtTarget) {
            markerItem.marker.openPopup();
            return;
        }

        map.once("moveend", function() {
            markerItem.marker.openPopup();
        });

        map.flyTo(target, 10, {
            animate: true,
            duration: 2
        });

    }, 600);

}


// =================================
// 5. Initialize Modal Events
// =================================

document.addEventListener("DOMContentLoaded", function() {

    const closeButton = document.getElementById("close-image-modal");
    const modal = document.getElementById("image-modal");

    if (closeButton) {
        closeButton.addEventListener("click", closeImageModal);
    }

    if (modal) {

        modal.addEventListener("click", function(event) {

            if (event.target === modal) {
                closeImageModal();
            }

        });

    }

});


// =================================
// Copy Geographic Coordinates
// =================================

async function copyCoordinates(coordinates) {

    try {

        await navigator.clipboard.writeText(coordinates);

        const isArabic = currentLanguage === "ar";

        alert(
            isArabic
                ? "تم نسخ الإحداثيات بنجاح!"
                : "Coordinates copied successfully!"
        );

    } catch (error) {

        console.error("Could not copy coordinates:", error);

        alert(
            currentLanguage === "ar"
                ? "تعذر نسخ الإحداثيات."
                : "Could not copy coordinates."
        );

    }

}


// =================================
// 6. Initialize Phenomena Cards
// =================================

displayPhenomena();