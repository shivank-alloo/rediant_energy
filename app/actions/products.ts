"use server";

import fs from "fs/promises";
import path from "path";
import { Product, PRODUCTS } from "@/lib/products";

const DB_PATH = path.join(process.cwd(), "products.json");

export async function getProducts(): Promise<Product[]> {
  try {
    const raw = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(raw) as Product[];
  } catch {
    // File doesn't exist yet — seed from static list
    await fs.writeFile(DB_PATH, JSON.stringify(PRODUCTS, null, 2), "utf-8");
    return PRODUCTS;
  }
}

export async function saveProduct(updated: Product): Promise<{ success: boolean }> {
  try {
    const products = await getProducts();
    const idx = products.findIndex((p) => p.id === updated.id);
    if (idx === -1) return { success: false };
    products[idx] = updated;
    await fs.writeFile(DB_PATH, JSON.stringify(products, null, 2), "utf-8");
    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function addProduct(product: Product): Promise<{ success: boolean }> {
  try {
    const products = await getProducts();
    products.push(product);
    await fs.writeFile(DB_PATH, JSON.stringify(products, null, 2), "utf-8");
    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function deleteProduct(id: string): Promise<{ success: boolean }> {
  try {
    const products = await getProducts();
    const filtered = products.filter((p) => p.id !== id);
    await fs.writeFile(DB_PATH, JSON.stringify(filtered, null, 2), "utf-8");
    return { success: true };
  } catch {
    return { success: false };
  }
}
