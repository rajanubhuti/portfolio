/**
 * Shared site header/nav.
 * Markup copied verbatim from indexnew.html's <nav> block so styling
 * matches the homepage exactly.
 *
 * Usage (from any page, at any folder depth):
 *   <script>window.SITE_ROOT = "../../";</script>  // path back to the project root, from THIS page
 *   <script src="[SITE_ROOT]partials/header.js"></script>
 *
 * The logo, the Home link and image paths are prefixed with SITE_ROOT so they
 * work at any folder depth, on GitHub Pages and when opened locally.
 * Play, About and Resume still point to pages that don't exist yet.
 */
(function () {
  var ROOT = window.SITE_ROOT || "./";

  document.write(
    '<nav class="flex w-full items-center justify-between px-32 py-12 z-20\n' +
    '            max-2xl:px-24 max-xl:px-16 max-lg:px-8 max-md:px-4\n' +
    '            max-sm:flex-col max-sm:space-y-4 max-sm:pt-6 max-sm:pb-0">\n' +

    '  <a class="z-20" href="' + ROOT + 'index.html">\n' +
    '    <img\n' +
    '      src="' + ROOT + 'assets/images/logonew.png"\n' +
    '      alt="Anubhuti Raj"\n' +
    '      height="70"\n' +
    '      style="height: 80px !important; width: auto;"\n' +
    '    />\n' +
    '  </a>\n' +

    '  <div class="flex items-center space-x-8 z-20 whitespace-nowrap">\n' +
    '    <a class="font-bold text-darkgray text-lg px-4 py-2" href="' + ROOT + 'index.html">Home</a>\n' +
    '    <a class="font-bold text-darkgray text-lg px-4 py-2" href="/my-work/">Play</a>\n' +
    '    <a class="font-bold text-darkgray text-lg px-4 py-2" href="/about/">About</a>\n' +
    '    <a class="font-bold text-darkgray text-lg px-4 py-2" href="' + ROOT + 'assets/docs/anubhuti-raj-resume.pdf" target="_blank" rel="noopener">Resume</a>\n' +
    '  </div>\n' +

    '  <div class="flex items-center space-x-4 max-sm:hidden">\n' +
    '    <a href="https://www.linkedin.com/in/anubhutiraj-ux" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">\n' +
    '      <button class="nav-social-btn flex rounded-full font-bold border border-[#18191F] shadow-bottom-black bg-[#F3F3F3] !p-4 text-black hover:bg-[#F3F3F3]" tabindex="-1" type="button">\n' +
    '        <svg class="lucide lucide-linkedin" xmlns="http://www.w3.org/2000/svg" width="24" height="24"\n' +
    '             viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"\n' +
    '             stroke-linecap="round" stroke-linejoin="round">\n' +
    '          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />\n' +
    '          <rect width="4" height="12" x="2" y="9" />\n' +
    '          <circle cx="4" cy="4" r="2" />\n' +
    '        </svg>\n' +
    '      </button>\n' +
    '    </a>\n' +
    '    <a href="https://www.behance.net/anubhutiraj" target="_blank" rel="noopener noreferrer" aria-label="Behance">\n' +
    '      <button class="nav-social-btn flex rounded-full font-bold border border-[#18191F] shadow-bottom-black bg-[#F3F3F3] !p-4 text-black hover:bg-[#F3F3F3]" tabindex="-1" type="button">\n' +
    '        <svg class="icon-behance" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 18v-12h4.5a3 3 0 0 1 0 6a3 3 0 0 1 0 6h-4.5"/><path d="M3 12l4.5 0"/><path d="M14 13h7a3.5 3.5 0 0 0 -7 0v2a3.5 3.5 0 0 0 6.64 1"/><path d="M16 6l3 0"/></svg>\n' +
    '      </button>\n' +
    '    </a>\n' +
    '    <a href="mailto:anubhutiraj.ux@gmail.com" aria-label="Email">\n' +
    '      <button class="nav-social-btn flex rounded-full font-bold border border-[#18191F] shadow-bottom-black bg-[#F3F3F3] !p-4 text-black hover:bg-[#F3F3F3]" tabindex="-1" type="button">\n' +
    '        <svg class="lucide lucide-mail" xmlns="http://www.w3.org/2000/svg" width="24" height="24"\n' +
    '             viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"\n' +
    '             stroke-linecap="round" stroke-linejoin="round">\n' +
    '          <rect width="20" height="16" x="2" y="4" rx="2" />\n' +
    '          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />\n' +
    '        </svg>\n' +
    '      </button>\n' +
    '    </a>\n' +
    '  </div>\n' +
    '</nav>'
  );
})();
