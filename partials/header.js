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

    '  <div class="site-nav-links flex items-center space-x-8 z-20 whitespace-nowrap">\n' +
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
    '        <svg class="icon-behance" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z"/></svg>\n' +
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
