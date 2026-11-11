/* =========================================================
   Offices section: edit the addresses HERE, once.
   Every page that has <section id="offices"></section>
   shows the updated list automatically.
========================================================= */
(function () {
  var mount = document.getElementById("offices");
  if (!mount) return;

  var MAIN = "+6018-9419800";

  var offices = [
    {
      city: "Johor Bahru",
      state: "Johor",
      address: ["20 &amp; 20A, Jalan Sasa 2,", "Taman Gaya,", "81800 Ulu Tiram,", "Johor."],
      phones: [MAIN, "+607-859 0410"]
    },
    {
      city: "Iskandar Puteri",
      state: "Johor",
      address: ["47 &amp; 47A, Jalan Jati 2,", "Taman Nusa Bestari Jaya,", "79150 Iskandar Puteri,", "Johor."],
      phones: [MAIN, "+607-535 4021"]
    },
    {
      city: "Kuala Lumpur",
      state: "Wilayah Persekutuan",
      address: ["17-2, Dinasti Sentral,", "Jalan Kuchai Maju 18,", "Off Jalan Kuchai Lama,", "58200 Kuala Lumpur,", "Wilayah Persekutuan Kuala Lumpur."],
      phones: [MAIN, "+603-2789 8988"]
    },
    {
      city: "Setia Alam",
      state: "Selangor",
      address: ["32-2, Jalan Setia Utama AS U13/AS,", "Setia Alam,", "40170 Shah Alam,", "Selangor."],
      phones: [MAIN, "+603-8966 3588"]
    },
    {
      city: "Penang",
      state: "Pulau Pinang",
      address: ["No. 188, First Floor,", "Jalan Tembikai,", "Taman Padang Lallang,", "14000 Bukit Mertajam,", "Penang, Malaysia."],
      phones: [MAIN, "+604-604 2266"]
    }
  ];

  var PIN =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/>' +
    '<circle cx="12" cy="9.5" r="2.5"/></svg>';

  var PHONE =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>';

  var cards = offices.map(function (o) {
    var phones = o.phones.map(function (p) {
      var tel = "tel:" + p.replace(/[^+\d]/g, "");
      return '<a class="co-phone" href="' + tel + '">' + PHONE + p + "</a>";
    }).join("");

    return (
      '<article class="co-card">' +
        '<div class="co-top">' +
          '<span class="co-pin">' + PIN + "</span>" +
          "<div><h3>" + o.city + '</h3><span class="co-state">' + o.state + "</span></div>" +
        "</div>" +
        '<p class="co-address">' + o.address.join("<br>") + "</p>" +
        '<div class="co-contact">' + phones + "</div>" +
      "</article>"
    );
  }).join("");

  mount.classList.add("co-section");
  mount.innerHTML =
    '<div class="co-wrap">' +
      '<div class="co-heading">' +
        '<span class="co-eyebrow">Contact us</span>' +
        "<h2>Our offices across Malaysia.</h2>" +
        "<p>Get in touch with one of our offices for enquiries about our services.</p>" +
      "</div>" +
      '<div class="co-grid">' + cards + "</div>" +
    "</div>";
})();