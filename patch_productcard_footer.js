const fs = require('fs');
let content = fs.readFileSync('src/components/ProductCard.tsx', 'utf8');

// Ensure next/link is imported
if (!content.includes('import Link from "next/link";')) {
  content = 'import Link from "next/link";\n' + content;
}

// Add the See More button before </section>
const buttonHtml = `
      {showSeeMore && liveProducts.length > limit && (
        <div className="mt-12 flex justify-center">
          <Link 
            href={\`/category/\${encodeURIComponent(defaultQuery)}\`}
            className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-bold shadow-md hover:scale-105 transition-all duration-300"
          >
            See More Deals
          </Link>
        </div>
      )}
    </section>
  );
}
`;
content = content.replace(/    <\/section>\s*  \);\s*}\s*$/m, buttonHtml);
fs.writeFileSync('src/components/ProductCard.tsx', content);
