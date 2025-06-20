import postcss from "npm:postcss";

// Your Tailwind config remains the same
const tailwindBaseConfig = {
  content: [{ raw: '<div class="text-red-500 p-4"></div>', extension: "html" }],
  corePlugins: { preflight: false },
};

async function generateCSS(config) {
  try {
    // The input CSS is now just the import
    const cssInput = '@import "tailwindcss";';
    
    console.log('Starting CSS generation...');
    console.log('Config:', JSON.stringify(config, null, 2));
    console.log('CSS Input:', cssInput);

    // PostCSS will automatically load postcss.config.mjs
    // We pass the tailwind config to the context
    const result = await postcss().process(cssInput, {
      from: undefined,
      // Pass config to the tailwindcss plugin via postcss-load-config context
      config: {
        plugins: {
          "@tailwindcss/postcss": config,
        }
      }
    });

    return result.css;
  } catch (error) {
    console.error("Error generating CSS:", error);
    throw error;
  }
}

// Run the test
const css = await generateCSS(tailwindBaseConfig);
console.log('\nFinal CSS:', css);
