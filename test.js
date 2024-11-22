import postcss from "npm:postcss";
import tailwindcss from "npm:@tailwindcss/postcss@next";

const tailwindBaseConfig = {
  content: [{ raw: '<div class="text-red-500"></div>', extension: "html" }],
  corePlugins: { preflight: false },
};

async function generateCSS(tailwindConfig) {
  try {
    const tailwindDirectives = `
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
console.log('\nFinal CSS:', Math.round(css.length/1000)+' KB');
