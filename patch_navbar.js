const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

// Ensure useStore provides openLoginModal
if (!content.includes('openLoginModal')) {
  content = content.replace('const { watchlist, searchQuery, setSearchQuery, setIsCartOpen } = useStore();', 
  'const { watchlist, searchQuery, setSearchQuery, setIsCartOpen, openLoginModal } = useStore();');
}

// Replace Links to /login with buttons
content = content.replace(
  /<Link href="\/login" className="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white px-5 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer">\s*Sign In\s*<\/Link>/,
  `<button onClick={openLoginModal} className="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white px-5 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer">
                    Sign In
                  </button>`
);

content = content.replace(
  /<Link href="\/login" className="bg-\[#ff2d3d\] hover:bg-\[#e02635\] text-white px-5 py-2 rounded-full text-xs font-bold shadow-md transition-colors cursor-pointer">\s*Sign Up\s*<\/Link>/,
  `<button onClick={openLoginModal} className="bg-[#ff2d3d] hover:bg-[#e02635] text-white px-5 py-2 rounded-full text-xs font-bold shadow-md transition-colors cursor-pointer">
                    Sign Up
                  </button>`
);

fs.writeFileSync('src/components/Navbar.tsx', content);
