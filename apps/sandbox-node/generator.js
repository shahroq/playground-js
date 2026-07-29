/**
 * yield=return : think of yield as return/we can have multiple returns
 * yield pauses the generator, and the next call to gen.next() resumes execution from exactly where it paused.
 * work with for/of
 */

const arColors = ["red", "green", "blue"];

function* colors1() {
  const outputs = [];

  outputs.push("red");
  yield outputs;

  outputs.push("green");
  yield outputs;

  outputs.push("blue");
  yield outputs;
}

function* colors2() {
  const outputs = [];

  for (const color of arColors) {
    outputs.push(color);

    yield outputs;
  }
}

// const gen = colors2();
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());

// work perfectly w/ for/of (don't have to deal with next, etc)
function* colors3() {
  yield "red";
  yield "green";
  yield "blue";
}
const myColors = [];
for (let color of colors3()) myColors.push(color);
// console.log(myColors);

// usecase 1: iterate only through specific keys (team mem, not size, dep)
const engTeam = {
  size: 3,
  department: "engineering",
  lead: "John",
  manager: "Jane",
  engineer: "Joe",
};

function* TeamIterator(team) {
  yield team.lead;
  yield team.manager;
  yield team.engineer;
}

const names = [];
for (let name of TeamIterator(engTeam)) names.push(name);
// console.log(names);

// usecase: symbol iterators
// ..

// usecase: tree structure (nodes) iteration (nested comments)
class Comment {
  constructor(content, children) {
    this.content = content;
    this.children = children;
  }

  *[Symbol.iterator]() {
    yield this.content;
    for (let child of this.children) {
      yield* child;
    }
  }
}

const myTree = new Comment("Great Post..", [
  new Comment("good point!", []),
  new Comment("what are you taloking about!", []),
  new Comment("nice catch", []),
]);

const values = [];
for (let v of myTree) values.push(v);
// console.log(values);
