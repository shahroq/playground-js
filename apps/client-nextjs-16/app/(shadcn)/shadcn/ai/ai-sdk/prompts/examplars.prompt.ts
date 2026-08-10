const exemplars = [
  {
    input: `What's the difference between TypeScript and JavaScript? Should I learn TypeScript first or JavaScript?`,
    expected: "TypeScript vs JavaScript Comparison",
  },
  {
    input: `I want to start investing but I'm a complete beginner. What are the safest options for someone with $5000 to invest?`,
    expected: "Beginner Investment Options",
  },
];

export const prompt = `
    <examples>
      ${exemplars
        .map(
          (e) =>
            `
          <example>
            <input>${e.input}</input>
            <expected>${e.expected}</expected>
          </example>
          `,
        )
        .join("\n")}
    </examples>`;
