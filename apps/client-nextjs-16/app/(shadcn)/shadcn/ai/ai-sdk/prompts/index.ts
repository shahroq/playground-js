import { MORE_REALISTIC_TEMPLATE } from "./realistic.prompt";
import { THE_ANTHROPIC_PROMPT_TEMPLATE } from "./anthropic.prompt";

const allPrompts = {
  anthropic: THE_ANTHROPIC_PROMPT_TEMPLATE,
  realistic: MORE_REALISTIC_TEMPLATE,
};

type PromptName = keyof typeof allPrompts;

/**
 * Returns a subset of the prompt registry by name.
 * Call with no args (or omit) to get every prompt.
 */
function getPrompts<TName extends PromptName>(
  names?: readonly TName[],
): Pick<typeof allPrompts, TName> {
  if (!names || names.length === 0) {
    return allPrompts as Pick<typeof allPrompts, TName>;
  }

  return names.reduce(
    (acc, name) => {
      acc[name] = allPrompts[name];
      return acc;
    },
    {} as Pick<typeof allPrompts, TName>,
  );
}

export { getPrompts, allPrompts };
export type { PromptName };
