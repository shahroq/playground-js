import { Hono } from "hono";
import { db } from "../../common/db-client/client";

export const products = new Hono();

products.get("/", (c) => {
  const items = db.data.products;
  if (!items || items.length === 0) {
    return c.json({ error: "no products" });
  }

  return c.json(items);
});

products.get("/:id", (c) => {
  const id = c.req.param("id");
  const product = db.data.products.find((p) => p.id === id);
  if (!product) {
    // throw new Error("product w/ this id does not exist.");
    return c.notFound();
  }

  return c.json(product);
});

products.post("/", async (c) => {
  const body = await c.req.json();

  const newProduct = {
    id: crypto.randomUUID(),
    ...body,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  db.data.products.push(newProduct);
  await db.write();

  return c.json(newProduct, 201);
});

products.patch("/:id", async (c) => {
  const id = c.req.param("id");
  const product = db.data.products.find((p) => p.id === id);
  if (!product) {
    return c.notFound();
  }

  const body = await c.req.json();

  Object.assign(product, body, { updated_at: new Date().toISOString() });
  await db.write();

  return c.json(product);
});

products.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const index = db.data.products.findIndex((p) => p.id === id);
  if (index === -1) {
    return c.notFound();
  }

  const [deleted] = db.data.products.splice(index, 1);
  await db.write();

  return c.json(deleted);
});
