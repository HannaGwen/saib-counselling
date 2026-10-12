// SAIB Counselling — shared site behavior
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    var closeMenu = function () {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
    document.addEventListener('click', function (e) {
      if (links.classList.contains('open') && !links.contains(e.target) && !toggle.contains(e.target)) {
        closeMenu();
      }
    });
  }

  // FAQ accordion (used on services page) — keyboard accessible, starts collapsed
  document.querySelectorAll('.faq-item h3').forEach(function (h) {
    var answer = h.nextElementSibling;
    var toggleAnswer = function () {
      var isOpen = h.getAttribute('aria-expanded') === 'true';
      h.setAttribute('aria-expanded', String(!isOpen));
      if (answer) answer.classList.toggle('open', !isOpen);
    };
    h.addEventListener('click', toggleAnswer);
    h.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleAnswer();
      }
    });
  });

  // Contact form — no booking backend yet, so this opens a pre-filled email
  // to saibcounselling@outlook.com instead of silently doing nothing.
  var form = document.getElementById('booking-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (form.name && form.name.value || '').trim();
      var email = (form.email && form.email.value || '').trim();
      var phone = (form.phone && form.phone.value || '').trim();
      var message = (form.message && form.message.value || '').trim();
      var subject = encodeURIComponent('Enquiry from ' + (name || 'website visitor'));
      var body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nPhone: ' + phone + '\n\n' + message);
      window.location.href = 'mailto:saibcounselling@outlook.com?subject=' + subject + '&body=' + body;
    });
  }
});
