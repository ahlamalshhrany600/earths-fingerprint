// =================================
 // 1. Create the World Map
 // =================================

const map = L.map("world-map", {
    zoomControl: true,
    scrollWheelZoom: true
}).setView([25, 10], 2);


// =================================
 // 2. Add OpenStreetMap Layer
 // =================================

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19
    }
).addTo(map);


// =================================
// 3. Store Map Markers
// =================================

const phenomenonMarkers = [];

let selectedPhenomenonId = null;

// =================================
// 4. Create Custom Marker
// =================================

function createPhenomenonIcon(id, isSelected = false) {

    const number = String(id).padStart(2, "0");

    return L.divIcon({

        className: "custom-phenomenon-marker",

        html: `
            <div class="marker-circle ${isSelected ? "selected-marker" : ""}">
                <span>${number}</span>
            </div>
        `,

        iconSize: [42, 42],
        iconAnchor: [21, 21],
        popupAnchor: [0, -22]

    });

}


// =================================
// 5. Create Popup Content
// =================================

function createPopupContent(phenomenon) {

    const isArabic = currentLanguage === "ar";

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

    const image = phenomenon.imageInfo
        ? phenomenon.imageInfo.image
        : "";

    const imageTitle = phenomenon.imageInfo
        ? (isArabic
            ? phenomenon.imageInfo.title
            : phenomenon.imageInfo.englishTitle)
        : name;

    return `

        <div class="map-popup" dir="${isArabic ? "rtl" : "ltr"}">

            ${image ? `
                <div class="popup-image-container">

                    <img
                        src="${image}"
                        alt="${imageTitle}"
                        class="popup-image"
                        onclick="openImageModal(${phenomenon.id})">

                </div>
            ` : ""}

            <div class="popup-content">

                <span class="popup-label">
                    ${isArabic
                        ? "ظاهرة جغرافية"
                        : "GEOGRAPHIC PHENOMENON"}
                </span>

                <h3>${name}</h3>

                <p class="popup-english-name">
                    ${secondaryName}
                </p>

                <p class="popup-location">
                    <span>⌖</span> ${location}
                </p>

                <p class="popup-description">
                    ${description}
                </p>

            </div>

        </div>

    `;

}


// =================================
// 6. Add Geographic Phenomena
// =================================

phenomenaLocations.forEach(function(phenomenon) {

    const marker = L.marker(
        phenomenon.coordinates,
        {
            icon: createPhenomenonIcon(phenomenon.id)
        }
    );

    marker.addTo(map);

    marker.bindPopup(
        createPopupContent(phenomenon),
        {
            maxWidth: 290,
            minWidth: 230,
            closeButton: true,
            autoPan: true
        }
    );

    phenomenonMarkers.push({
        marker: marker,
        phenomenon: phenomenon
    });

});


// =================================
// 7. Highlight Selected Marker
// =================================

function setSelectedPhenomenon(id) {

    selectedPhenomenonId = Number(id);

    phenomenonMarkers.forEach(function(item) {

        const phenomenonId = Number(item.phenomenon.id);

        const isSelected = phenomenonId === selectedPhenomenonId;

        item.marker.setIcon(
            createPhenomenonIcon(phenomenonId, isSelected)
        );

    });

}


// =================================
// 7. Update Popups Language
// =================================

function updateMapPopups() {

    phenomenonMarkers.forEach(function(item) {

        const popupContent = createPopupContent(
            item.phenomenon
        );

        item.marker.setPopupContent(popupContent);

    });

}


// =================================
// 8. Map Zoom Settings
// =================================

map.setMinZoom(2);
map.setMaxZoom(18);

// =================================
// 9. Add Map Scale
// =================================

L.control.scale({
    position: "bottomleft",
    metric: true,
    imperial: false,
    maxWidth: 120
}).addTo(map);

// =================================
// 10. Add North Arrow
// =================================

const northControl = L.control({
    position: "topright"
});

northControl.onAdd = function () {
    const div = L.DomUtil.create("div", "north-arrow-control");

    div.innerHTML = `
        <div class="north-arrow">
            <span>N</span>
            <span class="arrow">▲</span>
        </div>
    `;

    return div;
};

northControl.addTo(map);