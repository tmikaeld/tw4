import postcss from "npm:postcss";
import tailwindcss from "npm:@tailwindcss/postcss";

const tailwindBaseConfig = {
  content: [{ raw: '<div class="text-red-500 p-4"></div>', extension: "html" }],
  corePlugins: { preflight: false },
};

async function generateCSS(tailwindConfig) {
  try {
    const cssInput = '@import "tailwindcss";';
    
    console.log('Starting CSS generation...');
    console.log('Config:', JSON.stringify(tailwindConfig, null, 2));
    console.log('CSS Input:', cssInput);

    // This is the key change:
    // 1. Initialize the tailwindcss plugin with your config object.
    // 2. Pass the initialized plugin in an array to postcss().
    const result = await postcss([tailwindcss(tailwindConfig)])
      .process(cssInput, { from: undefined });
      
    return result.css;
  } catch (error) {
    console.error("Error generating CSS:", error);
    throw error;
  }
}

// Run the test
const css = await generateCSS(tailwindBaseConfig);
console.log('\nFinal CSS:', css);
