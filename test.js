import postcss from "npm:postcss";
import tailwindcss from "npm:@tailwindcss/postcss@next";

const tailwindBaseConfig = {
  content: [{ raw: '<div class="text-red-500 p-4"></div>', extension: "html" }],
  corePlugins: { preflight: false },
};

async function generateCSS(tailwindConfig) {
  try {
    const tailwindDirectives = `
      @import "tailwindcss" source(none);
      @tailwind components;
      @tailwind utilities;
    `;
    
    console.log('Config:', JSON.stringify(tailwindConfig, null, 2));
    console.log('Directives:', tailwindDirectives);

    const result = await postcss([tailwindcss(tailwindConfig)])
      .process(tailwindDirectives, { from: undefined });
    return result.css;
  } catch (error) {
    console.error("Error generating CSS:", error);
    throw error;
  }
}

// Run the test
console.log('Starting CSS generation...');
const css = await generateCSS(tailwindBaseConfig);
console.log('\nFinal CSS:', css);
