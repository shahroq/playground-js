import * as z from "zod";

const zObject = z.object;
const zString = z.string;
const zNumber = z.number();

const Player = z.object({
  username: z.string(),
  xp: z.number(),
});

console.log(Player);
// console.log(JSON.stringify(z.toJSONSchema(Player), null, 2));

const parsed = Player.parse({ username: "billie", xp: "s100" });
console.log(parsed);
