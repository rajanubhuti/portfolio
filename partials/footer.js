/**
 * Shared site footer.
 * Markup copied verbatim from indexnew.html's <footer> block.
 *
 * Usage: same as header.js — set window.SITE_ROOT first, then
 *   <script src="[SITE_ROOT]partials/footer.js"></script>
 *
 * Requires partials/shared.css to be linked in <head> (carries the
 * .site-footer / .made-with / .footer-* rules that live inline in
 * indexnew.html's <style> block).
 */
(function () {
  var ROOT = window.SITE_ROOT || "./";

  document.write(
    '<footer class="site-footer relative flex flex-col font-bold">\n' +

    '  <div class="footer-top-row z-20">\n' +
    '    <div>\n' +
    '      <p class="text-lg font-medium mb-2">Thanks for visiting!</p>\n' +
    '      <h3 class="tinker-heading font-bold">\n' +
    '        Let\'s tinker together.\n' +
    '        <a class="footer-email-link" href="mailto:anubhutiraj.ux@gmail.com">anubhutiraj.ux@gmail.com</a>\n' +
    '      </h3>\n' +
    '    </div>\n' +

    '    <div class="footer-social-buttons space-x-4">\n' +
    '      <a href="https://www.linkedin.com/in/anubhutiraj-ux" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">\n' +
    '        <button class="flex rounded-full font-bold border border-[#18191F] shadow-bottom-black !p-4 bg-white hover:bg-white text-black" tabindex="-1" type="button">\n' +
    '          <svg class="lucide lucide-linkedin" xmlns="http://www.w3.org/2000/svg" width="24" height="24"\n' +
    '               viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"\n' +
    '               stroke-linecap="round" stroke-linejoin="round">\n' +
    '            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />\n' +
    '            <rect width="4" height="12" x="2" y="9" />\n' +
    '            <circle cx="4" cy="4" r="2" />\n' +
    '          </svg>\n' +
    '        </button>\n' +
    '      </a>\n' +
    '      <a href="https://www.behance.net/anubhutiraj" target="_blank" rel="noopener noreferrer" aria-label="Behance">\n' +
    '        <button class="flex rounded-full font-bold border border-[#18191F] shadow-bottom-black !p-4 bg-white hover:bg-white text-black" tabindex="-1" type="button">\n' +
    '          <svg class="icon-behance" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 18v-12h4.5a3 3 0 0 1 0 6a3 3 0 0 1 0 6h-4.5"/><path d="M3 12l4.5 0"/><path d="M14 13h7a3.5 3.5 0 0 0 -7 0v2a3.5 3.5 0 0 0 6.64 1"/><path d="M16 6l3 0"/></svg>\n' +
    '        </button>\n' +
    '      </a>\n' +
    '      <a href="mailto:anubhutiraj.ux@gmail.com" aria-label="Email">\n' +
    '        <button class="flex rounded-full font-bold border border-[#18191F] shadow-bottom-black !p-4 bg-white hover:bg-white text-black" tabindex="-1" type="button">\n' +
    '          <svg class="lucide lucide-mail" xmlns="http://www.w3.org/2000/svg" width="24" height="24"\n' +
    '               viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"\n' +
    '               stroke-linecap="round" stroke-linejoin="round">\n' +
    '            <rect width="20" height="16" x="2" y="4" rx="2" />\n' +
    '            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />\n' +
    '          </svg>\n' +
    '        </button>\n' +
    '      </a>\n' +
    '    </div>\n' +
    '  </div>\n' +

    '  <div class="made-with z-20">\n' +
    '    <span>Made with</span>\n' +
    '    <img src="' + ROOT + 'assets/images/foot1.png" alt="" />\n' +
    '    <img src="' + ROOT + 'assets/images/foot2.png" alt="" />\n' +
    '    <img src="' + ROOT + 'assets/images/foot3.png" alt="" />\n' +
    '    <span>by Anubhuti</span>\n' +
    '  </div>\n' +

    '  <div class="h-[400px] absolute right-0 bottom-0 z-0 w-1/2"></div>\n' +
    '</footer>'
  );
})();
